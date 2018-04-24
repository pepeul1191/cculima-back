'use strict';
var models = require('../config/models');
var async = require('async');

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
    path: 'crear_detalle',
    config: {
      auth: false,
      pre: [
      ],
    },
    handler: function (request, reply) {
      var data = JSON.parse(request.query.data);
      var ambiente = new models.Ambiente({
        nombre: data['nombre'],
        subtitulo: data['subtitulo'],
        parrafo_izq: data['parrafo_izq'],
        parrafo_der: data['parrafo_der'],
        latitud: data['latitud'],
        longitud: data['longitud'],
        direccion: data['direccion'],
        telefono: data['telefono'],
      });
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
            ambiente.telefono = data.telefono
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
  {
    method: ['POST'],
    path: 'editar_detalle',
    config: {
      auth: false,
      pre: [
      ],
    },
    handler: function (request, reply) {
      var data = JSON.parse(request.query.data);
      var _id = data['_id'];
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
            ambiente.telefono = data.telefono
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
  {
    method: ['POST'],
    path: 'asociar_imagen_princial',
    config: {
      auth: false,
      pre: [
      ],
    },
    handler: function (request, reply) {
      var ambiente_id = request.query.ambiente_id;
      var imagen_principal_id = request.query.imagen_principal_id;
      models.Ambiente.findById(ambiente_id, function(err, ambiente){
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en buscar el ambiente a añadir imagen princial',
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
            ambiente.foto_princial = imagen_principal_id;
            ambiente.save(function (err, updatedDoc) {
              if (err){
                var rpta = {
                  'tipo_mensaje': 'error',
                  'mensaje': [
                    'Se ha producido un error en editar el ambiente con su imagen princial',
                    err.toString()
                  ]
                }
                reply(JSON.stringify(rpta));
              }else{
                var rpta = {
                  'tipo_mensaje': 'success',
                  'mensaje': [
                    'Se ha agreado una imagen principal al ambiente',
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
    method: ['POST'],
    path: 'guardar',
    config: {
      auth: false,
      pre: [
      ],
    },
    handler: function (request, reply) {
      var data = JSON.parse(request.query.data);
      var eliminados = data['eliminados'];
      var _id = request.query._id;
      var error = false;
      var tests = [];
      async.each(eliminados, function(eliminado_id, callback){
        models.Ambiente.findByIdAndRemove(eliminado_id, function(err, doc){
          if (err){
            callback(err);
            return;
          }else{
            callback();
          }
        });
      }, function(err){
        if(err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en eliminar los ambientes',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          var rpta = {
            'tipo_mensaje': 'success',
            'mensaje': [
              'Se ha registrado los cambios en los ambientes',
            ]
          }
          reply(JSON.stringify(rpta));
        }
      });
    }
  },
  {
    method: ['GET'],
    path: 'listar',
    config: {
      auth: false,
      pre: [
      ],
    },
    handler: function (request, reply) {
      models.Ambiente.find({},function(err, documents){
        reply(JSON.stringify(documents));
      });
    }
  },
];
