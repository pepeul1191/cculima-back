# encoding: utf-8
require_relative 'app'
require 'json'

def crear
  RSpec.describe App do
    describe '1. Crear teatro: ' do
      it '1.1 Conexión con backend' do
        url = 'test/conexion'
        test = App.new(url)
        test.get()
        expect(test.response.code).to eq(200)
      end
      it '1.2 Crear teatro' do
        teatro = {
          :foto_menu => {
            :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2018/03/Banner-y-boton-02.jpg',
            :imagen_id => 'lkadjsflkadjsfkladjflas',
          },
          :foto_detalle => {
            :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2018/02/Banner-y-boton-01.jpg',
            :imagen_id => 'lkadjsflkadjsfkladjflas',
          },
          :nombre => 'Deshuesadero',
          :titulo => 'Del 17 de mayo al 25 de junio',
          :descripcion => 'Esteban Cruz es un joven desempleado que es mantenido por sus padres y que cuenta con evidentes problemas para incorporarse a un mundo que le resulta hostil. Abrumado por su incompetencia para ejercer el más difícil de los oficios: el de ser humano, se percibe en medio de una sociedad pragmática y resultadista en la cual no sabe cómo pertenecer. Una entrevista de trabajo podría cambiar el rumbo de su vida, solo que no en los términos que él esperaba.',
          :elenco => [
            'Telmo Arévalo',
            'Leonor Estrada',
            'Walter Ramírez',
            'Rodrigo Rodríguez',
            'Diego Sakuray',
            'Sammy Zamalloa',
          ],
          :equipo => [
            'Dramaturgia: Carlos Gonzáles VillanuevaDiseño de arte y vestuario: Ana Cecilia Chung',
            'Diseño de luces: Jesús Reyes',
            'Dirección General: Fernando Castro',
            'Producción: Compañía de Teatro Físico',
          ],
          :programacion => 'Fecha: Del 17 de mayo al 25 de junio (6 semanas)Días: De Jueves a Lunes <br>Hora: 8:30pm, Domingos (7:00pm)',
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
          :lugar => '5acea95fa181e7288381c640'
        }
        url = 'teatro/crear?data=' + teatro.to_json
        test = App.new(url)
        test.post()
        puts test.response.body
        expect(test.response.code).to eq(200)
        expect(test.response.body).not_to include('error')
        expect(test.response.body).to include('Se ha registrado el teatro')
        expect(test.response.body).to include('success')
      end
    end
  end
end

def editar
  RSpec.describe App do
    describe '2. Editar teatro: ' do
      it '2.1 Conexión con backend' do
        url = 'test/conexion'
        test = App.new(url)
        test.get()
        expect(test.response.code).to eq(200)
      end
      it '2.2 Editar teatro' do
        teatro = {
          :id => '5aceaad732e9f229ab9e83b5',
          :foto_menu => {
            :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2018/03/Banner-y-boton-02.png',
            :imagen_id => 'lkadjsflkadjsfkladjflas',
          },
          :foto_detalle => {
            :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2018/02/Banner-y-boton-01.png',
            :imagen_id => 'lkadjsflkadjsfkladjflas',
          },
          :nombre => 'Deshuesaderosh',
          :titulo => 'Del 17 de marzo al 25 de junio',
          :descripcion => 'Esteban Cruz es un joven desempleado que es mantenido por sus padres y que cuenta con evidentes problemas para incorporarse a un mundo que le resulta hostil. Abrumado por su incompetencia para ejercer el más difícil de los oficios: el de ser humano, se percibe en medio de una sociedad pragmática y resultadista en la cual no sabe cómo pertenecer. Una entrevista de trabajo podría cambiar el rumbo de su vida, solo que no en los términos que él esperabash.',
          :elenco => [
            'Telmo Arévalo',
            'Leonor Estrada',
            'Walter Ramírez',
            'Rodrigo Rodríguez',
            'Diego Sakuray 1',
            'Sammy Zamalloa 3',
            'Sammy Zamalloa 2',
          ],
          :equipo => [
            'Dramaturgia: Carlos Gonzáles VillanuevaDiseño de arte y vestuario: Ana Cecilia Chung',
            'Diseño de luces: Jesús Reyes',
            'Dirección General: Fernando Castro',
            'Producción: Compañía de Teatro Físico',
            'Producción: Compañía de Teatro Físico XD',
          ],
          :programacion => 'Fecha: Del 17 de mayo al 25 de junio (6 semanas)Días: De Jueves a Lunes <br>Hora: 8:30pm, Domingos (7:00pm)',
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
            '2016-05-24',
            '2016-05-25',
            '2016-05-26',
          ],
          :lugar => '5acea95fa181e7288381c640'
        }
        url = 'teatro/editar?data=' + teatro.to_json
        test = App.new(url)
        test.post()
        puts test.response.body
        expect(test.response.code).to eq(200)
        expect(test.response.body).not_to include('error')
        expect(test.response.body).to include('Se ha editado el teatro')
        expect(test.response.body).to include('success')
      end
    end
  end
end

#crear
editar
