# HVAC-Specific Dashboard Features - Implementation Plan

## Overview
This document outlines the implementation of industry-specific features for the Wishtree HVAC Demand Planning Engine, focusing on the unique challenges of HVACR distribution.

---

## 3. DEMAND AI MODULE

### Feature 3.1: Project vs. Run-Rate Splitter

**Business Problem:**
A single large commercial project (500 PTAC units for a hospital) skews the forecast algorithm, making next year's prediction wildly inaccurate.

**Implementation:**

**HTML Structure:**
```html
<div id="view-demand-ai" class="view-section">
    <div class="dashboard-grid">
        <!-- Toggle Control -->
        <div class="glass-panel wide">
            <div class="panel-header">
                <h3>Demand View Mode</h3>
                <div class="toggle-group">
                    <button class="toggle-btn active" data-demand-mode="total">Total Demand</button>
                    <button class="toggle-btn" data-demand-mode="run-rate">Run-Rate Only</button>
                    <button class="toggle-btn" data-demand-mode="projects">Projects Only</button>
                </div>
            </div>
        </div>

        <!-- Demand Breakdown Chart -->
        <div class="chart-panel glass-panel wide">
            <div class="panel-header">
                <h3>Demand Composition</h3>
            </div>
            <div class="chart-container">
                <canvas id="demandSplitChart"></canvas>
            </div>
        </div>

        <!-- Project List -->
        <div class="glass-panel">
            <div class="panel-header">
                <h3>Active Projects</h3>
                <span class="badge warning">3 Large Orders</span>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Units</th>
                        <th>Value</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Memorial Hospital PTAC</td>
                        <td>500</td>
                        <td>$425K</td>
                        <td><span class="badge success">Shipped</span></td>
                    </tr>
                    <tr>
                        <td>School District Retrofit</td>
                        <td>320</td>
                        <td>$280K</td>
                        <td><span class="badge warning">In Progress</span></td>
                    </tr>
                    <tr>
                        <td>Office Complex Upgrade</td>
                        <td>180</td>
                        <td>$155K</td>
                        <td><span class="badge">Quoted</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
```

**Data Structure (add to data.js):**
```javascript
demandAI: {
    runRate: [1200, 1350, 1250, 1480, 1600, 1750],
    projects: [0, 500, 0, 320, 0, 180],
    total: [1200, 1850, 1250, 1800, 1600, 1930]
}
```

---

### Feature 3.2: Attach Rate AI

**Business Problem:**
Forecasting 50 condensers but only 20 pads/whips means lost accessory sales.

**Implementation:**

**HTML (add to Demand AI view):**
```html
<div class="glass-panel wide">
    <div class="panel-header">
        <h3><i class="fa-solid fa-brain"></i> Attach Rate Recommendations</h3>
        <span class="info-badge">AI Powered</span>
    </div>
    <div class="recommendation-list">
        <div class="recommendation-item alert">
            <div class="rec-icon warning">
                <i class="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div class="rec-content">
                <div class="rec-title">Low Accessory Forecast Detected</div>
                <div class="rec-detail">
                    Forecasting <strong>50 Condensers</strong> but only <strong>20 Pads & Whips</strong>.
                    Historical attach rate: <strong>85%</strong>
                </div>
                <div class="rec-action">
                    <button class="action-btn primary">Adjust Forecast to 43 Units</button>
                    <button class="action-btn">Dismiss</button>
                </div>
            </div>
        </div>
        <div class="recommendation-item">
            <div class="rec-icon success">
                <i class="fa-solid fa-check-circle"></i>
            </div>
            <div class="rec-content">
                <div class="rec-title">Compressor-to-Capacitor Ratio: Healthy</div>
                <div class="rec-detail">
                    Current ratio: 1:1.2 (Target: 1:1.1-1.3)
                </div>
            </div>
        </div>
    </div>
</div>
```

---

### Feature 3.3: Weather-Driven Demand Spike Alert

**HTML:**
```html
<div class="glass-panel">
    <div class="panel-header">
        <h3><i class="fa-solid fa-cloud-sun"></i> Weather Impact Forecast</h3>
    </div>
    <div class="weather-alerts">
        <div class="weather-alert critical">
            <div class="alert-header">
                <i class="fa-solid fa-temperature-high"></i>
                <span>Heatwave Alert: Houston</span>
                <span class="alert-date">June 15-22</span>
            </div>
            <div class="alert-body">
                <div class="temp-forecast">Expected: 102°F (7 days above 100°F)</div>
                <div class="demand-prediction">
                    <strong>Predicted Spike:</strong> Capacitors +180%, Motors +140%, Contactors +95%
                </div>
            </div>
        </div>
    </div>
</div>
```

---

## 4. INVENTORY MODULE

### Feature 4.1: Pre-Season Build Status

**HTML:**
```html
<div id="view-inventory" class="view-section">
    <div class="dashboard-grid">
        <div class="chart-panel glass-panel wide">
            <div class="panel-header">
                <h3>Pre-Season Build Progress (Q1/Q2 2025)</h3>
                <span class="season-badge">Summer Season Prep</span>
            </div>
            <div class="chart-container">
                <canvas id="preSeasonChart"></canvas>
            </div>
            <div class="build-status">
                <div class="status-item">
                    <span class="label">Target Completion:</span>
                    <span class="value">April 30, 2025</span>
                </div>
                <div class="status-item">
                    <span class="label">Current Progress:</span>
                    <span class="value success">78% Complete</span>
                </div>
                <div class="status-item">
                    <span class="label">Days Remaining:</span>
                    <span class="value">45 days</span>
                </div>
            </div>
        </div>

        <!-- Category Breakdown -->
        <div class="glass-panel">
            <div class="panel-header">
                <h3>Build Status by Category</h3>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Target</th>
                        <th>Current</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Condensers</td>
                        <td>$2.4M</td>
                        <td>$2.1M</td>
                        <td><span class="badge success">88%</span></td>
                    </tr>
                    <tr>
                        <td>Compressors</td>
                        <td>$1.8M</td>
                        <td>$1.2M</td>
                        <td><span class="badge warning">67%</span></td>
                    </tr>
                    <tr>
                        <td>Motors</td>
                        <td>$900K</td>
                        <td>$750K</td>
                        <td><span class="badge success">83%</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
```

---

### Feature 4.2: Hub-and-Spoke Optimization

**HTML:**
```html
<div class="glass-panel wide">
    <div class="panel-header">
        <h3>Hub-and-Spoke Inventory Distribution</h3>
        <button class="icon-btn"><i class="fa-solid fa-arrows-rotate"></i></button>
    </div>
    <div class="hub-spoke-viz">
        <div class="hub-section">
            <div class="hub-card">
                <div class="hub-label">Central DC (Houston)</div>
                <div class="hub-value">$8.2M</div>
                <div class="hub-capacity">Capacity: 65% Utilized</div>
            </div>
        </div>
        <div class="spoke-section">
            <div class="spoke-card">
                <div class="spoke-name">Dallas</div>
                <div class="spoke-value">$1.8M</div>
                <div class="spoke-status warning">92% Full</div>
            </div>
            <div class="spoke-card">
                <div class="spoke-name">Austin</div>
                <div class="spoke-value">$1.2M</div>
                <div class="spoke-status success">68% Full</div>
            </div>
            <div class="spoke-card">
                <div class="spoke-name">San Antonio</div>
                <div class="spoke-value">$950K</div>
                <div class="spoke-status success">71% Full</div>
            </div>
        </div>
    </div>
    <div class="optimization-alerts">
        <div class="alert-item">
            <i class="fa-solid fa-lightbulb"></i>
            <span>Recommendation: Pull back 45 slow-moving SKUs from Dallas to Central DC (Est. savings: $12K/month)</span>
        </div>
    </div>
</div>
```

---

### Feature 4.3: Dead Stock (R-22/Obsolete) Risk

**HTML:**
```html
<div class="glass-panel">
    <div class="panel-header">
        <h3><i class="fa-solid fa-skull-crossbones"></i> Obsolete Inventory Risk</h3>
    </div>
    <div class="dead-stock-summary">
        <div class="risk-metric">
            <div class="metric-label">Total Obsolete Value</div>
            <div class="metric-value danger">$385K</div>
        </div>
        <div class="risk-metric">
            <div class="metric-label">R-22 Refrigerant</div>
            <div class="metric-value warning">$220K</div>
            <div class="metric-note">Phase-out: Jan 2026</div>
        </div>
    </div>
    <table class="data-table">
        <thead>
            <tr>
                <th>Item</th>
                <th>Value</th>
                <th>Regulation</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>R-22 Refrigerant (Drums)</td>
                <td>$220K</td>
                <td>EPA Phase-out 2026</td>
                <td><button class="action-btn small">Liquidate</button></td>
            </tr>
            <tr>
                <td>Legacy Thermostats</td>
                <td>$95K</td>
                <td>Energy Star Obsolete</td>
                <td><button class="action-btn small">Discount</button></td>
            </tr>
        </tbody>
    </table>
</div>
```

---

## 5. SUPPLIER RISK MODULE

### Feature 5.1: Container Tracking / "On the Water" View

**HTML:**
```html
<div id="view-supplier-risk" class="view-section">
    <div class="dashboard-grid">
        <div class="glass-panel wide">
            <div class="panel-header">
                <h3><i class="fa-solid fa-ship"></i> In-Transit Inventory</h3>
                <span class="badge">$2.8M On Water</span>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Container ID</th>
                        <th>Contents</th>
                        <th>Value</th>
                        <th>ETA</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>MSCU-4428901</td>
                        <td>Compressors (Copeland)</td>
                        <td>$850K</td>
                        <td>May 15</td>
                        <td><span class="badge warning">Port Congestion</span></td>
                    </tr>
                    <tr>
                        <td>HLCU-9821045</td>
                        <td>Condensers (Carrier)</td>
                        <td>$1.2M</td>
                        <td>May 8</td>
                        <td><span class="badge success">On Schedule</span></td>
                    </tr>
                    <tr>
                        <td>CMAU-5512309</td>
                        <td>Motors (GE)</td>
                        <td>$750K</td>
                        <td>May 22</td>
                        <td><span class="badge">In Transit</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
```

---

### Feature 5.2: Warranty Return Rate Spike

**HTML:**
```html
<div class="glass-panel">
    <div class="panel-header">
        <h3><i class="fa-solid fa-triangle-exclamation"></i> Quality Alerts</h3>
    </div>
    <div class="quality-alert critical">
        <div class="alert-icon">
            <i class="fa-solid fa-exclamation-circle"></i>
        </div>
        <div class="alert-content">
            <div class="alert-title">High Failure Rate Detected</div>
            <div class="alert-details">
                <strong>Product:</strong> Copeland Scroll Compressor ZP42K5E<br>
                <strong>Batch:</strong> LOT-2024-Q3-8821<br>
                <strong>Failure Rate:</strong> 18% (Normal: 2-3%)<br>
                <strong>Units Sold:</strong> 240 units<br>
                <strong>Returns:</strong> 43 units (last 30 days)
            </div>
            <div class="alert-actions">
                <button class="action-btn danger">Stop Ordering</button>
                <button class="action-btn">Contact Supplier</button>
                <button class="action-btn">View Details</button>
            </div>
        </div>
    </div>
</div>
```

---

## 6. NETWORK MAP ENHANCEMENTS

### Feature 6.1: Live Weather Overlay

**HTML (add to Network Map view):**
```html
<div class="map-controls">
    <div class="control-group">
        <label class="toggle-switch">
            <input type="checkbox" id="weatherOverlay">
            <span class="slider"></span>
        </label>
        <span class="control-label">Weather Overlay</span>
    </div>
</div>
```

**JavaScript Enhancement:**
```javascript
// Add to app.js
toggleWeatherOverlay(enabled) {
    const nodes = document.querySelectorAll('.map-node');
    if (enabled) {
        // Add temperature-based coloring
        const temps = {
            'houston': 102, 'dallas': 98, 'austin': 95,
            'miami': 88, 'ny': 75, 'chicago': 72, 'la': 82, 'seattle': 68
        };
        nodes.forEach(node => {
            const temp = temps[node.id];
            const color = temp > 100 ? '#ef4444' : temp > 90 ? '#f59e0b' : '#10b981';
            node.style.fill = color;
        });
    }
}
```

---

### Feature 6.2: Transfer Corridor Visualization

**HTML:**
```html
<div class="glass-panel">
    <div class="panel-header">
        <h3>Inter-Branch Transfers (Last 30 Days)</h3>
    </div>
    <table class="data-table">
        <thead>
            <tr>
                <th>Route</th>
                <th>Volume</th>
                <th>Frequency</th>
                <th>Insight</th>
            </tr>
        </thead>
        <tbody>
            <tr class="highlight-row">
                <td>Austin → Dallas</td>
                <td>$285K</td>
                <td>18 transfers</td>
                <td><span class="badge warning">High Activity</span></td>
            </tr>
            <tr>
                <td>Houston → Austin</td>
                <td>$120K</td>
                <td>7 transfers</td>
                <td><span class="badge">Normal</span></td>
            </tr>
        </tbody>
    </table>
</div>
```

---

## CSS Additions

Add to `style.css`:

```css
/* Demand AI Styles */
.recommendation-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.recommendation-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    border-left: 3px solid var(--glass-border);
}

.recommendation-item.alert {
    border-left-color: var(--warning);
}

.rec-icon {
    font-size: 1.5rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

.rec-icon.warning {
    background: rgba(245, 158, 11, 0.2);
    color: var(--warning);
}

.rec-icon.success {
    background: rgba(16, 185, 129, 0.2);
    color: var(--success);
}

.rec-content {
    flex: 1;
}

.rec-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.rec-detail {
    font-size: 0.9rem;
    color: var(--text-muted);
    margin-bottom: 0.75rem;
}

.rec-action {
    display: flex;
    gap: 0.5rem;
}

.action-btn {
    padding: 0.4rem 1rem;
    border-radius: 6px;
    border: 1px solid var(--glass-border);
    background: var(--glass-bg);
    color: var(--text-main);
    cursor: pointer;
    font-size: 0.85rem;
    transition: all 0.2s;
}

.action-btn.primary {
    background: var(--primary);
    border-color: var(--primary);
}

.action-btn.danger {
    background: var(--danger);
    border-color: var(--danger);
}

.action-btn.small {
    padding: 0.25rem 0.75rem;
    font-size: 0.8rem;
}

/* Weather Alerts */
.weather-alerts {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.weather-alert {
    padding: 1rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    border-left: 3px solid var(--warning);
}

.weather-alert.critical {
    border-left-color: var(--danger);
}

.alert-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
}

.alert-date {
    margin-left: auto;
    font-size: 0.85rem;
    color: var(--text-muted);
}

.temp-forecast {
    color: var(--text-muted);
    margin-bottom: 0.5rem;
}

.demand-prediction {
    font-size: 0.9rem;
}

/* Hub and Spoke */
.hub-spoke-viz {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
    padding: 1.5rem;
}

.hub-card {
    background: rgba(59, 130, 246, 0.1);
    padding: 1.5rem;
    border-radius: 8px;
    border: 2px solid var(--primary);
    text-align: center;
}

.hub-label {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
}

.hub-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 0.25rem;
}

.spoke-section {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.spoke-card {
    background: rgba(0, 0, 0, 0.2);
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid var(--glass-border);
}

.spoke-name {
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.spoke-value {
    font-size: 1.2rem;
    margin-bottom: 0.25rem;
}

.spoke-status {
    font-size: 0.8rem;
}

.spoke-status.warning {
    color: var(--warning);
}

.spoke-status.success {
    color: var(--success);
}

/* Quality Alerts */
.quality-alert {
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    background: rgba(239, 68, 68, 0.1);
    border-radius: 8px;
    border: 1px solid var(--danger);
}

.quality-alert .alert-icon {
    font-size: 2rem;
    color: var(--danger);
}

.alert-title {
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
    color: var(--danger);
}

.alert-details {
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: 1rem;
}

.alert-actions {
    display: flex;
    gap: 0.5rem;
}
```

---

## Implementation Priority

1. **Phase 1 (Immediate):** Demand AI - Project Splitter
2. **Phase 2 (Week 2):** Inventory - Pre-Season Build
3. **Phase 3 (Week 3):** Supplier Risk - Container Tracking
4. **Phase 4 (Week 4):** Polish & Integrate All Features

---

**End of Implementation Plan**
