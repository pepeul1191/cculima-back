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
      foto_principal: { type: String, },
      foto_menu: { type: String, },
      fotos: [
        {
          imagen_id: { type: String, },
          nombre: { type: String },
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
      foto: { type: String },
    }
  )
);

var OtroServicio = db.mongoose.model('servicios_otros',
  new db.Schema(
    {
      titulo: { type: String, required: true },
      descripcion: { type: String, required: true },
    }
  )
);

var Teatro = db.mongoose.model('teatros',
  new db.Schema(
    {
      foto_menu: { type: String },
      foto_detalle: { type: String },
      nombre: { type: String, required: true },
      titulo: { type: String, required: true },
      descripcion: { type: String, required: true },
      elenco: [
        {
          elenco_id: { type: String, },
          nombre: { type: String },
        }
      ],
      equipo: [
        {
          elenco_id: { type: String, },
          nombre: { type: String },
        }
      ],
      programacion: { type: String, required: true },
      comienza: { type: String, required: true },
      finaliza: { type: String, required: true },
      organizador: { type: String, required: true },
      fechas: [
        { type: Date, required: true },
      ],
      lugar: { type: db.Schema.Types.ObjectId, required: true },
    }
  )
);

var StandUp = db.mongoose.model('stand_ups',
  new db.Schema(
    {
      foto_menu: {
        imagen_id: { type: String, },
        url: { type: String },
      },
      foto_detalle: {
        imagen_id: { type: String, },
        url: { type: String },
      },
      nombre: { type: String, required: true },
      titulo: { type: String, required: true },
      descripcion: { type: String, required: true },
      comienza: { type: String, required: true },
      finaliza: { type: String, required: true },
      organizador: { type: String, required: true },
      fechas: [
        { type: Date, required: true },
      ],
      lugar: { type: db.Schema.Types.ObjectId, required: true },
    }
  )
);

var Concierto = db.mongoose.model('conciertos',
  new db.Schema(
    {
      foto_menu: {
        imagen_id: { type: String, },
        url: { type: String },
      },
      foto_detalle: {
        imagen_id: { type: String, },
        url: { type: String },
      },
      nombre: { type: String, required: true },
      titulo: { type: String, required: true },
      descripcion: { type: String, required: true },
      comienza: { type: String, required: true },
      finaliza: { type: String, required: true },
      organizador: { type: String, required: true },
      fechas: [
        { type: Date, required: true },
      ],
      lugar: { type: db.Schema.Types.ObjectId, required: true },
    }
  )
);

var Exposicion = db.mongoose.model('exposiciones',
  new db.Schema(
    {
      foto_menu: { type: String },
      foto_detalle: { type: String },
      nombre: { type: String, required: true },
      titulo: { type: String, required: true },
      descripcion: { type: String, required: true },
      comienza: { type: String, required: true },
      finaliza: { type: String, required: true },
      organizador: { type: String, required: true },
      fechas: [
        { type: Date, required: true },
      ],
      lugar: { type: db.Schema.Types.ObjectId, required: true },
    }
  )
);

var Concurso = db.mongoose.model('concursos',
  new db.Schema(
    {
      foto_menu: {
        imagen_id: { type: String, },
        url: { type: String },
      },
      foto_detalle: {
        imagen_id: { type: String, },
        url: { type: String },
      },
      nombre: { type: String, required: true },
      titulo: { type: String, required: true },
      parrafo_izq: { type: String, required: true },
      parrafo_der: { type: String, required: true },
      cronograma: { type: String, required: true },
      jurados: [
        {
          imagen_id: { type: String, },
          url: { type: String },
        }
      ],
    }
  )
);

exports.Blog = Blog;
exports.Ambiente = Ambiente;
exports.Servicio = Servicio;
exports.OtroServicio = OtroServicio;
exports.Teatro = Teatro;
exports.StandUp = StandUp;
exports.Concierto = Concierto;
exports.Exposicion = Exposicion;
exports.Concurso = Concurso;
