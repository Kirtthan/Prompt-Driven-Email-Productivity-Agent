Write-Host "Starting Prompt-Driven Email Productivity Agent..."

# Start Backend
Write-Host "Launching Backend..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "python -m uvicorn backend.main:app --reload"

# Start Frontend
Write-Host "Launching Frontend..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "Both services started in new windows."
Write-Host "Backend: http://127.0.0.1:8000"
Write-Host "Frontend: http://localhost:5173 (usually)"
