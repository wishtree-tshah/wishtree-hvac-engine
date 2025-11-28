document.addEventListener('DOMContentLoaded', () => {
    const app = {
        screens: {
            intro: document.getElementById('intro-screen'),
            simulation: document.getElementById('simulation-screen'),
            main: document.getElementById('main-app-screen')
        },
        elements: {
            startBtn: document.getElementById('start-btn'),
            consoleOutput: document.getElementById('console-output'),
            progressBar: document.getElementById('progress-fill'),
            progressPercent: document.getElementById('progress-percent'),
            systemTime: document.getElementById('system-time'),
            dashboardFeed: document.getElementById('dashboard-feed'),
            navItems: document.querySelectorAll('.nav-item'),
            views: document.querySelectorAll('.view-section'),
            scenarioBtns: document.querySelectorAll('.toggle-btn'),
            svgMapWrapper: document.getElementById('svg-map-wrapper')
        },
        charts: {},
        currentScenario: 'normal',
        currentPeriod: 'W',

        init() {
            try {
                this.updateTime();
                setInterval(() => this.updateTime(), 1000);

                // Event Listeners
                if (this.elements.startBtn) {
                    this.elements.startBtn.addEventListener('click', () => this.startSimulation());
                }

                this.elements.navItems.forEach(item => {
                    item.addEventListener('click', (e) => this.handleNavClick(e));
                });

                this.elements.scenarioBtns.forEach(btn => {
                    btn.addEventListener('click', (e) => this.switchScenario(e.target.dataset.scenario));
                });

                // Chart Period Buttons
                document.querySelectorAll('.icon-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => this.updateChartPeriod(e));
                });
                // Initialize Network Map Enhancements
                if (typeof initNetworkMapEnhancements === 'function') {
                    initNetworkMapEnhancements();
                }
                // Initialize Inventory & Supplier Risk Features
                if (typeof initInventoryFeatures === 'function') {
                    initInventoryFeatures();
                }
                if (typeof initSupplierRiskFeatures === 'function') {
                    initSupplierRiskFeatures();
                }
            } catch (error) {
                console.error('Initialization error:', error);
            }
        },

        updateTime() {
            try {
                const now = new Date();
                if (this.elements.systemTime) {
                    this.elements.systemTime.textContent = now.toISOString().replace('T', ' ').split('.')[0];
                }
            } catch (error) {
                console.error('Time update error:', error);
            }
        },

        switchScreen(screenName) {
            try {
                Object.values(this.screens).forEach(s => s && s.classList.remove('active'));
                if (this.screens[screenName]) {
                    this.screens[screenName].classList.add('active');
                }
            } catch (error) {
                console.error('Screen switch error:', error);
            }
        },

        async startSimulation() {
            try {
                this.switchScreen('simulation');
                await this.processLogs();
            } catch (error) {
                console.error('Simulation error:', error);
            }
        },

        async processLogs() {
            try {
                const logs = SIMULATION_DATA.logSequence;
                const totalLogs = logs.length;

                for (let i = 0; i < totalLogs; i++) {
                    const log = logs[i];
                    this.addLogEntry(log);
                    const percent = Math.round(((i + 1) / totalLogs) * 100);

                    if (this.elements.progressBar) {
                        this.elements.progressBar.style.width = `${percent}%`;
                    }
                    if (this.elements.progressPercent) {
                        this.elements.progressPercent.textContent = `${percent}%`;
                    }

                    await this.wait(log.type === 'WARN' ? 600 : 150);
                }

                await this.wait(500);
                this.transitionToMainApp();
            } catch (error) {
                console.error('Log processing error:', error);
            }
        },

        addLogEntry(log) {
            try {
                if (!this.elements.consoleOutput) return;

                const entry = document.createElement('div');
                entry.className = 'log-entry';
                const time = new Date().toLocaleTimeString('en-US', { hour12: false });
                entry.innerHTML = `<span class="log-time">[${time}]</span><span class="log-content"><span class="log-type ${log.type}">${log.type}:</span> ${log.msg}</span>`;
                this.elements.consoleOutput.appendChild(entry);
                this.elements.consoleOutput.scrollTop = this.elements.consoleOutput.scrollHeight;
            } catch (error) {
                console.error('Log entry error:', error);
            }
        },

        transitionToMainApp() {
            try {
                this.switchScreen('main');
                this.initDashboard();
                this.renderMap();
            } catch (error) {
                console.error('Transition error:', error);
            }
        },

        initDashboard() {
            try {
                this.renderCharts('normal');
                this.updateDashboardData('normal');
            } catch (error) {
                console.error('Dashboard initialization error:', error);
            }
        },

        handleNavClick(e) {
            try {
                const target = e.currentTarget;
                const viewId = target.dataset.view;

                // Update Nav UI
                this.elements.navItems.forEach(item => item.classList.remove('active'));
                target.classList.add('active');

                // Update View

                this.elements.views.forEach(view => view.classList.remove('active'));
                const targetView = document.getElementById(`view-${viewId}`);
                if (targetView) {
                    targetView.classList.add('active');
                    // Initialize Network Map features when switching to map view
                    if (viewId === 'network-map') {
                        this.renderMap();
                        if (typeof renderTransferCorridors === 'function') {
                            renderTransferCorridors(this.currentScenario);
                        }
                        if (typeof updateTransferCorridorsTable === 'function') {
                            updateTransferCorridorsTable(this.currentScenario);
                        }
                    }

                    // Initialize Inventory & Supplier Risk features when switching to view
                    if (viewId === 'inventory') {
                        if (typeof initInventoryFeatures === 'function') {
                            initInventoryFeatures();
                        }
                    }
                    if (viewId === 'supplier-risk') {
                        if (typeof initSupplierRiskFeatures === 'function') {
                            initSupplierRiskFeatures();
                        }
                    }
                }
            } catch (error) {
                console.error('Navigation error:', error);
            }
        },

        switchScenario(scenario) {
            try {
                if (this.currentScenario === scenario) return;
                this.currentScenario = scenario;

                // Update Buttons
                this.elements.scenarioBtns.forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.scenario === scenario);
                });

                // Update Data & Charts
                this.updateDashboardData(scenario);
                this.updateCharts(scenario);
                this.updateMapStatus(scenario);
                // Update Network Map features for new scenario
                if (typeof renderTransferCorridors === 'function') {
                    renderTransferCorridors(scenario);
                }
                if (typeof updateTransferCorridorsTable === 'function') {
                    updateTransferCorridorsTable(scenario);
                }
            } catch (error) {
                console.error('Scenario switch error:', error);
            }
        },

        updateDashboardData(scenario) {
            try {
                const data = SIMULATION_DATA.scenarios[scenario];
                if (!data) return;

                // Update KPIs
                this.updateKPI('accuracy', data.kpis.accuracy);
                this.updateKPI('service', data.kpis.service);
                this.updateKPI('inventory', data.kpis.inventory);
                this.updateKPI('exceptions', data.kpis.exceptions);

                // Update Feed
                if (this.elements.dashboardFeed) {
                    this.elements.dashboardFeed.innerHTML = '';
                    data.feed.forEach(item => {
                        const div = document.createElement('div');
                        div.className = 'activity-item';
                        div.innerHTML = `<span class="activity-time">${item.time}</span><span class="activity-text">${item.text}</span>`;
                        this.elements.dashboardFeed.appendChild(div);
                    });
                }
            } catch (error) {
                console.error('Dashboard data update error:', error);
            }
        },

        updateKPI(id, data) {
            try {
                const el = document.getElementById(`kpi-${id}`);
                if (!el) return;

                const trendEl = el.nextElementSibling;

                // Animate Value
                el.style.opacity = 0;
                setTimeout(() => {
                    el.textContent = data.value;
                    el.className = `kpi-value ${id === 'exceptions' && this.currentScenario === 'weather' ? 'warning' : ''}`;
                    el.style.opacity = 1;
                }, 200);

                // Update Trend
                if (trendEl) {
                    trendEl.className = `kpi-trend ${data.trend}`;
                    const icon = data.trend === 'positive' ? 'up' : (data.trend === 'negative' ? 'down' : 'minus');
                    trendEl.innerHTML = `<i class="fa-solid fa-arrow-${icon}"></i> ${data.diff}`;
                }
            } catch (error) {
                console.error('KPI update error:', error);
            }
        },

        renderCharts(scenario) {
            try {
                const data = SIMULATION_DATA.scenarios[scenario]?.charts;
                if (!data) return;

                // Demand Chart
                const demandCanvas = document.getElementById('demandChart');
                if (demandCanvas) {
                    const ctxDemand = demandCanvas.getContext('2d');
                    this.charts.demand = new Chart(ctxDemand, {
                        type: 'line',
                        data: {
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                            datasets: [{
                                label: 'Demand Forecast',
                                data: data.demand.demand,
                                borderColor: '#3b82f6',
                                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                tension: 0.4,
                                fill: true
                            }, {
                                label: 'Supply Plan',
                                data: data.demand.supply,
                                borderColor: '#10b981',
                                backgroundColor: 'rgba(16, 185, 129, 0.05)',
                                borderDash: [5, 5],
                                tension: 0.4
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { labels: { color: '#94a3b8' } } },
                            scales: {
                                y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
                                x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                            },
                            animation: { duration: 1000 }
                        }
                    });
                }

                // Inventory Chart
                const inventoryCanvas = document.getElementById('inventoryChart');
                if (inventoryCanvas) {
                    const ctxInventory = inventoryCanvas.getContext('2d');
                    this.charts.inventory = new Chart(ctxInventory, {
                        type: 'bar',
                        data: {
                            labels: ['Austin', 'Dallas', 'Houston', 'Miami', 'New York'],
                            datasets: [{
                                label: 'Stock Level',
                                data: data.inventory.data,
                                backgroundColor: data.inventory.colors,
                                borderRadius: 4
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false } },
                            scales: {
                                y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
                                x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                            },
                            animation: { duration: 1000 }
                        }
                    });
                }
            } catch (error) {
                console.error('Chart rendering error:', error);
            }
        },

        updateCharts(scenario) {
            try {
                const data = SIMULATION_DATA.scenarios[scenario]?.charts;
                if (!data) return;

                // Update Demand Chart
                if (this.charts.demand) {
                    this.charts.demand.data.datasets[0].data = data.demand.demand;
                    this.charts.demand.data.datasets[1].data = data.demand.supply;
                    this.charts.demand.update();
                }

                // Update Inventory Chart
                if (this.charts.inventory) {
                    this.charts.inventory.data.datasets[0].data = data.inventory.data;
                    this.charts.inventory.data.datasets[0].backgroundColor = data.inventory.colors;
                    this.charts.inventory.update();
                }
            } catch (error) {
                console.error('Chart update error:', error);
            }
        },

        updateChartPeriod(e) {
            try {
                const btn = e.target;
                const period = btn.dataset.period;
                if (!period) return;

                // Update UI
                document.querySelectorAll('.icon-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                this.currentPeriod = period;

                const baseData = SIMULATION_DATA.scenarios[this.currentScenario]?.charts?.demand;
                if (!baseData) return;

                let newDataDemand, newDataSupply, newLabels;

                if (period === 'W') {
                    newLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'];
                    newDataDemand = baseData.demand;
                    newDataSupply = baseData.supply;
                } else if (period === 'M') {
                    newLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                    newDataDemand = baseData.demand.map(v => v * 4.2);
                    newDataSupply = baseData.supply.map(v => v * 4.2);
                } else if (period === 'Q') {
                    newLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
                    newDataDemand = [15000, 18000, 16000, 21000];
                    newDataSupply = [15500, 17500, 16500, 20000];
                }

                if (this.charts.demand) {
                    this.charts.demand.data.labels = newLabels;
                    this.charts.demand.data.datasets[0].data = newDataDemand;
                    this.charts.demand.data.datasets[1].data = newDataSupply;
                    this.charts.demand.update();
                }
            } catch (error) {
                console.error('Chart period update error:', error);
            }
        },

        renderMap() {
            try {
                if (!this.elements.svgMapWrapper) return;

                const nodes = SIMULATION_DATA.mapNodes;
                const svgContent = `
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <!-- US Map Outline -->
                        <path d="M10,20 L30,20 L40,30 L80,25 L90,35 L85,80 L50,90 L15,80 Z" 
                              fill="none" stroke="rgba(59, 130, 246, 0.2)" stroke-width="0.5" />
                        
                        <!-- Connections -->
                        <line x1="45" y1="65" x2="48" y2="55" stroke="rgba(255,255,255,0.1)" stroke-width="0.2" />
                        <line x1="48" y1="55" x2="52" y2="70" stroke="rgba(255,255,255,0.1)" stroke-width="0.2" />
                        <line x1="52" y1="70" x2="80" y2="85" stroke="rgba(255,255,255,0.1)" stroke-width="0.2" />

                        <!-- Nodes -->
                        ${nodes.map(node => `
                            <g class="map-node" id="node-${node.id}">
                                <circle cx="${node.x}" cy="${node.y}" r="1.5" fill="${this.getNodeColor(node.status)}" class="node-dot" />
                                <circle cx="${node.x}" cy="${node.y}" r="4" fill="transparent" stroke="${this.getNodeColor(node.status)}" stroke-opacity="0.3" class="node-pulse">
                                    <animate attributeName="r" from="1.5" to="4" dur="2s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
                                </circle>
                                <text x="${node.x}" y="${node.y - 3}" font-size="2" fill="#94a3b8" text-anchor="middle">${node.label}</text>
                            </g>
                        `).join('')}
                    </svg>
                `;
                this.elements.svgMapWrapper.innerHTML = svgContent;
            } catch (error) {
                console.error('Map rendering error:', error);
            }
        },

        updateMapStatus(scenario) {
            try {
                const nodes = SIMULATION_DATA.mapNodes;
                nodes.forEach(node => {
                    let status = 'online';
                    if (scenario === 'weather' && (node.id === 'houston' || node.id === 'miami')) {
                        status = 'danger';
                    }

                    const nodeEl = document.getElementById(`node-${node.id}`);
                    if (nodeEl) {
                        const dot = nodeEl.querySelector('.node-dot');
                        const pulse = nodeEl.querySelector('.node-pulse');
                        const color = this.getNodeColor(status);

                        if (dot) dot.setAttribute('fill', color);
                        if (pulse) pulse.setAttribute('stroke', color);
                    }
                });
            } catch (error) {
                console.error('Map status update error:', error);
            }
        },

        getNodeColor(status) {
            if (status === 'danger') return '#ef4444';
            if (status === 'warning') return '#f59e0b';
            return '#10b981';
        },

        wait(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    };

    app.init();
});
