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
        foto_menu: '',
        foto_principal: '',
        fotos: [],
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
            ambiente.foto_principal = data.foto_principal
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
            ambiente.nombre = data.nombre;
            ambiente.subtitulo = data.subtitulo;
            ambiente.parrafo_izq = data.parrafo_izq;
            ambiente.parrafo_der = data.parrafo_der;
            ambiente.latitud = data.latitud;
            ambiente.longitud = data.longitud;
            ambiente.direccion = data.direccion;
            ambiente.telefono = data.telefono;
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
    path: 'asociar_imagen_principal',
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
              'Se ha producido un error en buscar el ambiente a añadir imagen principal',
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
            ambiente.foto_principal = imagen_principal_id;
            ambiente.save(function (err, updatedDoc) {
              if (err){
                var rpta = {
                  'tipo_mensaje': 'error',
                  'mensaje': [
                    'Se ha producido un error en editar el ambiente con su imagen principal',
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
    path: 'asociar_imagen_menu',
    config: {
      auth: false,
      pre: [
      ],
    },
    handler: function (request, reply) {
      var ambiente_id = request.query.ambiente_id;
      var imagen_menu_id = request.query.imagen_menu_id;
      models.Ambiente.findById(ambiente_id, function(err, ambiente){
          if (err){
            var rpta = {
              'tipo_mensaje': 'error',
              'mensaje': [
                'Se ha producido un error en buscar el ambiente a añadir imagen principal',
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
              ambiente.foto_menu = imagen_menu_id;
              ambiente.save(function (err, updatedDoc) {
                if (err){
                  var rpta = {
                    'tipo_mensaje': 'error',
                    'mensaje': [
                      'Se ha producido un error en editar el ambiente con su imagen principal',
                      err.toString()
                    ]
                  }
                  reply(JSON.stringify(rpta));
                }else{
                  var rpta = {
                    'tipo_mensaje': 'success',
                    'mensaje': [
                      'Se ha agreado una imagen menu al ambiente',
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
    path: 'galeria_guardar',
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
      var ambiente_id = data['extra']['ambiente_id']; //
      var array_nuevos = [];
      var rpta = '';
      models.Ambiente.findById(ambiente_id, function(err, ambiente){
          if (err){
            var rpta = {
              'tipo_mensaje': 'error',
              'mensaje': [
                'Se ha producido un error en buscar el ambiente a añadir imagen principal',
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
              try {
                var fotos = ambiente.fotos;
                nuevos.forEach(function(nuevo) {
                  var nuevo_id = database.generate_id();
                  var embedded = {
                    '_id': nuevo_id,
                    'nombre': nuevo['nombre'],
                    'imagen_id': nuevo['imagen_id'],
                  };

                  fotos.push(embedded);
                  var temp = {
                    'temporal': nuevo['_id'] ,
                    'nuevo_id': nuevo_id,
                  };
                  array_nuevos.push(temp);
                });
                editados.forEach(function(editado) {
                  fotos.forEach(function(foto){
                    if (editado['_id'] == foto['_id']){
                      foto['nombre'] = editado['nombre'];
                      foto['imagen_id'] = editado['imagen_id'];
                    }
                  });
                });
                eliminados.forEach(function(eliminado) {
                  var temps = [];
                  fotos.forEach(function(foto){
                    if (eliminado['_id'] != foto['_id']){
                      temps.push(foto);
                    }
                  });
                  fotos = temps;
                });
                ambiente.fotos = fotos;
                ambiente.save(function (err, updatedDoc) {
                  if (err){
                    var rpta = {
                      'tipo_mensaje': 'error',
                      'mensaje': [
                        'Se ha producido un error en guardar las fotos del ambiente en le base de datos',
                        err.toString()
                      ]
                    }
                    reply(JSON.stringify(rpta));
                  }else{
                    rpta = {
                      'tipo_mensaje': 'success',
                      'mensaje': [
                        'Se ha registrado los cambios en los departamentos',
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
                    'Se ha producido un error en guardar las fotos del ambiente',
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
  {
    method: ['GET'],
    path: 'obtener/{_id}',
    config: {
      auth: false,
      pre: [
      ],
    },
    handler: function (request, reply) {
      models.Ambiente.findOne({_id: request.params._id}, function(err, document){
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en buscar el ambiente',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          if(document == null){
            var rpta = {
              'tipo_mensaje': 'error',
              'mensaje': [
                'Documento buscado no se encuentra en la base de datos'
              ]
            }
            reply(JSON.stringify(rpta));
          }else{
            var rpta = {
              'nombre': document.nombre,
              'subtitulo': document.subtitulo,
              'parrafo_izq': document.parrafo_izq,
              'parrafo_der': document.parrafo_der,
              'latitud': document.latitud,
              'longitud': document.longitud,
              'direccion': document.direccion,
              'telefono': document.telefono,
              'foto_menu': document.foto_menu,
              'foto_principal': document.foto_principal,
            };
            reply(JSON.stringify(rpta));
          }
        }
      });
    }
  },
  {
    method: ['GET'],
    path: 'listar_galeria/{_id}',
    config: {
      auth: false,
      pre: [
      ],
    },
    handler: function (request, reply) {
      models.Ambiente.findOne({_id: request.params._id}, function(err, document){
        if (err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en buscar la galeria del ambiente',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          if(document == null){
            var rpta = {
              'tipo_mensaje': 'error',
              'mensaje': [
                'Documento buscado no se encuentra en la base de datos'
              ]
            }
            reply(JSON.stringify(rpta));
          }else{
            reply(JSON.stringify(document.fotos));
          }
        }
      });
    }
  },
];
