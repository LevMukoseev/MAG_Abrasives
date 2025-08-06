@echo off
echo Checking remote repository connection...
git remote -v

echo.
echo Checking current branch...
git branch

echo.
echo Checking last commit...
git log --oneline -1

echo.
echo Checking remote branches...
git branch -r

echo.
pause 