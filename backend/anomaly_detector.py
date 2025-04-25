import pandas as pd

def detect_anomalies(df):
    anomalies = []

    # Threshold for Z-score
    Z_THRESHOLD = 2.5

    numeric_columns = ['battery_voltage', 'temperature', 'velocity']

    for col in numeric_columns:
        mean = df[col].mean()
        std = df[col].std()

        df[f'{col}_zscore'] = (df[col] - mean) / std

    # Check where any z-score exceeds threshold
    for _, row in df.iterrows():
        if abs(row['battery_voltage_zscore']) > Z_THRESHOLD or \
           abs(row['temperature_zscore']) > Z_THRESHOLD or \
           abs(row['velocity_zscore']) > Z_THRESHOLD:
            anomalies.append({
                'timestamp': row['timestamp'],
                'battery_voltage': row['battery_voltage'],
                'temperature': row['temperature'],
                'velocity': row['velocity']
            })

    return anomalies
