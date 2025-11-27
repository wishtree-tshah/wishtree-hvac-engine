/**
 * EXTENDED HVACR DATA - Advanced Features
 * This file contains data for:
 * - Demand AI (Project vs Run-Rate, Attach Rates, Weather Alerts)
 * - Inventory (Pre-Season Build, Hub-Spoke, Dead Stock)
 * - Supplier Risk (Container Tracking, Warranty Returns)
 * - Network Map (Weather Overlay, Transfer Corridors)
 */

const EXTENDED_DATA = {

    // ========================================
    // 1. DEMAND AI MODULE DATA
    // ========================================

    demandAI: {
        // 1.1 Project vs Run-Rate Splitter
        projectVsRunRate: {
            // Monthly data for last 12 months (units)
            months: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],

            // By product group
            condensers: {
                runRate: [420, 380, 450, 580, 720, 950, 1200, 1350, 1280, 980, 650, 480],
                project: [180, 120, 95, 220, 380, 420, 280, 150, 190, 320, 240, 160]
            },
            airHandlers: {
                runRate: [310, 290, 340, 480, 620, 820, 1050, 1180, 1120, 850, 520, 360],
                project: [140, 95, 75, 180, 290, 320, 220, 110, 150, 260, 190, 120]
            },
            compressors: {
                runRate: [580, 520, 610, 780, 920, 1150, 1420, 1580, 1490, 1140, 820, 640],
                project: [90, 60, 45, 110, 180, 210, 140, 75, 95, 160, 120, 80]
            },

            // Example projects for tooltips
            recentProjects: [
                { name: "Memorial Hospital HVAC Retrofit", units: 320, value: "$285K", status: "Completed" },
                { name: "School District Summer Upgrade", units: 180, value: "$165K", status: "In Progress" },
                { name: "Office Complex New Construction", units: 240, value: "$220K", status: "Quoted" }
            ]
        },

        // 1.2 Attach Rate AI
        attachRates: {
            // Primary product: Heat Pumps (3-5 ton)
            heatPumps: {
                thermostats: { actual: 48, target: 70, opportunity: 22 },
                filters: { actual: 62, target: 85, opportunity: 23 },
                lineSets: { actual: 78, target: 90, opportunity: 12 },
                pads: { actual: 82, target: 95, opportunity: 13 },
                disconnects: { actual: 71, target: 88, opportunity: 17 }
            },

            // Primary product: Condensers (3-5 ton)
            condensers: {
                thermostats: { actual: 52, target: 65, opportunity: 13 },
                pads: { actual: 88, target: 95, opportunity: 7 },
                whips: { actual: 85, target: 92, opportunity: 7 },
                disconnects: { actual: 79, target: 90, opportunity: 11 },
                filters: { actual: 45, target: 70, opportunity: 25 }
            },

            // Primary product: Furnaces
            furnaces: {
                thermostats: { actual: 68, target: 80, opportunity: 12 },
                filters: { actual: 72, target: 90, opportunity: 18 },
                humidifiers: { actual: 28, target: 45, opportunity: 17 },
                uvLights: { actual: 15, target: 35, opportunity: 20 },
                coDetectors: { actual: 42, target: 60, opportunity: 18 }
            },

            // Recommendations
            recommendations: [
                {
                    primary: "3-5T Heat Pumps",
                    accessory: "Thermostats",
                    actualRate: 48,
                    targetRate: 70,
                    gap: 22,
                    monthlyOpportunity: 35,
                    suggestion: "Bundle WiFi thermostats with heat pump installs. Target contractors: ABC Mechanical, CoolAir Services, Comfort Pro HVAC."
                },
                {
                    primary: "Condensers",
                    accessory: "Filters",
                    actualRate: 45,
                    targetRate: 70,
                    gap: 25,
                    monthlyOpportunity: 42,
                    suggestion: "Offer 6-month filter subscription with condenser purchase. Focus on residential replacement market."
                },
                {
                    primary: "Furnaces",
                    accessory: "UV Lights",
                    actualRate: 15,
                    targetRate: 35,
                    gap: 20,
                    monthlyOpportunity: 18,
                    suggestion: "IAQ bundle promotion for furnace installs. Emphasize health benefits and energy savings."
                }
            ]
        },

        // 1.3 Weather-Driven Demand Spike Alerts
        weatherAlerts: {
            active: [
                {
                    region: "Southeast (Atlanta, Miami, Charlotte)",
                    productGroup: "Cooling Equipment",
                    severity: "High",
                    heatIndex: 108,
                    duration: "10 days",
                    expectedSpike: "+32%",
                    affectedSKUs: ["3-5T Condensers", "Compressors", "Capacitors", "Contactors"],
                    recommendation: "Pre-build 120 additional compressor units. Expedite Copeland order. Alert top 15 contractors.",
                    startDate: "Jun 10",
                    endDate: "Jun 20"
                },
                {
                    region: "Texas (Houston, Dallas, Austin)",
                    productGroup: "Cooling Equipment",
                    severity: "High",
                    heatIndex: 105,
                    duration: "12 days",
                    expectedSpike: "+38%",
                    affectedSKUs: ["Condensers", "Motors", "Run Capacitors"],
                    recommendation: "Emergency stock transfer from Phoenix. Increase safety stock by 40%.",
                    startDate: "Jun 12",
                    endDate: "Jun 24"
                },
                {
                    region: "Midwest (Chicago)",
                    productGroup: "Heating Equipment",
                    severity: "Medium",
                    coldIndex: -15,
                    duration: "5 days",
                    expectedSpike: "+18%",
                    affectedSKUs: ["Igniters", "Gas Valves", "Flame Sensors"],
                    recommendation: "Monitor furnace part inventory. Typical winter spike pattern.",
                    startDate: "Jan 15",
                    endDate: "Jan 20"
                }
            ]
        }
    },

    // ========================================
    // 2. INVENTORY MODULE DATA
    // ========================================

    inventory: {
        // 2.1 Pre-Season Build Status
        preSeasonBuild: {
            season: "Cooling 2025",
            targetDate: "May 31, 2025",
            overallProgress: 96.4,

            categories: [
                {
                    category: "3-5T Condensers",
                    region: "Houston",
                    targetUnits: 1200,
                    currentUnits: 860,
                    gap: -340,
                    status: "Behind",
                    daysRemaining: 12
                },
                {
                    category: "2-3T Split Systems",
                    region: "Dallas",
                    targetUnits: 850,
                    currentUnits: 820,
                    gap: -30,
                    status: "At Risk",
                    daysRemaining: 12
                },
                {
                    category: "Compressors (All)",
                    region: "Southeast",
                    targetUnits: 2400,
                    currentUnits: 2310,
                    gap: -90,
                    status: "At Risk",
                    daysRemaining: 12
                },
                {
                    category: "Air Handlers",
                    region: "Miami",
                    targetUnits: 680,
                    currentUnits: 695,
                    gap: +15,
                    status: "On Track",
                    daysRemaining: 12
                },
                {
                    category: "Coils (Evap/Cond)",
                    region: "Atlanta",
                    targetUnits: 1500,
                    currentUnits: 1485,
                    gap: -15,
                    status: "On Track",
                    daysRemaining: 12
                },
                {
                    category: "Motors (1/3-1HP)",
                    region: "All Regions",
                    targetUnits: 3200,
                    currentUnits: 3050,
                    gap: -150,
                    status: "At Risk",
                    daysRemaining: 12
                }
            ]
        },

        // 2.2 Hub-and-Spoke Optimization
        hubSpoke: {
            hubs: [
                {
                    id: "houston-dc",
                    name: "Houston DC",
                    inventory: "$3.2M",
                    capacity: "65%",
                    daysOfSupply: 38,
                    status: "Overstocked"
                },
                {
                    id: "atlanta-dc",
                    name: "Atlanta DC",
                    inventory: "$2.8M",
                    capacity: "58%",
                    daysOfSupply: 32,
                    status: "Normal"
                }
            ],

            spokes: [
                {
                    id: "dallas",
                    name: "Dallas",
                    hub: "houston-dc",
                    inventory: "$1.8M",
                    daysOfSupply: 9,
                    target: 20,
                    status: "Starved"
                },
                {
                    id: "austin",
                    name: "Austin",
                    hub: "houston-dc",
                    inventory: "$1.2M",
                    daysOfSupply: 11,
                    target: 18,
                    status: "Low"
                },
                {
                    id: "miami",
                    name: "Miami",
                    hub: "atlanta-dc",
                    inventory: "$2.1M",
                    daysOfSupply: 14,
                    target: 22,
                    status: "Low"
                },
                {
                    id: "charlotte",
                    name: "Charlotte",
                    hub: "atlanta-dc",
                    inventory: "$1.6M",
                    daysOfSupply: 25,
                    target: 20,
                    status: "Normal"
                }
            ],

            recommendations: [
                {
                    from: "Houston DC",
                    to: "Dallas",
                    units: 50,
                    productGroup: "3-5T Split Systems",
                    reason: "Dallas DOS 9 days (target 20); Houston DOS 38 days",
                    estimatedCost: "$2,400",
                    priority: "High"
                },
                {
                    from: "Houston DC",
                    to: "Austin",
                    units: 35,
                    productGroup: "Condensers",
                    reason: "Austin DOS 11 days (target 18); Houston overstocked",
                    estimatedCost: "$1,800",
                    priority: "Medium"
                },
                {
                    from: "Atlanta DC",
                    to: "Miami",
                    units: 42,
                    productGroup: "Compressors",
                    reason: "Miami high demand area, DOS below target",
                    estimatedCost: "$3,200",
                    priority: "High"
                }
            ]
        },

        // 2.3 Dead Stock (R-22 / Obsolete)
        deadStock: {
            totalValue: "$385,400",
            totalUnits: 1847,

            items: [
                {
                    branch: "Phoenix",
                    sku: "R22-COND-3T-OLD",
                    description: "R-22 Condenser 3-Ton (Legacy)",
                    refrigerant: "R-22",
                    lastSaleDate: "14 months ago",
                    monthsSinceMovement: 14,
                    onHandUnits: 27,
                    unitCost: "$1,800",
                    totalValue: "$48,600",
                    action: "Liquidate"
                },
                {
                    branch: "Dallas",
                    sku: "R22-COMP-ZP34",
                    description: "Copeland Scroll Compressor R-22",
                    refrigerant: "R-22",
                    lastSaleDate: "11 months ago",
                    monthsSinceMovement: 11,
                    onHandUnits: 18,
                    unitCost: "$1,450",
                    totalValue: "$26,100",
                    action: "Transfer to Miami"
                },
                {
                    branch: "Chicago",
                    sku: "TSTAT-LEGACY-MERC",
                    description: "Mercury Thermostat (Discontinued)",
                    refrigerant: "N/A",
                    lastSaleDate: "22 months ago",
                    monthsSinceMovement: 22,
                    onHandUnits: 142,
                    unitCost: "$45",
                    totalValue: "$6,390",
                    action: "Scrap / Recycle"
                },
                {
                    branch: "Houston",
                    sku: "R22-REFRIG-30LB",
                    description: "R-22 Refrigerant 30lb Cylinder",
                    refrigerant: "R-22",
                    lastSaleDate: "8 months ago",
                    monthsSinceMovement: 8,
                    onHandUnits: 85,
                    unitCost: "$850",
                    totalValue: "$72,250",
                    action: "Liquidate (EPA Phase-out 2026)"
                },
                {
                    branch: "Atlanta",
                    sku: "COIL-R22-EVCL-OLD",
                    description: "Evaporator Coil R-22 Compatible",
                    refrigerant: "R-22",
                    lastSaleDate: "16 months ago",
                    monthsSinceMovement: 16,
                    onHandUnits: 34,
                    unitCost: "$680",
                    totalValue: "$23,120",
                    action: "Return to Vendor"
                }
            ]
        }
    },

    // ========================================
    // 3. SUPPLIER RISK MODULE DATA
    // ========================================

    supplierRisk: {
        // 3.1 Container Tracking
        containersOnWater: {
            totalContainers: 14,
            atRisk: 3,

            containers: [
                {
                    id: "MSCU-4428901",
                    vendor: "AC Components Ltd",
                    origin: "Shanghai, China",
                    destination: "Long Beach, CA",
                    status: "On the Water",
                    eta: "Dec 12, 2025",
                    daysLate: 0,
                    criticalSKUs: "180 compressors (Copeland equiv.), 90 motors",
                    value: "$850,000"
                },
                {
                    id: "HLCU-9821045",
                    vendor: "Carrier International",
                    origin: "Guangzhou, China",
                    destination: "Houston, TX",
                    status: "At Destination Port",
                    eta: "Dec 8, 2025",
                    daysLate: -2,
                    criticalSKUs: "240 condensers (2-5T), 120 coils",
                    value: "$1,200,000"
                },
                {
                    id: "CMAU-5512309",
                    vendor: "Genteq Motors",
                    origin: "Shenzhen, China",
                    destination: "Savannah, GA",
                    status: "On the Water",
                    eta: "Dec 22, 2025",
                    daysLate: 0,
                    criticalSKUs: "850 blower motors, 420 condenser fan motors",
                    value: "$750,000"
                },
                {
                    id: "OOLU-7734521",
                    vendor: "Copeland Compressors",
                    origin: "Sidney, OH (Domestic)",
                    destination: "Dallas, TX",
                    status: "In Transit (Truck)",
                    eta: "Dec 5, 2025",
                    daysLate: 0,
                    criticalSKUs: "95 scroll compressors (3-5T)",
                    value: "$285,000"
                },
                {
                    id: "TEMU-8821456",
                    vendor: "Honeywell Controls",
                    origin: "Tijuana, Mexico",
                    destination: "Phoenix, AZ",
                    status: "Delayed - Port Congestion",
                    eta: "Dec 18, 2025",
                    daysLate: 7,
                    criticalSKUs: "1,200 thermostats, 850 zone controllers",
                    value: "$420,000"
                }
            ]
        },

        // 3.2 Warranty Return Rate Spikes
        warrantyAlerts: {
            alerts: [
                {
                    date: "Nov 2025",
                    vendor: "NorthStar Motors",
                    sku: "NS-MTR-1HP-208V",
                    productFamily: "Blower Motors",
                    currentRate: 4.8,
                    baselineRate: 1.2,
                    spike: "4.0x",
                    impact: "High",
                    unitsAffected: 87,
                    onHandUnits: 340,
                    exposureValue: "$28,900",
                    action: "Hold future POs. Quality review with vendor."
                },
                {
                    date: "Oct 2025",
                    vendor: "Copeland",
                    sku: "CMP-ZP42K-R410A",
                    productFamily: "Scroll Compressors",
                    currentRate: 3.2,
                    baselineRate: 1.5,
                    spike: "2.1x",
                    impact: "Medium",
                    unitsAffected: 24,
                    onHandUnits: 180,
                    exposureValue: "$72,000",
                    action: "Monitor closely. Batch LOT-2024-Q3 suspect."
                },
                {
                    date: "Nov 2025",
                    vendor: "Generic Controls Co.",
                    sku: "GEN-CAP-45-5",
                    productFamily: "Run Capacitors",
                    currentRate: 8.5,
                    baselineRate: 2.8,
                    spike: "3.0x",
                    impact: "High",
                    unitsAffected: 142,
                    onHandUnits: 850,
                    exposureValue: "$12,750",
                    action: "Stop ordering. Switch to Genteq/Mars brands."
                }
            ]
        }
    },

    // ========================================
    // 4. NETWORK MAP ENHANCEMENTS DATA
    // ========================================

    networkMap: {
        // 4.1 Weather Overlay
        weatherOverlay: {
            regions: [
                {
                    name: "Southeast",
                    branches: ["houston", "dallas", "austin", "miami", "atlanta", "charlotte"],
                    condition: "Heatwave",
                    severity: "High",
                    temperature: "102-108°F",
                    duration: "10 days",
                    demandImpact: "+35% cooling equipment",
                    color: "#ef4444"
                },
                {
                    name: "Midwest",
                    branches: ["chicago"],
                    condition: "Normal",
                    severity: "None",
                    temperature: "72-78°F",
                    duration: "N/A",
                    demandImpact: "Normal",
                    color: "#10b981"
                },
                {
                    name: "Southwest",
                    branches: ["phoenix"],
                    condition: "Hot (Normal for region)",
                    severity: "Low",
                    temperature: "95-102°F",
                    duration: "Ongoing",
                    demandImpact: "+10% (seasonal normal)",
                    color: "#f59e0b"
                }
            ]
        },

        // 4.2 Transfer Corridors
        transferCorridors: [
            {
                origin: "Houston DC",
                destination: "Dallas",
                unitsPerMonth: 220,
                avgLeadTimeDays: 1.5,
                topCategories: ["3-5T Condensers", "Coils", "Compressors"],
                performance: "Normal",
                color: "#10b981"
            },
            {
                origin: "Houston DC",
                destination: "Austin",
                unitsPerMonth: 145,
                avgLeadTimeDays: 1.2,
                topCategories: ["Split Systems", "Air Handlers", "Thermostats"],
                performance: "Normal",
                color: "#10b981"
            },
            {
                origin: "Atlanta DC",
                destination: "Miami",
                unitsPerMonth: 185,
                avgLeadTimeDays: 2.8,
                topCategories: ["Condensers", "Compressors", "Motors"],
                performance: "Normal",
                color: "#10b981"
            },
            {
                origin: "Atlanta DC",
                destination: "Charlotte",
                unitsPerMonth: 95,
                avgLeadTimeDays: 1.8,
                topCategories: ["Furnaces", "Heat Pumps", "Coils"],
                performance: "Normal",
                color: "#10b981"
            },
            {
                origin: "Phoenix",
                destination: "Houston",
                unitsPerMonth: 42,
                avgLeadTimeDays: 4.5,
                topCategories: ["Emergency Transfers", "Compressors"],
                performance: "Slow",
                color: "#f59e0b"
            }
        ]
    }
};
