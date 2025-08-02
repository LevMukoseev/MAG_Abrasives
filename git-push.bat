@echo off
echo Adding all files...
git add .

echo Committing changes...
git commit -m "Update website: fix header image, improve responsive design, center content"

echo Pushing to master...
git push origin master

echo Done!
pause 