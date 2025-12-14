# kill-dev-servers.ps1
# Save this in D:\UI and run it to clean up processes

Write-Host " Stopping all development servers..." -ForegroundColor Yellow
Write-Host ""

# Kill Node.js processes (Next.js)
Write-Host "Stopping Next.js processes..." -ForegroundColor Cyan
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    $nodeProcesses | Stop-Process -Force
    Write-Host " Stopped $($nodeProcesses.Count) Node.js process(es)" -ForegroundColor Green
} else {
    Write-Host "  No Node.js processes found" -ForegroundColor Gray
}

# Kill Python processes (Flask)
Write-Host "Stopping Python/Flask processes..." -ForegroundColor Cyan
$pythonProcesses = Get-Process -Name "python" -ErrorAction SilentlyContinue
if ($pythonProcesses) {
    $pythonProcesses | Stop-Process -Force
    Write-Host " Stopped $($pythonProcesses.Count) Python process(es)" -ForegroundColor Green
} else {
    Write-Host "  No Python processes found" -ForegroundColor Gray
}

# Kill processes on specific ports
Write-Host "Checking port 3000..." -ForegroundColor Cyan
$port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($port3000) {
    $processId = $port3000.OwningProcess
    Stop-Process -Id $processId -Force
    Write-Host " Freed port 3000 (PID: $processId)" -ForegroundColor Green
} else {
    Write-Host "  Port 3000 is free" -ForegroundColor Gray
}

Write-Host "Checking port 5000..." -ForegroundColor Cyan
$port5000 = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue
if ($port5000) {
    $processId = $port5000.OwningProcess
    Stop-Process -Id $processId -Force
    Write-Host " Freed port 5000 (PID: $processId)" -ForegroundColor Green
} else {
    Write-Host "  Port 5000 is free" -ForegroundColor Gray
}

# Remove Next.js lock file
Write-Host "Cleaning Next.js lock files..." -ForegroundColor Cyan
$lockFile = "D:\UI\.next\dev\lock"
if (Test-Path $lockFile) {
    Remove-Item $lockFile -Force
    Write-Host " Removed Next.js lock file" -ForegroundColor Green
} else {
    Write-Host "  No lock file found" -ForegroundColor Gray
}

Write-Host ""
Write-Host " All development servers stopped!" -ForegroundColor Green
Write-Host "   You can now run: npm run dev" -ForegroundColor Yellow
Write-Host ""
