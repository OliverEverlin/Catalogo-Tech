# Proyecto Backend - Catalogo de electronica

## Requerimientos - 3 end Points

- Catalogo de tienda electrónica
    - 3 productos
    - Nombre
    - Descripción
    - Precio
    - Stock
- Usuarios
    - Gerente
    - Supervisor
    - Trabajador
- Ordenes de compra

## Orden de desarrollo
- Connección a BD
- Creación de end points
- CRUD
- Views

## Bibliografìa
- https://www.youtube.com/watch?v=S4IgPTwwPBw 
- https://www.youtube.com/watch?v=ev3Yxva4wI4&t=138s
- https://www.youtube.com/watch?v=lduIpYA66mM
- https://youtu.be/f-e9_8YCFI0?si=bz_F8U3axTaJLA-1

### Actualizaciones desde la publicaciòn del video
- mongo db ya no usa remove (deprecado), ahora usar deleteOne o deleteMany depende del caso. (/src/routes/user.js line 39)
https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteOne/
- Variables de entorno siempre en mayuscula
