from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS
import pandas as pd
from anomaly_detector import detect_anomalies

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Root route to avoid 404 error
@app.route('/')
def index():
    return "Welcome to the Spacecraft Telemetry Analyzer API!"

# API endpoint to get telemetry data and anomalies
@app.route('/api/telemetry', methods=['GET'])
def get_telemetry():
    df = pd.read_csv('telemetry.csv')
    anomalies = detect_anomalies(df)
    result = df.to_dict(orient='records')
    return jsonify({
        'data': result,
        'anomalies': anomalies
    })

if __name__ == '__main__':
    app.run(debug=True)
