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
      ambiente.save(function (err, createdAmbiente) {
        if (err){
          //return handleError(err);
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha registrado el ambiente',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          var rpta = {
            'tipo_mensaje': 'success',
            'mensaje': [
              'Se ha registrado el ambiente',
              createdAmbiente._id.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }
      });
    }
  },
];
