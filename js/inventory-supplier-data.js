/**
 * Inventory & Supplier Risk Module Data
 * Realistic HVACR distribution data for advanced features
 */

const INVENTORY_SUPPLIER_DATA = {
    // ===== INVENTORY MODULE =====

    // 2.1 Pre-Season Build Status Dashboard
    preSeasonBuild: {
        season: "Cooling Pre-Season (Mar-May 2025)",
        lastUpdated: "May 26, 2025",
        categories: [
            {
                category: "2-3T Condensers",
                region: "Houston",
                targetUnits: 1200,
                currentUnits: 860,
                gap: -340,
                status: "Behind",
                daysOfSupply: 18,
                targetDOS: 35
            },
            {
                category: "3-5T Condensers",
                region: "Dallas",
                targetUnits: 950,
                currentUnits: 920,
                gap: -30,
                status: "At Risk",
                daysOfSupply: 32,
                targetDOS: 35
            },
            {
                category: "3-5T Condensers",
                region: "Atlanta",
                targetUnits: 800,
                currentUnits: 810,
                gap: +10,
                status: "On Track",
                daysOfSupply: 37,
                targetDOS: 35
            },
            {
                category: "Air Handlers (3-5T)",
                region: "Miami",
                targetUnits: 650,
                currentUnits: 580,
                gap: -70,
                status: "At Risk",
                daysOfSupply: 28,
                targetDOS: 35
            },
            {
                category: "Evaporator Coils",
                region: "Houston",
                targetUnits: 1500,
                currentUnits: 1480,
                gap: -20,
                status: "On Track",
                daysOfSupply: 34,
                targetDOS: 35
            },
            {
                category: "Compressors (3-5T)",
                region: "Dallas",
                targetUnits: 680,
                currentUnits: 520,
                gap: -160,
                status: "Behind",
                daysOfSupply: 16,
                targetDOS: 35
            },
            {
                category: "Thermostats (WiFi)",
                region: "Atlanta",
                targetUnits: 2200,
                currentUnits: 2180,
                gap: -20,
                status: "On Track",
                daysOfSupply: 42,
                targetDOS: 40
            },
            {
                category: "Refrigerant (R-410A)",
                region: "Houston",
                targetUnits: 850,
                currentUnits: 890,
                gap: +40,
                status: "On Track",
                daysOfSupply: 38,
                targetDOS: 35
            }
        ]
    },

    // 2.2 Hub-and-Spoke Optimization
    hubSpoke: {
        hubs: [
            {
                id: "hub-houston",
                name: "Houston DC",
                location: { x: 50, y: 60 },
                totalInventory: 8500,
                avgDOS: 38,
                status: "overstocked"
            },
            {
                id: "hub-atlanta",
                name: "Atlanta DC",
                location: { x: 72, y: 58 },
                totalInventory: 6200,
                avgDOS: 32,
                status: "normal"
            }
        ],
        spokes: [
            {
                id: "spoke-dallas",
                name: "Dallas",
                hub: "hub-houston",
                location: { x: 45, y: 55 },
                onHand: 1200,
                dos: 22,
                avgLeadTime: 2.1,
                risk: "medium"
            },
            {
                id: "spoke-austin",
                name: "Austin",
                hub: "hub-houston",
                location: { x: 48, y: 65 },
                onHand: 450,
                dos: 9,
                avgLeadTime: 1.8,
                risk: "high"
            },
            {
                id: "spoke-miami",
                name: "Miami",
                hub: "hub-atlanta",
                location: { x: 80, y: 70 },
                onHand: 980,
                dos: 18,
                avgLeadTime: 3.2,
                risk: "medium"
            },
            {
                id: "spoke-charlotte",
                name: "Charlotte",
                hub: "hub-atlanta",
                location: { x: 76, y: 52 },
                onHand: 1100,
                dos: 28,
                avgLeadTime: 2.5,
                risk: "low"
            }
        ],
        rebalancingSuggestions: [
            {
                from: "Houston DC",
                to: "Austin",
                units: 50,
                productFamily: "Split Systems (3-5T)",
                reason: "Austin DOS 9 days (target 20); Houston DOS 38 days",
                priority: "High",
                estimatedDays: 2
            },
            {
                from: "Houston DC",
                to: "Dallas",
                units: 35,
                productFamily: "Compressors",
                reason: "Dallas DOS 22 days (target 30); Houston overstocked",
                priority: "Medium",
                estimatedDays: 2
            },
            {
                from: "Atlanta DC",
                to: "Miami",
                units: 28,
                productFamily: "Air Handlers",
                reason: "Miami DOS 18 days (target 25); Atlanta excess stock",
                priority: "Medium",
                estimatedDays: 3
            }
        ]
    },

    // 2.3 Dead Stock (R-22 / Obsolete) Risk Tracker
    deadStock: [
        {
            branch: "Phoenix",
            sku: "R22-COND-3T",
            description: "R-22 Condenser 3-Ton Legacy",
            refrigerantType: "R-22",
            lastSaleDate: "2024-03-15",
            monthsSinceMovement: 14,
            onHandUnits: 27,
            unitCost: 1800,
            totalValue: 48600,
            action: "Liquidate",
            reason: "R-22 phase-out complete"
        },
        {
            branch: "Dallas",
            sku: "R22-CMP-ZP42",
            description: "Copeland R-22 Scroll Compressor",
            refrigerantType: "R-22",
            lastSaleDate: "2024-02-10",
            monthsSinceMovement: 15,
            onHandUnits: 18,
            unitCost: 2200,
            totalValue: 39600,
            action: "Liquidate",
            reason: "Discontinued refrigerant"
        },
        {
            branch: "Houston",
            sku: "MTR-PSC-OLD",
            description: "PSC Motor 3/4HP (Discontinued Model)",
            refrigerantType: "N/A",
            lastSaleDate: "2024-07-20",
            monthsSinceMovement: 10,
            onHandUnits: 45,
            unitCost: 420,
            totalValue: 18900,
            action: "Transfer to High-Demand",
            reason: "Low local demand; high in Southeast"
        },
        {
            branch: "Miami",
            sku: "R22-COIL-AH4T",
            description: "Air Handler Coil 4T R-22",
            refrigerantType: "R-22",
            lastSaleDate: "2024-01-05",
            monthsSinceMovement: 16,
            onHandUnits: 12,
            unitCost: 980,
            totalValue: 11760,
            action: "Scrap / Write-Off",
            reason: "No market demand; obsolete"
        },
        {
            branch: "Atlanta",
            sku: "TSTAT-MECH-OLD",
            description: "Mechanical Thermostat (Non-Digital)",
            refrigerantType: "N/A",
            lastSaleDate: "2024-04-12",
            monthsSinceMovement: 13,
            onHandUnits: 68,
            unitCost: 85,
            totalValue: 5780,
            action: "Liquidate",
            reason: "Market shift to smart thermostats"
        },
        {
            branch: "Chicago",
            sku: "R22-TXV-3T",
            description: "TXV for R-22 3-Ton",
            refrigerantType: "R-22",
            lastSaleDate: "2024-06-01",
            monthsSinceMovement: 11,
            onHandUnits: 34,
            unitCost: 145,
            totalValue: 4930,
            action: "Return to Vendor",
            reason: "Vendor buyback program available"
        }
    ],

    // ===== SUPPLIER RISK MODULE =====

    // 3.1 Container Tracking / "On the Water" View
    containers: [
        {
            containerId: "MSCU8234567",
            vendor: "AC Components Ltd",
            originPort: "Shanghai, China",
            destinationPort: "Long Beach, CA",
            status: "On the Water",
            eta: "2025-12-12",
            daysLate: 0,
            criticalSKUs: "180 Compressors, 90 Motors, 45 TXVs",
            departureDate: "2025-11-20",
            estimatedDays: 22
        },
        {
            containerId: "HDMU2876543",
            vendor: "CopperLine International",
            originPort: "Busan, South Korea",
            destinationPort: "Houston, TX",
            status: "At Transshipment",
            eta: "2025-12-08",
            daysLate: 3,
            criticalSKUs: "250 Copper Linesets, 120 Coils",
            departureDate: "2025-11-15",
            estimatedDays: 23
        },
        {
            containerId: "TEMU3456789",
            vendor: "Global Motors Supply",
            originPort: "Shenzhen, China",
            destinationPort: "Savannah, GA",
            status: "On the Water",
            eta: "2025-12-15",
            daysLate: 0,
            criticalSKUs: "320 ECM Motors, 180 Capacitors",
            departureDate: "2025-11-22",
            estimatedDays: 23
        },
        {
            containerId: "CMAU4567890",
            vendor: "AC Components Ltd",
            originPort: "Ningbo, China",
            destinationPort: "Los Angeles, CA",
            status: "At Destination Port",
            eta: "2025-12-03",
            daysLate: 6,
            criticalSKUs: "95 Compressors, 210 Contactors",
            departureDate: "2025-11-08",
            estimatedDays: 25
        },
        {
            containerId: "OOLU5678901",
            vendor: "Smart Controls Inc",
            originPort: "Tokyo, Japan",
            destinationPort: "Seattle, WA",
            status: "On the Water",
            eta: "2025-12-10",
            daysLate: 0,
            criticalSKUs: "450 WiFi Thermostats, 380 Controllers",
            departureDate: "2025-11-24",
            estimatedDays: 16
        },
        {
            containerId: "MAEU6789012",
            vendor: "CopperLine International",
            originPort: "Qingdao,China",
            destinationPort: "Norfolk, VA",
            status: "At Origin",
            eta: "2025-12-20",
            daysLate: 0,
            criticalSKUs: "180 Evaporator Coils, 95 Condenser Coils",
            departureDate: "2025-11-28",
            estimatedDays: 22
        }
    ],

    // 3.2 Warranty Return Rate Spike Alerts
    warrantyAlerts: [
        {
            date: "2025-10-15",
            vendor: "NorthStar Motors",
            sku: "NS-MTR-1HP",
            productFamily: "Motors",
            currentReturnRate: 4.8,
            baselineRate: 1.2,
            spikeMultiplier: 4.0,
            impact: "High",
            suggestedAction: "Flag for quality review and hold future POs",
            onHandUnits: 340,
            onHandValue: 68000,
            affectedUnits: 127
        },
        {
            date: "2025-10-20",
            vendor: "BudgetCool Compressors",
            sku: "BC-CMP-3T-R410",
            productFamily: "Compressors",
            currentReturnRate: 6.2,
            baselineRate: 1.8,
            spikeMultiplier: 3.4,
            impact: "High",
            suggestedAction: "Immediate vendor quality audit; stop shipments",
            onHandUnits: 185,
            onHandValue: 277500,
            affectedUnits: 89
        },
        {
            date: "2025-10-22",
            vendor: "QuickConnect Controls",
            sku: "QC-TSTAT-WIFI",
            productFamily: "Thermostats",
            currentReturnRate: 3.5,
            baselineRate: 1.1,
            spikeMultiplier: 3.2,
            impact: "Medium",
            suggestedAction: "Review with vendor; possible firmware issue",
            onHandUnits: 520,
            onHandValue: 62400,
            affectedUnits: 68
        },
        {
            date: "2025-10-25",
            vendor: "AC Components Ltd",
            sku: "AC-CONT-40A",
            productFamily: "Contactors",
            currentReturnRate: 2.8,
            baselineRate: 0.9,
            spikeMultiplier: 3.1,
            impact: "Medium",
            suggestedAction: "Monitor closely; request vendor investigation",
            onHandUnits: 890,
            onHandValue: 26700,
            affectedUnits: 42
        },
        {
            date: "2025-10-28",
            vendor: "EcoFlow Coils",
            sku: "EF-COIL-AH-5T",
            productFamily: "Coils",
            currentReturnRate: 2.2,
            baselineRate: 1.0,
            spikeMultiplier: 2.2,
            impact: "Low",
            suggestedAction: "Track trend; no immediate action needed",
            onHandUnits: 245,
            onHandValue: 73500,
            affectedUnits: 18
        }
    ],

    // Summary Stats
    summary: {
        containersOnWater: 14,
        containersAtRisk: 3,
        totalDeadStockValue: 129570,
        highRiskWarrantyAlerts: 2,
        preSeasonCategoriesBehind: 2
    }
};
