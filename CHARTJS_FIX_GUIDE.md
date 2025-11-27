# 🔧 CHART.JS SSL CERTIFICATE FIX

## Problem
Your network/firewall is blocking CDN access with `ERR_CERT_AUTHORITY_INVALID` error. This prevents Chart.js from loading.

## Solution Options

### **Option 1: Download Chart.js Manually (RECOMMENDED)**

1. **On a different network** (mobile hotspot, home WiFi, etc.), visit:
   ```
   https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js
   ```

2. **Save the file** as `chart.min.js` in your project's `js/` folder:
   ```
   c:/Users/tshah/Downloads/SCP - HVAC Simulator/js/chart.min.js
   ```

3. **Update index.html** line 20 to use local file:
   ```html
   <script src="js/chart.min.js"></script>
   ```

4. **Refresh browser** - Charts will now work offline!

---

### **Option 2: Try Alternative CDN (Already Applied)**

I've updated the HTML to use `unpkg.com` instead of `jsdelivr.net`:
```html
<script src="https://unpkg.com/chart.js@3.9.1/dist/chart.min.js"></script>
```

**Test this now:**
1. Refresh your browser (Ctrl+F5)
2. Check if charts appear
3. If still blocked, use Option 1

---

### **Option 3: Use Local Server**

If you're using VS Code Live Server (port 5500), the CDN might work:

1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"
3. This sometimes bypasses certificate issues

---

### **Option 4: Disable SSL Verification (NOT RECOMMENDED)**

Only for development/testing:

**Chrome:**
```
chrome.exe --ignore-certificate-errors --ignore-urlfetcher-cert-requests
```

**Edge:**
```
msedge.exe --ignore-certificate-errors
```

⚠️ **WARNING:** Only use this for local development!

---

## Quick Test

**Try unpkg.com CDN first** (already updated in your HTML):
1. Close all browser windows
2. Reopen `index.html`
3. Check browser console (F12)
4. If you see Chart.js load successfully, charts will work!

---

## Manual Download Instructions

If all CDNs are blocked, here's how to get Chart.js:

### Method A: Download from GitHub
1. Go to: https://github.com/chartjs/Chart.js/releases/tag/v3.9.1
2. Download `chart.js-3.9.1.tgz`
3. Extract `dist/chart.min.js`
4. Copy to your `js/` folder

### Method B: Use npm (if you have Node.js)
```bash
cd "c:/Users/tshah/Downloads/SCP - HVAC Simulator"
npm install chart.js@3.9.1
copy node_modules/chart.js/dist/chart.min.js js/
```

Then update `index.html` line 20:
```html
<script src="js/chart.min.js"></script>
```

---

## Current Status

✅ **Updated CDN** to unpkg.com  
⏳ **Waiting** for you to test if it works  
📥 **Backup plan** ready (manual download)

**Next Step:** Refresh your browser and check if charts appear!
