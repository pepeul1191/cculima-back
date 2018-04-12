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
      var teatro = new models.Teatro(
        data
      );
      teatro.save(function (err, createdDoc) {
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en registrar el teatro',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          var rpta = {
            'tipo_mensaje': 'success',
            'mensaje': [
              'Se ha registrado el teatro',
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
      models.Teatro.findById(_id, function(err, teatro){
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en buscar el teatro a editar',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          if(teatro == null){
            var rpta = {
              'tipo_mensaje': 'error',
              'mensaje': [
                'Documento a editar no se encuentra en la base de datos'
              ]
            }
            reply(JSON.stringify(rpta));
          }else{
            teatro.foto_menu = data.foto_menu;
            teatro.foto_detalle = data.foto_detalle;
            teatro.nombre = data.nombre;
            teatro.titulo = data.titulo;
            teatro.descripcion = data.descripcion;
            teatro.elenco = data.elenco;
            teatro.equipo = data.equipo;
            teatro.programacion = data.programacion;
            teatro.comienza = data.comienza;
            teatro.finaliza = data.finaliza;
            teatro.organizador = data.organizador;
            teatro.fechas = data.fechas;
            teatro.lugar = data.lugar;
            teatro.save(function (err, updatedDoc) {
              if (err){
                var rpta = {
                  'tipo_mensaje': 'error',
                  'mensaje': [
                    'Se ha producido un error en editar el teatro',
                    err.toString()
                  ]
                }
                reply(JSON.stringify(rpta));
              }else{
                var rpta = {
                  'tipo_mensaje': 'success',
                  'mensaje': [
                    'Se ha editado el teatro',
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
  {
    method: ['GET'],
    path: 'obtener/{teatro_id}',
    config: {
      auth: false,
      pre: [
      ],
    },
    handler: function (request, reply) {
      var _id = request.params.teatro_id;
      models.Teatro.findOne({_id: _id},function(err, doc){
        reply(JSON.stringify(doc));
      });
    }
  },
]
