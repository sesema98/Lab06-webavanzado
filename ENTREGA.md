# Guia de entrega del laboratorio

## Capturas que debes tomar

1. Terminal ejecutando `npm run dev` y mostrando:
   - `MongoDB conectado`
   - `Servidor en http://localhost:3001`

2. Pantalla de inicio:
   - `http://localhost:3001/`

3. Pantalla del listado de posts:
   - `http://localhost:3001/posts`

4. Pantalla del formulario de registro:
   - `http://localhost:3001/posts/new`

5. Evidencia de un post creado desde la web:
   - crea un nuevo post y captura el listado donde se vea

6. Evidencia de un post editado:
   - entra a editar un post, cambia titulo o contenido y captura el resultado final

7. Evidencia de eliminacion:
   - captura antes y despues de eliminar un post

8. Base de datos en `mongosh` o MongoDB Compass:
   - `show dbs`
   - `use socialmedia`
   - `db.users.find().pretty()`
   - `db.posts.find().pretty()`

## Texto que puedes responder en conclusiones

1. En este laboratorio logre integrar Node.js con MongoDB usando Mongoose, lo que me permitio comprender mejor como se establece la conexion y como se manipulan documentos desde una aplicacion web.
2. Al definir validaciones en los modelos de `User` y `Post`, entendi la importancia de controlar la calidad de los datos desde el esquema para evitar registros incompletos o inconsistentes.
3. La separacion en capas de repositorio, servicio, controlador y rutas facilito la organizacion del proyecto y hizo mas claro el flujo de la informacion dentro de la aplicacion.
4. Implementar el CRUD de posts me ayudo a reforzar el uso de formularios, vistas con EJS y operaciones de insercion, actualizacion y eliminacion conectadas a MongoDB.
5. Una dificultad importante fue asegurar que los datos del formulario se transformaran correctamente, por ejemplo en el manejo de hashtags y relaciones con usuarios, pero se resolvio validando entradas y reutilizando la logica del servicio.

## Repositorio

Sube este proyecto a GitHub y coloca el enlace de tu repositorio en el informe final.
