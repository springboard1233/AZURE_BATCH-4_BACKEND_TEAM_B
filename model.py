# create_model.py

import numpy as np
from xgboost import XGBRegressor
import joblib

# ------------------------
# 1. Prepare dummy training data
# ------------------------
# Features: region_encoded, service_encoded, horizon
# 10 samples, 3 features
X_train = np.array([
    [101, 201, 30],
    [102, 202, 15],
    [103, 203, 7],
    [104, 204, 30],
    [105, 205, 60],
    [106, 206, 90],
    [107, 207, 30],
    [108, 208, 15],
    [109, 209, 7],
    [110, 210, 30]
])

# Target: dummy demand values
y_train = np.array([1200, 800, 500, 1300, 2000, 2500, 1400, 900, 600, 1350])

# ------------------------
# 2. Train XGBoost model
# ------------------------
model = XGBRegressor(objective="reg:squarederror", n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# ------------------------
# 3. Save the model as model.pkl
# ------------------------
joblib.dump(model, "model.pkl")
print("Model saved as 'model.pkl'")

# ------------------------
# 4. Test loading the model
# ------------------------
loaded_model = joblib.load("model.pkl")
# Example prediction
X_test = np.array([[101, 201, 30]])  # sample input
prediction = loaded_model.predict(X_test)
print(f"Prediction for {X_test}: {prediction}")
