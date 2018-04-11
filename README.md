## Centro Cultural ULima Backend

Instlación de software y dependencias:

    $ npm install && npm install -g nodemon bower && bower install

Arrancar servicio:

    $ nodejs app.js

Arrancer servicio con autoreload con cambios:

    $ nodemon app.js

### Centro Cultural Universidad de Lima

https://www.centroculturalulima.com

### Backup y Restore la Base de Datos Mongo

Para realizar un backup de un base de datos incluyendo los stored functions.

    $ mongodump --db cculima --out db

Para restaurar

    $ mongorestore -d cculima db/cculima

---

Fuentes:

+ http://mongoosejs.com/docs/models.html
+ https://github.com/davidenq/hapi-routes-loader
+ https://stackoverflow.com/questions/7653080/adding-to-an-array-asynchronously-in-node-js
+ https://stackoverflow.com/questions/31331606/how-can-i-add-a-middleware-in-my-route
+ https://hapijs.com/tutorials/routing?lang=en_US
+ http://mongoosejs.com/docs/schematypes.html
