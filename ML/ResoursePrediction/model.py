import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
from sklearn.preprocessing import OneHotEncoder
import joblib

df = pd.read_csv('disaster_resource_needs.csv')

X = df.drop('resource_needs', axis=1)
y = df['resource_needs']

# One-hot encode categorical features
categorical_features = ['disaster_type', 'severity', 'urban_rural']
X_encoded = pd.get_dummies(X, columns=categorical_features)

X_train, X_test, y_train, y_test = train_test_split(X_encoded, y, test_size=0.2, random_state=42)

model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

joblib.dump(model, 'resource_needs_predictor.pkl')

y_pred = model.predict(X_test)

# Calculate Mean Absolute Error
mae = mean_absolute_error(y_test, y_pred)
print(f'Mean Absolute Error: {mae}')

def predict_resource_needs(disaster_type, severity='Moderate', urban_rural='urban', affected_population=5000, area_affected=100, duration=5, population_density=500, income_level=30000, response_time=24):
    input_data = pd.DataFrame([{
        'disaster_type': disaster_type,
        'severity': severity,
        'urban_rural': urban_rural,
        'affected_population': affected_population,
        'area_affected': area_affected,
        'duration': duration,
        'population_density': population_density,
        'income_level': income_level,
        'response_time': response_time
    }])
    
    # One-hot encode the input data
    input_encoded = pd.get_dummies(input_data, columns=['disaster_type', 'severity', 'urban_rural'])
    
    for column in X_encoded.columns:
        if column not in input_encoded.columns:
            input_encoded[column] = 0
    input_encoded = input_encoded[X_encoded.columns]
    
    # Predict resource needs
    prediction = model.predict(input_encoded)
    return prediction[0]

disaster_type = input("Enter Disaster:")

resource_needs = predict_resource_needs(disaster_type)
print(f'Predicted resource needs: {resource_needs}')