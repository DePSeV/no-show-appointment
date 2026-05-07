from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
from sklearn.metrics import accuracy_score, precision_score, recall_score, roc_auc_score, f1_score

app = Flask(__name__)
CORS(app)

xgb_model = joblib.load('xgboost_model.pkl')
lr_base_model = joblib.load('lr_base_model.pkl')
lr_ext_model = joblib.load('lr_extended_model.pkl')

@app.route('/predict', methods=['POST'])
def predict_noshow():
    try:
        data = request.json
        age = int(data.get('age', 0))
        lead_time = int(data.get('lead_time', 0))
        hour_booked = int(data.get('hour_booked', 0))
        gender = data.get('gender', 'Female')
        day_of_appointment = data.get('day_of_appointment', 'Monday')
        sms_received = 1 if data.get('sms_sent') else 0
        hypertension = 1 if data.get('hypertension') else 0
        diabetes = 1 if data.get('diabetes') else 0

        is_male = 1 if gender == 'Male' else 0
        days = {'Monday': 0, 'Tuesday': 0, 'Wednesday': 0, 'Thursday': 0, 'Friday': 0, 'Saturday': 0}
        if day_of_appointment in days:
            days[day_of_appointment] = 1

        feature_dict = {
            'age': [age],
            'gender_numeric': [is_male],
            'hypertension': [hypertension],
            'diabetes': [diabetes],
            'alcoholism': [0],
            'handicap': [0],
            'leadtime': [lead_time],
            'sms_received': [sms_received],
            'scheduled_hour': [hour_booked],
            'appointment_dow_Monday': [days['Monday']],
            'appointment_dow_Tuesday': [days['Tuesday']],
            'appointment_dow_Wednesday': [days['Wednesday']],
            'appointment_dow_Thursday': [days['Thursday']],
            'appointment_dow_Saturday': [days['Saturday']]
        }
        
        input_df = pd.DataFrame(feature_dict)
        prediction_probabilities = xgb_model.predict_proba(input_df)
        noshow_risk_probability = float(prediction_probabilities[0][1])

        if noshow_risk_probability >= 0.70:
            risk_category = "High Risk"
            action = "Urgent: Initiate manual call. Consider overbooking this timeslot."
        elif noshow_risk_probability >= 0.40:
            risk_category = "Medium Risk"
            action = "Monitor: Ensure automated reminders are queued. Flag for review."
        else:
            risk_category = "Low Risk"
            action = "Standard protocol. No immediate intervention required."

        return jsonify({
            'status': 'success',
            'risk_probability': noshow_risk_probability,
            'risk_category': risk_category,
            'recommended_action': action
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    try:
        df = pd.read_csv('dynamic_test_data.csv')
        total_records = len(df)
        noshow_rate = (df['actual_no_show'].sum() / total_records) * 100
        attendance_rate = 100 - noshow_rate
        
        age_groups = {
            '0-18': df[df['age'] <= 18]['actual_no_show'].mean() * 100,
            '19-35': df[(df['age'] > 18) & (df['age'] <= 35)]['actual_no_show'].mean() * 100,
            '36-50': df[(df['age'] > 35) & (df['age'] <= 50)]['actual_no_show'].mean() * 100,
            '51-65': df[(df['age'] > 50) & (df['age'] <= 65)]['actual_no_show'].mean() * 100,
            '65+': df[df['age'] > 65]['actual_no_show'].mean() * 100
        }
        
        return jsonify({
            'total_records': total_records,
            'global_noshow': round(noshow_rate, 2),
            'global_attendance': round(attendance_rate, 2),
            'age_distribution': age_groups
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/models', methods=['GET'])
def get_model_comparison():
    try:
        df = pd.read_csv('dynamic_test_data.csv')
        X_test = df.drop(columns=['actual_no_show'])
        y_test = df['actual_no_show']

        base_features = ['age', 'gender_numeric', 'hypertension', 'diabetes', 'alcoholism', 'handicap']
        X_test_base = X_test[base_features]

        def evaluate(model, X, y):
            preds = model.predict(X)
            probs = model.predict_proba(X)[:, 1]
            return {
                'accuracy': round(accuracy_score(y, preds) * 100, 1),
                'precision': round(precision_score(y, preds) * 100, 1),
                'recall': round(recall_score(y, preds) * 100, 1),
                'f1': round(f1_score(y, preds) * 100, 1),
                'auc': round(roc_auc_score(y, probs), 3)
            }

        results = [
            {"name": "XGBoost Classifier", "color": "#0ea5e9", "metrics": evaluate(xgb_model, X_test, y_test)},
            {"name": "Logistic Regression (Extended)", "color": "#10b981", "metrics": evaluate(lr_ext_model, X_test, y_test)},
            {"name": "Logistic Regression (Base)", "color": "#f59e0b", "metrics": evaluate(lr_base_model, X_test_base, y_test)}
        ]
        return jsonify(results)
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/features', methods=['GET'])
def get_features():
    try:
        df = pd.read_csv('dynamic_test_data.csv')
        X_test = df.drop(columns=['actual_no_show'])
        
        importances = xgb_model.feature_importances_
        feature_data = [{"name": col, "impact": round(float(imp) * 100, 1)} for col, imp in zip(X_test.columns, importances)]
        feature_data.sort(key=lambda x: x['impact'], reverse=True)
        
        return jsonify(feature_data[:10])
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)