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

crear
