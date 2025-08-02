@echo off
echo Adding all files...
"C:\Program Files\Git\bin\git.exe" add .

echo Committing changes...
"C:\Program Files\Git\bin\git.exe" commit -m "Update website: fix header image, improve responsive design, center content"

echo Pushing to master...
"C:\Program Files\Git\bin\git.exe" push origin master

echo Done!
pause 