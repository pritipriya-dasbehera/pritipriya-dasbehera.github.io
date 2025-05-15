---
layout: page
title: Interactive Izhikevich Neuron Model
description: Interactive visualization of neuronal spiking dynamics
img: assets/img/projects/izhikevich_plot-dark.png
importance: 10
category: research
chart:
  plotly: true
---

## Izhikevich Neuron Model

The Izhikevich model is a simple yet biologically plausible model of neuronal spiking dynamics. It is given by the equations:

$$
\frac{dv}{dt} = 0.04v^2 + 5v + 140 - u + I
$$

$$
\frac{du}{dt} = a(bv - u)
$$

with a reset condition:

$$
\text{if } v \geq 30, \text{ then } v \leftarrow c, \quad u \leftarrow u + d
$$

<div class="row mt-3">
    <div class="col-12 text-center">
        <pre class="plotly-code"><code class="language-plotly" id="izhikevich-data">
{
  "data": [
    {
      "x": [],
      "y": [],
      "mode": "lines",
      "line": {"color": "#007bff", "width": 2},
      "name": "Membrane Potential"
    }
  ],
  "layout": {
    "title": "Izhikevich Neuron Model: Membrane Potential Over Time",
    "xaxis": {"title": "Time [ms]"},
    "yaxis": {"title": "Membrane Potential [mV]", "range": [-80, 40]},
    "margin": {"l": 50, "r": 50, "b": 50, "t": 50}
  }
}
        </code></pre>
        <!-- The plotly chart will be inserted here by the theme system -->
    </div>
</div>

<div class="row mt-4">
    <div class="col-md-8 mx-auto">
        <div class="sliders card p-4">
            <div class="form-group mb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <label for="a-slider" class="fw-bold mb-0">Parameter a:</label>
                    <span id="a-value" class="badge bg-primary">0.02</span>
                </div>
                <input type="range" class="form-range custom-range" id="a-slider" min="0" max="0.1" step="0.001" value="0.02">
                <small class="form-text">Controls the time scale of the recovery variable u</small>
            </div>
            
            <div class="form-group mb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <label for="b-slider" class="fw-bold mb-0">Parameter b:</label>
                    <span id="b-value" class="badge bg-primary">0.2</span>
                </div>
                <input type="range" class="form-range custom-range" id="b-slider" min="0" max="1" step="0.01" value="0.2">
                <small class="form-text">Controls the sensitivity of the recovery variable u</small>
            </div>
            
            <div class="form-group mb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <label for="c-slider" class="fw-bold mb-0">Parameter c:</label>
                    <span id="c-value" class="badge bg-primary">-65</span>
                </div>
                <input type="range" class="form-range custom-range" id="c-slider" min="-100" max="-30" step="1" value="-65">
                <small class="form-text">Membrane potential reset value after spike</small>
            </div>
            
            <div class="form-group mb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <label for="d-slider" class="fw-bold mb-0">Parameter d:</label>
                    <span id="d-value" class="badge bg-primary">8</span>
                </div>
                <input type="range" class="form-range custom-range" id="d-slider" min="0" max="10" step="0.1" value="8">
                <small class="form-text">Recovery variable reset amount after spike</small>
            </div>
            
            <div class="form-group mb-1">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <label for="i-slider" class="fw-bold mb-0">Current I (mV):</label>
                    <span id="i-value" class="badge bg-primary">10</span>
                </div>
                <input type="range" class="form-range custom-range" id="i-slider" min="0" max="100" step="1" value="10">
                <small class="form-text">Input current in millivolts</small>
            </div>
        </div>
    </div>
</div>

<div class="row mt-3">
    <div class="col-md-8 mx-auto">
        <div class="card">
            <div class="card-header fw-bold">
                Neuron Type Presets
            </div>
            <div class="card-body">
                <div class="btn-group w-100" role="group">
                    <button class="btn btn-outline-primary fw-bold" onclick="setPreset(0.02, 0.2, -65, 8)">Regular Spiking</button>
                    <button class="btn btn-outline-primary fw-bold" onclick="setPreset(0.1, 0.2, -65, 2)">Fast Spiking</button>
                    <button class="btn btn-outline-primary fw-bold" onclick="setPreset(0.02, 0.2, -50, 2)">Chattering</button>
                    <button class="btn btn-outline-primary fw-bold" onclick="setPreset(0.02, 0.25, -65, 6)">Intrinsic Bursting</button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.custom-range {
    height: 8px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.custom-range::-webkit-slider-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
}

.custom-range::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
}

.badge {
    min-width: 50px;
    padding: 0.35em 0.5em;
    font-weight: normal;
}

.form-text {
    font-size: 0.85em;
    opacity: 0.8;
}

.sliders .form-group {
    position: relative;
}

[data-theme="dark"] .form-range::-webkit-slider-thumb {
    background: #00bfff;
}

[data-theme="dark"] .form-range::-moz-range-thumb {
    background: #00bfff;
}

[data-theme="dark"] .badge.bg-primary {
    background-color: #00bfff !important;
}

[data-theme="dark"] .btn-outline-primary {
    border-color: #00bfff;
    color: #00bfff;
}

[data-theme="dark"] .btn-outline-primary:hover {
    background-color: #00bfff;
    color: #1e1e1e;
}
</style>

<script>
// We don't need to load Plotly directly or create a container - the theme does this based on our code block above
document.addEventListener('DOMContentLoaded', function() {
    // Wait for the theme system to create the Plotly chart
    setTimeout(function() {
        initializeIzhikevich();
    }, 500);
});

function initializeIzhikevich() {
    // Add event listeners for sliders
    document.querySelectorAll('input[type=range]').forEach(slider => {
        slider.addEventListener('input', function() {
            // Update displayed value
            document.getElementById(this.id.replace('-slider', '-value')).textContent = this.value;
            updateGraph();
        });
    });
    
    // Initialize with current slider values
    updateGraph();
}

function setPreset(a, b, c, d) {
    document.getElementById('a-slider').value = a;
    document.getElementById('b-slider').value = b;
    document.getElementById('c-slider').value = c;
    document.getElementById('d-slider').value = d;
    
    document.getElementById('a-value').textContent = a;
    document.getElementById('b-value').textContent = b;
    document.getElementById('c-value').textContent = c;
    document.getElementById('d-value').textContent = d;
    
    updateGraph();
}

function updateGraph() {
    // Find the plotly chart container created by the theme
    var plotContainer = document.querySelector('.js-plotly-plot');
    if (!plotContainer) return;
    
    // Get parameter values
    var a = parseFloat(document.getElementById('a-slider').value);
    var b = parseFloat(document.getElementById('b-slider').value);
    var c = parseFloat(document.getElementById('c-slider').value);
    var d = parseFloat(document.getElementById('d-slider').value);
    var I_mv = parseFloat(document.getElementById('i-slider').value);
    document.getElementById('i-value').textContent = I_mv;
    
    // Calculate model data
    var v_data = [];
    var u = b * c;  // Initial u value
    var v = c;      // Initial v value

    for (var i = 0; i < 6000; i++) {
        if (v >= 30) {
            v = c;
            u += d;
        }
        v += 0.01 * (0.04 * (v ** 2) + 5 * v + 140 - u + I_mv);
        u += 0.01 * a * (b * v - u);
        v_data.push(v);
    }
    
    // Update the x and y data
    var x_data = Array.from({length: v_data.length}, (_, i) => i * 0.01 * 1000);
    
    // Get current theme for line color
    var theme = document.documentElement.getAttribute('data-theme') || 'light';
    var lineColor = theme === 'dark' ? '#00bfff' : '#007bff';
    
    // Create the new data and update the chart
    var update = {
        'x': [x_data],
        'y': [v_data],
        'line.color': [lineColor]
    };
    
    Plotly.update(plotContainer, update);
}
</script>

<div class="row mt-4">
    <div class="col-md-10 mx-auto">
        <h3>About the Izhikevich Model</h3>
        <p>
            The Izhikevich neuron model is a simplified model that can reproduce many different firing patterns observed in real neurons. 
            Despite its computational simplicity compared to Hodgkin-Huxley-type models, it can reproduce various firing patterns by 
            adjusting just four parameters: a, b, c, and d.
        </p>
        <ul>
            <li><strong>Parameter a:</strong> The time scale of the recovery variable u. Smaller values result in slower recovery.</li>
            <li><strong>Parameter b:</strong> The sensitivity of the recovery variable u to the subthreshold fluctuations of the membrane potential v.</li>
            <li><strong>Parameter c:</strong> The after-spike reset value of the membrane potential v.</li>
            <li><strong>Parameter d:</strong> The after-spike reset of the recovery variable u.</li>
        </ul>
        <p>
            The interactive visualization above allows you to adjust these parameters and observe how they affect the spiking behavior of the neuron.
        </p>
    </div>
</div>
