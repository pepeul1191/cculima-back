'use strict';
var models = require('../config/models');
var database  = require('../config/database');
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
        models.Teatro.findByIdAndRemove(eliminado_id, function(err, doc){
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
              'Se ha producido un error en eliminar los teatros',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          var rpta = {
            'tipo_mensaje': 'success',
            'mensaje': [
              'Se ha registrado los cambios en los teatros',
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
      models.Teatro.find({},function(err, documents){
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
    var teatro = new models.Teatro({
      nombre: data['nombre'],
      titulo: data['titulo'],
      descripcion: data['descripcion'],
      programacion: data['programacion'],
      organizador: data['organizador'],
      comienza: data['comienza'],
      finaliza: data['finaliza'],
      lugar: data['lugar'],
      foto_menu: '',
      foto_detalle: '',
      elenco: [],
      equipo: [],
      fechas: [],
    });
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
  path: 'editar_detalle',
  config: {
    auth: false,
    pre: [
    ],
  },
  handler: function (request, reply) {
    var data = JSON.parse(request.query.data);
    var _id = data['_id'];
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
          /*
          nombre: data['nombre'],
          titulo: data['titulo'],
          descripcion: data['descripcion'],
          programacion: data['programacion'],
          organizador: data['organizador'],
          comienza: data['comienza'],
          finaliza: data['finaliza'],
          lugar: data['lugar'],
          */
          teatro.nombre = data.nombre;
          teatro.titulo = data.titulo;
          teatro.descripcion = data.descripcion;
          teatro.programacion = data.programacion;
          teatro.organizador = data.organizador;
          teatro.comienza = data.comienza;
          teatro.finaliza = data.finaliza;
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
    method: ['POST'],
    path: 'guardar_elenco',
    config: {
      auth: false,
      pre: [
      ],
    },
    handler: function (request, reply) {
      var data = JSON.parse(request.query.data);
      var nuevos = data['nuevos'];
      var editados = data['editados'];
      var eliminados = data['eliminados'];
      var teatro_id = data['extra']['teatro_id']; //
      var array_nuevos = [];
      var rpta = '';
      models.Teatro.findById(teatro_id, function(err, teatro){
          if (err){
            var rpta = {
              'tipo_mensaje': 'error',
              'mensaje': [
                'Se ha producido un error en buscar el teatro',
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
              try {
                var elenco = teatro.elenco;
                nuevos.forEach(function(nuevo) {
                  var nuevo_id = database.generate_id();
                  var embedded = {
                    '_id': nuevo_id,
                    'nombre': nuevo['nombre'],
                  };
                  elenco.push(embedded);
                  var temp = {
                    'temporal': nuevo['_id'] ,
                    'nuevo_id': nuevo_id,
                  };
                  array_nuevos.push(temp);
                });
                editados.forEach(function(editado) {
                  elenco.forEach(function(foto){
                    if (editado['_id'] == foto['_id']){
                      foto['nombre'] = editado['nombre'];
                    }
                  });
                });
                eliminados.forEach(function(eliminado) {
                  var temps = [];
                  elenco.forEach(function(foto){
                    if (eliminado != foto['_id']){
                      temps.push(foto);
                    }
                  });
                  elenco = temps;
                });
                teatro.elenco = elenco;
                teatro.save(function (err, updatedDoc) {
                  if (err){
                    var rpta = {
                      'tipo_mensaje': 'error',
                      'mensaje': [
                        'Se ha producido un error en guardar el elenco del teatro en le base de datos',
                        err.toString()
                      ]
                    }
                    reply(JSON.stringify(rpta));
                  }else{
                    rpta = {
                      'tipo_mensaje': 'success',
                      'mensaje': [
                        'Se ha registrado los cambios en el elenco del teatro',
                        array_nuevos,
                      ]
                    };
                    reply(JSON.stringify(rpta));
                  }
                });
              } catch (err) {
                rpta = {
                  'tipo_mensaje': 'error',
                  'mensaje': [
                    'Se ha producido un error en guardar el elenco del teatro',
                    err.toString()
                  ]
                };
                reply(JSON.stringify(rpta));
              }
            }
          }
        });
    }
  },
]
