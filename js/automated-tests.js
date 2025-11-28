/**
 * AUTOMATED TEST SUITE
 * Verifies functionality of Network Map, Inventory, and Supplier Risk modules.
 */

window.runAutomatedTests = async function () {
    const results = {
        passed: 0,
        failed: 0,
        tests: []
    };

    function log(name, status, message) {
        results.tests.push({ name, status, message });
        if (status === 'PASS') results.passed++;
        else results.failed++;
        console.log(`[${status}] ${name}: ${message}`);
    }

    function assert(condition, name, successMsg, failMsg) {
        if (condition) {
            log(name, 'PASS', successMsg);
        } else {
            log(name, 'FAIL', failMsg);
        }
    }

    async function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    console.log("Starting Automated Tests...");

    // --- TEST GROUP 1: GLOBAL DATA ---
    assert(typeof SIMULATION_DATA !== 'undefined', 'Global Data Exists', 'SIMULATION_DATA is defined', 'SIMULATION_DATA is missing');
    assert(typeof INVENTORY_SUPPLIER_DATA !== 'undefined', 'Inventory Data Exists', 'INVENTORY_SUPPLIER_DATA is defined', 'INVENTORY_SUPPLIER_DATA is missing');

    // --- TEST GROUP 2: NETWORK MAP ---
    // Navigate to Network Map
    const mapNav = document.querySelector('[data-view="network-map"]');
    if (mapNav) {
        mapNav.click();
        await wait(500); // Wait for render

        // Check Toggles
        const weatherToggle = document.getElementById('weatherOverlayToggle');
        const corridorToggle = document.getElementById('transferCorridorsToggle');
        assert(weatherToggle !== null, 'Weather Toggle', 'Weather toggle found', 'Weather toggle missing');
        assert(corridorToggle !== null, 'Corridor Toggle', 'Corridor toggle found', 'Corridor toggle missing');

        // Check Table
        const transferTable = document.getElementById('transferCorridorsTable');
        assert(transferTable && transferTable.rows.length > 0, 'Transfer Table', `Transfer table populated with ${transferTable?.rows.length} rows`, 'Transfer table empty or missing');
    } else {
        log('Network Map Nav', 'FAIL', 'Navigation item not found');
    }

    // --- TEST GROUP 3: INVENTORY MODULE ---
    // Navigate to Inventory
    const invNav = document.querySelector('[data-view="inventory"]');
    if (invNav) {
        invNav.click();
        await wait(500);

        // Check Pre-Season Grid
        const preSeason = document.getElementById('preSeasonGrid');
        assert(preSeason && preSeason.children.length > 0, 'Pre-Season Dashboard', `Dashboard has ${preSeason?.children.length} cards`, 'Dashboard empty');

        // Check Hub-Spoke SVG
        const svgContainer = document.getElementById('hubSpokeSvg');
        const svg = svgContainer?.querySelector('svg');
        assert(svg !== null, 'Hub-Spoke SVG', 'SVG rendered correctly', 'SVG missing');

        // Check Dead Stock Table
        const deadStock = document.getElementById('deadStockTable');
        assert(deadStock && deadStock.rows.length > 0, 'Dead Stock Table', `Table has ${deadStock?.rows.length} rows`, 'Table empty');
    } else {
        log('Inventory Nav', 'FAIL', 'Navigation item not found');
    }

    // --- TEST GROUP 4: SUPPLIER RISK MODULE ---
    // Navigate to Supplier Risk
    const suppNav = document.querySelector('[data-view="supplier-risk"]');
    if (suppNav) {
        suppNav.click();
        await wait(500);

        // Check Container Table
        const containers = document.getElementById('containerTrackingTable');
        assert(containers && containers.rows.length > 0, 'Container Tracking', `Table has ${containers?.rows.length} rows`, 'Table empty');

        // Check Warranty Alerts
        const alerts = document.getElementById('warrantyAlertsTable');
        assert(alerts && alerts.rows.length > 0, 'Warranty Alerts', `Table has ${alerts?.rows.length} rows`, 'Table empty');
    } else {
        log('Supplier Risk Nav', 'FAIL', 'Navigation item not found');
    }

    // Return to Cockpit
    const cockpitNav = document.querySelector('[data-view="cockpit"]');
    if (cockpitNav) cockpitNav.click();

    return results;
};
