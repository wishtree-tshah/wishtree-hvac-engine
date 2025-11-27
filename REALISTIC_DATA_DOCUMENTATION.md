# 📊 REALISTIC HVACR DATA - DOCUMENTATION

## Overview
All data in this simulation reflects **real-world HVACR distribution operations** for a mid-sized distributor with 8 branches across the United States.

---

## 🏢 **COMPANY PROFILE**

**Type:** Regional HVACR Distributor  
**Branches:** 8 locations (4 Southeast, 2 Northeast, 1 West, 1 Midwest)  
**Total Inventory Value:** $18.4M (Normal) / $15.8M (Weather Crisis)  
**SKU Count:** 14,205 active SKUs  
**Contractor Network:** ~2,000 active contractors  
**Annual Revenue:** ~$85M (estimated)  
**Peak Season:** June - September (Cooling)  
**Time Period:** Late May 2025 (Pre-Summer Season)

---

## 📅 **SEASONAL CONTEXT**

### **Current State: Late May 2025**
- **Pre-Season Build:** 96.4% complete
- **Target Completion:** May 31st (before June heatwave season)
- **Inventory Position:** Peak levels ($18.4M)
- **Forecast Accuracy:** 94.2% (strong planning)
- **Service Level:** 97.8% (excellent)

### **Why This Timing Matters:**
- HVAC distributors **front-load inventory** in April-May
- Summer cooling season (Jun-Sep) drives 60% of annual revenue
- Late May = calm before the storm (perfect for simulation baseline)

---

## 📈 **DEMAND PATTERNS (Realistic)**

### **Weekly Demand Trend (Last 6 Weeks)**
```
Week 1: 4,200 units (early May - steady)
Week 2: 4,850 units (+15% - seasonal ramp)
Week 3: 5,100 units (+5% - continued growth)
Week 4: 5,600 units (+10% - pre-season peak)
Week 5: 6,200 units (+11% - contractors stocking up)
Week 6: 6,800 units (+10% - final push before summer)
```

**Why This Is Realistic:**
- Gradual 10-15% weekly increases (not random spikes)
- Reflects contractor pre-buying behavior
- Aligns with NOAA weather forecasts (hot summer predicted)

### **Weather Scenario: Demand Spike**
```
Week 4: 7,800 units (+39% - heatwave starts)
Week 5: 9,200 units (+18% - emergency repairs surge)
Week 6: 10,500 units (+14% - peak crisis)
```

**Why This Is Realistic:**
- Heatwaves cause 30-50% demand spikes in affected regions
- Emergency service calls increase 400-500%
- Compressors, capacitors, contactors see highest demand

---

## 🏭 **INVENTORY HEALTH BY BRANCH**

### **Normal Operations (% of Optimal Stock)**

| Branch | Stock % | Status | Reasoning |
|--------|---------|--------|-----------|
| Houston | 94% | ✅ Excellent | Major hub, well-stocked |
| Dallas | 89% | ✅ Good | Steady demand |
| Austin | 96% | ✅ Excellent | Smaller market, easy to maintain |
| Miami | 82% | ⚠️ Watch | Always high demand (tropical climate) |
| Atlanta | 91% | ✅ Good | Major Southeast hub |
| Charlotte | 88% | ✅ Good | Growing market |
| Phoenix | 93% | ✅ Excellent | Desert climate, high AC demand |
| Chicago | 87% | ✅ Good | Heating-focused, lower cooling stock |

### **Weather Crisis (% of Optimal Stock)**

| Branch | Stock % | Status | Impact |
|--------|---------|--------|--------|
| Houston | 42% | 🔴 CRITICAL | Heatwave epicenter |
| Dallas | 38% | 🔴 CRITICAL | Severe depletion |
| Austin | 51% | ⚠️ WARNING | Affected but smaller |
| Miami | 28% | 🔴 CRITICAL | Always vulnerable + heatwave |
| Atlanta | 35% | 🔴 CRITICAL | Major depletion |
| Charlotte | 62% | ⚠️ WARNING | Edge of heatwave zone |
| Phoenix | 88% | ✅ OK | Different weather pattern |
| Chicago | 91% | ✅ OK | Not affected |

**Why This Is Realistic:**
- Southeast branches hit hardest (heatwave zone)
- Phoenix unaffected (different weather system)
- Chicago unaffected (northern region, no heatwave)
- Miami always vulnerable (tropical climate + tourism)

---

## 🎯 **KPI VALUES (Industry Benchmarks)**

### **Forecast Accuracy**

| Scenario | Value | Industry Benchmark | Reasoning |
|----------|-------|-------------------|-----------|
| Normal | 94.2% | 90-96% | Strong planning, pre-season complete |
| Weather | 87.6% | 85-92% (crisis) | Unexpected spike, but AI adapts |

**Why These Numbers:**
- HVAC demand is seasonal = easier to forecast (90%+ normal)
- Weather events drop accuracy 5-8% (unpredictable)
- Below 85% = poor planning or data quality issues

### **Service Level (Fill Rate)**

| Scenario | Value | Industry Target | Reasoning |
|----------|-------|----------------|-----------|
| Normal | 97.8% | 95-98% | Excellent (pre-season loaded) |
| Weather | 91.2% | 90-94% (crisis) | Stressed but managing |

**Why These Numbers:**
- 97-98% = best-in-class HVAC distributor
- 91-93% = acceptable during crisis
- Below 90% = serious operational issues

### **Inventory Value**

| Scenario | Value | Typical Range | Reasoning |
|----------|-------|---------------|-----------|
| Normal | $18.4M | $15M-$25M | Peak season inventory |
| Weather | $15.8M | $12M-$18M | Fast depletion (-$2.6M in 10 days) |

**Why These Numbers:**
- Mid-sized distributor = $15-25M inventory
- Pre-season peak = upper range
- Crisis burn rate = $200-300K/day realistic

### **Exceptions (Daily Alerts)**

| Scenario | Count | Normal Range | Reasoning |
|----------|-------|--------------|-----------|
| Normal | 8 | 5-15 | Routine stockouts, data issues |
| Weather | 34 | 25-50 (crisis) | Many stockouts, urgent transfers |

**Why These Numbers:**
- 5-15 exceptions/day = normal operations
- 25-50 = crisis mode (many SKUs critical)
- 50+ = system breakdown

---

## 📦 **SKU STRUCTURE (Realistic Naming)**

### **Compressors**
```
CMP-ZP34K-R410A  = Copeland Scroll, 3-ton, R-410A refrigerant
CMP-ZP42K-R410A  = Copeland Scroll, 3.5-ton, R-410A
CMP-CR32K-TFD    = Copeland Reciprocating, 3-ton, TFD series
CMP-3D38-208V    = Tecumseh, 3-ton, 208V power
```

**Format:** `[CATEGORY]-[MODEL]-[SPECS]`

### **Coils**
```
COIL-AH-3T-TXV      = Air Handler Coil, 3-ton, with TXV valve
COIL-EVCL-14-SLAB   = Evaporator Coil, 14" slab style
COIL-COND-4T-CU     = Condenser Coil, 4-ton, copper
```

### **Motors**
```
MTR-1HP-208-230V    = Motor, 1 horsepower, 208-230V
MTR-3/4HP-1075RPM   = Motor, 3/4 HP, 1075 RPM
MTR-1/3HP-ECM       = Motor, 1/3 HP, ECM (variable speed)
```

### **Parts**
```
CAP-45-5-440V       = Capacitor, 45/5 MFD, 440V
CONT-40A-24V        = Contactor, 40 Amp, 24V coil
TSTAT-PRO-WIFI      = Thermostat, programmable, WiFi
TXV-3T-R410A        = Expansion Valve, 3-ton, R-410A
```

---

## 🌡️ **WEATHER SCENARIO DETAILS**

### **Event: Southeast Heatwave (June 10-18, 2025)**

**NOAA Forecast:**
- Temperatures: 102-108°F
- Duration: 8 days
- Affected States: TX, LA, MS, AL, GA, FL
- Heat Index: 110-115°F (dangerous)

**Business Impact:**
- Emergency AC failures: +400%
- Compressor demand: +340%
- Capacitor demand: +280%
- Contractor service calls: 847 (vs. 180 normal)
- Freight costs: +420% (capacity crunch)

**Supply Chain Impact:**
- Copeland shipment delayed 5 days (port congestion)
- Expedited freight required (overnight $8.2K)
- Emergency transfers: Phoenix → Houston (120 units)
- Stockout risk: 72 hours (Houston, Dallas, Atlanta)

**Why This Is Realistic:**
- June heatwaves are common in Southeast US
- AC failures spike when temps exceed 100°F
- Compressors fail first (highest stress component)
- Supply chain can't react fast enough (30-90 day lead times)

---

## 📊 **DATA INTERCONNECTIONS**

### **Example: Houston Branch During Heatwave**

| Module | Data Point | Value | Connection |
|--------|-----------|-------|------------|
| **CEO Cockpit** | Inventory Value | $15.8M | Down from $18.4M |
| **Demand AI** | Forecast Spike | +340% compressors | Houston epicenter |
| **Inventory** | Stock Level | 42% | Critical depletion |
| **Supplier Risk** | Copeland Delay | +5 days | Can't restock fast enough |
| **Network Map** | Node Status | 🔴 Red | Visual alert |
| **Live Feed** | Alert | "Emergency transfer" | Action taken |

**All modules tell the same story:** Houston is in crisis.

---

## 🔗 **SUPERSESSION CHAIN DATA**

### **Chain Health: 96.8%**
- Total SKUs: 14,205
- With valid chains: 13,742
- Broken chains: 127
- Orphaned parts: 336

### **Example Chains:**

**Healthy Chain:**
```
HC-2801 (2018) → HC-2801A (2021) → HC-2801B (2024, Current)
Status: ✅ Complete path to current part
```

**Broken Chain:**
```
COMP-9921 (2019) → COMP-9921X (2022) → [MISSING]
Status: ⚠️ No current replacement identified
```

**Orphaned Part:**
```
MTR-4450 (2017) → [NO SUCCESSOR]
Status: 🔴 Obsolete, no replacement
```

**Why This Matters:**
- Contractor calls: "I need HC-2801 for a 2018 unit"
- Counter staff must know: "That's now HC-2801B"
- Broken chain = lost sale (customer goes to competitor)

---

## 🚚 **SUPPLIER PERFORMANCE**

### **Tier 1 Suppliers (OEM)**
- Copeland, Carrier, Trane, Lennox, Rheem
- Lead Time: 30-60 days
- OTIF: 88-94%
- Price: Premium

### **Tier 2 Suppliers (Components)**
- Genteq, Mars, Honeywell, White-Rodgers
- Lead Time: 14-30 days
- OTIF: 90-96%
- Price: Mid-range

### **Tier 3 Suppliers (Aftermarket)**
- Generic parts, accessories
- Lead Time: 3-14 days
- OTIF: 92-98%
- Price: Budget

**Why This Structure:**
- OEMs have longest lead times (manufacturing complexity)
- Component suppliers faster (smaller parts)
- Aftermarket fastest (commodity items)

---

## 📈 **SEASONAL DEMAND MULTIPLIERS**

| Month | Factor | Reasoning |
|-------|--------|-----------|
| Jan | 0.65x | Low (heating tail-off) |
| Feb | 0.70x | Low (winter end) |
| Mar | 0.85x | Rising (spring prep) |
| Apr | 1.05x | Pre-season build starts |
| May | 1.25x | Pre-season peak |
| **Jun** | **1.55x** | **Summer start** |
| **Jul** | **1.75x** | **Peak cooling** |
| **Aug** | **1.70x** | **Peak cooling** |
| Sep | 1.40x | Cooling tail-off |
| Oct | 0.95x | Shoulder season |
| Nov | 0.80x | Low (pre-winter) |
| Dec | 0.75x | Low (holiday slow) |

**Why This Pattern:**
- HVAC is highly seasonal (2-3x variation)
- Summer (Jun-Sep) = 60% of annual revenue
- Winter (Dec-Feb) = slowest period
- Spring/Fall = shoulder seasons (moderate)

---

## ✅ **DATA QUALITY VALIDATION**

### **Consistency Checks:**

✅ **Demand ↔ Inventory:**
- High demand → Low inventory (Houston: 10,500 units demand, 42% stock)
- Low demand → High inventory (Chicago: normal demand, 91% stock)

✅ **Weather ↔ Geography:**
- Southeast heatwave → Southeast branches critical
- Other regions → Unaffected

✅ **Supplier ↔ Stockouts:**
- Copeland delay → Compressor stockout risk
- Fast suppliers → Parts available

✅ **Forecast ↔ Actual:**
- Normal: 94.2% accuracy (close match)
- Weather: 87.6% accuracy (spike not fully predicted)

✅ **Time Series:**
- Smooth weekly progression (no random jumps)
- Seasonal pattern matches HVAC industry norms

---

## 🎯 **INDUSTRY BENCHMARKS**

| Metric | This Simulation | Industry Average | Best-in-Class |
|--------|----------------|------------------|---------------|
| Forecast Accuracy | 94.2% | 88-92% | 95-97% |
| Service Level | 97.8% | 93-96% | 98-99% |
| Inventory Turns | 4.6x | 4-6x | 6-8x |
| Data Quality | 98.7% | 95-97% | 99%+ |
| OTIF (Suppliers) | 91% | 85-90% | 95%+ |

**Conclusion:** This distributor is **above average** but has room for improvement.

---

## 📝 **REFERENCES**

- **HARDI:** Heating, Air-conditioning & Refrigeration Distributors International
- **NOAA:** National Oceanic and Atmospheric Administration
- **AHRI:** Air-Conditioning, Heating, & Refrigeration Institute
- **Typical ERP Systems:** Eclipse, Prophet 21, Infor Distribution SX.e

---

**END OF DOCUMENTATION**
