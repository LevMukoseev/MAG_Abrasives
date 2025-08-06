@echo off
echo Setting up Git credentials...
git config --global user.name "LevMukoseev"
git config --global user.email "your.email@example.com"

echo.
echo Creating and switching to test branch...
git checkout -b test

echo.
echo Checking git status...
git status

echo.
echo Adding all files...
git add .

echo.
echo Committing changes...
git commit -m "Update website design and functionality"

echo.
echo Pushing to test branch...
echo When prompted, enter your GitHub username and Personal Access Token as password
git push origin test

echo.
echo Done!
pause 