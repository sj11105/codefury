import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import OneHotEncoder
import joblib

df = pd.read_csv('synthetic_disaster_data.csv')

X = df.drop('disaster_type', axis=1)
y = df['disaster_type']

# One-hot encode categorical features
categorical_features = ['weather_type']
X_encoded = pd.get_dummies(X, columns=categorical_features)

X_train, X_test, y_train, y_test = train_test_split(X_encoded, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

joblib.dump(model, 'disaster_prediction_model.pkl')

y_pred = model.predict(X_test)

# Calculate Accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy}')

def predict_disaster(Latitude, Longitude, weather_type, sea_surface_temp, atmospheric_pressure, wind_speed, humidity):
    input_data = pd.DataFrame([{
        'Latitude': Latitude,
        'Longitude': Longitude,
        'weather_type': weather_type,
        'sea_surface_temp': sea_surface_temp,
        'atmospheric_pressure': atmospheric_pressure,
        'wind_speed': wind_speed,
        'humidity': humidity
    }])

    # One-hot encode the input data
    input_data_encoded = pd.get_dummies(input_data, columns=categorical_features)
    input_data_encoded = input_data_encoded.reindex(columns=X_train.columns, fill_value=0)

    # Predict disaster type
    prediction = model.predict(input_data_encoded)
    return prediction[0]

# Example usage
Latitude = f
Longitude = -75.0
weather_type = 'Tropical'
sea_surface_temp = 30.0
atmospheric_pressure = 1005
wind_speed = 120
humidity = 80

predicted_disaster = predict_disaster(Latitude, Longitude, weather_type, sea_surface_temp, atmospheric_pressure, wind_speed, humidity)
print(f'Predicted disaster type: {predicted_disaster}')
