# Name-Age App

## 📖 Overview

Simple web application for collecting user name and age data. Features a light blue theme and API connection testing.

## 🎯 Purpose

- Collects user's name and age through a web form
- Tests API connection before submitting data
- Sends data to API Service App
- Provides visual feedback for all operations

## 🔗 Connections

- **Sends to**: API Service App (`POST /api/userdata`)
- **Azure Services**: Azure Static Web Apps

## 🏗️ Technology Stack

- HTML5
- CSS3 (Light Blue Theme)
- Vanilla JavaScript
- Azure Static Web Apps

## 🎨 Features

- ✅ Light blue gradient theme
- ✅ API endpoint configuration with localStorage
- ✅ Test API connection button (green on success)
- ✅ Form validation
- ✅ Real-time feedback messages
- ✅ Responsive design
- ✅ Loading states for async operations

## 📚 Complete System Documentation

See `SYSTEM_ARCHITECTURE.md` for complete system overview and how this app fits into the bigger picture.

## 🚀 Deployment

See `DEPLOYMENT.md` for step-by-step deployment instructions using Azure Portal UI.

## 🔧 How It Works

1. User enters API Service URL in configuration section
2. User clicks "Test API Connection"
   - Calls `GET /api/health` on API Service
   - Shows green message if successful
   - Shows red message if failed
3. User fills in name and age
4. User clicks "Submit Data"
   - Sends POST request to `/api/userdata`
   - API Service validates and sends to Service Bus
   - Shows success/error message

## 🛠️ Local Development

1. Simply open `index.html` in a web browser
2. No build process needed
3. Enter your API Service URL
4. Test and use!

**For local testing with local API:**

```
API Endpoint: http://localhost:5000
or
API Endpoint: https://localhost:5001
```

## 📝 Files Structure

```
name-age-app/
├── index.html           # Main HTML file with form
├── styles.css           # Light blue theme CSS
├── app.js              # JavaScript logic
├── .github/workflows/  # GitHub Actions workflow
├── DEPLOYMENT.md       # Deployment guide
├── SYSTEM_ARCHITECTURE.md  # Complete system docs
└── README.md           # This file
```

## 🎨 Color Theme

- Primary: Light Blue (`#4A90E2`)
- Background: Light Blue Gradient
- Success: Green
- Error: Red
- All colors are defined in CSS variables for easy customization

## 💡 User Guide

### First Time Setup:

1. Enter your API Service URL
2. Click "Test API Connection"
3. Wait for green success message

### Submitting Data:

1. Fill in your name (2-100 characters)
2. Fill in your age (1-150)
3. Click "Submit Data"
4. Wait for success message

### Troubleshooting:

- If test shows red: Check API URL and API Service status
- If submit fails: Test connection first
- API URL is saved automatically in browser

## 📄 License

Internal use only
