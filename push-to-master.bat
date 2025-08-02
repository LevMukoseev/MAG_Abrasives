@echo off
echo Checking git status...
git status

echo.
echo Adding all files...
git add .

echo.
echo Committing changes...
git commit -m "Update website design and functionality"

echo.
echo Pushing to master...
git push origin master

echo.
echo Done!
pause 