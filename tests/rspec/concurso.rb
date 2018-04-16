# encoding: utf-8
require_relative 'app'
require 'json'

def crear
  RSpec.describe App do
    describe '1. Crear concurso: ' do
      it '1.1 Conexión con backend' do
        url = 'test/conexion'
        test = App.new(url)
        test.get()
        expect(test.response.code).to eq(200)
      end
      it '1.2 Crear concurso' do
        concurso = {
          :nombre => 'Teatro Central',
          :titulo => 'Instalaciones cómodas. Atmósfera íntima. Cartelera polifacética. Nuestro Teatro Central.',
          :parrafo_izq => 'Óptimamente preparada para posibilitar que cada puesta en escena —desde la más clásica hasta la más vanguardista— se multiplique con la gama de recursos con los que cuenta, en nuestro Teatro Central las obras y los espectáculos cobran vida ante la atenta mirada del auditorio. Un público que viaja en continuo vaivén de la emoción a la reflexión sobre los temas representados.',
          :parrafo_der => 'Es en cada función que el trabajo de todos los que forman parte de la obra cobra sentido. En esos momentos, nuestro Teatro Central deja de ser un simple espacio físico para convertirse en el espacio para el cual fue creada: el lugar creativo que sensibiliza, cuestiona y amplía el horizonte cultural de cada uno de los espectadores.',
          :cronograma => '1)convocatoria<br>2)demo</br>3)premios',
          :foto_detalle => {
            :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/06/Fotobannerteatro.jpg',
            :imagen_id => 'lkadjsflkadjsfkladjflas',
          },
          :foto_menu => {
            :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/07/teatro-W-300x200.jpg',
            :imagen_id => 'lkadjsflkadjsfkladjflas',
          },
          :jurados => [
            {
              :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/07/teatro-W-200x200.jpg',
              :imagen_id => 'lkadjsflkadjsfkladjflas',
            },
            {
              :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/06/fotosslimagen_ide2teatro-250x250.jpg',
              :imagen_id => 'lkadjsflkadjsfkladjflas',
            },
            {
              :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/06/tetro-W-grande-250x250.jpg',
              :imagen_id => 'lkadjsflkadjsfkladjflas',
            },
            {
              :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/06/teatro3-250x250.jpg',
              :imagen_id => 'lkadjsflkadjsfkladjflas',
            },
          ],
        }
        url = 'concurso/crear?data=' + concurso.to_json
        test = App.new(url)
        test.post()
        puts test.response.body
        expect(test.response.code).to eq(200)
        expect(test.response.body).not_to include('error')
        expect(test.response.body).to include('Se ha registrado el concurso')
        expect(test.response.body).to include('success')
      end
    end
  end
end

def editar
  RSpec.describe App do
    describe '2. Editar concurso: ' do
      it '2.1 Conexión con backend' do
        url = 'test/conexion'
        test = App.new(url)
        test.get()
        expect(test.response.code).to eq(200)
      end
      it '2.2 Editar concurso' do
        concurso = {
          :id => '5ad36183026ffb29fa49382b',
          :nombre => 'Teatro Central XD',
          :titulo => 'Instalaciones cómodas.',
          :parrafo_izq => 'Óptimamente.',
          :parrafo_der => 'Óptimamente.',
          :cronograma => '1)convocatoria<br>2)demo</br>3)premios',
          :foto_detalle => {
            :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/06/Fotobannerteatro.png',
            :imagen_id => 'lkadjsflkadjsfkladjflas123',
          },
          :foto_menu => {
            :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/07/teatro-W-300x200.png',
            :imagen_id => 'lkadjsflkadjsfkladjflas123',
          },
          :jurados => [
            {
              :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/07/teatro-W-200x200.png',
              :imagen_id => 'lkadjsflkadjsfkladjflas123',
            },
            {
              :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/06/fotosslimagen_ide2teatro-250x250.png',
              :imagen_id => 'lkadjsflkadjsfkladjflas123',
            },
            {
              :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/06/tetro-W-grande-250x250.png',
              :imagen_id => 'lkadjsflkadjsfkladjflas123',
            },
            {
              :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/06/teatro3-250x250.png',
              :imagen_id => 'lkadjsflkadjsfkladjflas123',
            },
          ],
        }
        url = 'concurso/editar?data=' + concurso.to_json
        test = App.new(url)
        test.post()
        puts test.response.body
        expect(test.response.code).to eq(200)
        expect(test.response.body).not_to include('error')
        expect(test.response.body).to include('Se ha editado el concurso')
        expect(test.response.body).to include('success')
      end
    end
  end
end

def eliminar
  RSpec.describe App do
    describe '3. Eliminar concursos: ' do
      it '3.1 Conexión con backend' do
        url = 'test/conexion'
        test = App.new(url)
        test.get()
        expect(test.response.code).to eq(200)
      end
      it '3.2 Eliminar concursos' do
        data = {
          :nuevos => [
          ],
          :editados => [
          ],
          :eliminados => [
            "5ad3ef9ddbc9a310fb399f12",
            "5ad3ef9edbc9a310fb399f17",
            "5ad3ef9fdbc9a310fb399f1c",
            "5ad36183026ffb29fa49382b",
          ]
        }.to_json
        url = 'concurso/guardar?data=' + data
        test = App.new(url)
        test.post()
        puts test.response.body
        expect(test.response.code).to eq(200)
        expect(test.response.body).not_to include('error')
        expect(test.response.body).to include('Se ha registrado los cambios en los concursos')
        expect(test.response.body).to include('success')
      end
    end
  end
end

crear
#editar
