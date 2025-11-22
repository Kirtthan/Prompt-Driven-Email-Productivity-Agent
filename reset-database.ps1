# Reset Database Script
# This script stops the backend, deletes the database, and restarts it with fresh mock data

Write-Host "🔄 Resetting Email Agent Database..." -ForegroundColor Cyan

# Step 1: Stop any running Python/Uvicorn processes
Write-Host "`n1️⃣ Stopping backend server..." -ForegroundColor Yellow
$pythonProcesses = Get-Process | Where-Object {$_.ProcessName -like "*python*" -and $_.CommandLine -like "*uvicorn*"}
if ($pythonProcesses) {
    $pythonProcesses | ForEach-Object {
        Write-Host "   Stopping process $($_.Id)..." -ForegroundColor Gray
        Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue
    }
    Start-Sleep -Seconds 2
    Write-Host "   ✅ Backend stopped" -ForegroundColor Green
} else {
    Write-Host "   ℹ️ No backend process found" -ForegroundColor Gray
}

# Step 2: Delete the database file
Write-Host "`n2️⃣ Deleting old database..." -ForegroundColor Yellow
$dbPath = "data\email_agent.db"
if (Test-Path $dbPath) {
    Remove-Item $dbPath -Force
    Write-Host "   ✅ Database deleted" -ForegroundColor Green
} else {
    Write-Host "   ℹ️ No database file found" -ForegroundColor Gray
}

# Step 3: Restart the backend
Write-Host "`n3️⃣ Starting backend server..." -ForegroundColor Yellow
Write-Host "   The backend will automatically create a new database with fresh mock emails" -ForegroundColor Gray

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; python -m uvicorn backend.main:app --reload --port 8000"

Start-Sleep -Seconds 3
Write-Host "   ✅ Backend started on http://127.0.0.1:8000" -ForegroundColor Green

Write-Host "`n✨ Database reset complete!" -ForegroundColor Cyan
Write-Host "   Refresh your frontend to see the new emails" -ForegroundColor White
Write-Host "`n   Backend: http://127.0.0.1:8000" -ForegroundColor White
Write-Host "   API Docs: http://127.0.0.1:8000/docs" -ForegroundColor White
