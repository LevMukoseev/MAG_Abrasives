$env:PATH = "C:\Users\PREDATOR\huinya;" + $env:PATH
Write-Host "Installing dependencies..."
& "C:\Users\PREDATOR\huinya\npm.cmd" install
Write-Host "Starting development server..."
& "C:\Users\PREDATOR\huinya\npm.cmd" run dev 