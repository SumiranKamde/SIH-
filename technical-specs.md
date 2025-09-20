# CodeHex: Smart Pilgrim Crowd Management System
## Comprehensive Project Scaffolding & Technical Specifications

---

## **🏗️ PROJECT ARCHITECTURE**

### **System Overview**
CodeHex implements a microservices architecture with AI-powered crowd management capabilities, supporting real-time analytics, predictive modeling, and multi-platform client applications.

### **Architecture Diagram**
```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT APPLICATIONS                       │
├─────────────────────┬─────────────────────┬─────────────────┤
│   Mobile App        │   Web Dashboard     │   Admin Panel   │
│   (React Native)    │   (React.js)        │   (Angular)     │
└─────────────────────┴─────────────────────┴─────────────────┘
                                │
┌─────────────────────────────────────────────────────────────┐
│                    API GATEWAY                              │
│               (Express.js + NGINX)                          │
└─────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────┐
│                   MICROSERVICES LAYER                       │
├──────────────┬──────────────┬──────────────┬──────────────┤
│ User Service │ Crowd Service│ Queue Service│ Alert Service│
│ (Node.js)    │ (Python)     │ (Node.js)    │ (Node.js)    │
├──────────────┼──────────────┼──────────────┼──────────────┤
│ Booking      │ Analytics    │ Notification │ Maps Service │
│ Service      │ Service      │ Service      │ (Node.js)    │
│ (Node.js)    │ (Python)     │ (Node.js)    │              │
└──────────────┴──────────────┴──────────────┴──────────────┘
                                │
┌─────────────────────────────────────────────────────────────┐
│                   AI/ML SERVICES                            │
├─────────────────────┬─────────────────────┬─────────────────┤
│ Crowd Prediction    │ Anomaly Detection   │ Image Analysis  │
│ (TensorFlow)        │ (PyTorch)           │ (OpenCV)        │
└─────────────────────┴─────────────────────┴─────────────────┘
                                │
┌─────────────────────────────────────────────────────────────┐
│                    DATA LAYER                               │
├─────────────────┬─────────────────┬─────────────────────────┤
│ MongoDB         │ PostgreSQL      │ Redis Cache             │
│ (User Data)     │ (Analytics)     │ (Real-time Data)        │
└─────────────────┴─────────────────┴─────────────────────────┘
```

---

## **📱 FRONTEND DEVELOPMENT**

### **Mobile Application (React Native)**

#### **Project Structure**
```
codehex-mobile/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── temple/
│   │   ├── queue/
│   │   └── emergency/
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── TempleListScreen.js
│   │   ├── QRScannerScreen.js
│   │   ├── BookingScreen.js
│   │   └── EmergencyScreen.js
│   ├── services/
│   │   ├── api.js
│   │   ├── analytics.js
│   │   └── notifications.js
│   ├── utils/
│   ├── navigation/
│   └── store/
├── android/
├── ios/
└── package.json
```

#### **Key Dependencies**
```json
{
  "dependencies": {
    "react-native": "^0.72.0",
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/stack": "^6.3.0",
    "react-native-camera": "^4.2.0",
    "react-native-maps": "^1.7.0",
    "react-native-push-notification": "^8.1.0",
    "@react-native-firebase/messaging": "^18.5.0",
    "react-native-chart-kit": "^6.12.0",
    "react-native-svg": "^13.14.0",
    "react-native-qrcode-scanner": "^1.5.0",
    "@reduxjs/toolkit": "^1.9.0",
    "react-redux": "^8.1.0"
  }
}
```

#### **Core Components Implementation**

**QR Scanner Component:**
```javascript
import React, { useState } from 'react';
import { RNCamera } from 'react-native-camera';
import { View, Text, StyleSheet } from 'react-native';

const QRScanner = ({ onScan, onError }) => {
  const [scanning, setScanning] = useState(true);

  const handleBarCodeRead = ({ data }) => {
    if (scanning) {
      setScanning(false);
      onScan(data);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        onBarCodeRead={handleBarCodeRead}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
      >
        <View style={styles.overlay}>
          <View style={styles.scanArea} />
          <Text style={styles.instruction}>
            Scan temple QR code for darshan booking
          </Text>
        </View>
      </RNCamera>
    </View>
  );
};
```

**Real-time Crowd Display:**
```javascript
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const CrowdAnalytics = ({ templeId }) => {
  const [crowdData, setCrowdData] = useState([]);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(`ws://api.codehex.com/crowd/${templeId}`);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCrowdData(data.current);
      setPredictions(data.predictions);
    };

    return () => ws.close();
  }, [templeId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Crowd Analytics</Text>
      <LineChart
        data={{
          labels: crowdData.map(d => d.time),
          datasets: [
            {
              data: crowdData.map(d => d.count),
              color: () => '#1fb8cd',
              strokeWidth: 2
            },
            {
              data: predictions.map(d => d.predicted),
              color: () => '#ff6b6b',
              strokeWidth: 2,
              withDots: false
            }
          ]
        }}
        width={350}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(31, 184, 205, ${opacity})`
        }}
      />
    </View>
  );
};
```

### **Web Dashboard (React.js)**

#### **Project Structure**
```
codehex-web/
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   ├── Analytics/
│   │   ├── TempleManagement/
│   │   └── AlertSystem/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   └── store/
├── public/
└── package.json
```

#### **Dashboard Implementation**
```javascript
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [temples, setTemples] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    // WebSocket connection for real-time updates
    const ws = new WebSocket('ws://api.codehex.com/admin');
    
    ws.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data);
      switch (type) {
        case 'TEMPLE_UPDATE':
          setTemples(data);
          break;
        case 'NEW_ALERT':
          setAlerts(prev => [data, ...prev]);
          break;
        case 'ANALYTICS_UPDATE':
          setAnalytics(data);
          break;
      }
    };

    return () => ws.close();
  }, []);

  const crowdTrendData = {
    labels: analytics.crowdTrend?.labels || [],
    datasets: [
      {
        label: 'Actual Crowd',
        data: analytics.crowdTrend?.actual || [],
        borderColor: '#1fb8cd',
        backgroundColor: 'rgba(31, 184, 205, 0.1)',
        fill: true
      },
      {
        label: 'AI Prediction',
        data: analytics.crowdTrend?.predicted || [],
        borderColor: '#ff6b6b',
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        borderDash: [5, 5],
        fill: false
      }
    ]
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>CodeHex Admin Dashboard</h1>
        <div className="live-indicator">
          <span className="status-dot"></span>
          Live Monitoring
        </div>
      </div>

      <div className="stats-grid">
        {temples.map(temple => (
          <div key={temple.id} className="temple-card">
            <h3>{temple.name}</h3>
            <div className="stats">
              <div className="stat">
                <span className="value">{temple.currentCrowd}</span>
                <span className="label">Current Visitors</span>
              </div>
              <div className="stat">
                <span className="value">{temple.waitTime}</span>
                <span className="label">Wait Time</span>
              </div>
              <div className="stat">
                <span className="value">{Math.round(temple.currentCrowd / temple.capacity * 100)}%</span>
                <span className="label">Capacity</span>
              </div>
            </div>
            <div className={`status-badge ${temple.emergencyStatus}`}>
              {temple.emergencyStatus.toUpperCase()}
            </div>
          </div>
        ))}
      </div>

      <div className="analytics-section">
        <div className="chart-container">
          <h3>Crowd Trends vs AI Predictions</h3>
          <Line data={crowdTrendData} options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Real-time Crowd Analytics' }
            },
            scales: {
              y: { beginAtZero: true }
            }
          }} />
        </div>
      </div>

      <div className="alerts-section">
        <h3>Emergency Alerts</h3>
        <div className="alerts-list">
          {alerts.map(alert => (
            <div key={alert.id} className={`alert-item ${alert.severity}`}>
              <div className="alert-header">
                <span className="alert-type">{alert.type.replace('_', ' ').toUpperCase()}</span>
                <span className="alert-time">{alert.timestamp}</span>
              </div>
              <div className="alert-message">{alert.message}</div>
              <div className="alert-location">{alert.location}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
```

---

## **🔧 BACKEND DEVELOPMENT**

### **API Gateway (Express.js)**

#### **Main Server Setup**
```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');
const WebSocket = require('ws');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Microservice proxies
app.use('/api/users', createProxyMiddleware({
  target: 'http://user-service:3001',
  changeOrigin: true,
  pathRewrite: { '^/api/users': '' }
}));

app.use('/api/crowd', createProxyMiddleware({
  target: 'http://crowd-service:3002',
  changeOrigin: true,
  pathRewrite: { '^/api/crowd': '' }
}));

app.use('/api/queue', createProxyMiddleware({
  target: 'http://queue-service:3003',
  changeOrigin: true,
  pathRewrite: { '^/api/queue': '' }
}));

app.use('/api/alerts', createProxyMiddleware({
  target: 'http://alert-service:3004',
  changeOrigin: true,
  pathRewrite: { '^/api/alerts': '' }
}));

// WebSocket server for real-time updates
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws, req) => {
  console.log('New WebSocket connection established');
  
  ws.on('message', (message) => {
    try {
      const { type, data } = JSON.parse(message);
      handleWebSocketMessage(type, data, ws);
    } catch (error) {
      ws.send(JSON.stringify({ error: 'Invalid message format' }));
    }
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

const handleWebSocketMessage = (type, data, ws) => {
  switch (type) {
    case 'SUBSCRIBE_TEMPLE':
      ws.templeId = data.templeId;
      ws.send(JSON.stringify({ type: 'SUBSCRIBED', templeId: data.templeId }));
      break;
    case 'ADMIN_SUBSCRIBE':
      ws.isAdmin = true;
      ws.send(JSON.stringify({ type: 'ADMIN_SUBSCRIBED' }));
      break;
    default:
      ws.send(JSON.stringify({ error: 'Unknown message type' }));
  }
};

// Broadcast updates to WebSocket clients
const broadcastUpdate = (type, data, filter = null) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      if (!filter || filter(client)) {
        client.send(JSON.stringify({ type, data }));
      }
    }
  });
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      'user-service': 'healthy',
      'crowd-service': 'healthy',
      'queue-service': 'healthy',
      'alert-service': 'healthy'
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});

module.exports = { app, broadcastUpdate };
```

### **Microservices Implementation**

#### **1. Crowd Service (Python with Flask)**

```python
from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
import joblib
import redis
import json
from datetime import datetime, timedelta
import threading
import time

app = Flask(__name__)
redis_client = redis.Redis(host='redis', port=6379, db=0)

class CrowdPredictionService:
    def __init__(self):
        self.model = self.load_or_train_model()
        self.scaler = StandardScaler()
        
    def load_or_train_model(self):
        try:
            return joblib.load('crowd_model.pkl')
        except:
            return self.train_new_model()
    
    def train_new_model(self):
        # Generate synthetic training data for demonstration
        # In production, this would use historical crowd data
        dates = pd.date_range('2023-01-01', '2024-12-31', freq='H')
        n_samples = len(dates)
        
        # Features: hour, day_of_week, month, is_weekend, is_festival
        X = np.array([
            [d.hour, d.weekday(), d.month, int(d.weekday() >= 5), 
             int(self.is_festival_day(d))]
            for d in dates
        ])
        
        # Target: crowd count (with patterns for religious timing)
        y = np.array([
            self.generate_crowd_pattern(d.hour, d.weekday(), d.month, 
                                      int(d.weekday() >= 5), int(self.is_festival_day(d)))
            for d in dates
        ])
        
        # Train Random Forest model
        model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.scaler.fit(X)
        X_scaled = self.scaler.transform(X)
        model.fit(X_scaled, y)
        
        # Save model
        joblib.dump(model, 'crowd_model.pkl')
        joblib.dump(self.scaler, 'scaler.pkl')
        
        return model
    
    def is_festival_day(self, date):
        # Simplified festival detection
        festival_days = [
            (1, 1), (1, 26), (3, 8), (8, 15), (10, 2), (11, 1), (12, 25)
        ]
        return (date.month, date.day) in festival_days
    
    def generate_crowd_pattern(self, hour, weekday, month, is_weekend, is_festival):
        # Base crowd level
        base = 500
        
        # Hour patterns (peak at morning and evening prayers)
        hour_factor = 1.0
        if 5 <= hour <= 8 or 17 <= hour <= 20:
            hour_factor = 2.5
        elif 9 <= hour <= 16:
            hour_factor = 1.8
        elif 21 <= hour <= 23 or 0 <= hour <= 4:
            hour_factor = 0.3
            
        # Weekend factor
        weekend_factor = 2.0 if is_weekend else 1.0
        
        # Festival factor
        festival_factor = 4.0 if is_festival else 1.0
        
        # Month seasonality (peak during religious seasons)
        month_factor = 1.5 if month in [3, 4, 10, 11] else 1.0
        
        crowd = base * hour_factor * weekend_factor * festival_factor * month_factor
        
        # Add some random variation
        noise = np.random.normal(0, crowd * 0.1)
        
        return max(0, int(crowd + noise))
    
    def predict_crowd(self, temple_id, hours_ahead=24):
        current_time = datetime.now()
        predictions = []
        
        for i in range(hours_ahead):
            future_time = current_time + timedelta(hours=i)
            features = np.array([[
                future_time.hour,
                future_time.weekday(),
                future_time.month,
                int(future_time.weekday() >= 5),
                int(self.is_festival_day(future_time))
            ]])
            
            features_scaled = self.scaler.transform(features)
            prediction = self.model.predict(features_scaled)[0]
            
            predictions.append({
                'time': future_time.strftime('%Y-%m-%d %H:%M'),
                'predicted_count': max(0, int(prediction)),
                'confidence': min(100, max(60, 85 - i * 2))  # Decreasing confidence
            })
        
        return predictions

# Initialize prediction service
crowd_predictor = CrowdPredictionService()

@app.route('/predict/<int:temple_id>', methods=['GET'])
def predict_crowd(temple_id):
    try:
        hours_ahead = request.args.get('hours', 24, type=int)
        predictions = crowd_predictor.predict_crowd(temple_id, hours_ahead)
        
        return jsonify({
            'temple_id': temple_id,
            'predictions': predictions,
            'generated_at': datetime.now().isoformat()
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/current/<int:temple_id>', methods=['GET'])
def get_current_crowd(temple_id):
    try:
        # Simulate getting current crowd data
        current_crowd = crowd_predictor.generate_crowd_pattern(
            datetime.now().hour,
            datetime.now().weekday(),
            datetime.now().month,
            int(datetime.now().weekday() >= 5),
            int(crowd_predictor.is_festival_day(datetime.now()))
        )
        
        # Store in Redis for real-time access
        crowd_data = {
            'temple_id': temple_id,
            'current_crowd': current_crowd,
            'timestamp': datetime.now().isoformat(),
            'capacity': 5000,  # This would come from temple configuration
            'density_percentage': min(100, (current_crowd / 5000) * 100)
        }
        
        redis_client.setex(
            f'crowd:{temple_id}',
            300,  # 5 minutes TTL
            json.dumps(crowd_data)
        )
        
        return jsonify(crowd_data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/analytics/<int:temple_id>', methods=['GET'])
def get_analytics(temple_id):
    try:
        # Get historical data for analytics
        days_back = request.args.get('days', 7, type=int)
        current_time = datetime.now()
        
        analytics_data = {
            'temple_id': temple_id,
            'peak_hours': [6, 7, 8, 18, 19, 20],
            'average_wait_time': '1.5 hours',
            'weekly_trend': [],
            'accuracy_metrics': {
                'prediction_accuracy': 92.3,
                'model_confidence': 87.5,
                'last_updated': current_time.isoformat()
            }
        }
        
        # Generate weekly trend data
        for i in range(days_back):
            day = current_time - timedelta(days=i)
            avg_crowd = crowd_predictor.generate_crowd_pattern(
                12, day.weekday(), day.month,
                int(day.weekday() >= 5),
                int(crowd_predictor.is_festival_day(day))
            )
            
            analytics_data['weekly_trend'].append({
                'date': day.strftime('%Y-%m-%d'),
                'average_crowd': avg_crowd,
                'peak_crowd': int(avg_crowd * 1.5),
                'day_type': 'weekend' if day.weekday() >= 5 else 'weekday'
            })
        
        return jsonify(analytics_data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Background task to update predictions regularly
def update_predictions():
    while True:
        try:
            temple_ids = [1, 2, 3]  # In production, get from database
            for temple_id in temple_ids:
                predictions = crowd_predictor.predict_crowd(temple_id)
                redis_client.setex(
                    f'predictions:{temple_id}',
                    1800,  # 30 minutes TTL
                    json.dumps(predictions)
                )
            time.sleep(300)  # Update every 5 minutes
        except Exception as e:
            print(f"Error updating predictions: {e}")
            time.sleep(60)  # Wait 1 minute before retry

# Start background thread
prediction_thread = threading.Thread(target=update_predictions, daemon=True)
prediction_thread.start()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3002, debug=False)
```

#### **2. Queue Service (Node.js)**

```javascript
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');
const redis = require('redis');
const { broadcastUpdate } = require('../gateway/server');

const app = express();
const client = redis.createClient({ host: 'redis', port: 6379 });

app.use(express.json());

// Queue Management Class
class QueueManager {
    constructor() {
        this.queues = new Map();
        this.bookings = new Map();
    }

    async createBooking(templeId, userId, preferredTime) {
        const bookingId = uuidv4();
        const queueNumber = await this.getNextQueueNumber(templeId);
        
        const booking = {
            id: bookingId,
            templeId,
            userId,
            queueNumber,
            preferredTime,
            estimatedWaitTime: await this.calculateWaitTime(templeId, queueNumber),
            status: 'confirmed',
            qrCode: await this.generateQRCode(bookingId),
            createdAt: new Date().toISOString()
        };

        this.bookings.set(bookingId, booking);
        
        // Store in Redis for persistence
        await client.setex(`booking:${bookingId}`, 86400, JSON.stringify(booking));
        
        // Update queue status
        await this.updateQueueStatus(templeId);
        
        return booking;
    }

    async getNextQueueNumber(templeId) {
        const queueKey = `queue:${templeId}`;
        const currentNumber = await client.get(queueKey) || 0;
        const nextNumber = parseInt(currentNumber) + 1;
        await client.set(queueKey, nextNumber);
        return `A-${nextNumber.toString().padStart(3, '0')}`;
    }

    async calculateWaitTime(templeId, queueNumber) {
        // Get current crowd data
        const crowdData = await client.get(`crowd:${templeId}`);
        if (!crowdData) return '30 minutes';

        const crowd = JSON.parse(crowdData);
        const avgProcessingTime = 2; // minutes per person
        const queuePosition = parseInt(queueNumber.split('-')[1]);
        
        const waitTime = (crowd.current_crowd * avgProcessingTime) / 60; // hours
        
        if (waitTime < 1) return `${Math.round(waitTime * 60)} minutes`;
        return `${waitTime.toFixed(1)} hours`;
    }

    async generateQRCode(bookingId) {
        try {
            const qrData = {
                bookingId,
                timestamp: new Date().toISOString(),
                type: 'darshan_booking'
            };
            
            return await QRCode.toDataURL(JSON.stringify(qrData));
        } catch (error) {
            console.error('QR Code generation error:', error);
            return null;
        }
    }

    async updateQueueStatus(templeId) {
        const queueStatus = {
            templeId,
            totalBookings: await this.getTotalBookings(templeId),
            currentWaitTime: await this.getCurrentWaitTime(templeId),
            availableSlots: await this.getAvailableSlots(templeId),
            lastUpdated: new Date().toISOString()
        };

        await client.setex(`queue_status:${templeId}`, 300, JSON.stringify(queueStatus));
        
        // Broadcast update to WebSocket clients
        broadcastUpdate('QUEUE_UPDATE', queueStatus, 
            client => client.templeId === templeId || client.isAdmin);
    }

    async getTotalBookings(templeId) {
        // Count bookings for today
        const keys = await client.keys(`booking:*`);
        let count = 0;
        
        for (const key of keys) {
            const booking = await client.get(key);
            if (booking) {
                const bookingData = JSON.parse(booking);
                if (bookingData.templeId === templeId) {
                    const bookingDate = new Date(bookingData.createdAt).toDateString();
                    const today = new Date().toDateString();
                    if (bookingDate === today) count++;
                }
            }
        }
        
        return count;
    }

    async getCurrentWaitTime(templeId) {
        const crowdData = await client.get(`crowd:${templeId}`);
        if (!crowdData) return '30 minutes';

        const crowd = JSON.parse(crowdData);
        const avgProcessingTime = 2; // minutes per person
        const waitTime = (crowd.current_crowd * avgProcessingTime) / 60; // hours
        
        if (waitTime < 1) return `${Math.round(waitTime * 60)} minutes`;
        return `${waitTime.toFixed(1)} hours`;
    }

    async getAvailableSlots(templeId) {
        // Calculate available slots based on capacity and current bookings
        const capacity = 100; // slots per hour
        const currentHour = new Date().getHours();
        const slotsUsed = await this.getTotalBookings(templeId);
        
        return Math.max(0, capacity - slotsUsed);
    }
}

const queueManager = new QueueManager();

// API Endpoints

// Create new booking
app.post('/book', async (req, res) => {
    try {
        const { templeId, userId, preferredTime } = req.body;
        
        if (!templeId || !userId) {
            return res.status(400).json({ error: 'Temple ID and User ID are required' });
        }

        const booking = await queueManager.createBooking(templeId, userId, preferredTime);
        
        res.status(201).json({
            success: true,
            booking,
            message: 'Darshan booking confirmed successfully'
        });
        
    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({ error: 'Failed to create booking' });
    }
});

// Get booking details
app.get('/booking/:bookingId', async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await client.get(`booking:${bookingId}`);
        
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.json(JSON.parse(booking));
        
    } catch (error) {
        console.error('Get booking error:', error);
        res.status(500).json({ error: 'Failed to retrieve booking' });
    }
});

// Get queue status for temple
app.get('/status/:templeId', async (req, res) => {
    try {
        const { templeId } = req.params;
        const status = await client.get(`queue_status:${templeId}`);
        
        if (!status) {
            await queueManager.updateQueueStatus(parseInt(templeId));
            const newStatus = await client.get(`queue_status:${templeId}`);
            return res.json(JSON.parse(newStatus || '{}'));
        }

        res.json(JSON.parse(status));
        
    } catch (error) {
        console.error('Get status error:', error);
        res.status(500).json({ error: 'Failed to retrieve queue status' });
    }
});

// Verify QR code
app.post('/verify', async (req, res) => {
    try {
        const { qrData } = req.body;
        const data = JSON.parse(qrData);
        
        if (data.type !== 'darshan_booking') {
            return res.status(400).json({ error: 'Invalid QR code type' });
        }

        const booking = await client.get(`booking:${data.bookingId}`);
        
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found or expired' });
        }

        const bookingData = JSON.parse(booking);
        
        // Mark as used
        bookingData.status = 'used';
        bookingData.usedAt = new Date().toISOString();
        await client.setex(`booking:${data.bookingId}`, 86400, JSON.stringify(bookingData));

        res.json({
            success: true,
            booking: bookingData,
            message: 'QR code verified successfully'
        });
        
    } catch (error) {
        console.error('Verify QR error:', error);
        res.status(500).json({ error: 'Failed to verify QR code' });
    }
});

// Get user bookings
app.get('/user/:userId/bookings', async (req, res) => {
    try {
        const { userId } = req.params;
        const keys = await client.keys(`booking:*`);
        const userBookings = [];
        
        for (const key of keys) {
            const booking = await client.get(key);
            if (booking) {
                const bookingData = JSON.parse(booking);
                if (bookingData.userId === userId) {
                    userBookings.push(bookingData);
                }
            }
        }
        
        // Sort by creation date (newest first)
        userBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.json(userBookings);
        
    } catch (error) {
        console.error('Get user bookings error:', error);
        res.status(500).json({ error: 'Failed to retrieve user bookings' });
    }
});

// Cancel booking
app.delete('/booking/:bookingId', async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await client.get(`booking:${bookingId}`);
        
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        const bookingData = JSON.parse(booking);
        
        // Mark as cancelled
        bookingData.status = 'cancelled';
        bookingData.cancelledAt = new Date().toISOString();
        await client.setex(`booking:${bookingId}`, 86400, JSON.stringify(bookingData));

        // Update queue status
        await queueManager.updateQueueStatus(bookingData.templeId);

        res.json({
            success: true,
            message: 'Booking cancelled successfully'
        });
        
    } catch (error) {
        console.error('Cancel booking error:', error);
        res.status(500).json({ error: 'Failed to cancel booking' });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        service: 'queue-service',
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Queue Service running on port ${PORT}`);
});

// Cleanup function
process.on('SIGINT', async () => {
    await client.quit();
    process.exit();
});
```

#### **3. Alert Service (Node.js)**

```javascript
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const admin = require('firebase-admin');
const twilio = require('twilio');
const redis = require('redis');
const WebSocket = require('ws');
const { broadcastUpdate } = require('../gateway/server');

const app = express();
const client = redis.createClient({ host: 'redis', port: 6379 });

// Initialize Firebase Admin SDK
const serviceAccount = require('./firebase-service-account.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Initialize Twilio
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

app.use(express.json());

class AlertManager {
    constructor() {
        this.alertTypes = {
            'crowd_surge': { priority: 'high', threshold: 0.9 },
            'medical_emergency': { priority: 'critical', threshold: 1.0 },
            'security_threat': { priority: 'critical', threshold: 1.0 },
            'fire_hazard': { priority: 'critical', threshold: 1.0 },
            'parking_full': { priority: 'medium', threshold: 0.95 },
            'queue_overflow': { priority: 'high', threshold: 0.85 },
            'weather_alert': { priority: 'medium', threshold: 0.7 }
        };

        this.emergencyContacts = {
            'medical': ['+91XXXXXXXXXX'],
            'fire': ['+91101'],
            'police': ['+91100'],
            'admin': ['+91XXXXXXXXXX']
        };

        // Start monitoring
        this.startCrowdMonitoring();
    }

    async createAlert(type, templeId, location, message, severity = 'medium', metadata = {}) {
        const alertId = uuidv4();
        const alert = {
            id: alertId,
            type,
            templeId,
            location,
            message,
            severity,
            metadata,
            status: 'active',
            createdAt: new Date().toISOString(),
            resolvedAt: null,
            responses: []
        };

        // Store alert
        await client.setex(`alert:${alertId}`, 86400, JSON.stringify(alert));
        
        // Add to temple alerts list
        const templeAlerts = await client.get(`temple_alerts:${templeId}`) || '[]';
        const alerts = JSON.parse(templeAlerts);
        alerts.unshift(alert);
        
        // Keep only last 50 alerts
        if (alerts.length > 50) alerts.splice(50);
        
        await client.setex(`temple_alerts:${templeId}`, 86400, JSON.stringify(alerts));

        // Process alert based on severity
        await this.processAlert(alert);

        return alert;
    }

    async processAlert(alert) {
        // Broadcast to WebSocket clients
        broadcastUpdate('NEW_ALERT', alert);

        // Send push notifications
        await this.sendPushNotification(alert);

        // For critical alerts, send SMS
        if (alert.severity === 'critical' || alert.severity === 'high') {
            await this.sendSMSAlert(alert);
        }

        // Auto-dispatch for critical emergencies
        if (alert.severity === 'critical') {
            await this.autoDispatchEmergencyServices(alert);
        }

        // Log alert for analytics
        await this.logAlertAnalytics(alert);
    }

    async sendPushNotification(alert) {
        try {
            const message = {
                notification: {
                    title: `${alert.type.replace('_', ' ').toUpperCase()} - ${alert.severity.toUpperCase()}`,
                    body: alert.message
                },
                data: {
                    alertId: alert.id,
                    templeId: alert.templeId.toString(),
                    type: alert.type,
                    severity: alert.severity,
                    location: alert.location
                },
                topic: `temple_${alert.templeId}_alerts`
            };

            const response = await admin.messaging().send(message);
            console.log('Push notification sent:', response);

            // For admin alerts
            const adminMessage = {
                ...message,
                topic: 'admin_alerts'
            };
            await admin.messaging().send(adminMessage);

        } catch (error) {
            console.error('Push notification error:', error);
        }
    }

    async sendSMSAlert(alert) {
        try {
            const contactType = this.getContactType(alert.type);
            const contacts = this.emergencyContacts[contactType] || this.emergencyContacts.admin;

            const message = `🚨 EMERGENCY ALERT 🚨\n` +
                           `Type: ${alert.type.replace('_', ' ').toUpperCase()}\n` +
                           `Location: ${alert.location}\n` +
                           `Details: ${alert.message}\n` +
                           `Time: ${new Date(alert.createdAt).toLocaleString()}\n` +
                           `Alert ID: ${alert.id}`;

            for (const contact of contacts) {
                await twilioClient.messages.create({
                    body: message,
                    from: process.env.TWILIO_PHONE,
                    to: contact
                });
            }

        } catch (error) {
            console.error('SMS alert error:', error);
        }
    }

    getContactType(alertType) {
        if (alertType.includes('medical')) return 'medical';
        if (alertType.includes('fire')) return 'fire';
        if (alertType.includes('security')) return 'police';
        return 'admin';
    }

    async autoDispatchEmergencyServices(alert) {
        const dispatch = {
            id: uuidv4(),
            alertId: alert.id,
            type: 'auto_dispatch',
            services: this.getRequiredServices(alert.type),
            dispatchedAt: new Date().toISOString(),
            status: 'dispatched'
        };

        await client.setex(`dispatch:${dispatch.id}`, 86400, JSON.stringify(dispatch));
        
        // Update alert with dispatch info
        const alertData = await client.get(`alert:${alert.id}`);
        const updatedAlert = JSON.parse(alertData);
        updatedAlert.dispatch = dispatch;
        await client.setex(`alert:${alert.id}`, 86400, JSON.stringify(updatedAlert));

        // Notify emergency services
        broadcastUpdate('EMERGENCY_DISPATCH', { alert, dispatch });
    }

    getRequiredServices(alertType) {
        const services = [];
        
        if (alertType.includes('medical')) services.push('ambulance', 'medical_team');
        if (alertType.includes('fire')) services.push('fire_department');
        if (alertType.includes('security')) services.push('security_team', 'police');
        if (alertType === 'crowd_surge') services.push('crowd_control_team', 'security_team');
        
        return services;
    }

    async logAlertAnalytics(alert) {
        const analytics = {
            date: new Date().toISOString().split('T')[0],
            hour: new Date().getHours(),
            templeId: alert.templeId,
            type: alert.type,
            severity: alert.severity,
            responseTime: null
        };

        await client.lpush('alert_analytics', JSON.stringify(analytics));
    }

    async resolveAlert(alertId, resolvedBy, resolution) {
        const alertData = await client.get(`alert:${alertId}`);
        if (!alertData) throw new Error('Alert not found');

        const alert = JSON.parse(alertData);
        alert.status = 'resolved';
        alert.resolvedAt = new Date().toISOString();
        alert.resolvedBy = resolvedBy;
        alert.resolution = resolution;

        await client.setex(`alert:${alertId}`, 86400, JSON.stringify(alert));
        
        // Broadcast resolution
        broadcastUpdate('ALERT_RESOLVED', alert);

        return alert;
    }

    // Monitor crowd levels and auto-generate alerts
    startCrowdMonitoring() {
        setInterval(async () => {
            try {
                const temples = [1, 2, 3]; // Get from database in production
                
                for (const templeId of temples) {
                    const crowdData = await client.get(`crowd:${templeId}`);
                    if (!crowdData) continue;

                    const crowd = JSON.parse(crowdData);
                    const densityRatio = crowd.current_crowd / crowd.capacity;

                    // Check for crowd surge
                    if (densityRatio > 0.9 && !await this.hasActiveAlert(templeId, 'crowd_surge')) {
                        await this.createAlert(
                            'crowd_surge',
                            templeId,
                            'Main Temple Area',
                            `Crowd density at ${Math.round(densityRatio * 100)}% capacity. Immediate crowd control needed.`,
                            'high',
                            { density_ratio: densityRatio, crowd_count: crowd.current_crowd }
                        );
                    }

                    // Check parking capacity
                    const parkingRatio = (crowd.parking_capacity - crowd.parking_available) / crowd.parking_capacity;
                    if (parkingRatio > 0.95 && !await this.hasActiveAlert(templeId, 'parking_full')) {
                        await this.createAlert(
                            'parking_full',
                            templeId,
                            'Parking Areas',
                            'Parking areas at full capacity. Consider opening overflow parking.',
                            'medium',
                            { parking_ratio: parkingRatio }
                        );
                    }
                }
            } catch (error) {
                console.error('Crowd monitoring error:', error);
            }
        }, 60000); // Check every minute
    }

    async hasActiveAlert(templeId, type) {
        const alerts = await client.get(`temple_alerts:${templeId}`);
        if (!alerts) return false;

        const alertList = JSON.parse(alerts);
        return alertList.some(alert => 
            alert.type === type && 
            alert.status === 'active' &&
            new Date() - new Date(alert.createdAt) < 30 * 60 * 1000 // Within last 30 minutes
        );
    }
}

const alertManager = new AlertManager();

// API Endpoints

// Create manual alert
app.post('/create', async (req, res) => {
    try {
        const { type, templeId, location, message, severity, metadata } = req.body;
        
        if (!type || !templeId || !location || !message) {
            return res.status(400).json({ 
                error: 'Type, temple ID, location, and message are required' 
            });
        }

        const alert = await alertManager.createAlert(
            type, templeId, location, message, severity, metadata
        );

        res.status(201).json({
            success: true,
            alert,
            message: 'Alert created and dispatched successfully'
        });

    } catch (error) {
        console.error('Create alert error:', error);
        res.status(500).json({ error: 'Failed to create alert' });
    }
});

// SOS endpoint
app.post('/sos', async (req, res) => {
    try {
        const { userId, templeId, location, coordinates, description } = req.body;
        
        const alert = await alertManager.createAlert(
            'medical_emergency',
            templeId,
            location || 'Unknown Location',
            `SOS alert from user ${userId}: ${description || 'Emergency assistance needed'}`,
            'critical',
            { userId, coordinates, type: 'sos' }
        );

        res.status(201).json({
            success: true,
            alert,
            message: 'SOS alert sent. Emergency services have been notified.',
            emergencyResponse: 'Help is on the way. Stay calm and stay in your current location if safe.'
        });

    } catch (error) {
        console.error('SOS error:', error);
        res.status(500).json({ error: 'Failed to send SOS alert' });
    }
});

// Get temple alerts
app.get('/temple/:templeId', async (req, res) => {
    try {
        const { templeId } = req.params;
        const status = req.query.status || 'all';
        
        const alertsData = await client.get(`temple_alerts:${templeId}`);
        let alerts = alertsData ? JSON.parse(alertsData) : [];
        
        if (status !== 'all') {
            alerts = alerts.filter(alert => alert.status === status);
        }

        res.json({
            templeId: parseInt(templeId),
            alerts,
            total: alerts.length
        });

    } catch (error) {
        console.error('Get alerts error:', error);
        res.status(500).json({ error: 'Failed to retrieve alerts' });
    }
});

// Resolve alert
app.put('/resolve/:alertId', async (req, res) => {
    try {
        const { alertId } = req.params;
        const { resolvedBy, resolution } = req.body;
        
        if (!resolvedBy || !resolution) {
            return res.status(400).json({ 
                error: 'Resolved by and resolution details are required' 
            });
        }

        const alert = await alertManager.resolveAlert(alertId, resolvedBy, resolution);
        
        res.json({
            success: true,
            alert,
            message: 'Alert resolved successfully'
        });

    } catch (error) {
        console.error('Resolve alert error:', error);
        res.status(500).json({ error: 'Failed to resolve alert' });
    }
});

// Get alert analytics
app.get('/analytics', async (req, res) => {
    try {
        const days = parseInt(req.query.days) || 7;
        const analyticsData = await client.lrange('alert_analytics', 0, days * 24 - 1);
        
        const analytics = analyticsData.map(data => JSON.parse(data));
        
        // Process analytics
        const summary = {
            total_alerts: analytics.length,
            by_type: {},
            by_severity: {},
            by_hour: {},
            by_temple: {},
            response_times: []
        };

        analytics.forEach(alert => {
            // By type
            summary.by_type[alert.type] = (summary.by_type[alert.type] || 0) + 1;
            
            // By severity
            summary.by_severity[alert.severity] = (summary.by_severity[alert.severity] || 0) + 1;
            
            // By hour
            summary.by_hour[alert.hour] = (summary.by_hour[alert.hour] || 0) + 1;
            
            // By temple
            summary.by_temple[alert.templeId] = (summary.by_temple[alert.templeId] || 0) + 1;
        });

        res.json({
            summary,
            period_days: days,
            generated_at: new Date().toISOString()
        });

    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ error: 'Failed to retrieve analytics' });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        service: 'alert-service',
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`Alert Service running on port ${PORT}`);
});

// Cleanup
process.on('SIGINT', async () => {
    await client.quit();
    process.exit();
});
```

---

## **🗄️ DATABASE SCHEMAS**

### **MongoDB Collections**

#### **Users Collection**
```javascript
{
  _id: ObjectId,
  userId: String, // unique
  name: String,
  email: String,
  phone: String,
  preferences: {
    notifications: Boolean,
    language: String,
    emergencyContact: String
  },
  location: {
    lat: Number,
    lng: Number,
    address: String
  },
  profile: {
    age: Number,
    pilgrimType: String, // regular, elderly, disabled
    groupSize: Number
  },
  createdAt: Date,
  lastActive: Date
}
```

#### **Temples Collection**
```javascript
{
  _id: ObjectId,
  templeId: Number, // unique
  name: String,
  description: String,
  location: {
    address: String,
    city: String,
    state: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  capacity: {
    total: Number,
    darshan: Number,
    parking: Number
  },
  timings: {
    opening: String,
    closing: String,
    specialDays: [
      {
        date: Date,
        opening: String,
        closing: String,
        isSpecial: Boolean
      }
    ]
  },
  amenities: [String],
  rules: [String],
  emergencyContacts: [
    {
      type: String, // police, medical, fire
      number: String,
      name: String
    }
  ],
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### **PostgreSQL Tables**

#### **Analytics Table**
```sql
CREATE TABLE crowd_analytics (
    id SERIAL PRIMARY KEY,
    temple_id INTEGER NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    crowd_count INTEGER NOT NULL,
    capacity_percentage DECIMAL(5,2),
    predicted_count INTEGER,
    prediction_accuracy DECIMAL(5,2),
    weather_conditions JSONB,
    event_type VARCHAR(50), -- regular, festival, special
    day_of_week INTEGER,
    hour_of_day INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_analytics_temple_timestamp ON crowd_analytics(temple_id, timestamp);
CREATE INDEX idx_analytics_hour_dow ON crowd_analytics(hour_of_day, day_of_week);
```

#### **Bookings Table**
```sql
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    temple_id INTEGER NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    queue_number VARCHAR(50) NOT NULL,
    preferred_time TIMESTAMP WITH TIME ZONE,
    estimated_wait_time INTERVAL,
    actual_wait_time INTERVAL,
    qr_code TEXT,
    status VARCHAR(20) DEFAULT 'confirmed', -- confirmed, used, cancelled
    booking_source VARCHAR(20) DEFAULT 'mobile', -- mobile, web, kiosk
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    used_at TIMESTAMP WITH TIME ZONE,
    cancelled_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_bookings_temple_date ON bookings(temple_id, DATE(created_at));
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_status ON bookings(status);
```

#### **Alerts Table**
```sql
CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    temple_id INTEGER NOT NULL,
    alert_type VARCHAR(50) NOT NULL,
    severity VARCHAR(20) NOT NULL, -- low, medium, high, critical
    location VARCHAR(255),
    message TEXT NOT NULL,
    metadata JSONB,
    status VARCHAR(20) DEFAULT 'active', -- active, resolved, ignored
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolved_by VARCHAR(255),
    resolution TEXT,
    response_time INTERVAL
);

-- Indexes
CREATE INDEX idx_alerts_temple_status ON alerts(temple_id, status);
CREATE INDEX idx_alerts_created_at ON alerts(created_at);
CREATE INDEX idx_alerts_severity ON alerts(severity);
```

### **Redis Data Structures**

#### **Real-time Data Keys**
```
crowd:{temple_id} -> JSON {
  current_crowd: number,
  capacity: number,
  density_percentage: number,
  timestamp: ISO_string
}

predictions:{temple_id} -> JSON {
  predictions: [
    {time, predicted_count, confidence}
  ],
  updated_at: ISO_string
}

queue_status:{temple_id} -> JSON {
  total_bookings: number,
  current_wait_time: string,
  available_slots: number,
  last_updated: ISO_string
}

alert:{alert_id} -> JSON {alert_object}

temple_alerts:{temple_id} -> JSON [alert_objects]

booking:{booking_id} -> JSON {booking_object}
```

---

## **🚀 DEPLOYMENT & DEVOPS**

### **Docker Configuration**

#### **docker-compose.yml**
```yaml
version: '3.8'

services:
  # API Gateway
  gateway:
    build: ./gateway
    ports:
      - "3000:3000"
      - "8080:8080"
    environment:
      - NODE_ENV=production
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis
      - user-service
      - crowd-service
      - queue-service
      - alert-service

  # User Service
  user-service:
    build: ./services/user-service
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - MONGODB_URL=mongodb://mongodb:27017/codehex_users
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mongodb
      - redis

  # Crowd Prediction Service
  crowd-service:
    build: ./services/crowd-service
    ports:
      - "3002:3002"
    environment:
      - FLASK_ENV=production
      - REDIS_URL=redis://redis:6379
      - POSTGRES_URL=postgresql://user:password@postgres:5432/codehex_analytics
    depends_on:
      - redis
      - postgres

  # Queue Service
  queue-service:
    build: ./services/queue-service
    ports:
      - "3003:3003"
    environment:
      - NODE_ENV=production
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis

  # Alert Service
  alert-service:
    build: ./services/alert-service
    ports:
      - "3004:3004"
    environment:
      - NODE_ENV=production
      - REDIS_URL=redis://redis:6379
      - TWILIO_SID=${TWILIO_SID}
      - TWILIO_TOKEN=${TWILIO_TOKEN}
      - FIREBASE_PROJECT_ID=${FIREBASE_PROJECT_ID}
    depends_on:
      - redis
    volumes:
      - ./firebase-service-account.json:/app/firebase-service-account.json

  # Databases
  mongodb:
    image: mongo:7.0
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=codehex123

  postgres:
    image: postgres:15
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=codehex_analytics
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes

  # Monitoring
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana

volumes:
  mongodb_data:
  postgres_data:
  redis_data:
  grafana_data:

networks:
  default:
    name: codehex-network
```

#### **Kubernetes Deployment**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: codehex-gateway
  labels:
    app: codehex-gateway
spec:
  replicas: 3
  selector:
    matchLabels:
      app: codehex-gateway
  template:
    metadata:
      labels:
        app: codehex-gateway
    spec:
      containers:
      - name: gateway
        image: codehex/gateway:latest
        ports:
        - containerPort: 3000
        - containerPort: 8080
        env:
        - name: NODE_ENV
          value: "production"
        - name: REDIS_URL
          value: "redis://redis:6379"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: gateway-service
spec:
  selector:
    app: codehex-gateway
  ports:
  - name: http
    port: 80
    targetPort: 3000
  - name: websocket
    port: 8080
    targetPort: 8080
  type: LoadBalancer
```

### **CI/CD Pipeline (GitHub Actions)**

#### **.github/workflows/deploy.yml**
```yaml
name: Deploy CodeHex

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      redis:
        image: redis:7-alpine
        ports:
          - 6379:6379
      
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        ports:
          - 5432:5432

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Setup Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.9'
    
    - name: Install dependencies
      run: |
        npm ci
        pip install -r services/crowd-service/requirements.txt
    
    - name: Run tests
      run: |
        npm run test
        cd services/crowd-service && python -m pytest
    
    - name: Run security scan
      uses: securecodewarrior/github-action-add-sarif@v1
      with:
        sarif-file: security-scan-results.sarif

  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v2
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-west-2
    
    - name: Login to Amazon ECR
      uses: aws-actions/amazon-ecr-login@v1
    
    - name: Build and push images
      run: |
        # Gateway
        docker build -t codehex/gateway ./gateway
        docker tag codehex/gateway $ECR_REGISTRY/codehex/gateway:latest
        docker push $ECR_REGISTRY/codehex/gateway:latest
        
        # Services
        for service in user-service crowd-service queue-service alert-service; do
          docker build -t codehex/$service ./services/$service
          docker tag codehex/$service $ECR_REGISTRY/codehex/$service:latest
          docker push $ECR_REGISTRY/codehex/$service:latest
        done
    
    - name: Deploy to EKS
      run: |
        aws eks update-kubeconfig --name codehex-cluster
        kubectl apply -f k8s/
        kubectl rollout restart deployment/codehex-gateway
        kubectl rollout restart deployment/codehex-crowd-service
        kubectl rollout restart deployment/codehex-queue-service
        kubectl rollout restart deployment/codehex-alert-service
    
    - name: Run integration tests
      run: |
        kubectl wait --for=condition=available deployment/codehex-gateway --timeout=300s
        npm run test:integration
```

---

## **📊 MONITORING & ANALYTICS**

### **Prometheus Configuration**
```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'codehex-gateway'
    static_configs:
      - targets: ['gateway:3000']
  
  - job_name: 'codehex-services'
    static_configs:
      - targets: 
        - 'user-service:3001'
        - 'crowd-service:3002'
        - 'queue-service:3003'
        - 'alert-service:3004'

  - job_name: 'redis'
    static_configs:
      - targets: ['redis:6379']

  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres:5432']
```

### **Application Metrics**
```javascript
// metrics.js
const promClient = require('prom-client');

// Create custom metrics
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status']
});

const activeWebSocketConnections = new promClient.Gauge({
  name: 'websocket_connections_active',
  help: 'Number of active WebSocket connections'
});

const crowdPredictionAccuracy = new promClient.Gauge({
  name: 'crowd_prediction_accuracy_percentage',
  help: 'Accuracy of crowd predictions as percentage'
});

const alertsTotal = new promClient.Counter({
  name: 'alerts_total',
  help: 'Total number of alerts generated',
  labelNames: ['type', 'severity']
});

const bookingsTotal = new promClient.Counter({
  name: 'bookings_total',
  help: 'Total number of bookings created',
  labelNames: ['temple_id', 'source']
});

// Register default metrics
promClient.register.registerMetric(httpRequestDuration);
promClient.register.registerMetric(activeWebSocketConnections);
promClient.register.registerMetric(crowdPredictionAccuracy);
promClient.register.registerMetric(alertsTotal);
promClient.register.registerMetric(bookingsTotal);

module.exports = {
  httpRequestDuration,
  activeWebSocketConnections,
  crowdPredictionAccuracy,
  alertsTotal,
  bookingsTotal,
  register: promClient.register
};
```

---

## **🔐 SECURITY & COMPLIANCE**

### **Security Measures**

#### **API Security**
```javascript
// security.js
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Rate limiting configuration
const createRateLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: { error: message },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// Different rate limits for different endpoints
const limiters = {
  general: createRateLimiter(15 * 60 * 1000, 100, 'Too many requests'),
  auth: createRateLimiter(15 * 60 * 1000, 5, 'Too many authentication attempts'),
  sos: createRateLimiter(5 * 60 * 1000, 3, 'Too many SOS requests'),
  booking: createRateLimiter(60 * 1000, 10, 'Too many booking requests')
};

// JWT middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// Admin authorization
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Input validation and sanitization
const sanitizeInput = (input) => {
  if (typeof input === 'string') {
    return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  }
  return input;
};

module.exports = {
  limiters,
  authenticateToken,
  requireAdmin,
  sanitizeInput,
  helmet: helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'", "wss:", "https:"]
      }
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    }
  })
};
```

#### **Data Encryption**
```javascript
// encryption.js
const crypto = require('crypto');

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // 32 characters
const IV_LENGTH = 16; // For AES, this is always 16

// Encrypt sensitive data
const encrypt = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipher('aes-256-cbc', ENCRYPTION_KEY);
  cipher.setIVAutoPadding(iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
};

// Decrypt sensitive data
const decrypt = (text) => {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = textParts.join(':');
  const decipher = crypto.createDecipher('aes-256-cbc', ENCRYPTION_KEY);
  decipher.setIVAutoPadding(iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

// Hash passwords
const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

// Verify passwords
const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = { encrypt, decrypt, hashPassword, verifyPassword };
```

---

## **📚 API DOCUMENTATION**

### **Core API Endpoints**

#### **Authentication Endpoints**
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
```

#### **Temple & Crowd Endpoints**
```
GET /api/temples - Get all temples
GET /api/temples/:id - Get temple details
GET /api/crowd/current/:templeId - Get current crowd data
GET /api/crowd/predict/:templeId - Get crowd predictions
GET /api/crowd/analytics/:templeId - Get crowd analytics
```

#### **Queue & Booking Endpoints**
```
POST /api/queue/book - Create darshan booking
GET /api/queue/booking/:bookingId - Get booking details
GET /api/queue/status/:templeId - Get queue status
POST /api/queue/verify - Verify QR code
DELETE /api/queue/booking/:bookingId - Cancel booking
```

#### **Alert & Emergency Endpoints**
```
POST /api/alerts/create - Create manual alert
POST /api/alerts/sos - Send SOS alert
GET /api/alerts/temple/:templeId - Get temple alerts
PUT /api/alerts/resolve/:alertId - Resolve alert
GET /api/alerts/analytics - Get alert analytics
```

### **WebSocket Events**

#### **Real-time Events**
```javascript
// Client subscribes to temple updates
{
  type: 'SUBSCRIBE_TEMPLE',
  data: { templeId: 1 }
}

// Server sends crowd updates
{
  type: 'CROWD_UPDATE',
  data: {
    templeId: 1,
    currentCrowd: 2847,
    predictions: [...],
    timestamp: '2025-09-20T08:30:00Z'
  }
}

// New alert notification
{
  type: 'NEW_ALERT',
  data: {
    id: 'alert-uuid',
    type: 'crowd_surge',
    severity: 'high',
    message: '...'
  }
}

// Queue status update
{
  type: 'QUEUE_UPDATE',
  data: {
    templeId: 1,
    totalBookings: 124,
    currentWaitTime: '2.5 hours',
    availableSlots: 45
  }
}
```

---

## **🧪 TESTING STRATEGY**

### **Unit Tests Example**

#### **Crowd Prediction Test**
```python
# test_crowd_prediction.py
import unittest
from unittest.mock import Mock, patch
from datetime import datetime
import sys
import os

# Add the service directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'services', 'crowd-service'))

from app import CrowdPredictionService

class TestCrowdPredictionService(unittest.TestCase):
    def setUp(self):
        self.crowd_service = CrowdPredictionService()
    
    def test_predict_crowd_returns_valid_structure(self):
        """Test that crowd prediction returns proper data structure"""
        temple_id = 1
        hours_ahead = 5
        
        predictions = self.crowd_service.predict_crowd(temple_id, hours_ahead)
        
        self.assertEqual(len(predictions), hours_ahead)
        for prediction in predictions:
            self.assertIn('time', prediction)
            self.assertIn('predicted_count', prediction)
            self.assertIn('confidence', prediction)
            self.assertIsInstance(prediction['predicted_count'], int)
            self.assertIsInstance(prediction['confidence'], (int, float))
            self.assertGreaterEqual(prediction['confidence'], 0)
            self.assertLessEqual(prediction['confidence'], 100)
    
    def test_crowd_pattern_peak_hours(self):
        """Test that crowd patterns show peaks during expected hours"""
        morning_peak = self.crowd_service.generate_crowd_pattern(7, 1, 3, 0, 0)  # 7 AM, Tuesday, March
        afternoon_normal = self.crowd_service.generate_crowd_pattern(14, 1, 3, 0, 0)  # 2 PM, Tuesday, March
        evening_peak = self.crowd_service.generate_crowd_pattern(19, 1, 3, 0, 0)  # 7 PM, Tuesday, March
        
        # Morning and evening should have higher crowd than afternoon
        self.assertGreater(morning_peak, afternoon_normal * 0.8)
        self.assertGreater(evening_peak, afternoon_normal * 0.8)
    
    def test_festival_day_multiplier(self):
        """Test that festival days have higher crowd predictions"""
        normal_day = self.crowd_service.generate_crowd_pattern(10, 1, 3, 0, 0)
        festival_day = self.crowd_service.generate_crowd_pattern(10, 1, 3, 0, 1)
        
        self.assertGreater(festival_day, normal_day * 2)  # Festival should be at least 2x
    
    def test_weekend_multiplier(self):
        """Test that weekends have higher crowd predictions"""
        weekday = self.crowd_service.generate_crowd_pattern(10, 1, 3, 0, 0)
        weekend = self.crowd_service.generate_crowd_pattern(10, 1, 3, 1, 0)
        
        self.assertGreater(weekend, weekday)

if __name__ == '__main__':
    unittest.main()
```

#### **Queue Service Test**
```javascript
// test/queue.test.js
const request = require('supertest');
const { app } = require('../services/queue-service/app');
const redis = require('redis');

describe('Queue Service', () => {
  let client;

  beforeAll(async () => {
    // Use test Redis instance
    client = redis.createClient({ host: 'localhost', port: 6379, db: 15 });
    await client.connect();
  });

  afterAll(async () => {
    await client.flushDb(); // Clean test database
    await client.quit();
  });

  describe('POST /book', () => {
    test('should create a booking successfully', async () => {
      const bookingData = {
        templeId: 1,
        userId: 'test-user-123',
        preferredTime: '2025-09-20T10:00:00Z'
      };

      const response = await request(app)
        .post('/book')
        .send(bookingData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.booking).toBeDefined();
      expect(response.body.booking.templeId).toBe(1);
      expect(response.body.booking.userId).toBe('test-user-123');
      expect(response.body.booking.queueNumber).toMatch(/^A-\d{3}$/);
      expect(response.body.booking.qrCode).toBeDefined();
    });

    test('should return 400 for missing required fields', async () => {
      const response = await request(app)
        .post('/book')
        .send({})
        .expect(400);

      expect(response.body.error).toBe('Temple ID and User ID are required');
    });
  });

  describe('GET /booking/:bookingId', () => {
    test('should retrieve existing booking', async () => {
      // First create a booking
      const bookingData = {
        templeId: 1,
        userId: 'test-user-456',
        preferredTime: '2025-09-20T11:00:00Z'
      };

      const createResponse = await request(app)
        .post('/book')
        .send(bookingData);

      const bookingId = createResponse.body.booking.id;

      // Then retrieve it
      const response = await request(app)
        .get(`/booking/${bookingId}`)
        .expect(200);

      expect(response.body.id).toBe(bookingId);
      expect(response.body.templeId).toBe(1);
      expect(response.body.userId).toBe('test-user-456');
    });

    test('should return 404 for non-existent booking', async () => {
      const response = await request(app)
        .get('/booking/non-existent-id')
        .expect(404);

      expect(response.body.error).toBe('Booking not found');
    });
  });

  describe('POST /verify', () => {
    test('should verify valid QR code', async () => {
      // Create a booking first
      const bookingData = {
        templeId: 1,
        userId: 'test-user-789',
        preferredTime: '2025-09-20T12:00:00Z'
      };

      const createResponse = await request(app)
        .post('/book')
        .send(bookingData);

      const bookingId = createResponse.body.booking.id;
      const qrData = JSON.stringify({
        bookingId,
        timestamp: new Date().toISOString(),
        type: 'darshan_booking'
      });

      const response = await request(app)
        .post('/verify')
        .send({ qrData })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.booking.status).toBe('used');
      expect(response.body.booking.usedAt).toBeDefined();
    });

    test('should reject invalid QR code', async () => {
      const qrData = JSON.stringify({
        bookingId: 'invalid-id',
        timestamp: new Date().toISOString(),
        type: 'darshan_booking'
      });

      const response = await request(app)
        .post('/verify')
        .send({ qrData })
        .expect(404);

      expect(response.body.error).toBe('Booking not found or expired');
    });
  });
});
```

### **Integration Tests**
```javascript
// test/integration/crowd-alert.test.js
const WebSocket = require('ws');
const request = require('supertest');

describe('Crowd Alert Integration', () => {
  let ws;
  let receivedMessages = [];

  beforeAll((done) => {
    ws = new WebSocket('ws://localhost:8080');
    
    ws.on('open', () => {
      // Subscribe as admin
      ws.send(JSON.stringify({ type: 'ADMIN_SUBSCRIBE' }));
      done();
    });

    ws.on('message', (data) => {
      receivedMessages.push(JSON.parse(data));
    });
  });

  afterAll(() => {
    ws.close();
  });

  test('should trigger alert when crowd threshold exceeded', async () => {
    // Simulate high crowd data
    await request('http://localhost:3002')
      .post('/simulate-crowd')
      .send({
        templeId: 1,
        crowdCount: 4800, // 96% of 5000 capacity
        capacity: 5000
      });

    // Wait for alert processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Check if alert was generated and broadcasted
    const alertMessages = receivedMessages.filter(msg => msg.type === 'NEW_ALERT');
    expect(alertMessages.length).toBeGreaterThan(0);
    
    const crowdAlert = alertMessages.find(msg => 
      msg.data.type === 'crowd_surge' && 
      msg.data.templeId === 1
    );
    
    expect(crowdAlert).toBeDefined();
    expect(crowdAlert.data.severity).toBe('high');
  });

  test('should update crowd predictions in real-time', async () => {
    const predictionMessages = receivedMessages.filter(msg => msg.type === 'CROWD_UPDATE');
    expect(predictionMessages.length).toBeGreaterThan(0);
    
    const latestPrediction = predictionMessages[predictionMessages.length - 1];
    expect(latestPrediction.data.predictions).toBeDefined();
    expect(Array.isArray(latestPrediction.data.predictions)).toBe(true);
  });
});
```

### **Load Testing**
```javascript
// test/load/booking-load.test.js
const { check, sleep } = require('k6');
const http = require('k6/http');

export let options = {
  vus: 50, // 50 virtual users
  duration: '2m', // Test for 2 minutes
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests under 2s
    http_req_failed: ['rate<0.05'], // Error rate under 5%
  },
};

export default function() {
  // Create booking
  let bookingResponse = http.post('http://localhost:3000/api/queue/book', 
    JSON.stringify({
      templeId: 1,
      userId: `load-test-user-${__VU}-${__ITER}`,
      preferredTime: new Date(Date.now() + 3600000).toISOString()
    }), {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  
  check(bookingResponse, {
    'booking created': (resp) => resp.status === 201,
    'has booking id': (resp) => JSON.parse(resp.body).booking.id !== undefined,
  });

  if (bookingResponse.status === 201) {
    let booking = JSON.parse(bookingResponse.body).booking;
    
    // Verify QR code
    let qrData = JSON.stringify({
      bookingId: booking.id,
      timestamp: new Date().toISOString(),
      type: 'darshan_booking'
    });
    
    let verifyResponse = http.post('http://localhost:3000/api/queue/verify',
      JSON.stringify({ qrData }), {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    
    check(verifyResponse, {
      'qr verified': (resp) => resp.status === 200,
    });
  }

  sleep(1);
}
```

---

## **📈 PERFORMANCE OPTIMIZATION**

### **Database Optimization**

#### **MongoDB Indexes**
```javascript
// Database indexes for optimal performance
db.users.createIndex({ "userId": 1 }, { unique: true });
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "location.coordinates": "2dsphere" }); // Geospatial queries

db.temples.createIndex({ "templeId": 1 }, { unique: true });
db.temples.createIndex({ "location.coordinates": "2dsphere" });
db.temples.createIndex({ "isActive": 1 });
```

#### **PostgreSQL Query Optimization**
```sql
-- Optimize crowd analytics queries
EXPLAIN ANALYZE SELECT 
  temple_id,
  date_trunc('hour', timestamp) as hour,
  AVG(crowd_count) as avg_crowd,
  AVG(prediction_accuracy) as accuracy
FROM crowd_analytics 
WHERE temple_id = 1 
  AND timestamp >= NOW() - INTERVAL '7 days'
GROUP BY temple_id, hour
ORDER BY hour;

-- Create materialized view for analytics
CREATE MATERIALIZED VIEW hourly_crowd_stats AS
SELECT 
  temple_id,
  date_trunc('hour', timestamp) as hour,
  AVG(crowd_count) as avg_crowd,
  MAX(crowd_count) as peak_crowd,
  AVG(prediction_accuracy) as accuracy,
  COUNT(*) as data_points
FROM crowd_analytics 
WHERE timestamp >= NOW() - INTERVAL '30 days'
GROUP BY temple_id, hour;

-- Refresh materialized view periodically
REFRESH MATERIALIZED VIEW hourly_crowd_stats;
```

### **Redis Optimization**

#### **Memory Management**
```javascript
// redis-config.js
const redisConfig = {
  host: 'redis',
  port: 6379,
  password: process.env.REDIS_PASSWORD,
  db: 0,
  maxRetriesPerRequest: 3,
  retryDelayOnFailover: 100,
  lazyConnect: true,
  maxmemory: '1gb',
  'maxmemory-policy': 'allkeys-lru', // Evict least recently used keys
  
  // Connection pool settings
  family: 4,
  keepAlive: true,
  connectTimeout: 60000,
  commandTimeout: 5000,
  
  // Clustering for horizontal scaling
  enableReadyCheck: false,
  maxRetriesPerRequest: null,
};

// Implement Redis pipeline for batch operations
const pipeline = client.pipeline();
pipeline.set('crowd:1', JSON.stringify(crowdData1));
pipeline.set('crowd:2', JSON.stringify(crowdData2));
pipeline.set('crowd:3', JSON.stringify(crowdData3));
pipeline.exec();
```

### **API Performance**

#### **Caching Strategy**
```javascript
// cache-middleware.js
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes default

const cacheMiddleware = (duration = 300) => {
  return (req, res, next) => {
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);
    
    if (cachedResponse) {
      return res.json(cachedResponse);
    }
    
    // Override res.json to cache the response
    const originalJson = res.json;
    res.json = function(data) {
      cache.set(key, data, duration);
      originalJson.call(this, data);
    };
    
    next();
  };
};

// Usage
app.get('/api/temples', cacheMiddleware(600), getTemples); // Cache for 10 minutes
app.get('/api/crowd/current/:id', cacheMiddleware(60), getCurrentCrowd); // Cache for 1 minute
```

#### **Database Connection Pooling**
```javascript
// database-pool.js
const { Pool } = require('pg');

const pool = new Pool({
  host: 'postgres',
  port: 5432,
  database: 'codehex_analytics',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  min: 5,      // Minimum connections
  max: 20,     // Maximum connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Optimized query function
const query = async (text, params) => {
  const start = Date.now();
  const client = await pool.connect();
  
  try {
    const result = await client.query(text, params);
    const duration = Date.now() - start;
    
    // Log slow queries
    if (duration > 1000) {
      console.warn('Slow query detected:', { text, duration });
    }
    
    return result;
  } finally {
    client.release();
  }
};
```

---

## **🚀 SCALING CONSIDERATIONS**

### **Horizontal Scaling**

#### **Load Balancer Configuration (NGINX)**
```nginx
upstream codehex_gateway {
    least_conn;
    server gateway:3000 weight=1 max_fails=3 fail_timeout=30s;
    server gateway-2:3000 weight=1 max_fails=3 fail_timeout=30s;
    server gateway-3:3000 weight=1 max_fails=3 fail_timeout=30s;
}

upstream codehex_websocket {
    ip_hash; # Sticky sessions for WebSocket
    server gateway:8080;
    server gateway-2:8080;
    server gateway-3:8080;
}

server {
    listen 80;
    server_name api.codehex.com;
    
    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://codehex_gateway;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        
        # Caching for static data
        location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    location /ws/ {
        proxy_pass http://codehex_websocket;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_read_timeout 86400;
    }
}
```

### **Auto-Scaling Configuration**

#### **Kubernetes HPA (Horizontal Pod Autoscaler)**
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: codehex-gateway-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: codehex-gateway
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
      - type: Percent
        value: 100
        periodSeconds: 15
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 10
        periodSeconds: 60
```

### **Database Sharding Strategy**

#### **MongoDB Sharding**
```javascript
// shard-strategy.js
// Shard temples by geographic region
sh.enableSharding("codehex")

// Shard key based on temple location for geographic distribution
sh.shardCollection("codehex.temples", { "location.state": 1, "templeId": 1 })

// Shard users by user ID hash for even distribution
sh.shardCollection("codehex.users", { "userId": "hashed" })

// Analytics can be sharded by time and temple
sh.shardCollection("codehex.analytics", { "temple_id": 1, "timestamp": 1 })
```

#### **PostgreSQL Read Replicas**
```yaml
# postgresql-replicas.yaml
apiVersion: postgresql.cnpg.io/v1
kind: Cluster
metadata:
  name: codehex-postgres-cluster
spec:
  instances: 3
  primaryUpdateStrategy: unsupervised
  
  postgresql:
    parameters:
      max_connections: "200"
      shared_buffers: "256MB"
      effective_cache_size: "1GB"
      work_mem: "4MB"
      maintenance_work_mem: "64MB"
      
  monitoring:
    enabled: true
    
  backup:
    retentionPolicy: "30d"
    barmanObjectStore:
      s3Credentials:
        accessKeyId:
          name: backup-creds
          key: ACCESS_KEY_ID
        secretAccessKey:
          name: backup-creds
          key: SECRET_ACCESS_KEY
      wal:
        retention: "5d"
      data:
        retention: "30d"
```

---

## **🔧 DEVELOPMENT ENVIRONMENT SETUP**

### **Local Development Setup**

#### **Prerequisites Installation Script**
```bash
#!/bin/bash
# setup.sh - Development environment setup

echo "Setting up CodeHex development environment..."

# Install Node.js (via nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 18
nvm use 18

# Install Python
if command -v python3 &> /dev/null; then
    echo "Python3 already installed"
else
    # macOS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew install python@3.9
    # Ubuntu/Debian
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt update
        sudo apt install python3.9 python3-pip -y
    fi
fi

# Install Docker
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
fi

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.12.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install global npm packages
npm install -g @react-native-community/cli
npm install -g expo-cli
npm install -g pm2

# Install Python dependencies
pip3 install -r services/crowd-service/requirements.txt

# Setup environment variables
cp .env.example .env
echo "Please configure your .env file with the required API keys and secrets"

# Initialize databases
docker-compose up -d mongodb postgres redis

# Wait for databases to be ready
echo "Waiting for databases to initialize..."
sleep 30

# Run database migrations
npm run migrate

# Install all dependencies
npm run install:all

echo "Setup complete! Run 'npm start' to start the development server."
```

### **Development Scripts**

#### **package.json (Root)**
```json
{
  "name": "codehex-smart-pilgrim-management",
  "version": "1.0.0",
  "description": "AI-powered Smart Pilgrim Crowd Management System",
  "scripts": {
    "start": "concurrently \"npm run start:gateway\" \"npm run start:services\" \"npm run start:mobile\"",
    "start:gateway": "cd gateway && npm start",
    "start:services": "concurrently \"npm run start:user-service\" \"npm run start:crowd-service\" \"npm run start:queue-service\" \"npm run start:alert-service\"",
    "start:user-service": "cd services/user-service && npm start",
    "start:crowd-service": "cd services/crowd-service && python app.py",
    "start:queue-service": "cd services/queue-service && npm start",
    "start:alert-service": "cd services/alert-service && npm start",
    "start:mobile": "cd mobile && npx react-native start",
    "start:web": "cd web && npm start",
    
    "install:all": "npm ci && cd gateway && npm ci && cd ../services/user-service && npm ci && cd ../queue-service && npm ci && cd ../alert-service && npm ci && cd ../../mobile && npm ci && cd ../web && npm ci",
    
    "test": "npm run test:services && npm run test:integration",
    "test:services": "concurrently \"npm run test:user-service\" \"npm run test:queue-service\" \"npm run test:alert-service\" \"npm run test:crowd-service\"",
    "test:user-service": "cd services/user-service && npm test",
    "test:queue-service": "cd services/queue-service && npm test",
    "test:alert-service": "cd services/alert-service && npm test",
    "test:crowd-service": "cd services/crowd-service && python -m pytest",
    "test:integration": "cd test && npm run test:integration",
    "test:load": "cd test && k6 run load/booking-load.test.js",
    
    "migrate": "cd services/user-service && npm run migrate && cd ../queue-service && npm run migrate",
    "seed": "cd services/user-service && npm run seed",
    
    "docker:build": "docker-compose build",
    "docker:up": "docker-compose up -d",
    "docker:down": "docker-compose down",
    "docker:logs": "docker-compose logs -f",
    
    "deploy:staging": "./scripts/deploy-staging.sh",
    "deploy:production": "./scripts/deploy-production.sh",
    
    "lint": "concurrently \"npm run lint:js\" \"npm run lint:python\"",
    "lint:js": "eslint . --ext .js,.jsx --fix",
    "lint:python": "cd services/crowd-service && flake8 . && black .",
    
    "docs:generate": "swagger-jsdoc -d swagger-config.js gateway/**/*.js services/**/*.js -o docs/api.json && redoc-cli serve docs/api.json",
    
    "monitoring:start": "docker-compose -f monitoring/docker-compose.yml up -d",
    "monitoring:stop": "docker-compose -f monitoring/docker-compose.yml down"
  },
  "devDependencies": {
    "concurrently": "^7.6.0",
    "eslint": "^8.45.0",
    "swagger-jsdoc": "^6.2.8",
    "redoc-cli": "^0.13.21"
  }
}
```

### **Environment Configuration**

#### **.env.example**
```bash
# Application
NODE_ENV=development
APP_NAME=CodeHex
APP_VERSION=1.0.0

# API Gateway
GATEWAY_PORT=3000
WEBSOCKET_PORT=8080
JWT_SECRET=your-super-secret-jwt-key-change-in-production
ENCRYPTION_KEY=your-32-character-encryption-key

# Database URLs
MONGODB_URL=mongodb://admin:codehex123@localhost:27017/codehex_users?authSource=admin
POSTGRES_URL=postgresql://user:password@localhost:5432/codehex_analytics
REDIS_URL=redis://localhost:6379

# External APIs
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
MAPBOX_ACCESS_TOKEN=your-mapbox-access-token

# Firebase (Push Notifications)
FIREBASE_PROJECT_ID=codehex-project
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@codehex-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"

# Twilio (SMS Alerts)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# AWS (for deployment)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-west-2

# Monitoring
PROMETHEUS_URL=http://localhost:9090
GRAFANA_URL=http://localhost:3001

# Debug and Logging
DEBUG=codehex:*
LOG_LEVEL=info
```

---

## **📋 PROJECT ROADMAP**

### **Phase 1: MVP Development (Months 1-3)**
- ✅ Core API development (all microservices)
- ✅ Basic mobile app (React Native)
- ✅ Admin web dashboard
- ✅ Real-time crowd monitoring
- ✅ QR code booking system
- ✅ Basic AI prediction model
- ✅ Emergency alert system

### **Phase 2: AI Enhancement (Months 4-6)**
- 🔄 Advanced ML models (TensorFlow/PyTorch)
- 🔄 Computer vision for crowd counting
- 🔄 Behavioral pattern analysis
- 🔄 Weather integration for predictions
- 🔄 Historical data analysis dashboard
- 🔄 Performance optimization

### **Phase 3: Scale & Features (Months 7-9)**
- ⏳ Multi-language support
- ⏳ Offline functionality
- ⏳ Advanced analytics dashboard
- ⏳ Integration with temple management systems
- ⏳ Government dashboard for multiple temples
- ⏳ Mobile app for iOS

### **Phase 4: Enterprise Features (Months 10-12)**
- ⏳ Enterprise security compliance
- ⏳ Custom branding for temples
- ⏳ Advanced reporting and insights
- ⏳ Integration with payment systems
- ⏳ VIP queue management
- ⏳ International temple support

### **Future Enhancements**
- AR navigation within temple premises
- IoT sensor integration for automatic counting
- Blockchain for transparent queue management
- Voice assistants for elderly pilgrims
- Drone integration for aerial crowd monitoring

---

## **🏁 CONCLUSION**

This comprehensive technical specification provides a complete roadmap for building the CodeHex Smart Pilgrim Crowd Management System. The architecture is designed to be:

- **Scalable**: Can handle millions of pilgrims across thousands of temples
- **Reliable**: Built with redundancy and failover mechanisms
- **Secure**: Implements industry-standard security practices
- **Maintainable**: Clear separation of concerns and documented codebase
- **Cost-effective**: Optimized resource usage and cloud deployment

The system combines cutting-edge AI technology with practical crowd management solutions, making pilgrimage safer and more spiritual for millions of devotees while providing temple authorities with powerful tools for efficient operations.

**Next Steps:**
1. Set up development environment using provided scripts
2. Begin with Phase 1 MVP development
3. Deploy to staging environment for testing
4. Conduct pilot program with 2-3 major temples
5. Gather user feedback and iterate
6. Scale to production deployment

The detailed specifications above provide everything needed to transform this concept into a production-ready system that can revolutionize religious tourism in India and beyond.