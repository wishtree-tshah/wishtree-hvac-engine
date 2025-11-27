# Step-by-Step: Adding the Supersession Widget

## STEP 1: Add CSS Styles

1. Open `css/style.css` in your editor
2. Press `Ctrl+G` (or `Cmd+G` on Mac) to "Go to Line"
3. Type `765` and press Enter (this takes you to line 765)
4. You should see:
   ```css
   .badge.success {
       background: rgba(16, 185, 129, 0.2);
       color: var(--success);
   }
   ```

5. Place your cursor at the END of line 764 (after the closing `}`)
6. Press Enter twice to create blank lines
7. Copy the CSS code below and paste it:

```css
/* Supersession Chain Integrity Styles */
.info-badge {
    background: rgba(59, 130, 246, 0.2);
    color: var(--primary);
    padding: 0.3rem 0.8rem;
    border-radius: 4px;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.supersession-metrics {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin: 1.5rem 0;
}

.metric-box {
    background: rgba(0, 0, 0, 0.2);
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid var(--glass-border);
}

.metric-label {
    font-size: 0.75rem;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.metric-value {
    font-size: 1.8rem;
    font-weight: 700;
    font-family: var(--font-heading);
    margin-bottom: 0.3rem;
}

.metric-value.success { color: var(--success); }
.metric-value.warning { color: var(--warning); }
.metric-value.danger { color: var(--danger); }

.metric-detail {
    font-size: 0.75rem;
    color: var(--text-muted);
}

.chain-examples {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-top: 1rem;
}

.chain-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 6px;
}

.chain-status {
    font-size: 1.2rem;
}

.chain-status.success { color: var(--success); }
.chain-status.warning { color: var(--warning); }
.chain-status.danger { color: var(--danger); }

.chain-path {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--text-main);
}

.chain-path strong {
    color: var(--danger);
    font-weight: 700;
}

@media (max-width: 1200px) {
    .supersession-metrics {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .supersession-metrics {
        grid-template-columns: 1fr;
    }
}
```

8. Save the file (`Ctrl+S` or `Cmd+S`)

---

## STEP 2: Add HTML Widget

1. Open `index.html` in your editor
2. Press `Ctrl+F` (or `Cmd+F`) to open Find
3. Search for: `<!-- More Data Health Widgets would go here -->`
4. You should find it around line 249
5. You'll see this structure:
   ```html
                            </div>
                            <!-- More Data Health Widgets would go here -->
                            <div class="glass-panel wide">
   ```

6. **DELETE** the comment line `<!-- More Data Health Widgets would go here -->`

7. Place your cursor where the comment was (between the two `</div>` and `<div class="glass-panel wide">`)

8. Copy the HTML code below and paste it:

```html
                            
                            <!-- Supersession Chain Integrity Widget -->
                            <div class="kpi-card glass-panel wide-kpi">
                                <div class="panel-header">
                                    <h3><i class="fa-solid fa-link"></i> Supersession Chain Integrity</h3>
                                    <span class="info-badge">HVAC Critical</span>
                                </div>
                                <div class="supersession-metrics">
                                    <div class="metric-box">
                                        <div class="metric-label">Chain Health</div>
                                        <div class="metric-value success">96.8%</div>
                                        <div class="metric-detail">13,742 / 14,205 parts</div>
                                    </div>
                                    <div class="metric-box">
                                        <div class="metric-label">Broken Chains</div>
                                        <div class="metric-value warning">127</div>
                                        <div class="metric-detail">Needs manual review</div>
                                    </div>
                                    <div class="metric-box">
                                        <div class="metric-label">Orphaned Parts</div>
                                        <div class="metric-value danger">336</div>
                                        <div class="metric-detail">No supersession path</div>
                                    </div>
                                    <div class="metric-box">
                                        <div class="metric-label">Avg Chain Depth</div>
                                        <div class="metric-value">2.4</div>
                                        <div class="metric-detail">Max: 8 levels</div>
                                    </div>
                                </div>
                                <div class="chain-examples">
                                    <div class="chain-item">
                                        <span class="chain-status success"><i class="fa-solid fa-check-circle"></i></span>
                                        <span class="chain-path">HC-2801 → HC-2801A → HC-2801B (Current)</span>
                                    </div>
                                    <div class="chain-item">
                                        <span class="chain-status warning"><i class="fa-solid fa-triangle-exclamation"></i></span>
                                        <span class="chain-path">COMP-9921 → COMP-9921X → <strong>[BROKEN]</strong></span>
                                    </div>
                                    <div class="chain-item">
                                        <span class="chain-status danger"><i class="fa-solid fa-circle-xmark"></i></span>
                                        <span class="chain-path">MTR-4450 → <strong>[NO SUCCESSOR]</strong></span>
                                    </div>
                                </div>
                            </div>
                            
```

9. Save the file (`Ctrl+S` or `Cmd+S`)

---

## STEP 3: Test

1. Open `index.html` in your browser
2. Click "Initialize Workflow"
3. Wait for the simulation to complete
4. Click "Data Health" in the sidebar
5. You should see the new "Supersession Chain Integrity" widget!

---

## Troubleshooting

- **Widget doesn't appear**: Check that you pasted the HTML in the correct location
- **Styling looks wrong**: Make sure the CSS was pasted after line 764 in style.css
- **Icons missing**: The Font Awesome library should already be loaded in index.html

---

**That's it! The widget is now installed.**
