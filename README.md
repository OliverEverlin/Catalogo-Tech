# Proyecto Backend - Catalogo de electronica

## Requerimientos - 3 end Points

- Catalogo de tienda electrónica
    - 3 productos
    - Nombre
    - Descripción
    - Precio
    - Stock -> qty
- Usuarios
    - Gerente
    - Supervisor
    - Trabajador
- Ordenes de compra

## Orden de desarrollo
- Connección a BD -> nota, no iniciar por eso pipipi
- Creación de end points
- CRUD
- Views

## Bibliografìa
- https://www.youtube.com/watch?v=S4IgPTwwPBw 
- https://www.youtube.com/watch?v=ev3Yxva4wI4&t=138s
- https://www.youtube.com/watch?v=lduIpYA66mM
- https://youtu.be/f-e9_8YCFI0?si=bz_F8U3axTaJLA-1
- https://github.com/Mugammad/e-commerce-cherry-blossom-backend 

ver màs adelante: https://youtu.be/S6Yd5cPtXr4?si=LB5IaIy-v4RZW861 

### Actualizaciones desde la publicaciòn del video
- mongo db ya no usa remove (deprecado), ahora usar deleteOne o deleteMany depende del caso. (/app/routes/user.js line 39)
https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteOne/
- Variables de entorno siempre en mayuscula
- aprender que hace next() 

### comentarios :v
- falta unir las imagenes a los productos
- falta probar el CRUD de cart
- mejorar estructura del .env
