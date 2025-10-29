from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)

data = pd.read_csv('data/cleaned_merged.csv')

@app.route('/api/usage-trends')
def usage_trends():
    trends = data.groupby('region')['usage_cpu'].sum().to_dict()
    return jsonify(trends)

@app.route('/api/top-regions')
def top_regions():
    top = data.groupby('region')['usage_cpu'].sum().sort_values(ascending=False).head(5)
    return jsonify(top.to_dict())

@app.route('/api/raw-data')
def raw_data():
    return data.to_json(orient='records')
@app.route('/')
def home():
    return "Welcome! Available endpoints: /api/usage-trends, /api/top-regions, /api/raw-data"

@app.route('/api/predict')
def predict_dummy():
    dummy_prediction = {
        "region": "East US",
        "date": "2023-11-01",
        "predicted_cpu": 120
    }
    return jsonify(dummy_prediction)

if __name__ == '__main__':
    app.run(debug=True)
