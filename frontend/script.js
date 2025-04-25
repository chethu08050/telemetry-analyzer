async function fetchTelemetry() {
    const response = await fetch('http://127.0.0.1:5000/api/telemetry');
    const data = await response.json();
  
    const timestamps = data.data.map(d => d.timestamp);
    const batteryVoltage = data.data.map(d => d.battery_voltage);
    const temperature = data.data.map(d => d.temperature);
  
    async function fetchTelemetry() {
        const res = await fetch("http://127.0.0.1:5000/api/telemetry");
        const data = await res.json();
      
        displayAnomalies(data.anomalies);
        updateCharts(data.data);
      }
      
      // Refresh every 5 seconds
      setInterval(fetchTelemetry, 5000);
      
      // Initial load
      fetchTelemetry();
      
    // Plot Chart
    const ctx = document.getElementById('telemetryChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: timestamps,
        datasets: [
          {
            label: 'Battery Voltage',
            data: batteryVoltage,
            borderColor: 'blue',
            fill: false
          },
          {
            label: 'Temperature',
            data: temperature,
            borderColor: 'red',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Telemetry Data'
          }
        },
        scales: {
          x: {
            ticks: {
              maxTicksLimit: 10
            }
          }
        }
      }
    });
  
    // List anomalies
    const anomaliesList = document.getElementById('anomaliesList');
    data.anomalies.forEach(anomaly => {
      const li = document.createElement('li');
      li.textContent = `⚠️ [${anomaly.timestamp}] Temp: ${anomaly.temperature}°C, Battery: ${anomaly.battery_voltage}V, Velocity: ${anomaly.velocity}`;
      anomaliesList.appendChild(li);
    });
  }
  
  fetchTelemetry();
  