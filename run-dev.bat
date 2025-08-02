@echo off
echo Setting up Node.js path...
set PATH=C:\Users\PREDATOR\huinya;%PATH%

echo Checking Node.js installation...
"C:\Users\PREDATOR\huinya\node.exe" --version
if errorlevel 1 (
    echo Error: Node.js not found at C:\Users\PREDATOR\huinya\node.exe
    pause
    exit /b 1
)

echo Installing dependencies...
"C:\Users\PREDATOR\huinya\npm.cmd" install
if errorlevel 1 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)

echo Starting development server...
"C:\Users\PREDATOR\huinya\npm.cmd" run dev
pause 