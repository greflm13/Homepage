@echo off
set /p name="Enter name: "
start cmd.exe @cmd /k "ng new %name% --skipInstall=true --prefix=%name% --routing=true --skipGit=true --style=css && exit"
pause
echo Installing dependencies...
cd %name%
pnpm install