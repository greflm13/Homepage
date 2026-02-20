@echo off
set /p name="Enter name: "
start cmd.exe @cmd /k "ng new %name% --skip-install --prefix=%name% --routing=true --skip-git --style=css && exit"
pause
echo Installing dependencies...
cd %name%
pnpm install