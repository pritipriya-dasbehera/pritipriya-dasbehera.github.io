---
layout: page
title: Pott model Phase Transition
description: MCMC simulation of 2nd order transitions
img: assets/img/projects/phase-transition.gif
importance: 8
category: research
chart:
  plotly: true
---

<div class="row mt-3">
  <div class="col-md-6">
    <div class="card">
      <div class="card-header fw-bold text-center">
        Phase Diagram (T vs q)
      </div>
      <div class="card-body p-2">
        <div style="text-align:center;">
          <canvas id="phase-diagram"
                  width="400" height="300"
                  style="border:1px solid #ddd; cursor:crosshair; width:100%; max-width:400px; display:block; margin:0 auto;">
          </canvas>
        </div>
        <div class="mt-2 text-center">
          <small class="text-muted">Drag the red point to set Temperature & q</small>
        </div>
        <div class="mt-2 d-flex justify-content-between">
          <div class="text-center">
            <strong>Temperature:</strong>
            <span id="temp-value" class="badge bg-primary">0.600</span>
          </div>
          <div class="text-center">
            <strong>Potts States (q):</strong>
            <span id="q-value" class="badge bg-warning">10</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-header fw-bold">
        Simulation Controls
      </div>
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <label class="fw-bold">MCMC Steps/Frame:</label>
          <span id="steps-value" class="badge bg-info">150</span>
        </div>
        <input type="range" class="form-range" id="steps-slider" min="10" max="6000" step="10" value="150">

        <div class="mt-3 text-center">
          <button id="random-btn" class="btn btn-outline-primary btn-sm me-1">Random Init</button>
          <button id="ordered-btn" class="btn btn-outline-primary btn-sm me-1">Ordered Init</button>
          <button id="reset-btn" class="btn btn-outline-danger btn-sm me-1">Reset</button>
          <button id="toggle-run-btn" class="btn btn-outline-secondary btn-sm">Pause</button>
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-6">
    <div class="card">
      <div class="card-header fw-bold text-center">
        System State
      </div>
      <div class="card-body p-2">
        <div style="text-align:center;">
          <canvas id="system-state"
                  width="400" height="300"
                  style="border:1px solid #ddd; width:100%; max-width:400px; display:block; margin:0 auto;">
          </canvas>
        </div>
        <div class="mt-2 text-center">
          <small class="text-muted">Each color = one Potts spin state</small>
        </div>
        <div class="mt-2 row text-center">
          <div class="col-4">
            <strong>Majority Fraction:</strong><br>
            <span id="density-value" class="badge bg-success">-</span>
          </div>
          <div class="col-4">
            <strong>Energy:</strong><br>
            <span id="energy-value" class="badge bg-info">-</span>
          </div>
          <div class="col-4">
            <strong>Phase:</strong><br>
            <span id="phase-label" class="badge bg-secondary">-</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-header fw-bold">
        Real-time Statistics
      </div>
      <div class="card-body" style="margin-top:15px; margin-bottom:15px">
        <div class="row text-center">
          <div class="col-6">
            <small class="text-muted">Acceptance Rate:</small><br>
            <span id="acceptance-rate" class="badge bg-primary">-</span>
          </div>
          <div class="col-6">
            <small class="text-muted">MCMC Step:</small><br>
            <span id="mcmc-step" class="badge bg-secondary">0</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
canvas {
    border-radius: 6px;
    transition: all 0.3s ease;
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
}

canvas:hover {
    box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
}

.badge {
    min-width: 50px;
    padding: 0.35em 0.5em;
    font-size: 0.85em;
}

.form-range {
    height: 6px;
    border-radius: 3px;
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

.card {
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.card:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

[data-theme="dark"] canvas {
    border-color: #555;
    background-color: #2a2a2a;
}

[data-theme="dark"] .badge.bg-primary { background-color: #00bfff !important; }
[data-theme="dark"] .badge.bg-secondary { background-color: #6c757d !important; }
[data-theme="dark"] .badge.bg-info { background-color: #17a2b8 !important; }
[data-theme="dark"] .badge.bg-success { background-color: #28a745 !important; }
[data-theme="dark"] .badge.bg-warning { background-color: #ffc107 !important; color: #000 !important; }

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
document.addEventListener('DOMContentLoaded', function() {
    initializePhaseTransition();
});

// --- Global / parameters ---
let currentT = 0.6;
let currentQ = 10;           // number of Potts states (q). q>4 -> first-order in 2D
let J = 1.0;                 // coupling constant
let isDragging = false;
let phaseCanvas, systemCanvas;
let phaseCtx, systemCtx;
let animationId;

// MCMC / lattice params
const GRID_SIZE = 100;
let lattice = [];
let mcmcSteps = 150;
let totalSteps = 0;
let acceptedMoves = 0;

// --- Utilities ---
function mod(a, n) { return ((a % n) + n) % n; }

// Approximate Potts "critical" temperature (exact for q<=4 second-order case):
// Uses e^{J/Tc} = 1 + sqrt(q)  =>  Tc = J / ln(1 + sqrt(q))
// For q>4 the transition is first-order, but this Tc is still a reference point.
function computeApproxCriticalTemp(q) {
    return J / Math.log(1 + Math.sqrt(q));
}

// --- Initialization & UI ---
function initializePhaseTransition() {
    phaseCanvas = document.getElementById('phase-diagram');
    systemCanvas = document.getElementById('system-state');
    phaseCtx = phaseCanvas.getContext('2d');
    systemCtx = systemCanvas.getContext('2d');

    phaseCanvas.width = 400;
    phaseCanvas.height = 300;
    systemCanvas.width = 300;
    systemCanvas.height = 300;

    initializeLatticeRandom();
    setupEventListeners();
    drawPhaseDiagram();
    startSimulation();
}

function setupEventListeners() {
    phaseCanvas.addEventListener('mousedown', startDrag);
    phaseCanvas.addEventListener('mousemove', drag);
    phaseCanvas.addEventListener('mouseup', endDrag);
    phaseCanvas.addEventListener('mouseleave', endDrag);
    phaseCanvas.addEventListener('touchstart', handleTouch);
    phaseCanvas.addEventListener('touchmove', handleTouch);
    phaseCanvas.addEventListener('touchend', endDrag);

    document.getElementById('steps-slider').addEventListener('input', function() {
        mcmcSteps = parseInt(this.value);
        document.getElementById('steps-value').textContent = mcmcSteps;
    });

    document.getElementById('temp-value').addEventListener('input', function() {
        currentT = parseFloat(this.value);
        document.getElementById('temp-value').textContent = currentT.toFixed(3);
        drawPhaseDiagram();
    });

    document.getElementById('q-value').addEventListener('input', function() {
        currentQ = parseInt(this.value);
        document.getElementById('q-value').textContent = currentQ;
        drawPhaseDiagram();
    });

    document.getElementById('reset-btn').addEventListener('click', function() {
        initializeLatticeRandom();
        totalSteps = 0;
        acceptedMoves = 0;
    });

    document.getElementById('ordered-btn').addEventListener('click', function() {
        initializeLatticeOrdered();
        totalSteps = 0;
        acceptedMoves = 0;
    });

    document.getElementById('random-btn').addEventListener('click', function() {
        initializeLatticeRandom();
        totalSteps = 0;
        acceptedMoves = 0;
    });

    document.getElementById('toggle-run-btn').addEventListener('click', function() {
        const btn = this;
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
            btn.textContent = 'Start';
        } else {
            startSimulation();
            btn.textContent = 'Pause';
        }
    });
}

function initializeLatticeRandom() {
    lattice = [];
    for (let i = 0; i < GRID_SIZE; i++) {
        lattice[i] = [];
        for (let j = 0; j < GRID_SIZE; j++) {
            lattice[i][j] = Math.floor(Math.random() * currentQ);
        }
    }
}

function initializeLatticeOrdered() {
    lattice = [];
    const favored = 0; // all spins to state 0
    for (let i = 0; i < GRID_SIZE; i++) {
        lattice[i] = [];
        for (let j = 0; j < GRID_SIZE; j++) {
            lattice[i][j] = favored;
        }
    }
}

// --- coordinate mapping for phase canvas (kept similar to your original) ---
function coordsToPhysical(x, y) {
    const rect = phaseCanvas.getBoundingClientRect();
    const scaleX = phaseCanvas.width / rect.width;
    const scaleY = phaseCanvas.height / rect.height;

    const canvasX = (x - rect.left) * scaleX;
    const canvasY = (y - rect.top) * scaleY;

    const Tmin = 0.0;
    const Tmax = 2.0; // reasonable range for Potts Tc (with J=1)
    const Qmin = 2;
    const Qmax = 20;

    const T = Tmin + (canvasX / phaseCanvas.width) * (Tmax - Tmin);
    const q = Qmin + (1 - canvasY / phaseCanvas.height) * (Qmax - Qmin);

    return {
        T: Math.max(Tmin, Math.min(Tmax, T)),
        q: Math.max(Qmin, Math.min(Qmax, q))
    };
}

function physicalToCanvas(T, q) {
    const Tmin = 0.0;
    const Tmax = 2.0;
    const Qmin = 2;
    const Qmax = 20;

    const x = ((T - Tmin) / (Tmax - Tmin)) * phaseCanvas.width;
    const y = (1 - (q - Qmin) / (Qmax - Qmin)) * phaseCanvas.height;
    return { x, y };
}

function startDrag(e) {
    isDragging = true;
    const coords = coordsToPhysical(e.clientX, e.clientY);
    currentT = coords.T;
    currentQ = Math.round(coords.q);
    document.getElementById('temp-value').value = currentT;
    document.getElementById('q-value').value = currentQ;
    document.getElementById('temp-value').textContent = currentT.toFixed(3);
    document.getElementById('q-value').textContent = currentQ;
    drawPhaseDiagram();
}

function drag(e) {
    if (!isDragging) return;
    const coords = coordsToPhysical(e.clientX, e.clientY);
    currentT = coords.T;
    currentQ = Math.round(coords.q);
    document.getElementById('temp-value').value = currentT;
    document.getElementById('q-value').value = currentQ;
    document.getElementById('temp-value').textContent = currentT.toFixed(3);
    document.getElementById('q-value').textContent = currentQ;
    drawPhaseDiagram();
}

function endDrag() {
    isDragging = false;
}

function handleTouch(e) {
    e.preventDefault();
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        if (e.type === 'touchstart') startDrag({ clientX: touch.clientX, clientY: touch.clientY });
        else if (e.type === 'touchmove') drag({ clientX: touch.clientX, clientY: touch.clientY });
    }
}

// --- Drawing the phase diagram & point ---
function drawPhaseDiagram() {
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    const bgColor = theme === 'dark' ? '#2a2a2a' : '#f8f9fa';
    const textColor = theme === 'dark' ? '#ffffff' : '#000000';
    const gridColor = theme === 'dark' ? '#444' : '#ddd';

    phaseCtx.fillStyle = bgColor;
    phaseCtx.fillRect(0, 0, phaseCanvas.width, phaseCanvas.height);

    // draw grid
    phaseCtx.strokeStyle = gridColor;
    phaseCtx.lineWidth = 0.5;
    for (let i = 0; i <= 10; i++) {
        const x = (i / 10) * phaseCanvas.width;
        const y = (i / 10) * phaseCanvas.height;
        phaseCtx.beginPath();
        phaseCtx.moveTo(x, 0);
        phaseCtx.lineTo(x, phaseCanvas.height);
        phaseCtx.stroke();
        phaseCtx.beginPath();
        phaseCtx.moveTo(0, y);
        phaseCtx.lineTo(phaseCanvas.width, y);
        phaseCtx.stroke();
    }

    // draw approximate Tc curve as reference for many q values
    phaseCtx.strokeStyle = '#ff6b35';
    phaseCtx.lineWidth = 1.5;
    phaseCtx.beginPath();
    const qVals = [];
    for (let q = 2; q <= 20; q += 0.5) qVals.push(q);
    qVals.forEach((q, idx) => {
        const Tc = computeApproxCriticalTemp(q);
        const pos = physicalToCanvas(Tc, q);
        if (idx === 0) phaseCtx.moveTo(pos.x, pos.y);
        else phaseCtx.lineTo(pos.x, pos.y);
    });
    phaseCtx.stroke();

    // labels
    phaseCtx.fillStyle = textColor;
    phaseCtx.font = '12px Arial';
    phaseCtx.fillText('T', phaseCanvas.width - 15, phaseCanvas.height - 5);
    phaseCtx.fillText('q (Potts states)', 5, 15);

    // current point
    const pos = physicalToCanvas(currentT, currentQ);
    phaseCtx.fillStyle = '#ff4444';
    phaseCtx.beginPath();
    phaseCtx.arc(pos.x, pos.y, 8, 0, 2 * Math.PI);
    phaseCtx.fill();
    phaseCtx.strokeStyle = '#ffffff';
    phaseCtx.lineWidth = 2;
    phaseCtx.stroke();

    document.getElementById('temp-value').textContent = currentT.toFixed(3);
    document.getElementById('q-value').textContent = currentQ;
}

// --- Potts model energy and neighbors ---
function getNeighbors(i, j) {
    return [
        [mod(i + 1, GRID_SIZE), j],
        [mod(i - 1, GRID_SIZE), j],
        [i, mod(j + 1, GRID_SIZE)],
        [i, mod(j - 1, GRID_SIZE)]
    ];
}

// Local contribution to energy for spin at (i,j):
// E_ij = -J * sum_neighbors delta(s_i, s_neighbor)
function localBondMatches(i, j, state) {
    const neighbors = getNeighbors(i, j);
    let matches = 0;
    for (const [ni, nj] of neighbors) {
        if (lattice[ni][nj] === state) matches++;
    }
    return matches;
}

function calculateTotalEnergy() {
    // Count each bond once: iterate over all sites, sum matches to right and down
    let E = 0;
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const s = lattice[i][j];
            // right neighbour
            const sr = lattice[mod(i + 1, GRID_SIZE)][j];
            if (s === sr) E += -J;
            // down neighbour
            const sd = lattice[i][mod(j + 1, GRID_SIZE)];
            if (s === sd) E += -J;
        }
    }
    return E;
}

// --- MCMC: Metropolis local updates for Potts ---
function mcmcStep() {
    let accepted = 0;
    for (let step = 0; step < mcmcSteps; step++) {
        const i = Math.floor(Math.random() * GRID_SIZE);
        const j = Math.floor(Math.random() * GRID_SIZE);
        const currentState = lattice[i][j];

        // propose a new state uniformly from other (q-1) states
        let newState = Math.floor(Math.random() * currentQ);
        while (newState === currentState) newState = Math.floor(Math.random() * currentQ);

        // deltaE = -J*(matches_new - matches_current)
        const matchesCurrent = localBondMatches(i, j, currentState);
        const matchesNew = localBondMatches(i, j, newState);
        const deltaE = -J * (matchesNew - matchesCurrent);

        if (deltaE <= 0 || Math.random() < Math.exp(-deltaE / currentT)) {
            lattice[i][j] = newState;
            accepted++;
        }
        totalSteps++;
    }
    acceptedMoves += accepted;
    return accepted;
}

// --- Observables: magnetization-like order parameter for Potts ---
// fraction of sites in most-populated state
function calculateOrderParameter() {
    const counts = new Array(Math.max(2, currentQ)).fill(0);
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            counts[lattice[i][j]]++;
        }
    }
    const maxCount = Math.max(...counts);
    const frac = maxCount / (GRID_SIZE * GRID_SIZE);
    // normalized magnetization-like measure in [0,1]:
    // m = (q * maxFrac - 1) / (q - 1)  (0 for random equiprobable, 1 for fully ordered)
    const m = (currentQ * frac - 1) / (currentQ - 1);
    return { frac, m };
}

// --- Rendering lattice to canvas ---
function stateColor(s) {
    // generate q distinct colors using HSL
    const h = (s / currentQ) * 360;
    return `hsl(${h}, 70%, 40%)`;
}

function updateSystemCanvas() {
    const cellSize = systemCanvas.width / GRID_SIZE;
    // background
    systemCtx.fillStyle = '#ffffff';
    systemCtx.fillRect(0, 0, systemCanvas.width, systemCanvas.height);

    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const s = lattice[i][j];
            systemCtx.fillStyle = stateColor(s);
            systemCtx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
    }
}

// --- Update statistics in DOM ---
function updateStatistics() {
    const energy = calculateTotalEnergy();
    const { frac, m } = calculateOrderParameter();
    const acceptanceRate = totalSteps > 0 ? (acceptedMoves / totalSteps * 100) : 0;

    document.getElementById('density-value').textContent = frac.toFixed(3); // reuse "density" label to show fraction of majority state
    document.getElementById('energy-value').textContent = Math.round(energy);
    document.getElementById('acceptance-rate').textContent = acceptanceRate.toFixed(1) + '%';
    document.getElementById('mcmc-step').textContent = totalSteps;
    document.getElementById('magnetization-value')?.remove?.(); // optional cleanup if not present

    // phase label: make simple heuristic
    let phase = 'Mixed';
    if (m > 0.7) phase = 'Ordered';
    else if (m < 0.15) phase = 'Disordered';
    else {
        phase = (Math.abs(currentT / computeApproxCriticalTemp(currentQ) - 1) < 0.05) ? 'Critical' : 'Mixed';
    }

    const phaseLabel = document.getElementById('phase-label');
    if (phaseLabel) {
        phaseLabel.textContent = phase;
        phaseLabel.className = 'badge ' + (
            phase === 'Disordered' ? 'bg-secondary' :
            phase === 'Ordered' ? 'bg-primary' :
            phase === 'Critical' ? 'bg-warning' : 'bg-info'
        );
    }
}

// --- Animation loop ---
function animate() {
    mcmcStep();
    updateSystemCanvas();
    updateStatistics();
    animationId = requestAnimationFrame(animate);
}

function startSimulation() {
    if (animationId) cancelAnimationFrame(animationId);
    animate();
}
</script>

<br>

This has been inspired by [Vilas Winstein's guest video in the 3Blue1Brown](https://youtu.be/itRV2jEtV8Q?si=e8rYumrp084o68jN) youtube channel.