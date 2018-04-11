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
      foto_princial: { type: String, required: true },
      foto_menu: { type: String, required: true },
      fotos: [String],
    }
  )
);

exports.Blog = Blog;
exports.Ambiente = Ambiente;
