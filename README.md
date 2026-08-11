# CampusFest 🎪

**CampusFest** es una plataforma web integral diseñada para la gestión, promoción e inscripción en eventos, actividades universitarias y stands de exhibición. Este proyecto fue desarrollado como parte del curso **Proyecto Integrador 1 (SOFT-11)** en Universidad Cenfotec (C2 2026).

---

## 📌 Descripción del Proyecto

El sistema CampusFest permite administrar el flujo completo del evento universitario, ofreciendo una experiencia moderna y fluida tanto para visitantes como para administradores:

- **Gestión de Actividades**: Creación, actualización, detalle y visualización de la agenda de actividades del festival.
- **Gestión de Stands**: Visualización y administración de los diferentes puestos y exposiciones del evento.
- **Registro de Visitantes e Inscripciones**: Formulario dinámico para la inscripción de participantes en las diferentes actividades.
- **Modo Oscuro / Claro**: Interfaz responsiva con soporte para cambio de tema visual.
- **Arquitectura Backend RESTful**: API desarrollada con Node.js, Express y MongoDB Atlas para la persistencia de datos.

---

## 🛠️ Tecnologías y Dependencias

### Backend
- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express** (`^5.2.1`): Framework para la creación de la API RESTful.
- **Mongoose** (`^9.7.3`): ODM (Object Data Modeling) para interactuar con MongoDB.
- **CORS** (`^2.8.6`): Middleware para permitir intercambio de recursos de origen cruzado.
- **Body-Parser** (`^2.3.0`): Middleware para el procesamiento de peticiones en formato JSON y URL-encoded.
- **dotenv** (`^17.4.2`): Gestión de variables de entorno.

### Frontend
- **HTML5 & CSS3 Vanilla**: Estructura semántica y diseño responsivo.
- **JavaScript (ES6+)**: Lógica del cliente, consumo de API mediante Fetch API y almacenamiento en `localStorage`.

---

## ⚙️ Instrucciones de Instalación y Configuración

### Requisitos Previos
- [Node.js](https://nodejs.org/) (Versión 18 o superior recomendada)
- [npm](https://www.npmjs.com/) (Incluido al instalar Node.js)
- Base de datos en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) o servidor local de MongoDB.

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd SOFT-11-CampusFest
```

### 2. Instalación de Dependencias del Backend
Navega al directorio del backend e instala los paquetes requeridos:
```bash
cd CampusFest/backend
npm install
```

### 3. Configuración de Variables de Entorno
Crea o edita el archivo `.env` en la carpeta `CampusFest/backend/` con los datos de conexión:

```env
MONGODB_URI=tu_cadena_de_conexion_mongodb
PORT=3000
```

> **Nota:** Sustituye `tu_cadena_de_conexion_mongodb` por el string de conexión de MongoDB Atlas o local.

---

## 🚀 Comandos para Ejecutar el Proyecto

### 1. Iniciar el Backend
Desde la carpeta `CampusFest/backend`, ejecuta el servidor:

```bash
cd CampusFest/backend
node index.js
```

El servidor iniciará en `http://localhost:3000`. Al establecer conexión con MongoDB, se mostrará en la consola:
```text
MongoDB Atlas conectado
Servidor corriendo en http://localhost:3000
```

### 2. Ejecutar el Frontend
El frontend está formado por páginas HTML estáticas y scripts JS:

- **Opción A (Recomendada - VS Code Live Server):**
  Abre la carpeta `CampusFest/frontend` en VS Code, haz clic derecho sobre `index.html` y selecciona **Open with Live Server**.

- **Opción B (Servidor estático con npx):**
  Puedes servir los archivos estáticos desde la terminal:
  ```bash
  npx serve CampusFest/frontend
  ```

- **Opción C (Directo en el navegador):**
  Abre el archivo `CampusFest/frontend/index.html` directamente en tu navegador web.

---

## 📁 Estructura del Proyecto

```text
SOFT-11-CampusFest/
├── CampusFest/
│   ├── backend/
│   │   ├── models/         # Esquemas de Mongoose (Actividad, Stand, Visitante)
│   │   ├── routes/         # Rutas de la API REST (stand, actividad, visitante)
│   │   ├── .env            # Variables de entorno (puerto, conexión MongoDB)
│   │   ├── index.js        # Punto de entrada del servidor Express
│   │   └── package.json    # Configuración del proyecto backend y dependencias
│   └── frontend/
│       ├── css/            # Estilos CSS de la interfaz
│       ├── js/             # Scripts de interfaz y llamadas a la API
│       ├── assets/         # Recursos gráficos e imágenes
│       ├── index.html      # Página de inicio
│       ├── actividades.html
│       ├── agenda.html
│       ├── stands.html
│       └── ...             # Formularios y páginas adicionales
├── documentacion/          # Diagramas, ERS y especificaciones del proyecto
└── README.md               # Documentación general del repositorio
```
