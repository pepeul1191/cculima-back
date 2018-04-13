# encoding: utf-8
require_relative 'app'
require 'json'

def crear
  RSpec.describe App do
    describe '1. Crear ambiente: ' do
      it '1.1 Conexión con backend' do
        url = 'test/conexion'
        test = App.new(url)
        test.get()
        expect(test.response.code).to eq(200)
      end
      it '1.2 Crear ambiente' do
        ambiente = {
          :nombre => 'Teatro Central',
          :subtitulo => 'Instalaciones cómodas. Atmósfera íntima. Cartelera polifacética. Nuestro Teatro Central.',
          :parrafo_izq => 'Óptimamente preparada para posibilitar que cada puesta en escena —desde la más clásica hasta la más vanguardista— se multiplique con la gama de recursos con los que cuenta, en nuestro Teatro Central las obras y los espectáculos cobran vida ante la atenta mirada del auditorio. Un público que viaja en continuo vaivén de la emoción a la reflexión sobre los temas representados.',
          :parrafo_der => 'Es en cada función que el trabajo de todos los que forman parte de la obra cobra sentido. En esos momentos, nuestro Teatro Central deja de ser un simple espacio físico para convertirse en el espacio para el cual fue creada: el lugar creativo que sensibiliza, cuestiona y amplía el horizonte cultural de cada uno de los espectadores.',
          :latitud => -12.085693,
          :longitud => -76.971889,
          :direccion => 'Cruz Del Sur 206, Santiago de Surco 15023',
          :telefono => '(511) 4376767',
          :foto_princial => {
            :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/06/Fotobannerteatro.jpg',
            :imagen_id => 'lkadjsflkadjsfkladjflas',
          },
          :foto_menu => {
            :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/07/teatro-W-300x200.jpg',
            :imagen_id => 'lkadjsflkadjsfkladjflas',
          },
          :fotos => [
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
            }
          ],
        }
        url = 'ambiente/crear?data=' + ambiente.to_json
        test = App.new(url)
        test.post()
        puts test.response.body
        expect(test.response.code).to eq(200)
        expect(test.response.body).not_to include('error')
        expect(test.response.body).to include('Se ha registrado el ambiente')
        expect(test.response.body).to include('success')
      end
    end
  end
end

def editar
  RSpec.describe App do
    describe '2. Editar visita: ' do
      it '2.1 Conexión con backend' do
        url = 'test/conexion'
        test = App.new(url)
        test.get()
        expect(test.response.code).to eq(200)
      end
      it '2.2 Editar visita' do
        ambiente = {
          :id => '5acd8813d4ca7d15ca54a0ca',
          :nombre => 'Teatro Centralsh',
          :subtitulo => 'Instalaciones cómodas. Atmósfera íntima. Cartelera polifacética. Nuestro Teatro Centralsh.',
          :parrafo_izq => 'Óptimamente',
          :parrafo_der => 'Es en cada función',
          :latitud => -12.085693,
          :longitud => -76.971889,
          :direccion => 'Cruz Del Sur 206, Santiago de Surco 15023',
          :telefono => '(511) 4376767',
          :foto_princial => {
            :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/06/Fotobannerteatro.png',
            :imagen_id => 'lkadjsflkadjsfkladjflas',
          },
          :foto_menu => {
            :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/07/teatro-W-300x200.png',
            :imagen_id => 'lkadjsflkadjsfkladjflas',
          },
          :fotos => [
            {
              :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/07/teatro-W-200x200.png',
              :imagen_id => 'lkadjsflkadjsfkladjflas',
            },
            {
              :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/06/fotosslimagen_ide2teatro-250x250.png',
              :imagen_id => 'lkadjsflkadjsfkladjflas',
            },
            {
              :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/06/tetro-W-grande-250x250.png',
              :imagen_id => 'lkadjsflkadjsfkladjflas',
            },
            {
              :url => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/06/teatro3-250x250.png',
              :imagen_id => 'lkadjsflkadjsfkladjflas',
            }
          ],
        }
        url = 'ambiente/editar?data=' + ambiente.to_json
        test = App.new(url)
        test.post()
        puts test.response.body
        expect(test.response.code).to eq(200)
        expect(test.response.body).not_to include('error')
        expect(test.response.body).to include('Se ha editado el ambiente')
        expect(test.response.body).to include('success')
      end
    end
  end
end

def eliminar
  RSpec.describe App do
    describe '3. Eliminar ambientes: ' do
      it '3.1 Conexión con backend' do
        url = 'test/conexion'
        test = App.new(url)
        test.get()
        expect(test.response.code).to eq(200)
      end
      it '3.2 Eliminar ambientes' do
        data = {
          :nuevos => [
          ],
          :editados => [
          ],
          :eliminados => [
            '5ad09f95a1e72f5bdde6191f',
            '5ad09f96a1e72f5bdde61924',
            '5ad09f97a1e72f5bdde61929',
            '5ad09f99a1e72f5bdde6192e',
            '5ad09f9ba1e72f5bdde61933',
          ]
        }.to_json
        url = 'ambiente/guardar?data=' + data
        test = App.new(url)
        test.post()
        puts test.response.body
        expect(test.response.code).to eq(200)
        expect(test.response.body).not_to include('error')
        expect(test.response.body).to include('Se ha registrado los cambios en los ambientes')
        expect(test.response.body).to include('success')
      end
    end
  end
end

def listar
  RSpec.describe App do
    describe '4. Listar visitas: ' do
      it '4.1 Conexión con backend' do
        url = 'test/conexion'
        test = App.new(url)
        test.get()
        expect(test.response.code).to eq(200)
      end
      it '4.2 Listar visitas' do
        url = 'visita/listar'
        test = App.new(url)
        test.get()
        puts test.response.body
        expect(test.response.code).to eq(200)
        expect(test.response.body).not_to include('error')
        expect(test.response.body).to include('id')
        expect(test.response.body).to include('empleado')
        expect(test.response.body).to include('visitante')
        expect(test.response.body).to include('dni_visitante')
        expect(test.response.body).to include('dia')
        expect(test.response.body).to include('hora')
        expect(test.response.body).to include('motivo')
      end
    end
  end
end

#crear
#editar
eliminar
#listar
