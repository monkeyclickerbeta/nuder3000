@echo off
title Nude Generator
color 0A

:menu
cls
echo ========================================
echo       NUDE GENERATOR - MENU
echo ========================================
echo [1] Install Modules
echo [2] Launch The Gen
echo [3] Exit
echo ========================================
set /p choice="Type What Do You Want To Do (1/2/3): "

if "%choice%"=="1" goto install
if "%choice%"=="2" goto launch
if "%choice%"=="3" goto exit
goto menu

:install
echo.
echo Installing modules...
echo.
call npm install
echo.
echo Installation complete!
echo.
pause
goto menu

:launch
echo.
echo Made By mathpunch Official ツ
echo.
node index.js
pause
goto menu

:exit
exit

