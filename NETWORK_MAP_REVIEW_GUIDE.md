# 🗺️ Network Map Feature Review Guide

Follow these steps to verify the new Network Map enhancements in your HVAC Simulator.

## 1. 🚀 Launch the Application
Open `index.html` in your browser (or use Live Server if available).

## 2. 📍 Navigate to Network Map
1. Look at the sidebar navigation on the left.
2. Click on the **Network Map** icon (usually looks like a map or node graph).
3. **Verify:** You should see the new "Distribution Network" panel with a map and a "Top Transfer Corridors" table on the right.

## 3. 🌦️ Test Weather Overlay
1. Locate the **"Weather Overlay"** toggle switch at the top of the map panel.
2. Turn it **ON**.
3. **Verify:**
   - Colored zones should appear on the map (e.g., over the Southeast US).
   - A "Weather Overlay Info" box should appear inside the map area listing details (e.g., "Southeast Heatwave", "102-108°F").

## 4. 🚚 Test Transfer Corridors
1. Locate the **"Transfer Corridors"** toggle switch.
2. Turn it **ON** (if not already on).
3. **Verify:**
   - Lines should connect various branch dots on the map.
   - **Green lines:** Normal performance.
   - **Amber/Red lines:** Slow or delayed routes.
   - **Hover:** Hover your mouse over a line. A tooltip should appear showing:
     - Route (e.g., "Houston → Dallas")
     - Volume (Units/Mo)
     - Average Days
     - Top Products

## 5. ⛈️ Test Scenario Integration (The "Wow" Factor)
1. Go to the top-left of the dashboard.
2. Switch the Scenario toggle from **"Normal Operations"** to **"Severe Weather (SE)"**.
3. **Observe the Map:**
   - **New Lines:** Look for **dashed red lines** appearing (e.g., Phoenix to Houston). These represent emergency stock transfers.
   - **Weather Zones:** The weather overlay (if ON) will show the specific Heatwave data.
4. **Observe the Table:**
   - The "Top Transfer Corridors" table on the right will update.
   - You should see "Emergency" or "Delayed" statuses appearing in the list.

## 6. 📋 Verify Data Consistency
1. Check the **"Top Transfer Corridors"** table.
2. Compare a route listed there (e.g., "Houston → Dallas") with the visual line on the map.
3. The data (Units/Mo, Status) should match.

---
**✅ Success Criteria:**
- Toggles work smoothly.
- Data updates instantly when switching scenarios.
- Visuals (lines, zones) align with the story of a "Southeast Heatwave".
