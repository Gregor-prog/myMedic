@echo off
echo Starting MyMedic Backend (Local SQLite)...
py -m uvicorn app.main:app --reload
pause
