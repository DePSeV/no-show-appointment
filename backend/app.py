from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import traceback

app = Flask(__name__)
# Enable CORS so the React frontend can communicate with this API safely
CORS(app)

# Load the trained model (Ensure xgboost_noshow_model.pkl is in this same folder)
try:
    model = joblib.load('xgboost_noshow_model.pkl')
    print("Model loaded successfully.")
except Exception as e:
    print(f"Warning: Model not found. Ensure .pkl file is in the backend directory. Error: {e}")

EXPECTED_FEATURES = [
    'age', 'scholarship', 'hypertension', 'diabetes', 'alcoholism', 
    'handicap', 'sms_received', 'leadtime', 'scheduled_hour', 
    'gender_numeric', 'appointment_dow_Monday', 'appointment_dow_Saturday', 
    'appointment_dow_Thursday', 'appointment_dow_Tuesday', 'appointment_dow_Wednesday'
]

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        input_data = {feature: 0 for feature in EXPECTED_FEATURES}
        
        # Map numerical and boolean inputs
        input_data['age'] = int(data.get('age', 30))
        input_data['leadtime'] = int(data.get('leadtime', 0))
        input_data['scheduled_hour'] = int(data.get('scheduled_hour', 12))
        input_data['gender_numeric'] = 1 if data.get('gender') == 'M' else 0
        input_data['sms_received'] = 1 if data.get('sms_received') else 0
        input_data['hypertension'] = 1 if data.get('hypertension') else 0
        input_data['diabetes'] = 1 if data.get('diabetes') else 0
        
        # Map Day of Week to One-Hot Encoding
        dow = data.get('day_of_week')
        valid_days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday']
        if dow in valid_days:
            input_data[f'appointment_dow_{dow}'] = 1

        # Predict
        df = pd.DataFrame([input_data])
        probability = float(model.predict_proba(df)[0][1])
        
        # Risk thresholds based on your data distribution
        risk = "High" if probability > 0.65 else "Medium" if probability > 0.35 else "Low"
            
        return jsonify({
            'probability': round(probability * 100, 1),
            'risk_level': risk,
            'status': 'success'
        })

    except Exception as e:
        print(traceback.format_exc())
        return jsonify({'error': str(e), 'status': 'failed'}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)