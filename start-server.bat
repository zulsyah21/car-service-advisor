@echo off
echo Starting Service Advisor on localhost...
echo.
echo Open your browser and go to: http://localhost:8080
echo.
echo Press Ctrl+C to stop the server.
echo.
http-server "C:\Users\ASUS\Documents\UiTM (DEGREE)\SEM 5\FYP\Web-Based Automated Car Service Advisor" -p 8080 -o --cors
