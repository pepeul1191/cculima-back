var db = require('./database');

var Blog = db.mongoose.model('blogs',
  new db.Schema(
    {
      title:  String,
      author: String,
    }
  )
);

var Ambiente = db.mongoose.model('ambientes',
  new db.Schema(
    {
      nombre: { type: String, required: true },
      subtitulo: { type: String, required: true },
      parrafo_izq: { type: String, required: true },
      parrafo_der: { type: String, required: true },
      latitud: { type: Number, required: true },
      longitud: { type: Number, required: true },
      direccion: { type: String, required: true },
      telefono: { type: String, required: true },
      foto_princial: {
        imagen_id: { type: String, required: true },
        url: { type: String, required: true },
      },
      foto_menu: {
        imagen_id: { type: String, required: true },
        url: { type: String, required: true },
      },
      fotos: [
        {
          imagen_id: { type: String, required: true },
          url: { type: String, required: true },
        }
      ],
    }
  )
);

var Servicio = db.mongoose.model('servicios',
  new db.Schema(
    {
      titulo: { type: String, required: true },
      descripcion: { type: String, required: true },
      latitud: { type: Number, required: true },
      longitud: { type: Number, required: true },
      direccion: { type: String, required: true },
      foto: {
        imagen_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    }
  )
);

exports.Blog = Blog;
exports.Ambiente = Ambiente;
exports.Servicio = Servicio;
