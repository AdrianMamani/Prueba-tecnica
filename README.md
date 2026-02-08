# Gestion de usuarios

Este proyecto es una aplicación frontend desarrollada con Vue 3, enfocada en la gestión de usuarios. Permite visualizar, crear y administrar usuarios de manera local traendo datos de un API, manteniendo una arquitectura modular y escalable.

---

## Tecnologías utilizadas

° Vue 3 (Composition API con <script setup>)

° Vue Router para la navegación

° Tailwind CSS para layout y diseño responsivo

° CSS tradicional para estilos específicos

° LocalStorage para persistencia de datos en frontend

## Estrctura del proyecto

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
├── router/              # Vue Router
└── main.js              # Punto de entrada de la app


La estructura está organizada por módulos para facilitar el mantenimiento y la escalabilidad.

Desarrollado por: **Adrian Sebastian Mamani**
GitHub: https://github.com/AdrianMamani