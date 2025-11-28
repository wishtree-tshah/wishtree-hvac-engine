/**
 * Supplier Risk Module Features
 * - Container Tracking / "On the Water" View
 * - Warranty Return Rate Spike Alerts
 */

// ===== 3.1 CONTAINER TRACKING / "ON THE WATER" VIEW =====

function renderContainerTracking() {
    try {
        const tableBody = document.getElementById('containerTrackingTable');
        const summaryEl = document.getElementById('containerSummary');

        if (!tableBody || !INVENTORY_SUPPLIER_DATA) return;

        const containers = INVENTORY_SUPPLIER_DATA.containers || [];

        // Render table
        tableBody.innerHTML = containers.map(container => {
            const statusClass = container.status.toLowerCase().replace(/\s+/g, '-');
            const isDelayed = container.daysLate > 0;
            const etaDate = new Date(container.eta);
            const formattedETA = etaDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

            return `
                <tr class="status-${statusClass} ${isDelayed ? 'delayed' : ''}">
                    <td class="container-id">${container.containerId}</td>
                    <td>${container.vendor}</td>
                    <td class="port-cell">${container.originPort}</td>
                    <td class="port-cell">${container.destinationPort}</td>
                    <td><span class="status-badge status-${statusClass}">${container.status}</span></td>
                    <td class="${isDelayed ? 'eta-delayed' : 'eta-normal'}">${formattedETA}</td>
                    <td>${isDelayed ? `<span class="days-late">+${container.daysLate} days</span>` : '<span class="on-time">On Time</span>'}</td>
                    <td class="sku-cell">${container.criticalSKUs}</td>
                </tr>
            `;
        }).join('');

        // Update summary
        const onWater = containers.filter(c => c.status === 'On the Water').length;
        const atRisk = containers.filter(c => c.daysLate > 5).length;
        const atPort = containers.filter(c => c.status === 'At Destination Port').length;

        if (summaryEl) {
            summaryEl.innerHTML = `
                <div class="summary-card">
                    <div class="summary-value">${containers.length}</div>
                    <div class="summary-label">Total Containers</div>
                </div>
                <div class="summary-card status-on-water">
                    <div class="summary-value">${onWater}</div>
                    <div class="summary-label">On the Water</div>
                </div>
                <div class="summary-card status-at-risk">
                    <div class="summary-value">${atRisk}</div>
                    <div class="summary-label">At Risk (Delay > 5 days)</div>
                </div>
                <div class="summary-card status-at-port">
                    <div class="summary-value">${atPort}</div>
                    <div class="summary-label">At Destination Port</div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Container tracking render error:', error);
    }
}

// ===== 3.2 WARRANTY RETURN RATE SPIKE ALERTS =====

function renderWarrantyAlerts() {
    try {
        const tableBody = document.getElementById('warrantyAlertsTable');
        const summaryEl = document.getElementById('warrantyAlertsSummary');

        if (!tableBody || !INVENTORY_SUPPLIER_DATA) return;

        const alerts = INVENTORY_SUPPLIER_DATA.warrantyAlerts || [];

        // Sort by impact (High, Medium, Low) then by spike multiplier
        const impactPriority = { 'High': 3, 'Medium': 2, 'Low': 1 };
        const sorted = [...alerts].sort((a, b) => {
            if (impactPriority[a.impact] !== impactPriority[b.impact]) {
                return impactPriority[b.impact] - impactPriority[a.impact];
            }
            return b.spikeMultiplier - a.spikeMultiplier;
        });

        tableBody.innerHTML = sorted.map(alert => {
            const impactClass = alert.impact.toLowerCase();
            const alertDate = new Date(alert.date);
            const formattedDate = alertDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            return `
                <tr class="impact-${impactClass}">
                    <td>${formattedDate}</td>
                    <td>${alert.vendor}</td>
                    <td class="sku-cell">${alert.sku}</td>
                    <td>${alert.productFamily}</td>
                    <td class="rate-cell current"><span class="rate-badge">${alert.currentReturnRate.toFixed(1)}%</span></td>
                    <td class="rate-cell baseline">${alert.baselineRate.toFixed(1)}%</td>
                    <td class="spike-cell">
                        <span class="spike-badge spike-${impactClass}">${alert.spikeMultiplier.toFixed(1)}x</span>
                    </td>
                    <td><span class="impact-badge impact-${impactClass}">${alert.impact}</span></td>
                    <td class="units-cell">${alert.onHandUnits} units<br><span class="value-text">$${alert.onHandValue.toLocaleString()}</span></td>
                    <td class="action-cell">${alert.suggestedAction}</td>
                </tr>
            `;
        }).join('');

        // Update summary
        const highImpact = alerts.filter(a => a.impact === 'High').length;
        const totalAffected = alerts.reduce((sum, a) => sum + a.affectedUnits, 0);
        const totalExposure = alerts.reduce((sum, a) => sum + a.onHandValue, 0);

        if (summaryEl) {
            summaryEl.innerHTML = `
                <div class="alert-summary-card critical">
                    <div class="alert-icon"><i class="fa-solid fa-triangle-exclamation"></i></div>
                    <div class="alert-content">
                        <div class="alert-value">${highImpact}</div>
                        <div class="alert-label">High Impact Alerts</div>
                    </div>
                </div>
                <div class="alert-summary-card">
                    <div class="alert-content">
                        <div class="alert-value">${totalAffected}</div>
                        <div class="alert-label">Units Affected</div>
                    </div>
                </div>
                <div class="alert-summary-card">
                    <div class="alert-content">
                        <div class="alert-value">$${(totalExposure / 1000).toFixed(0)}K</div>
                        <div class="alert-label">Inventory at Risk</div>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Warranty alerts render error:', error);
    }
}

// ===== HELPER FUNCTIONS =====

function filterContainers(filterType) {
    try {
        if (!INVENTORY_SUPPLIER_DATA) return;

        const containers = INVENTORY_SUPPLIER_DATA.containers || [];
        let filtered = containers;

        switch (filterType) {
            case 'on-water':
                filtered = containers.filter(c => c.status === 'On the Water');
                break;
            case 'delayed':
                filtered = containers.filter(c => c.daysLate > 0);
                break;
            case 'at-port':
                filtered = containers.filter(c => c.status.includes('Port'));
                break;
            default:
                filtered = containers;
        }

        // Re-render with filtered data (would need to modify renderContainerTracking to accept filtered data)
        console.log(`Filtered containers: ${filtered.length} items`);
    } catch (error) {
        console.error('Container filter error:', error);
    }
}

// ===== INITIALIZATION =====

function init SupplierRiskFeatures() {
    try {
        renderContainerTracking();
        renderWarrantyAlerts();
    } catch (error) {
        console.error('Supplier risk features initialization error:', error);
    }
}

// Export functions
window.initSupplierRiskFeatures = initSupplierRiskFeatures;
window.renderContainerTracking = renderContainerTracking;
window.renderWarrantyAlerts = renderWarrantyAlerts;
window.filterContainers = filterContainers;
