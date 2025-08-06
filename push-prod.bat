@echo off
echo Настройка Git...
git config --global user.name "LevMukoseev"
git config --global user.email "your.email@example.com"

echo.
echo Проверка статуса...
git status

echo.
echo Добавление файлов...
git add .

echo.
echo Коммит изменений...
git commit -m "Обновление дизайна шапки сайта"

echo.
echo Пуш в продакшн...
git push origin master --force

echo.
echo Готово!
pause