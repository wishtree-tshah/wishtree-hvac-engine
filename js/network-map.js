/**
 * Network Map Enhancements
 * - Weather Overlay Toggle
 * - Transfer Corridor Visualization
 */

// Track toggle states
let weatherOverlayEnabled = false;
let transferCorridorsEnabled = true;

// Initialize Network Map Enhancements
function initNetworkMapEnhancements() {
    try {
        // Weather Overlay Toggle
        const weatherToggle = document.getElementById('weatherOverlayToggle');
        if (weatherToggle) {
            weatherToggle.addEventListener('change', (e) => {
                weatherOverlayEnabled = e.target.checked;
                toggleWeatherOverlay(weatherOverlayEnabled);
            });
        }

        // Transfer Corridors Toggle
        const transferToggle = document.getElementById('transferCorridorsToggle');
        if (transferToggle) {
            transferToggle.addEventListener('change', (e) => {
                transferCorridorsEnabled = e.target.checked;
                toggleTransferCorridors(transferCorridorsEnabled);
            });
        }

        // Initialize transfer corridors table
        updateTransferCorridorsTable(app.currentScenario || 'normal');
    } catch (error) {
        console.error('Network map enhancements initialization error:', error);
    }
}

// Toggle Weather Overlay
function toggleWeatherOverlay(enabled) {
    try {
        const weatherInfo = document.getElementById('weatherOverlayInfo');
        if (!weatherInfo) return;

        if (enabled) {
            // Show weather overlay
            weatherInfo.style.display = 'block';
            renderWeatherZones(app.currentScenario || 'normal');
        } else {
            // Hide weather overlay
            weatherInfo.style.display = 'none';
            removeWeatherZones();
        }
    } catch (error) {
        console.error('Weather overlay toggle error:', error);
    }
}

// Render Weather Zones
function renderWeatherZones(scenario) {
    try {
        const weatherInfo = document.getElementById('weatherOverlayInfo');
        const svgWrapper = document.getElementById('svg-map-wrapper');
        if (!weatherInfo || !SIMULATION_DATA.weatherZones) return;

        const zones = SIMULATION_DATA.weatherZones[scenario] || [];

        // Render weather zone info
        weatherInfo.innerHTML = zones.map(zone => `
            <div class="weather-zone-item">
                <div class="weather-zone-name">${zone.name}</div>
                <span class="weather-zone-type ${zone.type}">${zone.type.toUpperCase()}</span>
                <div class="weather-zone-details">
                    <div>🌡️ ${zone.temp}</div>
                    ${zone.humidity ? `<div>💧 Humidity: ${zone.humidity}</div>` : ''}
                    ${zone.duration ? `<div>📅 ${zone.duration}</div>` : ''}
                    <div><strong>${zone.impact}</strong></div>
                </div>
            </div>
        `).join('');

        // Add visual overlays to SVG map
        if (svgWrapper && zones.length > 0) {
            const svg = svgWrapper.querySelector('svg');
            if (svg) {
                // Remove existing overlays
                svg.querySelectorAll('.weather-zone-overlay').forEach(el => el.remove());

                // Add new overlays based on affected regions
                zones.forEach(zone => {
                    if (!zone.regions || zone.regions.length === 0) return;

                    zone.regions.forEach(regionId => {
                        const node = SIMULATION_DATA.mapNodes.find(n => n.id === regionId);
                        if (!node) return;

                        // Create a circle overlay around the affected node
                        const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                        overlay.setAttribute('class', 'weather-zone-overlay');
                        overlay.setAttribute('cx', node.x);
                        overlay.setAttribute('cy', node.y);
                        overlay.setAttribute('r', '8');

                        // Insert before nodes so they appear on top
                        const firstNode = svg.querySelector('.map-node');
                        if (firstNode) {
                            svg.insertBefore(overlay, firstNode);
                        } else {
                            svg.appendChild(overlay);
                        }
                    });
                });
            }
        }
    } catch (error) {
        console.error('Weather zones render error:', error);
    }
}

// Remove Weather Zones
function removeWeatherZones() {
    try {
        const svgWrapper = document.getElementById('svg-map-wrapper');
        if (svgWrapper) {
            const svg = svgWrapper.querySelector('svg');
            if (svg) {
                svg.querySelectorAll('.weather-zone-overlay').forEach(el => el.remove());
            }
        }
    } catch (error) {
        console.error('Weather zones removal error:', error);
    }
}

// Toggle Transfer Corridors
function toggleTransferCorridors(enabled) {
    try {
        const svgWrapper = document.getElementById('svg-map-wrapper');
        if (!svgWrapper) return;

        const svg = svgWrapper.querySelector('svg');
        if (!svg) return;

        const lines = svg.querySelectorAll('.transfer-line');
        lines.forEach(line => {
            line.style.display = enabled ? 'block' : 'none';
        });
    } catch (error) {
        console.error('Transfer corridors toggle error:', error);
    }
}

// Render Transfer Corridors on Map
function renderTransferCorridors(scenario) {
    try {
        const svgWrapper = document.getElementById('svg-map-wrapper');
        if (!svgWrapper || !SIMULATION_DATA.transferCorridors) return;

        const svg = svgWrapper.querySelector('svg');
        if (!svg) return;

        // Remove existing corridors
        svg.querySelectorAll('.transfer-line').forEach(el => el.remove());

        // Get corridors for this scenario
        const corridors = SIMULATION_DATA.transferCorridors.filter(c =>
            !c.scenario || c.scenario === scenario
        );

        // Draw transfer lines
        corridors.forEach(corridor => {
            const originNode = SIMULATION_DATA.mapNodes.find(n => n.id === corridor.origin);
            const destNode = SIMULATION_DATA.mapNodes.find(n => n.id === corridor.destination);

            if (!originNode || !destNode) return;

            // Create line element
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('class', `transfer-line ${corridor.performance} ${corridor.volume === 'emergency' ? 'emergency' : ''}`);
            line.setAttribute('x1', originNode.x);
            line.setAttribute('y1', originNode.y);
            line.setAttribute('x2', destNode.x);
            line.setAttribute('y2', destNode.y);

            // Set stroke width based on volume
            let strokeWidth = '0.5';
            if (corridor.volume === 'high' || corridor.volume === 'emergency') {
                strokeWidth = '1';
            } else if (corridor.volume === 'medium') {
                strokeWidth = '0.7';
            }
            line.setAttribute('stroke-width', strokeWidth);

            // Add tooltip
            const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
            title.textContent = `${originNode.label} → ${destNode.label}
${corridor.monthlyUnits} units/month
${corridor.avgDays} day average
${corridor.productMix.join(', ')}`;
            line.appendChild(title);

            // Insert before nodes
            const firstNode = svg.querySelector('.map-node');
            if (firstNode) {
                svg.insertBefore(line, firstNode);
            } else {
                svg.appendChild(line);
            }
        });

        // Toggle visibility based on current state
        toggleTransferCorridors(transferCorridorsEnabled);
    } catch (error) {
        console.error('Transfer corridors render error:', error);
    }
}

// Update Transfer Corridors Table
function updateTransferCorridorsTable(scenario) {
    try {
        const tableBody = document.getElementById('transferCorridorsTable');
        if (!tableBody || !SIMULATION_DATA.transferCorridors) return;

        // Get corridors for this scenario, sorted by monthly units descending
        const corridors = SIMULATION_DATA.transferCorridors
            .filter(c => !c.scenario || c.scenario === scenario)
            .sort((a, b) => b.monthlyUnits - a.monthlyUnits)
            .slice(0, 10); // Top 10

        tableBody.innerHTML = corridors.map(corridor => {
            const originNode = SIMULATION_DATA.mapNodes.find(n => n.id === corridor.origin);
            const destNode = SIMULATION_DATA.mapNodes.find(n => n.id === corridor.destination);

            if (!originNode || !destNode) return '';

            const route = `${originNode.label.split(',')[0]} → ${destNode.label.split(',')[0]}`;
            const products = corridor.productMix.slice(0, 2).join(', ');

            return `
                <tr>
                    <td class="transfer-route">${route}</td>
                    <td>${corridor.monthlyUnits}</td>
                    <td>${corridor.avgDays.toFixed(1)}</td>
                    <td class="transfer-products">${products}</td>
                    <td><span class="transfer-status-badge ${corridor.performance}">${corridor.performance.toUpperCase()}</span></td>
                </tr>
            `;
        }).join('');
    } catch (error) {
        console.error('Transfer corridors table update error:', error);
    }
}

// Export functions for use in main app
window.initNetworkMapEnhancements = initNetworkMapEnhancements;
window.renderTransferCorridors = renderTransferCorridors;
window.updateTransferCorridorsTable = updateTransferCorridorsTable;
window.toggleWeatherOverlay = toggleWeatherOverlay;
