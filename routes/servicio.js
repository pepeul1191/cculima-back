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
      var servicio = new models.Servicio(
        data
      );
      servicio.save(function (err, createdDoc) {
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en registrar el servicio',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          var rpta = {
            'tipo_mensaje': 'success',
            'mensaje': [
              'Se ha registrado el servicio',
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
      models.Servicio.findById(_id, function(err, servicio){
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en buscar el servicio a editar',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          if(servicio == null){
            var rpta = {
              'tipo_mensaje': 'error',
              'mensaje': [
                'Documento a editar no se encuentra en la base de datos'
              ]
            }
            reply(JSON.stringify(rpta));
          }else{
            servicio.titulo = data.titulo;
            servicio.descripcion = data.descripcion;
            servicio.latitud = data.latitud;
            servicio.longitud = data.longitud;
            servicio.direccion = data.direccion;
            servicio.foto = data.foto;
            servicio.save(function (err, updatedDoc) {
              if (err){
                var rpta = {
                  'tipo_mensaje': 'error',
                  'mensaje': [
                    'Se ha producido un error en editar el servicio',
                    err.toString()
                  ]
                }
                reply(JSON.stringify(rpta));
              }else{
                var rpta = {
                  'tipo_mensaje': 'success',
                  'mensaje': [
                    'Se ha editado el servicio',
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
