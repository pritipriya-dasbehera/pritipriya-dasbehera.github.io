---
layout: page
title: Liquid-Gas Phase Transition
description: MCMC simulation of liquid-gas phase transitions
img: assets/img/projects/phase-transition-small2.gif
importance: 8
category: research
chart:
  plotly: true
---

<div class="row mt-3">
    <div class="col-md-6">
        <div class="card">
            <div class="card-header fw-bold text-center">
                Phase Diagram (T-μ)
            </div>
            <div class="card-body p-2">
                <div style="text-align:center;">
                    <canvas id="phase-diagram"
                            width="400" height="300"
                            style="border:1px solid #ddd; cursor:crosshair; width:100%; max-width:400px; display:block; margin:0 auto;">
                    </canvas>
                </div>
                <div class="mt-2 text-center">
                    <small class="text-muted">Drag the red point to explore different states</small>
                </div>
                <div class="mt-2 d-flex justify-content-between">
                    <div class="text-center">
                        <strong>Temperature:</strong> <span id="temp-value" class="badge bg-primary">0.567</span>
                    </div>
                    <div class="text-center">
                        <strong>Chemical Potential:</strong> <span id="mu-value" class="badge bg-secondary">-2.0</span>
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
                <input type="range" class="form-range" id="steps-slider" min="10" max="2000" step="10" value="150">

                <div class="d-flex justify-content-between align-items-center mb-2 mt-3">
                    <label class="fw-bold">Interaction Strength (ε):</label>
                    <span id="interaction-value" class="badge bg-warning">1.0</span>
                </div>
                <input type="range" class="form-range" id="interaction-slider" min="0.5" max="3.0" step="0.1" value="1.0">

                <div class="mt-3 text-center">
                    <button id="reset-btn" class="btn btn-outline-danger btn-sm">
                        <i class="fas fa-refresh me-1"></i>Reset System
                    </button>
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
                    <small class="text-muted">Black = Occupied (Liquid-like), White = Empty (Gas-like)</small>
                </div>
                <div class="mt-2 row text-center">
                    <div class="col-4">
                        <strong>Density:</strong><br>
                        <span id="density-value" class="badge bg-success">0.50</span>
                    </div>
                    <div class="col-4">
                        <strong>Energy:</strong><br>
                        <span id="energy-value" class="badge bg-info">-100</span>
                    </div>
                    <div class="col-4">
                        <strong>Phase:</strong><br>
                        <span id="phase-label" class="badge bg-secondary">Mixed</span>
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
                        <span id="acceptance-rate" class="badge bg-primary">50%</span>
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

// Global variables
let currentT = 0.567;
let currentMu = -2;
let currentEpsilon = 1.0;
let isDragging = false;
let phaseCanvas, systemCanvas;
let phaseCtx, systemCtx;
let animationId;

// MCMC System parameters
const GRID_SIZE = 80;
const LATTICE_Z = 4;
let lattice = [];
let mcmcSteps = 150;
let totalSteps = 0;
let acceptedMoves = 0;

// Physical constants
const ISING_TC_COEFF = 2 / Math.log(1 + Math.sqrt(2));

function computeCriticalTemp(epsilon) {
    const J_ising = epsilon / 4.0;
    return ISING_TC_COEFF * J_ising;
}

function computeCriticalMu(epsilon) {
    return -epsilon * (LATTICE_Z / 2.0);
}

function initializePhaseTransition() {
    phaseCanvas = document.getElementById('phase-diagram');
    systemCanvas = document.getElementById('system-state');
    phaseCtx = phaseCanvas.getContext('2d');
    systemCtx = systemCanvas.getContext('2d');

    // Set up canvas dimensions
    phaseCanvas.width = 400;
    phaseCanvas.height = 300;
    systemCanvas.width = 300;
    systemCanvas.height = 300;

    initializeLattice();
    setupEventListeners();
    drawPhaseDiagram();
    startSimulation();
}

function setupEventListeners() {
    // Phase diagram interactions
    phaseCanvas.addEventListener('mousedown', startDrag);
    phaseCanvas.addEventListener('mousemove', drag);
    phaseCanvas.addEventListener('mouseup', endDrag);
    phaseCanvas.addEventListener('mouseleave', endDrag);

    // Touch events
    phaseCanvas.addEventListener('touchstart', handleTouch);
    phaseCanvas.addEventListener('touchmove', handleTouch);
    phaseCanvas.addEventListener('touchend', endDrag);

    // Controls
    document.getElementById('steps-slider').addEventListener('input', function() {
        mcmcSteps = parseInt(this.value);
        document.getElementById('steps-value').textContent = mcmcSteps;
    });

    document.getElementById('interaction-slider').addEventListener('input', function() {
        currentEpsilon = parseFloat(this.value);
        document.getElementById('interaction-value').textContent = currentEpsilon.toFixed(1);
        drawPhaseDiagram();
    });

    document.getElementById('reset-btn').addEventListener('click', function() {
        initializeLattice();
        totalSteps = 0;
        acceptedMoves = 0;
    });
}

function initializeLattice() {
    lattice = [];
    for (let i = 0; i < GRID_SIZE; i++) {
        lattice[i] = [];
        for (let j = 0; j < GRID_SIZE; j++) {
            lattice[i][j] = Math.random() > 0.5 ? 1 : 0;
        }
    }
}

function coordsToPhysical(x, y) {
    const rect = phaseCanvas.getBoundingClientRect();
    const scaleX = phaseCanvas.width / rect.width;
    const scaleY = phaseCanvas.height / rect.height;

    const canvasX = (x - rect.left) * scaleX;
    const canvasY = (y - rect.top) * scaleY;

    const Xmin = 0;
    const Xscale = 1;
    const Ymax = 0;
    const Yscale = 4;

    const T = Xmin + (canvasX / phaseCanvas.width) * Xscale;
    const mu = Ymax - (canvasY / phaseCanvas.height) * Yscale;

    return {
        T: Math.max(Xmin, Math.min(Xmin+Xscale, T)),
        mu: Math.max(Ymax-Yscale, Math.min(Ymax, mu))
    };
}

function physicalToCanvas(T, mu) {

    const Xmin = 0;
    const Xscale = 1;
    const Ymax = 0;
    const Yscale = 4;

    const x = ((T - Xmin) / Xscale) * phaseCanvas.width;
    const y = ((Ymax - mu) / Yscale) * phaseCanvas.height;
    return { x, y };
}

function startDrag(e) {
    isDragging = true;
    const coords = coordsToPhysical(e.clientX, e.clientY);
    currentT = coords.T;
    currentMu = coords.mu;
    drawPhaseDiagram();
}

function drag(e) {
    if (!isDragging) return;
    const coords = coordsToPhysical(e.clientX, e.clientY);
    currentT = coords.T;
    currentMu = coords.mu;
    drawPhaseDiagram();
}

function endDrag() {
    isDragging = false;
}

function handleTouch(e) {
    e.preventDefault();
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        if (e.type === 'touchstart') {
            startDrag({ clientX: touch.clientX, clientY: touch.clientY });
        } else if (e.type === 'touchmove') {
            drag({ clientX: touch.clientX, clientY: touch.clientY });
        }
    }
}

function setPreset(T, mu) {
    currentT = T;
    currentMu = mu;
    drawPhaseDiagram();
    initializeLattice(); // Reset system for new conditions
    totalSteps = 0;
    acceptedMoves = 0;
}

function setCriticalPreset() {
    const Tc = computeCriticalTemp(currentEpsilon);
    const muc = computeCriticalMu(currentEpsilon);

    const Xmin = 0;
    const Xscale = 1;
    const Ymax = 0;
    const Yscale = 4;

    currentT = Math.max(Xmin, Math.min(Xmin+Xscale, T));
    currentMu = Math.max(Ymax-Yscale, Math.min(Ymax, mu));
    drawPhaseDiagram();
    initializeLattice();
    totalSteps = 0;
    acceptedMoves = 0;
}

function drawPhaseDiagram() {
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    const bgColor = theme === 'dark' ? '#2a2a2a' : '#f8f9fa';
    const textColor = theme === 'dark' ? '#ffffff' : '#000000';
    const gridColor = theme === 'dark' ? '#444' : '#ddd';

    phaseCtx.fillStyle = bgColor;
    phaseCtx.fillRect(0, 0, phaseCanvas.width, phaseCanvas.height);

    const Xmin = 0;
    const Xscale = 1;
    const Ymax = 0;
    const Yscale = 4;

    // Draw grid
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

    const Tc = computeCriticalTemp(currentEpsilon);
    const muc = computeCriticalMu(currentEpsilon);

    if (Tc >= Xmin && Tc <= Xmin + Xscale && muc >= Ymax - Yscale && muc <= Ymax) {
        const startPos = physicalToCanvas(0, muc);
        const endPos   = physicalToCanvas(Tc, muc);

        phaseCtx.strokeStyle = '#ff6b35';
        phaseCtx.lineWidth = 2;
        phaseCtx.setLineDash([]);
        phaseCtx.beginPath();
        phaseCtx.moveTo(startPos.x, startPos.y);
        phaseCtx.lineTo(endPos.x, endPos.y);
        phaseCtx.stroke();

        phaseCtx.fillStyle = textColor;
        phaseCtx.font = '12px Arial';
        phaseCtx.fillText('Tc(ε)=' + Tc.toFixed(3), endPos.x - 30, endPos.y + 12);

        phaseCtx.fillText('μc(ε)=' + muc.toFixed(3), endPos.x - 30, startPos.y - 6);
    }

    // axis labels
    phaseCtx.fillStyle = textColor;
    phaseCtx.font = '12px Arial';
    phaseCtx.fillText('T', phaseCanvas.width - 15, phaseCanvas.height - 5);
    phaseCtx.fillText('μ', 5, 15);
    phaseCtx.font = '14px Arial';
    phaseCtx.fillText('HIGH μ (ordered / liquid-like)', phaseCanvas.width * 0.05, phaseCanvas.height * 0.2);
    phaseCtx.fillText('LOW μ (disordered / gas-like)', phaseCanvas.width * 0.05, phaseCanvas.height * 0.8);

    // current point
    const pos = physicalToCanvas(currentT, currentMu);
    phaseCtx.fillStyle = '#ff4444';
    phaseCtx.beginPath();
    phaseCtx.arc(pos.x, pos.y, 8, 0, 2 * Math.PI);
    phaseCtx.fill();

    phaseCtx.strokeStyle = '#ffffff';
    phaseCtx.lineWidth = 2;
    phaseCtx.stroke();

    document.getElementById('temp-value').textContent = currentT.toFixed(3);
    document.getElementById('mu-value').textContent = currentMu.toFixed(3);
}

// MCMC
function getNeighbors(i, j) {
    const neighbors = [];
    neighbors.push([(i + 1) % GRID_SIZE, j]);
    neighbors.push([(i - 1 + GRID_SIZE) % GRID_SIZE, j]);
    neighbors.push([i, (j + 1) % GRID_SIZE]);
    neighbors.push([i, (j - 1 + GRID_SIZE) % GRID_SIZE]);
    return neighbors;
}

function calculateLocalEnergy(i, j) {
    const state = lattice[i][j]; // 1 (occupied) or 0 (empty)
    const neighbors = getNeighbors(i, j);
    let neighborSum = 0;

    for (const [ni, nj] of neighbors) {
        neighborSum += lattice[ni][nj];
    }

    return -currentEpsilon * state * neighborSum - currentMu * state;
}

function calculateTotalEnergy() {
    let totalEnergy = 0;
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            totalEnergy += calculateLocalEnergy(i, j);
        }
    }
    return totalEnergy / 2;
}

function mcmcStep() {
    let accepted = 0;

    for (let step = 0; step < mcmcSteps; step++) {
        // Choose random site
        const i = Math.floor(Math.random() * GRID_SIZE);
        const j = Math.floor(Math.random() * GRID_SIZE);

        // Calculate energy change for flipping this site (0 <-> 1)
        const currentState = lattice[i][j];
        const newState = 1 - currentState;

        const currentEnergy = calculateLocalEnergy(i, j);
        lattice[i][j] = newState;
        const newEnergy = calculateLocalEnergy(i, j);
        const deltaE = newEnergy - currentEnergy;

        if (deltaE <= 0 || Math.random() < Math.exp(-deltaE / currentT)) {
            accepted++;
        } else {
            lattice[i][j] = currentState;
        }

        totalSteps++;
    }

    acceptedMoves += accepted;
    return accepted;
}

function calculateDensity() {
    let occupied = 0;
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            occupied += lattice[i][j];
        }
    }
    return occupied / (GRID_SIZE * GRID_SIZE);
}

function updateSystemCanvas() {
    const cellSize = systemCanvas.width / GRID_SIZE;

    // Clear canvas (white background for occupied/empty contrast)
    systemCtx.fillStyle = '#ffffff';
    systemCtx.fillRect(0, 0, systemCanvas.width, systemCanvas.height);

    // Draw lattice
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            if (lattice[i][j] === 1) {
                systemCtx.fillStyle = '#000000ff';
                systemCtx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
        }
    }
}

function updateStatistics() {
    const density = calculateDensity();
    const energy = calculateTotalEnergy();
    const acceptanceRate = totalSteps > 0 ? (acceptedMoves / totalSteps * 100) : 0;

    document.getElementById('density-value').textContent = density.toFixed(3);
    document.getElementById('energy-value').textContent = Math.round(energy);
    document.getElementById('acceptance-rate').textContent = acceptanceRate.toFixed(1) + '%';
    document.getElementById('mcmc-step').textContent = totalSteps;

    let phase = 'Mixed';
    if (density < 0.2) phase = 'Gas';
    else if (density > 0.8) phase = 'Liquid';
    else if ((Math.abs(currentT/computeCriticalTemp(currentEpsilon) - 1) < 0.05) && (Math.abs(currentMu/computeCriticalMu(currentEpsilon) - 1) < 0.05)) phase = 'Critical';

    const phaseLabel = document.getElementById('phase-label');
    phaseLabel.textContent = phase;
    phaseLabel.className = 'badge ' + (
        phase === 'Gas' ? 'bg-secondary' :
        phase === 'Liquid' ? 'bg-primary' :
        phase === 'Critical' ? 'bg-warning' : 'bg-info'
    );
}

function animate() {
    mcmcStep();
    updateSystemCanvas();
    updateStatistics();

    animationId = requestAnimationFrame(animate);
}

function startSimulation() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    animate();
}
</script>


<br>

This has been inspired by [Vilas Winstein's guest video in the 3Blue1Brown](https://youtu.be/itRV2jEtV8Q?si=e8rYumrp084o68jN) youtube channel.