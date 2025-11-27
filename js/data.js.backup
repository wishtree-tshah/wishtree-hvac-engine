const SIMULATION_DATA = {
    sourceTables: [
        "Staging.Product", "Staging.Branch", "Staging.Vendor", "Staging.Product_Inventory_Location"
    ],
    logSequence: [
        { type: "INFO", msg: "Initializing Wishtree Data Connector v4.2.1..." },
        { type: "INFO", msg: "Establishing secure connection to Legacy ERP Gateway..." },
        { type: "SUCCESS", msg: "Connection established. Latency: 12ms." },
        { type: "INFO", msg: "Beginning Batch Ingestion Job #2025-11-26-A..." },
        { type: "INFO", msg: "Reading source table: Staging.Product..." },
        { type: "SUCCESS", msg: "Loaded 14,205 records from Staging.Product." },
        { type: "INFO", msg: "Reading source table: Staging.Branch..." },
        { type: "SUCCESS", msg: "Loaded 42 active branches." },
        { type: "INFO", msg: "Validating data integrity against schema v2.0..." },
        { type: "WARN", msg: "Found 3 orphaned SKUs in branch_id: 'BR-NY-01'. Marking for review." },
        { type: "SUCCESS", msg: "Validation complete. 99.8% data quality score." },
        { type: "INFO", msg: "Starting transformation pipeline..." },
        { type: "INFO", msg: "Calculating demand patterns using Holt-Winters algorithm..." },
        { type: "SUCCESS", msg: "Transformation successful. 14,202 items processed." },
        { type: "SUCCESS", msg: "Batch Job #2025-11-26-A completed successfully." },
        { type: "INFO", msg: "Pushing insights to Executive Dashboard..." }
    ],

    // SCENARIO DATASETS
    scenarios: {
        normal: {
            kpis: {
                accuracy: { value: "94.8%", trend: "positive", diff: "2.4%" },
                service: { value: "98.2%", trend: "positive", diff: "1.1%" },
                inventory: { value: "$14.2M", trend: "neutral", diff: "Stable" },
                exceptions: { value: "12", trend: "negative", diff: "5 resolved" }
            },
            charts: {
                demand: {
                    demand: [1200, 1350, 1250, 1480, 1600, 1750],
                    supply: [1250, 1400, 1300, 1500, 1650, 1800]
                },
                inventory: {
                    data: [85, 62, 90, 45, 78],
                    colors: ['#3b82f6', '#3b82f6', '#3b82f6', '#f59e0b', '#3b82f6']
                }
            },
            feed: [
                { time: "10:42:05", text: "Demand forecast updated for Q4 2025." },
                { time: "10:41:58", text: "Inventory rebalancing trigger: Austin -> Dallas." },
                { time: "10:41:45", text: "New supplier price list applied for Vendor: Carrier." },
                { time: "10:41:12", text: "Stockout alert resolved: SKU-9921 (Compressor)." }
            ]
        },
        weather: {
            kpis: {
                accuracy: { value: "88.4%", trend: "negative", diff: "-6.4%" },
                service: { value: "92.1%", trend: "negative", diff: "-6.1%" },
                inventory: { value: "$12.8M", trend: "negative", diff: "Depleting Fast" },
                exceptions: { value: "48", trend: "negative", diff: "+36 New Alerts" }
            },
            charts: {
                demand: {
                    demand: [1200, 1350, 1250, 1800, 2100, 2400], // Spike
                    supply: [1250, 1400, 1300, 1350, 1400, 1450]  // Flat supply (shortage)
                },
                inventory: {
                    data: [85, 20, 15, 45, 78], // Dallas & Houston depleted
                    colors: ['#3b82f6', '#ef4444', '#ef4444', '#f59e0b', '#3b82f6']
                }
            },
            feed: [
                { time: "10:45:12", text: "CRITICAL: Severe weather alert in Southeast region." },
                { time: "10:44:55", text: "Demand Spike Detected: Generators & HVAC Parts (Houston)." },
                { time: "10:44:30", text: "Supplier Delay: Logistics halted in Florida/Georgia." },
                { time: "10:44:10", text: "AI Recommendation: Transfer stock from Austin to Houston." }
            ]
        }
    },

    // Map Data (Simplified for SVG)
    mapNodes: [
        { id: "austin", x: 45, y: 65, status: "online", label: "Austin" },
        { id: "dallas", x: 48, y: 55, status: "online", label: "Dallas" },
        { id: "houston", x: 52, y: 70, status: "online", label: "Houston" }, // Risk in weather scenario
        { id: "miami", x: 80, y: 85, status: "online", label: "Miami" },     // Risk in weather scenario
        { id: "ny", x: 85, y: 30, status: "online", label: "New York" },
        { id: "chicago", x: 65, y: 35, status: "online", label: "Chicago" },
        { id: "la", x: 15, y: 55, status: "online", label: "Los Angeles" },
        { id: "seattle", x: 15, y: 20, status: "online", label: "Seattle" }
    ]
};
