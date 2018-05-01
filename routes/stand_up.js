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
      var stand_up = new models.StandUp(
        data
      );
      stand_up.save(function (err, createdDoc) {
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en registrar el stand up',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          var rpta = {
            'tipo_mensaje': 'success',
            'mensaje': [
              'Se ha registrado el stand up',
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
      models.StandUp.findById(_id, function(err, stand_up){
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en buscar el stand up a editar',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          if(stand_up == null){
            var rpta = {
              'tipo_mensaje': 'error',
              'mensaje': [
                'Documento a editar no se encuentra en la base de datos'
              ]
            }
            reply(JSON.stringify(rpta));
          }else{
            stand_up.nombre = data.nombre;
            stand_up.titulo = data.titulo;
            stand_up.descripcion = data.descripcion;
            stand_up.comienza = data.comienza;
            stand_up.finaliza = data.finaliza;
            stand_up.organizador = data.organizador;
            stand_up.fechas = data.fechas;
            stand_up.lugar = data.lugar;
            stand_up.direccion = data.direccion;
            stand_up.foto_menu = data.foto_menu;
            stand_up.foto_detalle = data.foto_detalle;
            stand_up.save(function (err, updatedDoc) {
              if (err){
                var rpta = {
                  'tipo_mensaje': 'error',
                  'mensaje': [
                    'Se ha producido un error en editar el stand up',
                    err.toString()
                  ]
                }
                reply(JSON.stringify(rpta));
              }else{
                var rpta = {
                  'tipo_mensaje': 'success',
                  'mensaje': [
                    'Se ha editado el stand up',
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
        models.StandUp.findByIdAndRemove(eliminado_id, function(err, doc){
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
              'Se ha producido un error en eliminar los stand ups',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          var rpta = {
            'tipo_mensaje': 'success',
            'mensaje': [
              'Se ha registrado los cambios en los stand ups',
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
      models.StandUp.find({},function(err, documents){
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
      var stand_up = new models.StandUp({
        nombre: data['nombre'],
        titulo: data['titulo'],
        descripcion: data['descripcion'],
        organizador: data['organizador'],
        comienza: data['comienza'],
        finaliza: data['finaliza'],
        lugar: data['lugar'],
        fechas: [],
      });
      stand_up.save(function (err, createdDoc) {
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en registrar el stand up',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          var rpta = {
            'tipo_mensaje': 'success',
            'mensaje': [
              'Se ha registrado el stand up',
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
      models.StandUp.findById(_id, function(err, stand_up){
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en buscar el stand_up a editar',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          if(stand_up == null){
            var rpta = {
              'tipo_mensaje': 'error',
              'mensaje': [
                'Documento a editar no se encuentra en la base de datos'
              ]
            }
            reply(JSON.stringify(rpta));
          }else{
            stand_up.nombre = data.nombre;
            stand_up.titulo = data.titulo;
            stand_up.descripcion = data.descripcion;
            stand_up.organizador = data.organizador;
            stand_up.comienza = data.comienza;
            stand_up.finaliza = data.finaliza;
            stand_up.lugar = data.lugar;
            stand_up.save(function (err, updatedDoc) {
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
      var stand_up_id = request.query.stand_up_id;
      var fechas = JSON.parse(request.query.fechas);
      models.StandUp.findById(stand_up_id, function(err, stand_up){
          if (err){
            var rpta = {
              'tipo_mensaje': 'error',
              'mensaje': [
                'Se ha producido un error en buscar el stand_up a añadir calendario',
                err.toString()
              ]
            }
            reply(JSON.stringify(rpta));
          }else{
            if(stand_up == null){
              var rpta = {
                'tipo_mensaje': 'error',
                'mensaje': [
                  'Documento a editar no se encuentra en la base de datos'
                ]
              }
              reply(JSON.stringify(rpta));
            }else{
              stand_up.fechas = fechas;
              stand_up.save(function (err, updatedDoc) {
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
        var stand_up_id = request.query.stand_up_id;
        var imagen_menu_id = request.query.imagen_menu_id;
        models.StandUp.findById(stand_up_id, function(err, stand_up){
          if (err){
            var rpta = {
              'tipo_mensaje': 'error',
              'mensaje': [
                'Se ha producido un error en buscar el stand up a añadir imagen de menú',
                err.toString()
              ]
            }
            reply(JSON.stringify(rpta));
          }else{
            if(stand_up == null){
              var rpta = {
                'tipo_mensaje': 'error',
                'mensaje': [
                  'Documento a editar no se encuentra en la base de datos'
                ]
              }
              reply(JSON.stringify(rpta));
            }else{
              stand_up.foto_menu = imagen_menu_id;
              stand_up.save(function (err, updatedDoc) {
                if (err){
                  var rpta = {
                    'tipo_mensaje': 'error',
                    'mensaje': [
                      'Se ha producido un error en editar el stand up con su imagen de menú',
                      err.toString()
                    ]
                  }
                  reply(JSON.stringify(rpta));
                }else{
                  var rpta = {
                    'tipo_mensaje': 'success',
                    'mensaje': [
                      'Se ha agreado una imagen menú a la stand_up',
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
    path: 'asociar_imagen_detalle',
    config: {
      auth: false,
      pre: [
      ],
    },
    handler: function (request, reply) {
      var stand_up_id = request.query.stand_up_id;
      var imagen_detalle_id = request.query.imagen_detalle_id;
      models.StandUp.findById(stand_up_id, function(err, stand_up){
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en buscar el stand up a añadir imagen de detalle',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          if(stand_up == null){
            var rpta = {
              'tipo_mensaje': 'error',
              'mensaje': [
                'Documento a editar no se encuentra en la base de datos'
              ]
            }
            reply(JSON.stringify(rpta));
          }else{
            stand_up.foto_detalle = imagen_detalle_id;
            stand_up.save(function (err, updatedDoc) {
              if (err){
                var rpta = {
                  'tipo_mensaje': 'error',
                  'mensaje': [
                    'Se ha producido un error en editar el stand up con su imagen de detalle',
                    err.toString()
                  ]
                }
                reply(JSON.stringify(rpta));
              }else{
                var rpta = {
                  'tipo_mensaje': 'success',
                  'mensaje': [
                    'Se ha agreado una imagen detalle a el stand up',
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
    path: 'obtener/{stand_up_id}',
    config: {
      auth: false,
      pre: [
      ],
    },
    handler: function (request, reply) {
      var _id = request.params.stand_up_id;
      models.StandUp.findOne({_id: _id},function(err, doc){
        reply(JSON.stringify(doc));
      });
    }
  },
  {
    method: ['GET'],
    path: 'obtener_calendario/{stand_up_id}',
    config: {
      auth: false,
      pre: [
      ],
    },
    handler: function (request, reply) {
      var _id = request.params.stand_up_id;
      models.StandUp.findOne({_id: _id},function(err, doc){
        var rpta = [];
        doc.fechas.forEach(function(fecha) {
          var tempFecha = fecha.toJSON();
          var temp = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getUTCDate();
          rpta.push(temp);
        });
        reply(JSON.stringify(rpta));
      });
    }
  },
];
