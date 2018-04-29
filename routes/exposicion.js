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
      var exposicion = new models.Exposicion(
        data
      );
      exposicion.save(function (err, createdDoc) {
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en registrar la exposicion',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          var rpta = {
            'tipo_mensaje': 'success',
            'mensaje': [
              'Se ha registrado la exposicion',
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
      models.Exposicion.findById(_id, function(err, exposicion){
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en buscar la exposicion a editar',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          if(exposicion == null){
            var rpta = {
              'tipo_mensaje': 'error',
              'mensaje': [
                'Documento a editar no se encuentra en la base de datos'
              ]
            }
            reply(JSON.stringify(rpta));
          }else{
            exposicion.nombre = data.nombre;
            exposicion.titulo = data.titulo;
            exposicion.descripcion = data.descripcion;
            exposicion.comienza = data.comienza;
            exposicion.finaliza = data.finaliza;
            exposicion.organizador = data.organizador;
            exposicion.fechas = data.fechas;
            exposicion.lugar = data.lugar;
            exposicion.direccion = data.direccion;
            exposicion.foto_menu = data.foto_menu;
            exposicion.foto_detalle = data.foto_detalle;
            exposicion.save(function (err, updatedDoc) {
              if (err){
                var rpta = {
                  'tipo_mensaje': 'error',
                  'mensaje': [
                    'Se ha producido un error en editar la exposicion',
                    err.toString()
                  ]
                }
                reply(JSON.stringify(rpta));
              }else{
                var rpta = {
                  'tipo_mensaje': 'success',
                  'mensaje': [
                    'Se ha editado la exposicion',
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
        models.Exposicion.findByIdAndRemove(eliminado_id, function(err, doc){
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
              'Se ha producido un error en eliminar las exposiciones',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          var rpta = {
            'tipo_mensaje': 'success',
            'mensaje': [
              'Se ha registrado los cambios en las exposiciones',
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
      models.Exposicion.find({},function(err, documents){
        reply(JSON.stringify(documents));
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
      var exposicion = new models.Exposicion({
        nombre: data['nombre'],
        titulo: data['titulo'],
        descripcion: data['descripcion'],
        organizador: data['organizador'],
        comienza: data['comienza'],
        finaliza: data['finaliza'],
        lugar: data['lugar'],
        fechas: [],
      });
      exposicion.save(function (err, createdDoc) {
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en registrar la exposición',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          var rpta = {
            'tipo_mensaje': 'success',
            'mensaje': [
              'Se ha registrado la exposición',
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
    path: 'editar_detalle',
    config: {
      auth: false,
      pre: [
      ],
    },
    handler: function (request, reply) {
      var data = JSON.parse(request.query.data);
      var _id = data['_id'];
      models.Exposicion.findById(_id, function(err, exposicion){
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en buscar el exposicion a editar',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          if(exposicion == null){
            var rpta = {
              'tipo_mensaje': 'error',
              'mensaje': [
                'Documento a editar no se encuentra en la base de datos'
              ]
            }
            reply(JSON.stringify(rpta));
          }else{
            exposicion.nombre = data.nombre;
            exposicion.titulo = data.titulo;
            exposicion.descripcion = data.descripcion;
            exposicion.organizador = data.organizador;
            exposicion.comienza = data.comienza;
            exposicion.finaliza = data.finaliza;
            exposicion.lugar = data.lugar;
            exposicion.save(function (err, updatedDoc) {
              if (err){
                var rpta = {
                  'tipo_mensaje': 'error',
                  'mensaje': [
                    'Se ha producido un error en editar el exposición',
                    err.toString()
                  ]
                }
                reply(JSON.stringify(rpta));
              }else{
                var rpta = {
                  'tipo_mensaje': 'success',
                  'mensaje': [
                    'Se ha editado el exposición',
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
    path: 'asociar_calendario',
    config: {
      auth: false,
      pre: [
      ],
    },
    handler: function (request, reply) {
      var exposicion_id = request.query.exposicion_id;
      var fechas = JSON.parse(request.query.fechas);
      models.Exposicion.findById(exposicion_id, function(err, exposicion){
          if (err){
            var rpta = {
              'tipo_mensaje': 'error',
              'mensaje': [
                'Se ha producido un error en buscar el exposicion a añadir calendario',
                err.toString()
              ]
            }
            reply(JSON.stringify(rpta));
          }else{
            if(exposicion == null){
              var rpta = {
                'tipo_mensaje': 'error',
                'mensaje': [
                  'Documento a editar no se encuentra en la base de datos'
                ]
              }
              reply(JSON.stringify(rpta));
            }else{
              exposicion.fechas = fechas;
              exposicion.save(function (err, updatedDoc) {
                if (err){
                  var rpta = {
                    'tipo_mensaje': 'error',
                    'mensaje': [
                      'Se ha producido un error en editar el exposición con su calendario',
                      err.toString()
                    ]
                  }
                  reply(JSON.stringify(rpta));
                }else{
                  var rpta = {
                    'tipo_mensaje': 'success',
                    'mensaje': [
                      'Se ha agreado un calendario al exposición',
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
      path: 'asociar_imagen_menu',
      config: {
        auth: false,
        pre: [
        ],
      },
      handler: function (request, reply) {
        var exposicion_id = request.query.exposicion_id;
        var imagen_menu_id = request.query.imagen_menu_id;
        models.Exposicion.findById(exposicion_id, function(err, exposicion){
          if (err){
            var rpta = {
              'tipo_mensaje': 'error',
              'mensaje': [
                'Se ha producido un error en buscar la exposición a añadir imagen de menú',
                err.toString()
              ]
            }
            reply(JSON.stringify(rpta));
          }else{
            if(exposicion == null){
              var rpta = {
                'tipo_mensaje': 'error',
                'mensaje': [
                  'Documento a editar no se encuentra en la base de datos'
                ]
              }
              reply(JSON.stringify(rpta));
            }else{
              exposicion.foto_menu = imagen_menu_id;
              exposicion.save(function (err, updatedDoc) {
                if (err){
                  var rpta = {
                    'tipo_mensaje': 'error',
                    'mensaje': [
                      'Se ha producido un error en editar la exposición con su imagen de menú',
                      err.toString()
                    ]
                  }
                  reply(JSON.stringify(rpta));
                }else{
                  var rpta = {
                    'tipo_mensaje': 'success',
                    'mensaje': [
                      'Se ha agreado una imagen menú al exposicion',
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
