# Quick Start Script
# Starts both backend and frontend servers

Write-Host "🚀 Starting Email Productivity Agent..." -ForegroundColor Cyan

# Start Backend
Write-Host "`n📡 Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; Write-Host '🐍 Backend Server' -ForegroundColor Green; python -m uvicorn backend.main:app --reload --port 8000"

Start-Sleep -Seconds 2

# Start Frontend
Write-Host "⚛️ Starting Frontend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend'; Write-Host '⚛️ Frontend Server' -ForegroundColor Blue; npm run dev"

Start-Sleep -Seconds 3

Write-Host "`n✨ Servers starting..." -ForegroundColor Cyan
Write-Host "`n   Backend:  http://127.0.0.1:8000" -ForegroundColor White
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "   API Docs: http://127.0.0.1:8000/docs" -ForegroundColor White
Write-Host "`n   Press Ctrl+C in each terminal to stop" -ForegroundColor Gray
