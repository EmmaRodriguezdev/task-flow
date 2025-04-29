param (
    [string]$ModuleName
)

# Verificar si se proporcionó el nombre del módulo
if (-not $ModuleName) {
    Write-Host "Uso: .\create_module.ps1 <module_name>"
    exit
}

$ModulePath = "src\modules\$ModuleName"

# Crear estructura de carpetas
$folders = @(
    "\domain\entities",
    "\domain\errors",
    "\infrastructure\datasources",
    "\infrastructure\interfaces",
    "\infrastructure\mappers",
    "\infrastructure\repositories",
    "\presentation\components",
    "\presentation\hooks"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Path "$ModulePath$folder" -Force | Out-Null
}

Write-Host "Módulo '$ModuleName' creado en '$ModulePath'"