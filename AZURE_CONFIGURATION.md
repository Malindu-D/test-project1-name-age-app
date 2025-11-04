# ⚙️ Azure Static Web App Configuration Guide

## 🎯 Configuration Needed After Deployment

After deploying the name-age app to Azure Static Web Apps, you **MUST** configure the API endpoint environment variable.

---

## 📋 Step-by-Step Configuration

### **1. Get Your API Service URL**

First, get the URL of your deployed API Service App:

1. Go to [Azure Portal](https://portal.azure.com)
2. Search for **"App Services"**
3. Click on your API Service (e.g., `test-project-api-service`)
4. On the **Overview** page, copy the **"Default domain"**
5. Should look like: `https://test-project-api-service.azurewebsites.net`

**Important:** Copy just the base URL (no `/api/userdata` or trailing slash)

---

### **2. Configure Environment Variable in Static Web App**

1. Go to [Azure Portal](https://portal.azure.com)
2. Search for **"Static Web Apps"**
3. Click on your Static Web App (e.g., `name-age-app` or starts with `brave-bush-`)
4. In the left menu, click **"Configuration"** or **"Environment variables"**
5. Click **"+ Add"** button under **Application settings**
6. Enter the following:

   ```
   Name:  API_ENDPOINT
   Value: https://test-project-api-service.azurewebsites.net
   ```

   **⚠️ Replace with YOUR actual API Service URL!**
   - NO trailing slash (/)
   - NO `/api/userdata` at the end
   - Just the base URL

7. Click **"OK"** or **"Add"**
8. Click **"Save"** at the top
9. Wait 1-2 minutes for the app to restart

---

## ✅ Verify Configuration

### **After Configuration:**

1. Open your Static Web App URL (e.g., `https://brave-bush-05db6a300.azurestaticapps.net`)
2. **Hard refresh** the page: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
3. You should see: **"✅ API endpoint loaded from Azure configuration"**
4. Click **"🔌 Test API Connection"** button
5. Should see: **"✅ API connection successful! You can now submit data."**

### **If Still Shows Manual Input:**

This means the `API_ENDPOINT` environment variable is not configured or hasn't taken effect yet:

1. Double-check the environment variable in Azure Portal
2. Make sure the name is exactly: `API_ENDPOINT` (all caps, with underscore)
3. Make sure the value has no trailing slash
4. Wait 2-3 minutes and hard refresh the browser
5. Check browser console (F12) for any errors

---

## 🔧 How It Works

### **Application Flow:**

1. **Page loads** → `app.js` runs `loadConfig()`
2. **Fetches** `/api/config` endpoint (Azure Function in the `api` folder)
3. **Azure Function** reads `process.env.API_ENDPOINT` and returns it
4. **Frontend** receives the API endpoint URL and stores it
5. **User clicks** "Test Connection" → calls `${API_ENDPOINT}/api/health`
6. **User submits** data → calls `${API_ENDPOINT}/api/userdata`

### **File Structure:**

```
name-age-app/
├── index.html              # Main UI
├── app.js                  # Frontend logic (loads config, tests connection, submits data)
├── styles.css              # Styling
├── staticwebapp.config.json # Azure Static Web App configuration
└── api/                    # Azure Functions (Managed API)
    ├── config/             # Config endpoint function
    │   ├── function.json   # Function binding configuration
    │   └── index.js        # Returns API_ENDPOINT from environment variable
    ├── host.json           # Azure Functions host configuration
    └── package.json        # Node.js dependencies
```

### **Key Files:**

**`api/config/index.js`:**
```javascript
module.exports = async function (context, req) {
  context.res = {
    status: 200,
    headers: { "Content-Type": "application/json" },
    body: { apiEndpoint: process.env.API_ENDPOINT || "" }
  };
};
```

**`staticwebapp.config.json`:**
- Allows API routes
- Configures CORS to allow connections to `*.azurewebsites.net`
- Sets up security headers

---

## 🆘 Troubleshooting

### **Problem: Manual input field appears**
**Cause:** `API_ENDPOINT` environment variable not configured or not loaded  
**Solution:**
1. Configure `API_ENDPOINT` in Azure Static Web App settings
2. Hard refresh browser
3. Check browser console for errors

### **Problem: Test connection fails (red error)**
**Cause:** API Service not running or URL incorrect  
**Solution:**
1. Verify API Service is running in Azure Portal
2. Test health endpoint directly: `https://your-api.azurewebsites.net/api/health`
3. Check if URL in environment variable is correct (no typos)
4. Verify CORS is enabled in API Service (already configured)

### **Problem: Submit data fails**
**Cause:** Service Bus connection not configured in API Service  
**Solution:**
1. Go to API Service App in Azure Portal
2. Check "Configuration" → "Application settings"
3. Verify `AZURE_SERVICEBUS_CONNECTIONSTRING` exists and is not empty
4. Verify `AZURE_SERVICEBUS_QUEUENAME` is set to `userdata-queue`

### **Problem: Config endpoint returns empty string**
**Cause:** Environment variable not set in Azure  
**Solution:**
1. Go to Static Web App → Configuration
2. Make sure `API_ENDPOINT` exists (exact name, case-sensitive)
3. Save and wait for restart

---

## 📊 Environment Variables Summary

### **Static Web App (Name-Age App):**
```
API_ENDPOINT = https://test-project-api-service.azurewebsites.net
```

### **App Service (API Service):**
```
AZURE_SERVICEBUS_CONNECTIONSTRING = Endpoint=sb://...
AZURE_SERVICEBUS_QUEUENAME = userdata-queue
JAVA_EMAIL_SERVICE_URL = (optional, for email service)
```

---

## 🎯 Quick Checklist

- [ ] Static Web App deployed successfully
- [ ] API Service App deployed successfully
- [ ] `API_ENDPOINT` configured in Static Web App
- [ ] Service Bus connection configured in API Service
- [ ] Health check works: `https://your-api.azurewebsites.net/api/health`
- [ ] Name-age app loads without manual input
- [ ] Test connection shows green success
- [ ] Submit data works and shows success

---

## 📞 Support

If you encounter issues:

1. Check GitHub Actions deployment status
2. Check Azure Portal for both apps (running/stopped)
3. Check browser console (F12) for JavaScript errors
4. Check API Service logs (Log stream in Azure Portal)

---

**Last Updated:** November 4, 2025
**Status:** Configuration guide for deployed apps
