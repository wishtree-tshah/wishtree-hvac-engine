/**
 * HVACR Distribution - Realistic Simulation Data
 * Industry: Heating, Ventilation, Air Conditioning & Refrigeration
 * Scenario: Mid-sized distributor with 8 branches across US regions
 * Time Period: Late May 2025 (Pre-Summer Season)
 */

const SIMULATION_DATA = {
    // ERP Source Tables (Realistic staging layer)
    sourceTables: [
        "Staging.Product_Master",
        "Staging.Branch_Locations",
        "Staging.Vendor_Catalog",
        "Staging.Inventory_Snapshot",
        "Staging.Sales_History_24M",
        "Staging.Supersession_Chain"
    ],

    // Simulation Log Sequence (Realistic ETL process)
    logSequence: [
        { type: "INFO", msg: "Initializing Wishtree HVAC Data Connector v4.2.1..." },
        { type: "INFO", msg: "Establishing secure connection to Legacy ERP (Eclipse/Prophet 21)..." },
        { type: "SUCCESS", msg: "Connection established. Latency: 18ms. Database: HVAC_PROD_2025" },
        { type: "INFO", msg: "Beginning Batch Ingestion Job #2025-05-26-NIGHT..." },
        { type: "INFO", msg: "Reading source table: Staging.Product_Master..." },
        { type: "SUCCESS", msg: "Loaded 14,205 SKUs (Compressors: 2,841 | Coils: 3,102 | Motors: 1,987 | Parts: 6,275)" },
        { type: "INFO", msg: "Reading source table: Staging.Branch_Locations..." },
        { type: "SUCCESS", msg: "Loaded 8 active branches (4 Southeast, 2 Northeast, 1 West, 1 Midwest)" },
        { type: "INFO", msg: "Reading source table: Staging.Inventory_Snapshot..." },
        { type: "SUCCESS", msg: "Loaded $18.4M inventory value across all locations (as of 05/26/2025 23:59)" },
        { type: "INFO", msg: "Validating data integrity against HARDI schema v2.3..." },
        { type: "WARN", msg: "Found 12 orphaned SKUs in branch ATL-02 (legacy R-22 refrigerant parts). Flagging for review." },
        { type: "WARN", msg: "Detected 3 supersession chain breaks in Copeland compressor family CMP-ZP*" },
        { type: "SUCCESS", msg: "Validation complete. 98.7% data quality score (Target: >97%)" },
        { type: "INFO", msg: "Starting transformation pipeline (Holt-Winters + ARIMA hybrid)..." },
        { type: "INFO", msg: "Calculating seasonal demand patterns for cooling season (Jun-Sep)..." },
        { type: "SUCCESS", msg: "Transformation successful. 14,193 SKUs processed. 12 flagged for manual review." },
        { type: "INFO", msg: "Detecting weather-driven demand signals (NOAA integration)..." },
        { type: "SUCCESS", msg: "Weather correlation complete. Heatwave risk: Southeast (Jun 10-18, 102°F+)" },
        { type: "SUCCESS", msg: "Batch Job #2025-05-26-NIGHT completed in 4m 12s." },
        { type: "INFO", msg: "Pushing insights to Executive Dashboard..." }
    ],

    // SCENARIO DATASETS - Realistic HVACR Operations
    scenarios: {
        // NORMAL OPERATIONS (Late May - Pre-Summer Build Complete)
        normal: {
            kpis: {
                // Forecast Accuracy: Strong (pre-season planning complete)
                accuracy: {
                    value: "94.2%",
                    trend: "positive",
                    diff: "+1.8% vs Apr"
                },
                // Service Level: Excellent (inventory loaded for summer)
                service: {
                    value: "97.8%",
                    trend: "positive",
                    diff: "+0.6% vs target (97%)"
                },
                // Inventory Value: High (pre-season build complete)
                inventory: {
                    value: "$18.4M",
                    trend: "neutral",
                    diff: "Peak Season Ready"
                },
                // Exceptions: Low (normal operations)
                exceptions: {
                    value: "8",
                    trend: "positive",
                    diff: "3 resolved today"
                }
            },

            charts: {
                // Demand vs Supply (Weekly - Last 6 weeks leading to summer)
                // Units in thousands, showing seasonal ramp-up
                demand: {
                    // Actual demand (climbing toward summer peak)
                    demand: [4200, 4850, 5100, 5600, 6200, 6800],
                    // Supply plan (slightly ahead to maintain buffer)
                    supply: [4400, 5000, 5300, 5800, 6400, 7000]
                },

                // Inventory Health by Branch (% of optimal stock level)
                inventory: {
                    // Branch stock levels (all well-stocked for summer)
                    data: [94, 89, 96, 82, 91, 88, 93, 87],
                    // Color coding: Green = healthy, Yellow = watch, Red = critical
                    colors: [
                        '#10b981', // Houston: 94% (excellent)
                        '#10b981', // Dallas: 89% (good)
                        '#10b981', // Austin: 96% (excellent)
                        '#f59e0b', // Miami: 82% (watch - high demand area)
                        '#10b981', // Atlanta: 91% (good)
                        '#10b981', // Charlotte: 88% (good)
                        '#10b981', // Phoenix: 93% (excellent)
                        '#10b981'  // Chicago: 87% (good)
                    ]
                }
            },

            // Live Intelligence Feed (Realistic operational events)
            feed: [
                { time: "14:42:18", text: "Demand forecast updated for Jun-Jul cooling season. Compressor demand +18% YoY." },
                { time: "14:38:45", text: "Inventory rebalancing: Transfer 24 units CMP-3T-R410A from Phoenix → Miami (ETA: 2 days)" },
                { time: "14:35:12", text: "New supplier price list applied: Carrier (effective 06/01/2025, avg +3.2%)" },
                { time: "14:31:08", text: "Stockout alert resolved: SKU MTR-1HP-208V restocked at Dallas (vendor: Genteq, qty: 48)" },
                { time: "14:28:33", text: "Pre-season build status: 96.4% complete. Target: 97% by May 31st." },
                { time: "14:22:51", text: "Contractor alert: ABC Mechanical (Houston) placed emergency order - 8x CMP-ZP34K (same-day)" }
            ]
        },

        // SEVERE WEATHER SCENARIO (Southeast Heatwave - June)
        weather: {
            kpis: {
                // Forecast Accuracy: Drops (unexpected surge)
                accuracy: {
                    value: "87.6%",
                    trend: "negative",
                    diff: "-6.6% (weather spike)"
                },
                // Service Level: Stressed (high demand, some stockouts)
                service: {
                    value: "91.2%",
                    trend: "negative",
                    diff: "-6.6% (target: 97%)"
                },
                // Inventory Value: Depleting (fast burn in affected regions)
                inventory: {
                    value: "$15.8M",
                    trend: "negative",
                    diff: "-$2.6M in 10 days"
                },
                // Exceptions: High (many alerts)
                exceptions: {
                    value: "34",
                    trend: "negative",
                    diff: "+26 new (weather-driven)"
                }
            },

            charts: {
                // Demand vs Supply (Severe spike in weeks 4-6)
                demand: {
                    // Actual demand (massive spike due to heatwave)
                    demand: [4200, 4850, 5100, 7800, 9200, 10500],
                    // Supply plan (can't keep up - supplier delays)
                    supply: [4400, 5000, 5300, 5900, 6100, 6300]
                },

                // Inventory Health by Branch (Southeast depleted)
                inventory: {
                    // Critical depletion in Southeast (Houston, Dallas, Miami, Atlanta)
                    data: [42, 38, 51, 28, 35, 62, 88, 91],
                    colors: [
                        '#ef4444', // Houston: 42% (CRITICAL - heatwave epicenter)
                        '#ef4444', // Dallas: 38% (CRITICAL)
                        '#f59e0b', // Austin: 51% (WARNING)
                        '#ef4444', // Miami: 28% (CRITICAL - always high demand)
                        '#ef4444', // Atlanta: 35% (CRITICAL)
                        '#f59e0b', // Charlotte: 62% (WARNING - edge of heatwave)
                        '#10b981', // Phoenix: 88% (OK - different weather pattern)
                        '#10b981'  // Chicago: 91% (OK - not affected)
                    ]
                }
            },

            // Live Intelligence Feed (Crisis mode)
            feed: [
                { time: "10:18:42", text: "🔴 CRITICAL: NWS Heat Warning - Southeast (Jun 10-18). Temps 102-108°F. Demand surge imminent." },
                { time: "10:15:28", text: "🔴 Emergency: Compressor stockout risk in 72hrs - Houston, Dallas, Atlanta. Expediting orders." },
                { time: "10:12:15", text: "Demand Spike Detected: Compressors +340%, Capacitors +280%, Contactors +195% (Southeast region)" },
                { time: "10:08:47", text: "Supplier Delay: Copeland shipment delayed 5 days (port congestion). ETA now Jun 15." },
                { time: "10:05:33", text: "AI Recommendation: Emergency transfer Phoenix→Houston (120 units CMP-2T-4T, overnight freight $8.2K)" },
                { time: "10:02:19", text: "Contractor Surge: 847 emergency service calls logged (vs. 180 normal). Parts demand critical." },
                { time: "09:58:04", text: "Freight Alert: Expedited shipping costs +420% due to capacity crunch. Approve override?" }
            ]
        }
    },

    // Network Map Nodes (Realistic US branch locations)
    mapNodes: [
        // SOUTHEAST REGION (High cooling demand, affected by heatwave scenario)
        {
            id: "houston", x: 52, y: 70, status: "online", label: "Houston, TX",
            inventory: "$3.2M", branches: 2, contractors: 340
        },
        {
            id: "dallas", x: 48, y: 58, status: "online", label: "Dallas, TX",
            inventory: "$2.8M", branches: 1, contractors: 285
        },
        {
            id: "austin", x: 50, y: 68, status: "online", label: "Austin, TX",
            inventory: "$1.4M", branches: 1, contractors: 145
        },
        {
            id: "miami", x: 80, y: 85, status: "online", label: "Miami, FL",
            inventory: "$2.9M", branches: 2, contractors: 310
        },
        {
            id: "atlanta", x: 72, y: 62, status: "online", label: "Atlanta, GA",
            inventory: "$3.1M", branches: 2, contractors: 380
        },

        // OTHER REGIONS (Not affected by Southeast heatwave)
        {
            id: "charlotte", x: 76, y: 55, status: "online", label: "Charlotte, NC",
            inventory: "$2.2M", branches: 1, contractors: 220
        },
        {
            id: "phoenix", x: 25, y: 65, status: "online", label: "Phoenix, AZ",
            inventory: "$1.9M", branches: 1, contractors: 175
        },
        {
            id: "chicago", x: 65, y: 38, status: "online", label: "Chicago, IL",
            inventory: "$1.9M", branches: 1, contractors: 190
        }
    ],

    // Realistic SKU Examples (HVACR Product Catalog)
    sampleSKUs: {
        compressors: [
            "CMP-ZP34K-R410A",    // Copeland Scroll 3-ton
            "CMP-ZP42K-R410A",    // Copeland Scroll 3.5-ton
            "CMP-CR32K-TFD",      // Copeland Reciprocating
            "CMP-3D38-208V",      // Tecumseh 3-ton
            "CMP-AW5538E-R410A"   // Tecumseh Rotary
        ],
        coils: [
            "COIL-AH-3T-TXV",     // Air Handler Coil 3-ton with TXV
            "COIL-EVCL-14-SLAB",  // Evaporator Coil Slab
            "COIL-COND-4T-CU",    // Condenser Coil Copper
            "COIL-AH-5T-PISTON"   // Air Handler 5-ton Piston
        ],
        motors: [
            "MTR-1HP-208-230V",   // Blower Motor 1HP
            "MTR-3/4HP-1075RPM",  // Condenser Fan Motor
            "MTR-1/3HP-ECM",      // ECM Variable Speed
            "MTR-1/2HP-4POLE"     // PSC Motor
        ],
        parts: [
            "CAP-45-5-440V",      // Run Capacitor 45/5 MFD
            "CONT-40A-24V",       // Contactor 40 Amp
            "TSTAT-PRO-WIFI",     // Programmable Thermostat
            "TXV-3T-R410A",       // Thermal Expansion Valve
            "FILTER-20X25X4"      // MERV-13 Filter
        ]
    },

    // Realistic Vendor/Supplier Data
    suppliers: {
        tier1: ["Copeland", "Carrier", "Trane", "Lennox", "Rheem"],
        tier2: ["Genteq", "Mars", "Honeywell", "White-Rodgers"],
        tier3: ["Generic Parts", "Aftermarket Accessories"]
    },

    // Seasonal Demand Multipliers (HVACR Industry Pattern)
    seasonalFactors: {
        jan: 0.65,  // Low (heating tail-off)
        feb: 0.70,  // Low
        mar: 0.85,  // Rising (spring prep)
        apr: 1.05,  // Pre-season build
        may: 1.25,  // Pre-season peak
        jun: 1.55,  // Summer start
        jul: 1.75,  // Peak cooling
        aug: 1.70,  // Peak cooling
        sep: 1.40,  // Cooling tail-off
        oct: 0.95,  // Shoulder season
        nov: 0.80,  // Low
        dec: 0.75   // Low (holiday slow)
    },

    // Weather Overlay Data (Realistic NOAA-style zones)
    weatherZones: {
        normal: [
            {
                name: "Southeast",
                regions: ["houston", "dallas", "austin", "miami", "atlanta"],
                type: "normal",
                temp: "85-95°F",
                impact: "Seasonal demand levels",
                demandChange: "+0%"
            }
        ],
        weather: [
            {
                name: "Southeast Heatwave",
                regions: ["houston", "dallas", "austin", "miami", "atlanta"],
                type: "heatwave",
                temp: "102-108°F",
                humidity: "65-80%",
                duration: "Jun 10-18",
                impact: "Compressors +340%, Capacitors +280%, Contactors +195%",
                demandChange: "+35%"
            },
            {
                name: "Charlotte Warning",
                regions: ["charlotte"],
                type: "watch",
                temp: "98-102°F",
                impact: "Edge of heatwave zone - moderate demand increase",
                demandChange: "+15%"
            }
        ]
    },

    // Transfer Corridor Data (Inter-branch inventory transfers)
    transferCorridors: [
        // Major DC to Branch Routes
        {
            origin: "houston",
            destination: "dallas",
            monthlyUnits: 285,
            avgDays: 2.1,
            productMix: ["3-5T Condensers", "Compressors", "Coils"],
            performance: "normal", // green
            volume: "high"
        },
        {
            origin: "houston",
            destination: "austin",
            monthlyUnits: 145,
            avgDays: 1.8,
            productMix: ["Compressors", "Motors", "Parts"],
            performance: "normal",
            volume: "medium"
        },
        {
            origin: "atlanta",
            destination: "charlotte",
            monthlyUnits: 198,
            avgDays: 2.5,
            productMix: ["Coils", "Air Handlers", "Condensers"],
            performance: "normal",
            volume: "medium"
        },
        {
            origin: "atlanta",
            destination: "miami",
            monthlyUnits: 220,
            avgDays: 3.2,
            productMix: ["Compressors", "Condensers", "Parts"],
            performance: "slow", // amber
            volume: "high"
        },
        {
            origin: "phoenix",
            destination: "houston",
            monthlyUnits: 95,
            avgDays: 4.8,
            productMix: ["Specialty Parts", "Motors", "Controls"],
            performance: "normal",
            volume: "low"
        },
        {
            origin: "chicago",
            destination: "charlotte",
            monthlyUnits: 78,
            avgDays: 3.5,
            productMix: ["Furnace Parts", "Igniters", "Motors"],
            performance: "normal",
            volume: "low"
        },

        // Weather Scenario: Emergency Transfers
        {
            origin: "phoenix",
            destination: "houston",
            monthlyUnits: 320, // Emergency surge
            avgDays: 1.2, // Expedited
            productMix: ["Compressors", "Capacitors", "Contactors"],
            performance: "delayed", // red (high cost, urgent)
            volume: "emergency",
            scenario: "weather" // Only show in weather scenario
        },
        {
            origin: "chicago",
            destination: "atlanta",
            monthlyUnits: 180,
            avgDays: 2.8,
            productMix: ["Compressors", "Coils", "Parts"],
            performance: "slow",
            volume: "medium",
            scenario: "weather"
        },
        {
            origin: "phoenix",
            destination: "dallas",
            monthlyUnits: 160,
            avgDays: 1.5,
            productMix: ["Compressors", "Condensers"],
            performance: "delayed",
            volume: "high",
            scenario: "weather"
        },
        {
            origin: "houston",
            destination: "austin",
            monthlyUnits: 85,
            avgDays: 4.2, // Delayed due to Houston depletion
            productMix: ["Limited Stock", "Parts Only"],
            performance: "delayed",
            volume: "low",
            scenario: "weather"
        }
    ]
};
