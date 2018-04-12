# encoding: utf-8
require_relative 'app'
require 'json'

def crear
  RSpec.describe App do
    describe '1. Crear servicio: ' do
      it '1.1 Conexión con backend' do
        url = 'test/conexion'
        test = App.new(url)
        test.get()
        expect(test.response.code).to eq(200)
      end
      it '1.2 Crear servicio' do
        servicio = {
          :titulo => 'Parking',
          :descripcion => 'Contamos con un estacionamiento con capacidad para 210 autos y vigilancia las 24 horas, en el cual está permitido también el ingreso en bicicletas y motocicletas. El acceso a esta área es gratuito, solo se requiere mostrar en el ingreso la entrada para cualquiera de los diferentes espacios del circuito del Centro Cultural.',
          :latitud => -12.085693,
          :longitud => -76.971889,
          :direccion => 'Cruz Del Sur 206, Santiago de Surco 15023',
          :telefono => '(511) 4376767',
          :foto => {
            :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/07/4.jpg',
            :imagen_id => 'lkadjsflkadjsfkladjflas',
          },
        }
        url = 'servicio/crear?data=' + servicio.to_json
        test = App.new(url)
        test.post()
        puts test.response.body
        expect(test.response.code).to eq(200)
        expect(test.response.body).not_to include('error')
        expect(test.response.body).to include('Se ha registrado el servicio')
        expect(test.response.body).to include('success')
      end
    end
  end
end

def editar
  RSpec.describe App do
    describe '2. Editar servicio: ' do
      it '2.1 Conexión con backend' do
        url = 'test/conexion'
        test = App.new(url)
        test.get()
        expect(test.response.code).to eq(200)
      end
      it '2.2 Editar servicio' do
        servicio = {
          :id => '5ace2176b251881422afab4f',
          :titulo => 'Parking',
          :descripcion => 'Contamos con un estacionamiento con capacidad para 210 autos y vigilancia las 24 horas, en el cual está permitido también el ingreso en bicicletas y motocicletas. El acceso a esta área es gratuito, solo se requiere mostrar en el ingreso la entrada para cualquiera de los diferentes espacios del circuito del Centro Cultural. XD',
          :latitud => -12.01,
          :longitud => -76.9,
          :direccion => 'Cruz Del Sur 206, Santiago de Surco 333',
          :telefono => '4376767',
          :foto => {
            :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/07/4.png',
            :imagen_id => 'lkadjsflkadjsfkladjflas',
          },
        }
        url = 'servicio/editar?data=' + servicio.to_json
        test = App.new(url)
        test.post()
        puts test.response.body
        expect(test.response.code).to eq(200)
        expect(test.response.body).not_to include('error')
        expect(test.response.body).to include('Se ha editado el servicio')
        expect(test.response.body).to include('success')
      end
    end
  end
end

crear
#editar
