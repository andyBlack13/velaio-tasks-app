# VelaioTasksApp

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 16.2.14.

## Descripción del Proyecto

VelaioTasksApp es una aplicación para la gestión de tareas, donde se pueden asignar tareas a personas asociadas con diferentes habilidades. Los datos no se obtienen de una API externa, sino que se manejan temporalmente desde el servidor usando arreglos de objetos. Nota importante: Al actualizar la página, los datos pueden perderse debido a la falta de persistencia.

## Funcionalidades
- Crear tareas. 
- Listar tareas creadas. 
- Marcar tareas como completadas. 
- Filtrar tareas por estado (completadas o pendientes) Solo Mobile, para desktop es un tablero. 
- Asignar personas a cada tarea, con sus nombres completos, edades y habilidades. 
- Añadir y eliminar personas de las tareas utilizando botones para estas acciones. 
- Añadir y eliminar habilidades para cada persona utilizando botones para estas acciones. 
- Implementar un formulario reactivo con validaciones, incluyendo la validación de 
arreglos y arreglos anidados. 

## Servidor de Desarrollo

Ejecute `ng serve` para un servidor en desarrollo. Navegue hasta `http://localhost:4200/`. La aplicación se recargará automáticamente si modifica alguno de los archivos de origen.
