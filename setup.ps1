$ErrorActionPreference = "Stop"

$projectRoot = $PSScriptRoot
$nodeRoot = Join-Path $projectRoot ".tools\node\node-v24.19.0-win-x64"
$npmCommand = Join-Path $nodeRoot "npm.cmd"
$pythonCommand = Join-Path $projectRoot ".tools\python\python.exe"
$getPip = Join-Path $projectRoot ".tools\downloads\get-pip.py"

if (-not (Test-Path -LiteralPath $npmCommand)) {
    throw "Portable Node.js is missing from .tools."
}

if (-not (Test-Path -LiteralPath $pythonCommand)) {
    throw "Portable Python is missing from .tools."
}

$env:Path = "$nodeRoot;$env:Path"

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot ".tools\python\Lib\site-packages\pip"))) {
    & $pythonCommand $getPip
}

& $pythonCommand -m pip install -r (Join-Path $projectRoot "backend\requirements.txt")
& $npmCommand install --prefix (Join-Path $projectRoot "frontend")

Write-Host "Setup complete. Run .\start.ps1 to start Exchange Diary."
