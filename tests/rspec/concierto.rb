# encoding: utf-8
require_relative 'app'
require 'json'

def crear
  RSpec.describe App do
    describe '1. Crear concierto: ' do
      it '1.1 Conexión con backend' do
        url = 'test/conexion'
        test = App.new(url)
        test.get()
        expect(test.response.code).to eq(200)
      end
      it '1.2 Crear concierto' do
        concierto = {
          :nombre => 'Teatro Central',
          :titulo => 'Instalaciones cómodas. Atmósfera íntima. Cartelera polifacética. Nuestro Teatro Central.',
          :descripcion => 'Óptimamente preparada para posibilitar que cada puesta en escena —desde la más clásica hasta la más vanguardista— se multiplique con la gama de recursos con los que cuenta, en nuestro Teatro Central las obras y los espectáculos cobran vida ante la atenta mirada del auditorio. Un público que viaja en continuo vaivén de la emoción a la reflexión sobre los temas representados.',
          :comienza => 'mayo 17 @ 8:30 pm',
          :finaliza => 'junio 25 @ 10:30 pm',
          :organizador => 'Centro Cultural de la Universidad de Lima',
          :fechas => [
            '2016-05-18',
            '2016-05-19',
            '2016-05-20',
            '2016-05-21',
            '2016-05-22',
            '2016-05-23',
          ],
          :lugar => '5acea95fa181e7288381c640',
          :direccion => 'Cruz Del Sur 206, Santiago de Surco 15023',
          :foto_menu => {
            :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/06/Fotobannerteatro.jpg',
            :imagen_id => 'lkadjsflkadjsfkladjflas',
          },
          :foto_detalle => {
            :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/07/teatro-W-300x200.jpg',
            :imagen_id => 'lkadjsflkadjsfkladjflas',
          },
        }
        url = 'concierto/crear?data=' + concierto.to_json
        test = App.new(url)
        test.post()
        puts test.response.body
        expect(test.response.code).to eq(200)
        expect(test.response.body).not_to include('error')
        expect(test.response.body).to include('Se ha registrado el concierto')
        expect(test.response.body).to include('success')
      end
    end
  end
end

def editar
  RSpec.describe App do
    describe '2. Editar concierto: ' do
      it '2.1 Conexión con backend' do
        url = 'test/conexion'
        test = App.new(url)
        test.get()
        expect(test.response.code).to eq(200)
      end
      it '2.2 Editar concierto' do
        concierto = {
          :id => '5ad35ca373fc0923d300fca5',
          :nombre => 'Teatro Central',
          :titulo => 'Instalaciones cómodas. Atmósfera íntima. Cartelera polifacética. Nuestro Teatro Central.',
          :descripcion => 'Óptimamente .',
          :comienza => 'mayo 17 @ 8:30 pm',
          :finaliza => 'junio 25 @ 10:30 pm',
          :organizador => 'Centro Cultural de la Universidad de Lima',
          :fechas => [
            '2018-05-18',
            '2018-05-19',
          ],
          :lugar => '5acea95fa181e7288381c640',
          :direccion => 'Cruz Del Sur 206, Santiago de Surco',
          :foto_menu => {
            :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/06/Fotobannerteatro.png',
            :imagen_id => 'lkadjsflkadjsfkladjflas',
          },
          :foto_detalle => {
            :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/07/teatro-W-300x200.png',
            :imagen_id => 'lkadjsflkadjsfkladjflas',
          },
        }
        url = 'concierto/editar?data=' + concierto.to_json
        test = App.new(url)
        test.post()
        puts test.response.body
        expect(test.response.code).to eq(200)
        expect(test.response.body).not_to include('error')
        expect(test.response.body).to include('Se ha editado el concierto')
        expect(test.response.body).to include('success')
      end
    end
  end
end

def eliminar
  RSpec.describe App do
    describe '3. Eliminar conciertos: ' do
      it '3.1 Conexión con backend' do
        url = 'test/conexion'
        test = App.new(url)
        test.get()
        expect(test.response.code).to eq(200)
      end
      it '3.2 Eliminar conciertos' do
        data = {
          :nuevos => [
          ],
          :editados => [
          ],
          :eliminados => [
            '5ad35ca373fc0923d300fca5',
            '5ad35cdc73fc0923d300fca6',
            '5ad35cdd73fc0923d300fca7',
            '5ad35cde73fc0923d300fca8'
          ]
        }.to_json
        url = 'concierto/guardar?data=' + data
        test = App.new(url)
        test.post()
        puts test.response.body
        expect(test.response.code).to eq(200)
        expect(test.response.body).not_to include('error')
        expect(test.response.body).to include('Se ha registrado los cambios en los conciertos')
        expect(test.response.body).to include('success')
      end
    end
  end
end

#crear
#editar
eliminar
