# Mongo Node Lab

Aplicacion del laboratorio de Node.js con MongoDB, Express, EJS y Mongoose.

## Requisitos

- Node.js 18 o superior
- MongoDB local en `127.0.0.1:27017`
- `mongosh` para revisar la base de datos

## Instalacion

```bash
npm install
```

## Variables de entorno

Crea `.env` con este contenido:

```env
MONGO_URI=mongodb://127.0.0.1:27017/socialmedia
PORT=3001
```

## Iniciar MongoDB

Si no tienes un servicio activo, puedes levantar una instancia local temporal:

```bash
mkdir -p /tmp/mongodb-data
/opt/homebrew/bin/mongod --dbpath /tmp/mongodb-data --fork --logpath /tmp/mongodb.log --bind_ip 127.0.0.1 --port 27017
```

## Ejecutar el proyecto

```bash
npm run dev
```

La aplicacion quedara disponible en:

- `http://localhost:3001/`
- `http://localhost:3001/posts`
- `http://localhost:3001/posts/new`

## Funcionalidades

- Conexion de Node.js con MongoDB usando Mongoose
- Modelos `User` y `Post` con validaciones
- Seed inicial de usuarios y un post
- CRUD web de posts
- Listado de posts con autor, hashtags e imagen

## Comandos de MongoDB para la evidencia

```bash
mongosh
show dbs
use socialmedia
db.users.find().pretty()
db.posts.find().pretty()
```

## Capturas para la entrega

Revisa [ENTREGA.md](./ENTREGA.md).

## GitHub

Inicializa el primer commit y sube el proyecto:

```bash
git add .
git commit -m "feat: laboratorio mongo node con crud de posts"
git remote add origin <URL_DE_TU_REPOSITORIO>
git push -u origin main
```
