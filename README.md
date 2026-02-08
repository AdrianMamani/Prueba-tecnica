# Gestión de Usuarios

Desarrollado por: **Adrian Sebastian Mamani**   // Github:  https://github.com/AdrianMamani

Este proyecto es una aplicación **frontend desarrollada con Vue 3**, enfocada en la **gestión de usuarios**.  
Permite **visualizar, crear y administrar usuarios**, combinando datos obtenidos desde un **API externa** con persistencia local mediante **LocalStorage**.

La aplicación está construida con una **arquitectura modular y escalable**, facilitando el mantenimiento y la ampliación futura del proyecto.

---

## 🚀 Funcionalidades

- Listado de usuarios obtenidos desde una API
- Creación de nuevos usuarios mediante formulario con validaciones
- Persistencia de usuarios creados usando LocalStorage
- Búsqueda de usuarios por nombre o username
- Paginación de resultados
- Interfaz responsive
- Componentes reutilizables y desacoplados

---

## 🛠️ Tecnologías utilizadas

- **Vue 3** (Composition API con `<script setup>`)
- **Vue Router** para la navegación
- **Tailwind CSS** para layout y diseño responsivo
- **CSS tradicional** para estilos específicos
- **LocalStorage** para persistencia de datos en frontend

---

## 📁 Estructura del proyecto
La estructura está organizada por módulos para facilitar el mantenimiento y la escalabilidad.

```bash
src/
├── assets/              # Imágenes, iconos y recursos estáticos
├── components/          # Componentes reutilizables (UI, layout, resources)
├── composables/         # Funciones reutilizables (ej. validaciones)
├── layout/              # Header, Sidebar y layout principal
├── modules/             # Módulos por dominio
│   ├── users/
│   │   ├── components/
│   │   │   ├── modals/
│   │   │   └── table/
│   │   ├── UsersView.vue
│   │   └── UserView.css
├── router/              # Configuración de Vue Router
└── main.js              # Punto de entrada de la aplicación


