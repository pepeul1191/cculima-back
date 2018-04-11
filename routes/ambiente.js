'use strict';
var models = require('../config/models');

module.exports = [
  {
    method: ['POST'],
    path: 'crear',
    config: {
      auth: false,
      pre: [
      ],
    },
    handler: function (request, reply) {
      var data = JSON.parse(request.query.data);
      var ambiente = new models.Ambiente(
        data
      );
      ambiente.save(function (err, createdDoc) {
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en registrar el ambiente',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          var rpta = {
            'tipo_mensaje': 'success',
            'mensaje': [
              'Se ha registrado el ambiente',
              createdDoc._id.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }
      });
    }
  },
  {
    method: ['POST'],
    path: 'editar',
    config: {
      auth: false,
      pre: [
      ],
    },
    handler: function (request, reply) {
      var data = JSON.parse(request.query.data);
      var _id = data['id'];
      models.Ambiente.findById(_id, function(err, ambiente){
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en buscar el ambiente a editar',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          if(ambiente == null){
            var rpta = {
              'tipo_mensaje': 'error',
              'mensaje': [
                'Documento a editar no se encuentra en la base de datos'
              ]
            }
            reply(JSON.stringify(rpta));
          }else{
            ambiente.nombre = data.nombre
            ambiente.subtitulo = data.subtitulo
            ambiente.parrafo_izq = data.parrafo_izq
            ambiente.parrafo_der = data.parrafo_der
            ambiente.latitud = data.latitud
            ambiente.longitud = data.longitud
            ambiente.direccion = data.direccion
            ambiente.lefono = data.lefono
            ambiente.foto_princial = data.foto_princial
            ambiente.foto_menu = data.foto_menu
            ambiente.fotos = data. fotos
            ambiente.save(function (err, updatedDoc) {
              if (err){
                var rpta = {
                  'tipo_mensaje': 'error',
                  'mensaje': [
                    'Se ha producido un error en editar el ambiente',
                    err.toString()
                  ]
                }
                reply(JSON.stringify(rpta));
              }else{
                var rpta = {
                  'tipo_mensaje': 'success',
                  'mensaje': [
                    'Se ha editado el ambiente',
                  ]
                }
                reply(JSON.stringify(rpta));
              }
            });
          }
        }
      });
    }
  },
];
