import pandas as pd
import numpy as np

# Define the number of rows
num_rows = 10000

# Define disaster ID mappings
disaster_types = ['Hurricane', 'Earthquake', 'Flood', 'Wildfire', 'Tornado']
urban_rural = ['Urban', 'Rural']

# Define a mapping for disaster characteristics
disaster_mapping = {
    1: 'Hurricane',
    2: 'Earthquake',
    3: 'Flood',
    4: 'Wildfire',
    5: 'Tornado'
}

# Define severity to resource needs mapping
severity_resource_factor = {
    'Mild': (1000, 10000),
    'Moderate': (10000, 30000),
    'Severe': (30000, 50000)
}

# Define how many entries each disaster should have
disaster_counts = {1: 2000, 2: 2000, 3: 2000, 4: 2000, 5: 2000}

# Initialize empty lists to store data
data = {
    'disaster_id': [],
    'disaster_type': [],
    'severity': [],
    'affected_population': [],
    'area_affected': [],
    'duration': [],
    'resource_needs': [],
    'population_density': [],
    'income_level': [],
    'urban_rural': [],
    'response_time': []
}

# Generate the data
for disaster_id, count in disaster_counts.items():
    disaster_type = disaster_mapping[disaster_id]
    for _ in range(count):
        severity = np.random.choice(['Mild', 'Moderate', 'Severe'])
        min_resources, max_resources = severity_resource_factor[severity]
        
        data['disaster_id'].append(disaster_id)
        data['disaster_type'].append(disaster_type)
        data['severity'].append(severity)
        data['affected_population'].append(np.random.randint(1000, 100000))
        data['area_affected'].append(np.random.randint(1, 1000))
        data['duration'].append(np.random.randint(1, 30))
        data['resource_needs'].append(np.random.randint(min_resources, max_resources))
        data['population_density'].append(np.random.randint(100, 10000))
        data['income_level'].append(np.random.randint(1000, 50000))
        data['urban_rural'].append(np.random.choice(urban_rural))
        data['response_time'].append(np.random.randint(1, 72))

# Create DataFrame
df = pd.DataFrame(data)

# Save to CSV
df.to_csv('disaster_resource_needs.csv', index=False)

# Display the first few rows of the DataFrame
print(df.head())