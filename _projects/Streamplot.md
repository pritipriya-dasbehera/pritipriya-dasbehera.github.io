---
layout: page
title: Vector Field Streamplot
description: Visualisation of vector fields and their streamlines
img: assets/img/projects/streamplot-dark.png
importance: 9
category: research
chart:
  plotly: true
---

The flow of 2D dynamical systems can be visualised by plotting streamlines of vector fields defined by the differential equations:

$$
\frac{dx}{dt} = f(x, y)
$$

$$
\frac{dy}{dt} = g(x, y)
$$

<div class="row mt-3">
    <div class="col-12 text-center">
        <pre class="plotly-code"><code class="language-plotly" id="streamplot-data">
{
  "data": [],
  "layout": {
    "title": "Vector Field Streamplot",
    "xaxis": {"title": "x", "range": [-3, 3], "zeroline": true, "zerolinecolor": "#666", "zerolinewidth": 1},
    "yaxis": {"title": "y", "range": [-3, 3], "zeroline": true, "zerolinecolor": "#666", "zerolinewidth": 1},
    "margin": {"l": 50, "r": 50, "b": 50, "t": 50},
    "showlegend": false,
    "plot_bgcolor": "rgba(0,0,0,0)",
    "paper_bgcolor": "rgba(0,0,0,0)"
  }
}
        </code></pre>
    </div>
</div>

<div class="row mt-4">
    <div class="col-md-10 mx-auto">
        <div class="equations card p-4">
            <h5 class="mb-3">Differential Equations</h5>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group mb-3">
                        <label for="dx-dt" class="fw-bold mb-2">dx/dt =</label>
                        <input type="text" class="form-control" id="dx-dt" value="-y" placeholder="Enter function of x and y">
                        <small class="form-text">Use x, y, sin(), cos(), exp(), log(), sqrt(), pow()</small>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group mb-3">
                        <label for="dy-dt" class="fw-bold mb-2">dy/dt =</label>
                        <input type="text" class="form-control" id="dy-dt" value="x" placeholder="Enter function of x and y">
                        <small class="form-text">Use x, y, sin(), cos(), exp(), log(), sqrt(), pow()</small>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-6">
                    <div class="form-group mb-3">
                        <label for="x-range" class="fw-bold mb-2">X Range:</label>
                        <div class="d-flex gap-2 align-items-center">
                            <input type="number" class="form-control" id="x-min" value="-3" step="0.5">
                            <span>to</span>
                            <input type="number" class="form-control" id="x-max" value="3" step="0.5">
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group mb-3">
                        <label for="y-range" class="fw-bold mb-2">Y Range:</label>
                        <div class="d-flex gap-2 align-items-center">
                            <input type="number" class="form-control" id="y-min" value="-3" step="0.5">
                            <span>to</span>
                            <input type="number" class="form-control" id="y-max" value="3" step="0.5">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-6">
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" id="continuous-lines" checked>
                        <label class="form-check-label fw-bold" for="continuous-lines">
                            Generate Continuous Streamlines
                        </label>
                        <small class="form-text d-block">Unbroken lines that flow smoothly across the domain</small>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" id="show-arrows" checked>
                        <label class="form-check-label fw-bold" for="show-arrows">
                            Show Direction Arrows
                        </label>
                        <small class="form-text d-block">Display vector field direction indicators</small>
                    </div>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-12 text-center">
                    <button class="btn btn-primary btn-lg" onclick="updateStreamplot()">
                        <i class="fas fa-chart-line me-2"></i>Generate Streamplot
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row mt-3">
    <div class="col-md-10 mx-auto">
        <div class="card">
            <div class="card-header fw-bold">
                Example Systems
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3">
                        <button class="btn btn-outline-primary w-100 mb-2" onclick="setPreset('-y', 'x')">
                            <strong>Simple Rotation</strong><br>
                            <small>dx/dt = -y, dy/dt = x</small>
                        </button>
                    </div>
                    <div class="col-md-3">
                        <button class="btn btn-outline-primary w-100 mb-2" onclick="setPreset('x - x*x*x - y', 'y - y*y*y + x')">
                            <strong>Nonlinear System</strong><br>
                            <small>Cubic terms</small>
                        </button>
                    </div>
                    <div class="col-md-3">
                        <button class="btn btn-outline-primary w-100 mb-2" onclick="setPreset('x*(1-x-y)', 'y*(1-x-y)')">
                            <strong>Competition Model</strong><br>
                            <small>Lotka-Volterra type</small>
                        </button>
                    </div>
                    <div class="col-md-3">
                        <button class="btn btn-outline-primary w-100 mb-2" onclick="setPreset('sin(y)', 'cos(x)')">
                            <strong>Trigonometric</strong><br>
                            <small>dx/dt = sin(y), dy/dt = cos(x)</small>
                        </button>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-md-3">
                        <button class="btn btn-outline-primary w-100 mb-2" onclick="setPreset('-x + y', 'x - y')">
                            <strong>Linear System</strong><br>
                            <small>Saddle point</small>
                        </button>
                    </div>
                    <div class="col-md-3">
                        <button class="btn btn-outline-primary w-100 mb-2" onclick="setPreset('y', '-sin(x)')">
                            <strong>Pendulum</strong><br>
                            <small>dx/dt = y, dy/dt = -sin(x)</small>
                        </button>
                    </div>
                    <div class="col-md-3">
                        <button class="btn btn-outline-primary w-100 mb-2" onclick="setPreset('x*(3-x-2*y)', 'y*(2-x-y)')">
                            <strong>Predator-Prey</strong><br>
                            <small>Population dynamics</small>
                        </button>
                    </div>
                    <div class="col-md-3">
                        <button class="btn btn-outline-primary w-100 mb-2" onclick="setPreset('x*x - y*y', '2*x*y')">
                            <strong>Complex Function</strong><br>
                            <small>z² in real form</small>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.form-control {
    border-radius: 6px;
    border: 1px solid #dee2e6;
    transition: all 0.3s ease;
}

.form-control:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.btn-primary {
    background: linear-gradient(45deg, #007bff, #0056b3);
    border: none;
    border-radius: 6px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3);
}

.btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.4);
}

.btn-outline-primary {
    border-radius: 6px;
    transition: all 0.3s ease;
    border-width: 2px;
}

.btn-outline-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3);
}

.form-text {
    font-size: 0.8em;
    opacity: 0.7;
    margin-top: 0.25rem;
}

.equations {
    background: linear-gradient(135deg, rgba(0, 123, 255, 0.05), rgba(0, 123, 255, 0.02));
    border: 1px solid rgba(0, 123, 255, 0.1);
}

[data-theme="dark"] .form-control {
    background-color: #2a2a2a;
    border-color: #444;
    color: #fff;
}

[data-theme="dark"] .form-control:focus {
    border-color: #00bfff;
    box-shadow: 0 0 0 0.2rem rgba(0, 191, 255, 0.25);
}

[data-theme="dark"] .btn-primary {
    background: linear-gradient(45deg, #00bfff, #0099cc);
}

[data-theme="dark"] .btn-outline-primary {
    border-color: #00bfff;
    color: #00bfff;
}

[data-theme="dark"] .btn-outline-primary:hover {
    background-color: #00bfff;
    color: #1e1e1e;
}

[data-theme="dark"] .equations {
    background: linear-gradient(135deg, rgba(0, 191, 255, 0.05), rgba(0, 191, 255, 0.02));
    border-color: rgba(0, 191, 255, 0.1);
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        initializeStreamplot();
    }, 500);
});

function initializeStreamplot() {
    // Add event listeners for input changes
    document.getElementById('dx-dt').addEventListener('input', debounce(updateStreamplot, 500));
    document.getElementById('dy-dt').addEventListener('input', debounce(updateStreamplot, 500));
    document.getElementById('continuous-lines').addEventListener('change', updateStreamplot);
    document.getElementById('show-arrows').addEventListener('change', updateStreamplot);
    
    ['x-min', 'x-max', 'y-min', 'y-max'].forEach(id => {
        document.getElementById(id).addEventListener('input', debounce(updateStreamplot, 500));
    });
    
    // Initial plot
    updateStreamplot();
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function safeEval(expression, x, y) {
    try {
        // Replace mathematical functions and variables
        let expr = expression
            .replace(/\bx\b/g, `(${x})`)
            .replace(/\by\b/g, `(${y})`)
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
            .replace(/exp/g, 'Math.exp')
            .replace(/log/g, 'Math.log')
            .replace(/sqrt/g, 'Math.sqrt')
            .replace(/pow/g, 'Math.pow')
            .replace(/abs/g, 'Math.abs')
            .replace(/\^/g, '**');
        
        return eval(expr);
    } catch (e) {
        return 0;
    }
}

function setPreset(dxdt, dydt) {
    document.getElementById('dx-dt').value = dxdt;
    document.getElementById('dy-dt').value = dydt;
    updateStreamplot();
}

function updateStreamplot() {
    var plotContainer = document.querySelector('.js-plotly-plot');
    if (!plotContainer) return;
    
    // Get equations and ranges
    var dxdt = document.getElementById('dx-dt').value || '0';
    var dydt = document.getElementById('dy-dt').value || '0';
    
    var xMinVal = document.getElementById('x-min').value;
    var xMaxVal = document.getElementById('x-max').value;
    var yMinVal = document.getElementById('y-min').value;
    var yMaxVal = document.getElementById('y-max').value;
    
    var xMin = xMinVal !== '' ? parseFloat(xMinVal) : -3;
    var xMax = xMaxVal !== '' ? parseFloat(xMaxVal) : 3;
    var yMin = yMinVal !== '' ? parseFloat(yMinVal) : -3;
    var yMax = yMaxVal !== '' ? parseFloat(yMaxVal) : 3;
    
    // Handle NaN cases
    if (isNaN(xMin)) xMin = -3;
    if (isNaN(xMax)) xMax = 3;
    if (isNaN(yMin)) yMin = -3;
    if (isNaN(yMax)) yMax = 3;
    
    // Create grid for streamlines
    var gridSize = 15;
    var streamDensity = 8;
    
    var traces = [];
    
    // Get current theme for colors
    var theme = document.documentElement.getAttribute('data-theme') || 'light';
    var streamColor = theme === 'dark' ? '#00bfff' : '#007bff';
    var arrowColor = theme === 'dark' ? '#ffffff' : '#333333';
    
    var continuousLines = document.getElementById('continuous-lines').checked;
    var showArrows = document.getElementById('show-arrows').checked;
    
    // Generate streamlines from multiple starting points
    for (var i = 0; i < streamDensity; i++) {
        for (var j = 0; j < streamDensity; j++) {
            var startX = xMin + (xMax - xMin) * (i + 0.5) / streamDensity;
            var startY = yMin + (yMax - yMin) * (j + 0.5) / streamDensity;
            
            var streamline = generateStreamline(startX, startY, dxdt, dydt, xMin, xMax, yMin, yMax, continuousLines);
            
            if (streamline.x.length > 1) {
                traces.push({
                    x: streamline.x,
                    y: streamline.y,
                    mode: 'lines',
                    line: {
                        color: streamColor,
                        width: 1.5
                    },
                    showlegend: false,
                    hoverinfo: 'none'
                });
            }
        }
    }
    
    // Add vector field arrows as line segments (only if enabled)
    if (showArrows) {
        var arrowGridSize = 10;
        
        // Calculate arrow scale based on axis ranges
        var xRange = xMax - xMin;
        var yRange = yMax - yMin;
        var avgRange = (xRange + yRange) / 2;
        var baseScale = avgRange / arrowGridSize * 0.15;
        
        for (var i = 0; i < arrowGridSize; i++) {
            for (var j = 0; j < arrowGridSize; j++) {
                var x = xMin + xRange * (i + 0.5) / arrowGridSize;
                var y = yMin + yRange * (j + 0.5) / arrowGridSize;
                
                var dx = safeEval(dxdt, x, y);
                var dy = safeEval(dydt, x, y);
                
                var magnitude = Math.sqrt(dx*dx + dy*dy);
                if (magnitude > 1e-6) {
                    var normalizedDx = dx / magnitude * baseScale;
                    var normalizedDy = dy / magnitude * baseScale;
                    
                    // Main arrow line
                    var x1 = x - normalizedDx / 2;
                    var y1 = y - normalizedDy / 2;
                    var x2 = x + normalizedDx / 2;
                    var y2 = y + normalizedDy / 2;
                    
                    traces.push({
                        x: [x1, x2],
                        y: [y1, y2],
                        mode: 'lines',
                        line: {
                            color: arrowColor,
                            width: 2
                        },
                        showlegend: false,
                        hoverinfo: 'none'
                    });
                    
                    // Arrowhead - scale with base scale
                    var headLength = baseScale * 0.4;
                    var headAngle = Math.PI / 6; // 30 degrees
                    
                    var angle = Math.atan2(normalizedDy, normalizedDx);
                    var headX1 = x2 - headLength * Math.cos(angle - headAngle);
                    var headY1 = y2 - headLength * Math.sin(angle - headAngle);
                    var headX2 = x2 - headLength * Math.cos(angle + headAngle);
                    var headY2 = y2 - headLength * Math.sin(angle + headAngle);
                    
                    traces.push({
                        x: [headX1, x2, headX2],
                        y: [headY1, y2, headY2],
                        mode: 'lines',
                        line: {
                            color: arrowColor,
                            width: 2
                        },
                        showlegend: false,
                        hoverinfo: 'none'
                    });
                }
            }
        }
    }
    
    // Update layout
    var layout = {
        title: `Vector Field: dx/dt = ${dxdt}, dy/dt = ${dydt}`,
        xaxis: {
            title: 'x',
            range: [xMin, xMax],
            zeroline: true,
            zerolinecolor: theme === 'dark' ? '#555' : '#ccc',
            zerolinewidth: 1,
            gridcolor: theme === 'dark' ? '#333' : '#eee'
        },
        yaxis: {
            title: 'y',
            range: [yMin, yMax],
            zeroline: true,
            zerolinecolor: theme === 'dark' ? '#555' : '#ccc',
            zerolinewidth: 1,
            gridcolor: theme === 'dark' ? '#333' : '#eee'
        },
        margin: { l: 50, r: 50, b: 50, t: 80 },
        showlegend: false,
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        font: { 
            color: theme === 'dark' ? '#ffffff' : '#000000' 
        }
    };
    
    Plotly.newPlot(plotContainer, traces, layout, {displayModeBar: false});
}

function generateStreamline(startX, startY, dxdt, dydt, xMin, xMax, yMin, yMax, continuous) {
    var x = startX;
    var y = startY;
    var xPath = [x];
    var yPath = [y];
    
    var dt = 0.05;
    var maxSteps = continuous ? 300 : 100;
    
    // For continuous mode, extend the integration domain beyond plot boundaries
    var integrationXMin = continuous ? xMin - (xMax - xMin) * 0.5 : xMin;
    var integrationXMax = continuous ? xMax + (xMax - xMin) * 0.5 : xMax;
    var integrationYMin = continuous ? yMin - (yMax - yMin) * 0.5 : yMin;
    var integrationYMax = continuous ? yMax + (yMax - yMin) * 0.5 : yMax;
    
    // For non-continuous mode, add small buffer to stop before boundaries
    var boundaryBuffer = continuous ? 0 : 0.05;
    var effectiveXMin = xMin + (xMax - xMin) * boundaryBuffer;
    var effectiveXMax = xMax - (xMax - xMin) * boundaryBuffer;
    var effectiveYMin = yMin + (yMax - yMin) * boundaryBuffer;
    var effectiveYMax = yMax - (yMax - yMin) * boundaryBuffer;
    
    for (var step = 0; step < maxSteps; step++) {
        var dx = safeEval(dxdt, x, y);
        var dy = safeEval(dydt, x, y);
        
        // Stop if velocity is too small (fixed point or equilibrium)
        if (Math.abs(dx) < 1e-8 && Math.abs(dy) < 1e-8) break;
        
        // Stop if velocity is too large (numerical instability)
        var magnitude = Math.sqrt(dx*dx + dy*dy);
        if (magnitude > 1000) break;
        
        // Runge-Kutta 4th order integration
        var k1x = dx;
        var k1y = dy;
        
        var k2x = safeEval(dxdt, x + dt * k1x / 2, y + dt * k1y / 2);
        var k2y = safeEval(dydt, x + dt * k1x / 2, y + dt * k1y / 2);
        
        var k3x = safeEval(dxdt, x + dt * k2x / 2, y + dt * k2y / 2);
        var k3y = safeEval(dydt, x + dt * k2x / 2, y + dt * k2y / 2);
        
        var k4x = safeEval(dxdt, x + dt * k3x, y + dt * k3y);
        var k4y = safeEval(dydt, x + dt * k3x, y + dt * k3y);
        
        x += dt * (k1x + 2*k2x + 2*k3x + k4x) / 6;
        y += dt * (k1y + 2*k2y + 2*k3y + k4y) / 6;
        
        if (continuous) {
            // For continuous lines, stop only when leaving extended integration domain
            if (x < integrationXMin || x > integrationXMax || y < integrationYMin || y > integrationYMax) break;
            
            // Check if we've made a complete loop by being close to start
            if (step > 50) {
                var distToStart = Math.sqrt((x - startX)*(x - startX) + (y - startY)*(y - startY));
                var loopThreshold = 0.05 * Math.min(xMax - xMin, yMax - yMin);
                if (distToStart < loopThreshold) {
                    // Close the loop smoothly
                    xPath.push(startX);
                    yPath.push(startY);
                    break;
                }
            }
        } else {
            // Stop if approaching plot boundaries for non-continuous mode
            if (x < effectiveXMin || x > effectiveXMax || y < effectiveYMin || y > effectiveYMax) break;
        }
        
        xPath.push(x);
        yPath.push(y);
    }
    
    return { x: xPath, y: yPath };
}
</script>

<div class="row mt-4">
    <div class="col-md-10 mx-auto">
        <h3>About Vector Field Streamplots</h3>
        <p>
            A streamplot visualizes the flow of a 2D dynamical system by showing 'streamlines' that are tangent 
            to the vector field at every point. Each streamline represents a possible trajectory that a particle would follow 
            if placed in the field.
        </p>
              
        <h4>Supported Functions:</h4>
        <p>
            You can use standard mathematical functions in your equations: <code>sin()</code>, <code>cos()</code>, <code>tan()</code>, 
            <code>exp()</code>, <code>log()</code>, <code>sqrt()</code>, <code>pow()</code>, <code>abs()</code>, and basic arithmetic 
            operations (+, -, *, /, ^).
        </p>
        
        <h4>Interpreting the Plot:</h4>
        <ul>
            <li><strong>Streamlines:</strong> Show the direction and path of flow at different points</li>
            <li><strong>Arrows:</strong> Indicate the local direction of the vector field</li>
            <li><strong>Fixed Points:</strong> Look for regions where streamlines converge or diverge</li>
            <li><strong>Periodic Orbits:</strong> Closed loops in the streamlines indicate oscillatory behavior</li>
        </ul>
    </div>
</div>