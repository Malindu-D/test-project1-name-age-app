# Name-Age App - Deployment Guide

## 📋 Prerequisites

- Azure Account
- GitHub Account
- Git installed on your computer
- **API Service App must be deployed first** (you need its URL)

## 🚀 Step-by-Step Deployment

### Step 1: Push Code to GitHub

1. Open Terminal/PowerShell in your `name-age-app` folder
2. Run these commands:

```powershell
git init
git add .
git commit -m "Initial commit - Name-Age App"
```

3. Go to [GitHub](https://github.com) and create a **new repository**
   - Name: `name-age-app`
   - Make it **Private** or **Public**
   - **Don't** initialize with README
   - Click **Create repository**
4. Copy the commands shown and run them in your terminal:

```powershell
git remote add origin https://github.com/YOUR-USERNAME/name-age-app.git
git branch -M main
git push -u origin main
```

### Step 2: Create Azure Static Web App

1. Go to [Azure Portal](https://portal.azure.com)
2. Click **"Create a resource"**
3. Search for **"Static Web App"** and click **Create**
4. Fill in the details:

   **Basics Tab:**

   - **Subscription**: Select your subscription
   - **Resource Group**: Use same as API Service (e.g., `user-data-system-rg`)
   - **Name**: Enter unique name (e.g., `name-age-app-xyz123`)
   - **Plan type**: Select **Free** (perfect for this project)
   - **Region**: Select nearest region
   - **Deployment details**: Select **GitHub**

5. Click **"Sign in with GitHub"** button
   - Authorize Azure to access your GitHub
   - **Organization**: Select your GitHub username
   - **Repository**: Select `name-age-app`
   - **Branch**: Select `main`
6. **Build Details:**

   - **Build Presets**: Select **Custom**
   - **App location**: `/` (leave as is)
   - **Api location**: (leave empty)
   - **Output location**: (leave empty)

7. Click **Review + Create**, then **Create**
8. Wait for deployment to complete (3-5 minutes)

### Step 3: Get Deployment Token (Automatic)

**Good News!** When you created the Static Web App with GitHub integration, Azure automatically:

- Created a GitHub Actions workflow file in your repository
- Added the deployment token as a GitHub secret

You can verify this:

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. You should see: `AZURE_STATIC_WEB_APPS_API_TOKEN` ✅

### Step 4: Verify GitHub Actions Workflow

1. Go to your GitHub repository
2. Check if `.github/workflows/` folder exists
3. If Azure created a different workflow file, you can:
   - Keep Azure's auto-generated file, OR
   - Replace it with the one we created (`azure-static-web-apps.yml`)

**Option A: Use Azure's Auto-Generated Workflow (Recommended)**

- Just leave it as is - it will work!

**Option B: Use Our Workflow File**

1. Delete Azure's auto-generated workflow file
2. Our file is already in the repo at `.github/workflows/azure-static-web-apps.yml`
3. Push changes:

```powershell
git add .
git commit -m "Update workflow file"
git push
```

### Step 5: Wait for Deployment

1. Go to your GitHub repository
2. Click **Actions** tab
3. You should see a workflow running
4. Wait for it to complete (green checkmark ✅)
5. If it fails, check the logs for errors

### Step 6: Get Your App URL

1. Go to Azure Portal → Your Static Web App resource
2. On the **Overview** page, find **URL**
3. Copy this URL (e.g., `https://gentle-ocean-xyz123.azurestaticapps.net`)
4. Click on it to open your app

### Step 7: Configure the App

When you open the app for the first time:

1. **API Endpoint URL** field will be empty
2. Enter your **API Service App URL** (from API Service deployment)
   - Example: `https://api-service-app-xyz123.azurewebsites.net`
   - **Don't** add `/api/userdata` - just the base URL
3. Click **"🔌 Test API Connection"** button
4. You should see **green message**: "✅ Connection successful! API is working."
   - If RED error appears, check:
     - API Service App is running
     - URL is correct (no trailing slash)
     - CORS is enabled in API Service

### Step 8: Test the App

1. Fill in **Name** (e.g., "John Doe")
2. Fill in **Age** (e.g., 25)
3. Click **"✅ Submit Data"** button
4. You should see success message

**What happens behind the scenes:**

- Your data goes to API Service App
- API Service sends it to Azure Service Bus
- Function App will pick it up and save to database

## ✅ Success!

Your Name-Age App is now live on Azure Static Web Apps!

## 📝 Important URLs to Save

- **App URL**: `https://YOUR-APP.azurestaticapps.net`
- **GitHub Repo**: `https://github.com/YOUR-USERNAME/name-age-app`

## 🔄 Future Updates

To update the app after code changes:

1. Make your changes to HTML/CSS/JS files
2. Commit and push to GitHub:

```powershell
git add .
git commit -m "Your change description"
git push
```

3. GitHub Actions will automatically deploy the update!
4. Wait 2-3 minutes, refresh your browser

## 💡 Pro Tips

**Tip 1: API URL is Saved**

- Once you enter and test the API URL, it's saved in browser
- You don't need to enter it every time

**Tip 2: Test Button is Important**

- Always test connection first before submitting data
- Green = Good, Red = Problem with API

**Tip 3: Check Browser Console**

- If something doesn't work, press F12
- Look at Console tab for error messages

## ⚠️ Troubleshooting

**Problem**: Test connection shows red error

- **Solution 1**: Check if API Service App is running in Azure Portal
- **Solution 2**: Verify API URL is correct (no typos)
- **Solution 3**: Make sure CORS is enabled in API Service
- **Solution 4**: Check API Service logs in Azure Portal

**Problem**: Submit button doesn't work

- **Solution 1**: Test connection first (must be green)
- **Solution 2**: Make sure name is at least 2 characters
- **Solution 3**: Make sure age is between 1-150

**Problem**: App doesn't load

- **Solution**: Check GitHub Actions - deployment might have failed

**Problem**: Changes don't appear after pushing

- **Solution 1**: Wait 3-5 minutes for deployment
- **Solution 2**: Hard refresh browser (Ctrl + Shift + R)
- **Solution 3**: Check GitHub Actions for deployment status

## 🔗 Next Steps

After this deployment:

1. ✅ API Service App - Deployed
2. ✅ Name-Age App - Deployed (This one!)
3. ⏳ Test Function App - Deploy this next (to process Service Bus messages)
4. ⏳ Email Notification App - Deploy later
5. ⏳ Spring Email Service - Deploy last

## 📞 Testing the Complete Flow

To test if everything works:

1. Open Name-Age App
2. Test API connection (should be green)
3. Submit your data
4. Check Azure Service Bus queue (should have messages)
5. Once Function App is deployed, data will go to database
