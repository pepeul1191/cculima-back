# encoding: utf-8
require_relative 'app'
require 'json'

def crear
  RSpec.describe App do
    describe '1. Crear otro servicio: ' do
      it '1.1 Conexión con backend' do
        url = 'test/conexion'
        test = App.new(url)
        test.get()
        expect(test.response.code).to eq(200)
      end
      it '1.2 Crear otro servicio' do
        servicio = {
          :titulo => 'Parking',
          :descripcion => 'Contamos con un estacionamiento con capacidad para 210 autos y vigilancia las 24 horas, en el cual está permitido también el ingreso en bicicletas y motocicletas. El acceso a esta área es gratuito, solo se requiere mostrar en el ingreso la entrada para cualquiera de los diferentes espacios del circuito del Centro Cultural.',
        }
        url = 'servicio/otro/crear?data=' + servicio.to_json
        test = App.new(url)
        test.post()
        puts test.response.body
        expect(test.response.code).to eq(200)
        expect(test.response.body).not_to include('error')
        expect(test.response.body).to include('Se ha registrado el servicio-otro')
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
          :id => '5ace8e2bdb34b91ec3e954f4',
          :titulo => 'Parkeo',
          :descripcion => 'Contamos con un estacionamiento con capacidad para 210 autos y vigilancia las 24 horas, en el cual está permitido también el ingreso en bicicletas y motocicletas. El acceso a esta área es gratuito, solo se requiere mostrar en el ingreso la entrada para cualquiera de los diferentes espacios del circuito del Centro Cultural. XD',
        }
        url = 'servicio/otro/editar?data=' + servicio.to_json
        test = App.new(url)
        test.post()
        puts test.response.body
        expect(test.response.code).to eq(200)
        expect(test.response.body).not_to include('error')
        expect(test.response.body).to include('Se ha editado el servicio-otro')
        expect(test.response.body).to include('success')
      end
    end
  end
end

#crear
editar
