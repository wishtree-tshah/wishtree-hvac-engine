/**
 * Inventory Module Features
 * - Pre-Season Build Status Dashboard
 * - Hub-and-Spoke Optimization
 * - Dead Stock Risk Tracker
 */

// ===== 2.1 PRE-SEASON BUILD STATUS DASHBOARD =====

function renderPreSeasonDashboard() {
    try {
        const container = document.getElementById('preSeasonGrid');
        if (!container || !INVENTORY_SUPPLIER_DATA) return;

        const data = INVENTORY_SUPPLIER_DATA.preSeasonBuild;

        container.innerHTML = data.categories.map(item => {
            const percentOfTarget = ((item.currentUnits / item.targetUnits) * 100).toFixed(1);
            const statusClass = item.status.toLowerCase().replace(' ', '-');
            const gapSign = item.gap >= 0 ? '+' : '';

            return `
                <div class="preseason-card glass-panel status-${statusClass}">
                    <div class="preseason-header">
                        <div class="category-name">${item.category}</div>
                        <div class="region-tag">${item.region}</div>
                    </div>
                    <div class="preseason-metrics">
                        <div class="metric-row">
                            <span class="metric-label">Target</span>
                            <span class="metric-value">${item.targetUnits.toLocaleString()} units</span>
                        </div>
                        <div class="metric-row">
                            <span class="metric-label">Current</span>
                            <span class="metric-value">${item.currentUnits.toLocaleString()} units</span>
                        </div>
                        <div class="metric-row">
                            <span class="metric-label">Gap</span>
                            <span class="metric-value gap-${item.gap < 0 ? 'negative' : 'positive'}">${gapSign}${item.gap}</span>
                        </div>
                        <div class="metric-row">
                            <span class="metric-label">Days of Supply</span>
                            <span class="metric-value">${item.daysOfSupply} / ${item.targetDOS} days</span>
                        </div>
                    </div>
                    <div class="preseason-progress">
                        <div class="progress-bar-thin">
                            <div class="fill status-${statusClass}" style="width: ${Math.min(percentOfTarget, 100)}%"></div>
                        </div>
                        <div class="progress-label">${percentOfTarget}% of target</div>
                    </div>
                    <div class="status-badge badge-${statusClass}">
                        ${item.status}
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Pre-season dashboard render error:', error);
    }
}

// ===== 2.2 HUB-AND-SPOKE OPTIMIZATION =====

function renderHubSpokeVisualization() {
    try {
        const svgContainer = document.getElementById('hubSpokeSvg');
        const tableBody = document.getElementById('rebalancingTable');

        if (!svgContainer || !tableBody || !INVENTORY_SUPPLIER_DATA) return;

        const data = INVENTORY_SUPPLIER_DATA.hubSpoke;

        // Create SVG
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '400');
        svg.setAttribute('viewBox', '0 0 100 100');

        // Draw connections first (so they're behind nodes)
        data.spokes.forEach(spoke => {
            const hub = data.hubs.find(h => h.id === spoke.hub);
            if (!hub) return;

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', hub.location.x);
            line.setAttribute('y1', hub.location.y);
            line.setAttribute('x2', spoke.location.x);
            line.setAttribute('y2', spoke.location.y);
            line.setAttribute('class', `spoke-line risk-${spoke.risk}`);
            line.setAttribute('stroke-width', spoke.risk === 'high' ? '0.8' : '0.4');

            const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
            title.textContent = `${hub.name} → ${spoke.name}\nLead Time: ${spoke.avgLeadTime} days\nRisk: ${spoke.risk.toUpperCase()}`;
            line.appendChild(title);

            svg.appendChild(line);
        });

        // Draw hubs
        data.hubs.forEach(hub => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', hub.location.x);
            circle.setAttribute('cy', hub.location.y);
            circle.setAttribute('r', '4');
            circle.setAttribute('class', `hub-node status-${hub.status}`);

            const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
            title.textContent = `${hub.name}\nInventory: ${hub.totalInventory.toLocaleString()} units\nDOS: ${hub.avgDOS} days\nStatus: ${hub.status.toUpperCase()}`;
            circle.appendChild(title);

            svg.appendChild(circle);

            // Label
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', hub.location.x);
            text.setAttribute('y', hub.location.y - 5);
            text.setAttribute('class', 'node-label hub-label');
            text.textContent = hub.name;
            svg.appendChild(text);
        });

        // Draw spokes
        data.spokes.forEach(spoke => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', spoke.location.x);
            circle.setAttribute('cy', spoke.location.y);
            circle.setAttribute('r', '2.5');
            circle.setAttribute('class', `spoke-node risk-${spoke.risk}`);

            const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
            title.textContent = `${spoke.name}\nOn-Hand: ${spoke.onHand.toLocaleString()} units\nDOS: ${spoke.dos} days\nLead Time: ${spoke.avgLeadTime} days`;
            circle.appendChild(title);

            svg.appendChild(circle);

            // Label
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', spoke.location.x);
            text.setAttribute('y', spoke.location.y - 3);
            text.setAttribute('class', 'node-label spoke-label');
            text.textContent = spoke.name;
            svg.appendChild(text);
        });

        svgContainer.innerHTML = '';
        svgContainer.appendChild(svg);

        // Populate rebalancing table
        tableBody.innerHTML = data.rebalancingSuggestions.map(suggestion => `
            <tr class="priority-${suggestion.priority.toLowerCase()}">
                <td class="route-cell">${suggestion.from} → ${suggestion.to}</td>
                <td>${suggestion.units}</td>
                <td>${suggestion.productFamily}</td>
                <td class="reason-cell">${suggestion.reason}</td>
                <td><span class="priority-badge priority-${suggestion.priority.toLowerCase()}">${suggestion.priority}</span></td>
                <td>${suggestion.estimatedDays} days</td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Hub-spoke visualization error:', error);
    }
}

// ===== 2.3 DEAD STOCK RISK TRACKER =====

function renderDeadStockTracker() {
    try {
        const tableBody = document.getElementById('deadStockTable');
        if (!tableBody || !INVENTORY_SUPPLIER_DATA) return;

        const deadStock = INVENTORY_SUPPLIER_DATA.deadStock || [];

        // Sort by total value descending
        const sorted = [...deadStock].sort((a, b) => b.totalValue - a.totalValue);

        tableBody.innerHTML = sorted.map(item => {
            const actionClass = item.action.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');

            return `
                <tr class="action-${actionClass}">
                    <td>${item.branch}</td>
                    <td class="sku-cell">${item.sku}</td>
                    <td>${item.description}</td>
                    <td><span class="refrigerant-badge ${item.refrigerantType === 'R-22' ? 'r22' : 'na'}">${item.refrigerantType}</span></td>
                    <td>${item.lastSaleDate}</td>
                    <td><span class="months-badge ${item.monthsSinceMovement >= 12 ? 'critical' : 'warning'}">${item.monthsSinceMovement} mo</span></td>
                    <td>${item.onHandUnits}</td>
                    <td class="value-cell">$${item.totalValue.toLocaleString()}</td>
                    <td><span class="action-badge action-${actionClass}">${item.action}</span></td>
                    <td class="reason-cell">${item.reason}</td>
                </tr>
            `;
        }).join('');

        // Update summary
        const totalValue = deadStock.reduce((sum, item) => sum + item.totalValue, 0);
        const totalUnits = deadStock.reduce((sum, item) => sum + item.onHandUnits, 0);

        const summaryEl = document.getElementById('deadStockSummary');
        if (summaryEl) {
            summaryEl.innerHTML = `
                <div class="summary-stat">
                    <div class="stat-value">$${totalValue.toLocaleString()}</div>
                    <div class="stat-label">Total At-Risk Value</div>
                </div>
                <div class="summary-stat">
                    <div class="stat-value">${totalUnits}</div>
                    <div class="stat-label">Total Units</div>
                </div>
                <div class="summary-stat">
                    <div class="stat-value">${deadStock.length}</div>
                    <div class="stat-label">SKUs Flagged</div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Dead stock tracker render error:', error);
    }
}

// ===== INITIALIZATION =====

function initInventoryFeatures() {
    try {
        renderPreSeasonDashboard();
        renderHubSpokeVisualization();
        renderDeadStockTracker();
    } catch (error) {
        console.error('Inventory features initialization error:', error);
    }
}

// Export functions
window.initInventoryFeatures = initInventoryFeatures;
window.renderPreSeasonDashboard = renderPreSeasonDashboard;
window.renderHubSpokeVisualization = renderHubSpokeVisualization;
window.renderDeadStockTracker = renderDeadStockTracker;
