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
      var concierto = new models.Concierto(
        data
      );
      concierto.save(function (err, createdDoc) {
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en registrar el concierto',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          var rpta = {
            'tipo_mensaje': 'success',
            'mensaje': [
              'Se ha registrado el concierto',
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
      models.Concierto.findById(_id, function(err, concierto){
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en buscar el concierto a editar',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          if(concierto == null){
            var rpta = {
              'tipo_mensaje': 'error',
              'mensaje': [
                'Documento a editar no se encuentra en la base de datos'
              ]
            }
            reply(JSON.stringify(rpta));
          }else{
            concierto.nombre = data.nombre;
            concierto.titulo = data.titulo;
            concierto.descripcion = data.descripcion;
            concierto.comienza = data.comienza;
            concierto.finaliza = data.finaliza;
            concierto.organizador = data.organizador;
            concierto.fechas = data.fechas;
            concierto.lugar = data.lugar;
            concierto.direccion = data.direccion;
            concierto.foto_menu = data.foto_menu;
            concierto.foto_detalle = data.foto_detalle;
            concierto.save(function (err, updatedDoc) {
              if (err){
                var rpta = {
                  'tipo_mensaje': 'error',
                  'mensaje': [
                    'Se ha producido un error en editar el concierto',
                    err.toString()
                  ]
                }
                reply(JSON.stringify(rpta));
              }else{
                var rpta = {
                  'tipo_mensaje': 'success',
                  'mensaje': [
                    'Se ha editado el concierto',
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
        models.Concierto.findByIdAndRemove(eliminado_id, function(err, doc){
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
              'Se ha producido un error en eliminar los conciertos',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          var rpta = {
            'tipo_mensaje': 'success',
            'mensaje': [
              'Se ha registrado los cambios en los conciertos',
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
      models.Concierto.find({},function(err, documents){
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
      var concierto = new models.Concierto({
        nombre: data['nombre'],
        titulo: data['titulo'],
        descripcion: data['descripcion'],
        organizador: data['organizador'],
        comienza: data['comienza'],
        finaliza: data['finaliza'],
        lugar: data['lugar'],
        fechas: [],
      });
      concierto.save(function (err, createdDoc) {
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en registrar el concierto',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          var rpta = {
            'tipo_mensaje': 'success',
            'mensaje': [
              'Se ha registrado el concierto',
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
      models.Concierto.findById(_id, function(err, concierto){
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en buscar el concierto a editar',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          if(concierto == null){
            var rpta = {
              'tipo_mensaje': 'error',
              'mensaje': [
                'Documento a editar no se encuentra en la base de datos'
              ]
            }
            reply(JSON.stringify(rpta));
          }else{
            concierto.nombre = data.nombre;
            concierto.titulo = data.titulo;
            concierto.descripcion = data.descripcion;
            concierto.organizador = data.organizador;
            concierto.comienza = data.comienza;
            concierto.finaliza = data.finaliza;
            concierto.lugar = data.lugar;
            concierto.save(function (err, updatedDoc) {
              if (err){
                var rpta = {
                  'tipo_mensaje': 'error',
                  'mensaje': [
                    'Se ha producido un error en editar el concierto',
                    err.toString()
                  ]
                }
                reply(JSON.stringify(rpta));
              }else{
                var rpta = {
                  'tipo_mensaje': 'success',
                  'mensaje': [
                    'Se ha editado el concierto',
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
      var concierto_id = request.query.concierto_id;
      var fechas = JSON.parse(request.query.fechas);
      models.Concierto.findById(concierto_id, function(err, concierto){
          if (err){
            var rpta = {
              'tipo_mensaje': 'error',
              'mensaje': [
                'Se ha producido un error en buscar el concierto a añadir calendario',
                err.toString()
              ]
            }
            reply(JSON.stringify(rpta));
          }else{
            if(concierto == null){
              var rpta = {
                'tipo_mensaje': 'error',
                'mensaje': [
                  'Documento a editar no se encuentra en la base de datos'
                ]
              }
              reply(JSON.stringify(rpta));
            }else{
              concierto.fechas = fechas;
              concierto.save(function (err, updatedDoc) {
                if (err){
                  var rpta = {
                    'tipo_mensaje': 'error',
                    'mensaje': [
                      'Se ha producido un error en editar el concierto con su calendario',
                      err.toString()
                    ]
                  }
                  reply(JSON.stringify(rpta));
                }else{
                  var rpta = {
                    'tipo_mensaje': 'success',
                    'mensaje': [
                      'Se ha agreado un calendario el concierto',
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
        var concierto_id = request.query.concierto_id;
        var imagen_menu_id = request.query.imagen_menu_id;
        models.Concierto.findById(concierto_id, function(err, concierto){
          if (err){
            var rpta = {
              'tipo_mensaje': 'error',
              'mensaje': [
                'Se ha producido un error en buscar el concierto a añadir imagen de menú',
                err.toString()
              ]
            }
            reply(JSON.stringify(rpta));
          }else{
            if(concierto == null){
              var rpta = {
                'tipo_mensaje': 'error',
                'mensaje': [
                  'Documento a editar no se encuentra en la base de datos'
                ]
              }
              reply(JSON.stringify(rpta));
            }else{
              concierto.foto_menu = imagen_menu_id;
              concierto.save(function (err, updatedDoc) {
                if (err){
                  var rpta = {
                    'tipo_mensaje': 'error',
                    'mensaje': [
                      'Se ha producido un error en editar el concierto con su imagen de menú',
                      err.toString()
                    ]
                  }
                  reply(JSON.stringify(rpta));
                }else{
                  var rpta = {
                    'tipo_mensaje': 'success',
                    'mensaje': [
                      'Se ha agreado una imagen menú a el concierto',
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
      var concierto_id = request.query.concierto_id;
      var imagen_detalle_id = request.query.imagen_detalle_id;
      models.Concierto.findById(concierto_id, function(err, concierto){
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en buscar el concierto a añadir imagen de detalle',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          if(concierto == null){
            var rpta = {
              'tipo_mensaje': 'error',
              'mensaje': [
                'Documento a editar no se encuentra en la base de datos'
              ]
            }
            reply(JSON.stringify(rpta));
          }else{
            concierto.foto_detalle = imagen_detalle_id;
            concierto.save(function (err, updatedDoc) {
              if (err){
                var rpta = {
                  'tipo_mensaje': 'error',
                  'mensaje': [
                    'Se ha producido un error en editar el concierto con su imagen de detalle',
                    err.toString()
                  ]
                }
                reply(JSON.stringify(rpta));
              }else{
                var rpta = {
                  'tipo_mensaje': 'success',
                  'mensaje': [
                    'Se ha agreado una imagen detalle a el concierto',
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
    path: 'obtener/{concierto_id}',
    config: {
      auth: false,
      pre: [
      ],
    },
    handler: function (request, reply) {
      var _id = request.params.concierto_id;
      models.Concierto.findOne({_id: _id},function(err, doc){
        reply(JSON.stringify(doc));
      });
    }
  },
  {
    method: ['GET'],
    path: 'obtener_calendario/{concierto_id}',
    config: {
      auth: false,
      pre: [
      ],
    },
    handler: function (request, reply) {
      var _id = request.params.concierto_id;
      models.Concierto.findOne({_id: _id},function(err, doc){
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
