$ErrorActionPreference = "Stop"

$projectRoot = $PSScriptRoot
$nodeRoot = Join-Path $projectRoot ".tools\node\node-v24.19.0-win-x64"
$npmCommand = Join-Path $nodeRoot "npm.cmd"
$pythonCommand = Join-Path $projectRoot ".tools\python\python.exe"

if (-not (Test-Path -LiteralPath $npmCommand)) {
    throw "Portable Node.js is missing. Run setup.ps1 first."
}

if (-not (Test-Path -LiteralPath $pythonCommand)) {
    throw "Portable Python is missing. Run setup.ps1 first."
}

$env:Path = "$nodeRoot;$env:Path"

$backend = Start-Process -FilePath $pythonCommand `
    -ArgumentList "app.py" `
    -WorkingDirectory (Join-Path $projectRoot "backend") `
    -WindowStyle Hidden `
    -PassThru

try {
    & $npmCommand run dev --prefix (Join-Path $projectRoot "frontend")
}
finally {
    if (-not $backend.HasExited) {
        Stop-Process -Id $backend.Id
    }
}
