# INVENTORY & SUPPLIER RISK MODULES - HTML INTEGRATION

## FILES TO ADD TO index.html

### 1. Add to <head> section (after network-map.css):
```html
<link rel="stylesheet" href="css/inventory-supplier.css">
```

### 2. Add before </body> (after network-map.js):
```html
<script src="js/inventory-supplier-data.js"></script>
<script src="js/inventory-features.js"></script>
<script src="js/supplier-risk-features.js"></script>
```

### 3. REPLACE the existing placeholder divs with these complete modules:

---

## INVENTORY MODULE HTML (Replace existing #view-inventory):

```html
<!-- View: Inventory Optimization -->
<div id="view-inventory" class="view-section">
    <div class="dashboard-grid">
        <!-- 2.1 Pre-Season Build Status Dashboard -->
        <div class="glass-panel wide">
            <div class="panel-header">
                <h3><i class="fa-solid fa-warehouse"></i> Pre-Season Build Status</h3>
                <span class="badge">Cooling Season (Mar-May)</span>
            </div>
            <div id="preSeasonGrid" class="preseason-grid">
                <!-- Populated by JavaScript -->
            </div>
        </div>

        <!-- 2.2 Hub-and-Spoke Optimization -->
        <div class="glass-panel wide">
            <div class="panel-header">
                <h3><i class="fa-solid fa-network-wired"></i> Hub-andSpoke Optimization</h3>
            </div>
            <div class="hub-spoke-container">
                <div id="hubSpokeSvg">
                    <!-- SVG visualization populated by JavaScript -->
                </div>
                <div class="rebalancing-table-container">
                    <h4 style="margin-bottom: 1rem;">Suggested Rebalancing</h4>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Route</th>
                                <th>Units</th>
                                <th>Product</th>
                                <th>Reason</th>
                                <th>Priority</th>
                                <th>ETA</th>
                            </tr>
                        </thead>
                        <tbody id="rebalancingTable">
                            <!-- Populated by JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- 2.3 Dead Stock Risk Tracker -->
        <div class="glass-panel wide">
            <div class="panel-header">
                <h3><i class="fa-solid fa-skull-crossbones"></i> Dead Stock Risk Tracker</h3>
                <span class="badge danger">R-22 & Obsolete</span>
            </div>
            <div id="deadStockSummary" class="dead-stock-summary">
                <!-- Summary stats populated by JavaScript -->
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Branch</th>
                        <th>SKU</th>
                        <th>Description</th>
                        <th>Refrigerant</th>
                        <th>Last Sale</th>
                        <th>Months</th>
                        <th>Units</th>
                        <th>Value</th>
                        <th>Action</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody id="deadStockTable">
                    <!-- Populated by JavaScript -->
                </tbody>
            </table>
        </div>
    </div>
</div>
```

---

## SUPPLIER RISK MODULE HTML (Replace existing #view-supplier-risk):

```html
<!-- View: Supplier Risk -->
<div id="view-supplier-risk" class="view-section">
    <div class="dashboard-grid">
        <!-- 3.1 Container Tracking / "On the Water" View -->
        <div class="glass-panel wide">
            <div class="panel-header">
                <h3><i class="fa-solid fa-ship"></i> Container Tracking - On the Water</h3>
                <span class="badge">Real-time</span>
            </div>
            <div id="containerSummary" class="container-summary">
                <!-- Summary cards populated by JavaScript -->
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Container ID</th>
                        <th>Vendor</th>
                        <th>Origin Port</th>
                        <th>Destination</th>
                        <th>Status</th>
                        <th>ETA</th>
                        <th>Delay</th>
                        <th>Critical SKUs</th>
                    </tr>
                </thead>
                <tbody id="containerTrackingTable">
                    <!-- Populated by JavaScript -->
                </tbody>
            </table>
        </div>

        <!-- 3.2 Warranty Return Rate Spike Alerts -->
        <div class="glass-panel wide">
            <div class="panel-header">
                <h3><i class="fa-solid fa-triangle-exclamation"></i> Warranty Return Rate Spike Alerts</h3>
                <span class="badge danger">Quality Issues</span>
            </div>
            <div id="warrantyAlertsSummary" class="warranty-alerts-summary">
                <!-- Alert summary populated by JavaScript -->
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Vendor</th>
                        <th>SKU</th>
                        <th>Product Family</th>
                        <th>Current Rate</th>
                        <th>Baseline</th>
                        <th>Spike</th>
                        <th>Impact</th>
                        <th>On-Hand Exposure</th>
                        <th>Suggested Action</th>
                    </tr>
                </thead>
                <tbody id="warrantyAlertsTable">
                    <!-- Populated by JavaScript -->
                </tbody>
            </table>
        </div>
    </div>
</div>
```

---

## 4. ADD TO js/app.js

### In init() function (after initNetworkMapEnhancements):
```javascript
// Initialize Inventory & Supplier Risk Features
if (typeof initInventoryFeatures === 'function') {
    initInventoryFeatures();
}
if (typeof initSupplierRiskFeatures === 'function') {
    initSupplierRiskFeatures();
}
```

### In handleNavClick() function (after network-map handling):
```javascript
// Refresh Inventory features when switching to view
if (viewId === 'inventory') {
    if (typeof initInventoryFeatures === 'function') {
        initInventoryFeatures();
    }
}

// Refresh Supplier Risk features when switching to view
if (viewId === 'supplier-risk') {
    if (typeof initSupplierRiskFeatures === 'function') {
        initSupplierRiskFeatures();
    }
}
```

---

## INTEGRATION STEPS:

1. ✅ **CSS Link** - Add inventory-supplier.css to <head>
2. ✅ **JS Scripts** - Add 3 script tags before </body>
3. ✅ **Inventory HTML** - Replace #view-inventory content
4. ✅ **Supplier Risk HTML** - Replace #view-supplier-risk content
5. ✅ **app.js Updates** - Add initialization calls

All features will work automatically once integrated!
