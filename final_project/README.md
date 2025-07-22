# Express Book Reviews - Laboratorio Completo

Este proyecto implementa un sistema completo de reseñas de libros con Express.js, incluyendo autenticación de usuarios y operaciones asíncronas.

## Funcionalidades Implementadas

### Usuarios en General (Tareas 1-7)
- **Tarea 1**: Obtener la lista de libros disponibles en la tienda
- **Tarea 2**: Obtener los libros por ISBN
- **Tarea 3**: Obtener todos los libros por Autor
- **Tarea 4**: Obtener todos los libros en base al Título
- **Tarea 5**: Obtener la Reseña del libro
- **Tarea 6**: Registrar nuevo usuario
- **Tarea 7**: Iniciar sesión como usuario registrado

### Usuarios Registrados (Tareas 8-9)
- **Tarea 8**: Añadir/Modificar una reseña de libro
- **Tarea 9**: Eliminar la reseña de un libro añadida por ese usuario en particular

### Métodos Async/Await y Promises (Tareas 10-13)
- **Tarea 10**: Obtener todos los libros - Usando función de devolución de llamada asíncrona
- **Tarea 11**: Buscar por ISBN - Usando Promises
- **Tarea 12**: Búsqueda por autor - Usando Async/Await
- **Tarea 13**: Búsqueda por título - Usando Async/Await

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm start
```

El servidor se ejecutará en `http://localhost:5000`

## Endpoints Disponibles

### Rutas Públicas (Usuarios en General)

#### 1. Obtener todos los libros
```
GET /
```

#### 2. Obtener libro por ISBN
```
GET /isbn/:isbn
```

#### 3. Obtener libros por autor
```
GET /author/:author
```

#### 4. Obtener libros por título
```
GET /title/:title
```

#### 5. Obtener reseñas de un libro
```
GET /review/:isbn
```

#### 6. Registrar nuevo usuario
```
POST /register
Content-Type: application/json

{
  "username": "usuario",
  "password": "contraseña"
}
```

#### 7. Iniciar sesión
```
POST /customer/login
Content-Type: application/json

{
  "username": "usuario",
  "password": "contraseña"
}
```

### Rutas Protegidas (Usuarios Registrados)

#### 8. Añadir/Modificar reseña
```
PUT /customer/auth/review/:isbn
Content-Type: application/json

{
  "review": "Excelente libro, muy recomendado"
}
```

#### 9. Eliminar reseña
```
DELETE /customer/auth/review/:isbn
```

### Rutas Async (Métodos con Async/Await y Promises)

#### 10. Obtener todos los libros (Async)
```
GET /async/books
```

#### 11. Buscar por ISBN (Promise)
```
GET /async/isbn/:isbn
```

#### 12. Búsqueda por autor (Async/Await)
```
GET /async/author/:author
```

#### 13. Búsqueda por título (Async/Await)
```
GET /async/title/:title
```

## Ejemplos de Uso

### 1. Registrar un usuario
```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username": "juan", "password": "123456"}'
```

### 2. Iniciar sesión
```bash
curl -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{"username": "juan", "password": "123456"}'
```

### 3. Obtener todos los libros
```bash
curl http://localhost:5000/
```

### 4. Buscar libro por ISBN
```bash
curl http://localhost:5000/isbn/1
```

### 5. Buscar libros por autor
```bash
curl http://localhost:5000/author/Jane
```

### 6. Añadir reseña (requiere autenticación)
```bash
curl -X PUT http://localhost:5000/customer/auth/review/1 \
  -H "Content-Type: application/json" \
  -d '{"review": "Excelente libro clásico"}'
```

## Estructura del Proyecto

```
final_project/
├── index.js              # Servidor principal
├── async_books.js        # Métodos async/await y promises
├── package.json          # Dependencias
├── README.md            # Documentación
└── router/
    ├── auth_users.js     # Rutas de usuarios autenticados
    ├── general.js        # Rutas públicas
    ├── booksdb.js        # Base de datos de libros
    └── async_routes.js   # Rutas para métodos async
```

## Tecnologías Utilizadas

- **Express.js**: Framework web para Node.js
- **JWT**: Autenticación con tokens
- **Express-session**: Manejo de sesiones
- **Axios**: Cliente HTTP para llamadas asíncronas
- **Async/Await**: Programación asíncrona moderna
- **Promises**: Manejo de operaciones asíncronas

## Notas Importantes

1. Las rutas protegidas requieren autenticación previa
2. Los métodos async incluyen delays simulados de 1 segundo
3. La base de datos de libros está en memoria (se reinicia al reiniciar el servidor)
4. Las sesiones se almacenan en memoria (se pierden al reiniciar el servidor)

## Puntuación del Laboratorio

Este proyecto cubre todas las 14 tareas requeridas:
- Tareas 1-7: Usuarios en general (16 puntos)
- Tareas 8-9: Usuarios registrados (4 puntos)
- Tareas 10-13: Métodos async/await y promises (8 puntos)
- Tarea 14: Envío del enlace GitHub (2 puntos)

**Total: 30 puntos**