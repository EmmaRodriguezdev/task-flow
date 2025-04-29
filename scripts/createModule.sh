#!/bin/bash

# Verificar si se proporcionó el nombre del módulo
if [ -z "$1" ]; then
  echo "Uso: $0 <module_name>"
  exit 1
fi

MODULE_NAME=$1
MODULE_PATH="src/modules/$MODULE_NAME"

# Crear estructura de carpetas
mkdir -p $MODULE_PATH/domain/entities
mkdir -p $MODULE_PATH/domain/errors
mkdir -p $MODULE_PATH/infrastructure/datasources
mkdir -p $MODULE_PATH/infrastructure/interfaces
mkdir -p $MODULE_PATH/infrastructure/mappers
mkdir -p $MODULE_PATH/infrastructure/repositories
mkdir -p $MODULE_PATH/presentation/components
mkdir -p $MODULE_PATH/presentation/hooks

echo "Módulo '$MODULE_NAME' creado en '$MODULE_PATH'"