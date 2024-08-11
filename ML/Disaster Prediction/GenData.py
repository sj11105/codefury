import pandas as pd
import numpy as np

# Define the number of samples for each disaster type
num_samples = 1000

# Generate synthetic data for hurricanes
hurricane_data = pd.DataFrame({
    'Latitude': np.random.uniform(10, 45, num_samples),
    'Longitude': np.random.uniform(-100, -20, num_samples),
    'weather_type': ['Tropical'] * num_samples,
    'sea_surface_temp': np.random.uniform(27, 32, num_samples),
    'atmospheric_pressure': np.random.uniform(900, 1013, num_samples),
    'wind_speed': np.random.uniform(74, 200, num_samples),
    'humidity': np.random.uniform(70, 90, num_samples),
    'disaster_type': 'Hurricane'
})

# Generate synthetic data for earthquakes
earthquake_data = pd.DataFrame({
    'Latitude': np.random.uniform(-90, 90, num_samples),
    'Longitude': np.random.uniform(-180, 180, num_samples),
    'weather_type': ['Tropical'] * num_samples,
    'sea_surface_temp': np.random.uniform(27, 32, num_samples),
    'atmospheric_pressure': np.random.uniform(900, 1013, num_samples),
    'wind_speed': np.random.uniform(74, 200, num_samples),
    'humidity': np.random.uniform(70, 90, num_samples),
    'disaster_type': 'Earthquake'
})

# Generate synthetic data for floods
flood_data = pd.DataFrame({
    'Latitude': np.random.uniform(-90, 90, num_samples),
    'Longitude': np.random.uniform(-180, 180, num_samples),
    'weather_type': ['Tropical'] * num_samples,
    'sea_surface_temp': np.random.uniform(27, 32, num_samples),
    'atmospheric_pressure': np.random.uniform(900, 1013, num_samples),
    'wind_speed': np.random.uniform(74, 200, num_samples),
    'humidity': np.random.uniform(70, 90, num_samples),
    'disaster_type': 'Flood'
})

# Combine datasets
combined_data = pd.concat([hurricane_data, earthquake_data, flood_data], ignore_index=True)

# Save to a single CSV file
combined_data.to_csv('synthetic_disaster_data.csv', index=False)

print("Combined synthetic data generated and saved to 'synthetic_disaster_data.csv'")
