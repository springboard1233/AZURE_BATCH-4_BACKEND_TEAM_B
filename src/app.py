# src/app.py
from flask import Flask, jsonify
import pandas as pd
import os
from datetime import datetime, timedelta

app = Flask(__name__)
PROC_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'processed', 'cleaned_merged.csv')

@app.route('/')
def home():
    return jsonify({
        'message': 'Azure Demand Forecasting API - Milestone 1',
        'status': 'running'
    })

@app.route('/api/usage-trends')
def usage_trends():
    if not os.path.exists(PROC_PATH):
        return jsonify({'error': 'cleaned_merged.csv not found. Run data_processing.py first.'}), 404

    df = pd.read_csv(PROC_PATH, parse_dates=['date'])
    sample = df.head(20).to_dict(orient='records')
    return jsonify({'data': sample})

@app.route('/api/forecast')
def forecast():
    today = datetime.today()
    forecast = []
    for i in range(7):
        d = today + timedelta(days=i + 1)
        forecast.append({
            'date': d.strftime('%Y-%m-%d'),
            'predicted_compute': 1000 + i * 10,
            'predicted_storage': 5000 + i * 50
        })
    return jsonify({'forecast': forecast})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
