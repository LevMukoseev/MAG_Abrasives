Write-Host "Adding all files..." -ForegroundColor Green
& "C:\Program Files\Git\bin\git.exe" add .

Write-Host "Committing changes..." -ForegroundColor Green
& "C:\Program Files\Git\bin\git.exe" commit -m "Update website: fix header image, improve responsive design, center content"

Write-Host "Pushing to master..." -ForegroundColor Green
& "C:\Program Files\Git\bin\git.exe" push origin master

Write-Host "Done!" -ForegroundColor Green
Read-Host "Press Enter to continue" 