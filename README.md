# 🚀 TrainIt Frontend

Aplicación web desarrollada en Angular para la gestión de entrenamientos y usuarios.

## 🌐 Demo en Vivo

**Aplicación desplegada:** [https://trainit-frontend.vercel.app/](https://trainit-frontend.vercel.app/)

## 📋 Descripción

TrainIt Frontend es una aplicación web moderna construida con Angular que proporciona una interfaz de usuario intuitiva para gestionar entrenamientos, usuarios y autenticación. La aplicación está diseñada con un enfoque en la experiencia del usuario y la responsividad.

## ✨ Características

- 🔐 **Sistema de Autenticación** - Login y registro de usuarios
- 👥 **Gestión de Usuarios** - Lista y edición de perfiles de usuario
- 🏠 **Dashboard** - Página de inicio con funcionalidades principales
- 📱 **Diseño Responsivo** - Optimizado para dispositivos móviles y desktop
- 🎨 **UI Moderna** - Interfaz construida con Bootstrap y componentes personalizados
- 🔒 **Protección de Rutas** - Guardias de autenticación para rutas protegidas

## 🛠️ Tecnologías Utilizadas

- **Frontend Framework:** Angular 18
- **Lenguaje:** TypeScript
- **Estilos:** CSS3, Bootstrap 5
- **Iconos:** @popperjs/core
- **Notificaciones:** SweetAlert2
- **Estado:** RxJS
- **Build Tool:** Angular CLI

## 📦 Instalación

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd Frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm start
```

4. **Construir para producción**
```bash
npm run build
```

## 🚀 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run build:vercel` - Construye específicamente para Vercel
- `npm run watch` - Construye en modo watch para desarrollo
- `npm test` - Ejecuta las pruebas unitarias

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── auth/           # Módulo de autenticación
│   │   ├── login/      # Componente de login
│   │   └── register/   # Componente de registro
│   ├── core/           # Servicios y modelos core
│   │   ├── guards/     # Guardias de autenticación
│   │   ├── models/     # Modelos de datos
│   │   └── services/   # Servicios principales
│   ├── dashboard/      # Módulo del dashboard
│   └── users/          # Módulo de gestión de usuarios
├── environment/         # Configuración de entornos
└── styles.css          # Estilos globales
```

## 🔧 Configuración

### Variables de Entorno
La aplicación utiliza las siguientes configuraciones:

- **API URL:** `https://trainit-backend-7ykt.onrender.com`
- **Modo:** Production (en despliegue)

### Configuración de Build
- **Output Path:** `dist/frontend/browser`
- **Optimización:** Habilitada para producción
- **Source Maps:** Deshabilitadas en producción

## 🌍 Despliegue

### Vercel (Recomendado)
La aplicación está configurada para desplegarse automáticamente en Vercel:

1. **Conectar repositorio** a Vercel
2. **Configuración automática** - Vercel detecta que es una app Angular
3. **Build automático** en cada push a la rama principal

**URL de Despliegue:** [https://trainit-frontend.vercel.app/](https://trainit-backend-7ykt.onrender.com/)

### Otros Servicios
También puedes desplegar en:
- Netlify
- Firebase Hosting
- GitHub Pages

## 📱 Características Responsivas

- **Mobile First** - Diseño optimizado para dispositivos móviles
- **Breakpoints** - Adaptable a diferentes tamaños de pantalla
- **Touch Friendly** - Interfaz optimizada para dispositivos táctiles

## 🔒 Seguridad

- **Guardias de Autenticación** - Protección de rutas privadas
- **Interceptores HTTP** - Manejo seguro de tokens de autenticación
- **Validación de Formularios** - Validación tanto en cliente como servidor

## 🧪 Testing

```bash
# Ejecutar pruebas unitarias
npm test

# Ejecutar pruebas con coverage
npm run test:coverage
```

## 📈 Estado del Proyecto

- ✅ **Autenticación** - Completado
- ✅ **Gestión de Usuarios** - Completado
- ✅ **Dashboard** - Completado
- ✅ **Responsive Design** - Completado
- ✅ **Despliegue en Vercel** - Completado

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- **Proyecto:** [https://trainit-frontend.vercel.app/](https://trainit-frontend.vercel.app/)
- **Backend:** [https://trainit-backend-7ykt.onrender.com](https://trainit-backend-7ykt.onrender.com)

---

⭐ **¡No olvides darle una estrella al proyecto si te gusta!**
