# ============================================
# FILE: start-dev.ps1 (Save in D:\UI root)
# ============================================
# This script starts both Flask backend and Next.js frontend

Write-Host "🚀 Starting Azure Demand Forecasting Platform..." -ForegroundColor Cyan
Write-Host ""

# Check if Python is installed
$pythonVersion = python --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Python not found! Please install Python 3.8+" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Python found: $pythonVersion" -ForegroundColor Green

# Check if Node.js is installed
$nodeVersion = node --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js not found! Please install Node.js 18+" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
Write-Host ""

# Install Python dependencies if needed
Write-Host "📦 Checking Python dependencies..." -ForegroundColor Yellow
if (Test-Path "backend\requirements.txt") {
    pip install -r backend\requirements.txt --quiet
    Write-Host "✓ Python dependencies ready" -ForegroundColor Green
} else {
    Write-Host "⚠ backend\requirements.txt not found" -ForegroundColor Yellow
}
Write-Host ""

# Install Node dependencies if needed
Write-Host "📦 Checking Node.js dependencies..." -ForegroundColor Yellow
if (!(Test-Path "node_modules")) {
    Write-Host "Installing npm packages..." -ForegroundColor Yellow
    npm install
}
Write-Host "✓ Node.js dependencies ready" -ForegroundColor Green
Write-Host ""

# Start Flask backend in background
Write-Host "🐍 Starting Flask backend (port 5000)..." -ForegroundColor Cyan
$backendJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    python backend\app.py
}
Write-Host "✓ Backend started (Job ID: $($backendJob.Id))" -ForegroundColor Green

# Wait a moment for backend to initialize
Start-Sleep -Seconds 3

# Start Next.js frontend
Write-Host "⚛️  Starting Next.js frontend (port 3000)..." -ForegroundColor Cyan
Write-Host ""
Write-Host "=" -repeat 60 -ForegroundColor Cyan
Write-Host "🌐 Application URLs:" -ForegroundColor Green
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host "   Backend:  http://localhost:5000/api/health" -ForegroundColor Yellow
Write-Host "=" -repeat 60 -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop both servers" -ForegroundColor Gray
Write-Host ""

# Start Next.js (this will block until Ctrl+C)
npm run dev

# Cleanup: Stop background Flask job when Next.js stops
Write-Host ""
Write-Host "🛑 Stopping backend server..." -ForegroundColor Yellow
Stop-Job -Job $backendJob
Remove-Job -Job $backendJob
Write-Host "✓ All servers stopped" -ForegroundColor Green