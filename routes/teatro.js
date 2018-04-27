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
                elenco.forEach(function(equipo){
                  if (editado['_id'] == equipo['_id']){
                    equipo['nombre'] = editado['nombre'];
                  }
                });
              });
              eliminados.forEach(function(eliminado) {
                var temps = [];
                elenco.forEach(function(equipo){
                  if (eliminado != equipo['_id']){
                    temps.push(equipo);
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
{
  method: ['POST'],
  path: 'guardar_equipo',
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
              var equipo = teatro.equipo;
              nuevos.forEach(function(nuevo) {
                var nuevo_id = database.generate_id();
                var embedded = {
                  '_id': nuevo_id,
                  'nombre': nuevo['nombre'],
                };
                equipo.push(embedded);
                var temp = {
                  'temporal': nuevo['_id'] ,
                  'nuevo_id': nuevo_id,
                };
                array_nuevos.push(temp);
              });
              editados.forEach(function(editado) {
                equipo.forEach(function(equipo){
                  if (editado['_id'] == equipo['_id']){
                    equipo['nombre'] = editado['nombre'];
                  }
                });
              });
              eliminados.forEach(function(eliminado) {
                var temps = [];
                equipo.forEach(function(equipo){
                  if (eliminado != equipo['_id']){
                    temps.push(equipo);
                  }
                });
                equipo = temps;
              });
              teatro.equipo = equipo;
              teatro.save(function (err, updatedDoc) {
                if (err){
                  var rpta = {
                    'tipo_mensaje': 'error',
                    'mensaje': [
                      'Se ha producido un error en guardar el equipo del teatro en le base de datos',
                      err.toString()
                    ]
                  }
                  reply(JSON.stringify(rpta));
                }else{
                  rpta = {
                    'tipo_mensaje': 'success',
                    'mensaje': [
                      'Se ha registrado los cambios en el equipo del teatro',
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
                  'Se ha producido un error en guardar el equipo del teatro',
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
{
  method: ['POST'],
  path: 'asociar_imagen_menu',
  config: {
    auth: false,
    pre: [
    ],
  },
  handler: function (request, reply) {
    var teatro_id = request.query.teatro_id;
    var imagen_menu_id = request.query.imagen_menu_id;
    models.Teatro.findById(teatro_id, function(err, teatro){
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en buscar el teatro a añadir imagen de menú',
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
            teatro.foto_menu = imagen_menu_id;
            teatro.save(function (err, updatedDoc) {
              if (err){
                var rpta = {
                  'tipo_mensaje': 'error',
                  'mensaje': [
                    'Se ha producido un error en editar el teatro con su imagen de menú',
                    err.toString()
                  ]
                }
                reply(JSON.stringify(rpta));
              }else{
                var rpta = {
                  'tipo_mensaje': 'success',
                  'mensaje': [
                    'Se ha agreado una imagen menú al teatro',
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
    var teatro_id = request.query.teatro_id;
    var imagen_detalle_id = request.query.imagen_detalle_id;
    models.Teatro.findById(teatro_id, function(err, teatro){
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en buscar el teatro a añadir imagen de detalle',
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
            teatro.foto_detalle = imagen_detalle_id;
            teatro.save(function (err, updatedDoc) {
              if (err){
                var rpta = {
                  'tipo_mensaje': 'error',
                  'mensaje': [
                    'Se ha producido un error en editar el teatro con su imagen de detalle',
                    err.toString()
                  ]
                }
                reply(JSON.stringify(rpta));
              }else{
                var rpta = {
                  'tipo_mensaje': 'success',
                  'mensaje': [
                    'Se ha agreado una imagen detalle al teatro',
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
]
