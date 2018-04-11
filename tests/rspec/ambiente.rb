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
          :foto_princial => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/06/Fotobannerteatro.jpg',
          :foto_menu => 'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/07/teatro-W-300x200.jpg',
          :fotos => [
            'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/07/teatro-W-200x200.jpg',
            'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/06/fotosslide2teatro-250x250.jpg',
            'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/06/tetro-W-grande-250x250.jpg',
            'https://www.centroculturalulima.com/wp/wp-content/uploads/2016/06/teatro3-250x250.jpg',
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
        id = '5accd727ef0951662d000001'
        visitante = {
          :dni => '70241720',
          :nombres => 'José Jesús PPPP',
          :paterno => 'Valdivia PPPP',
          :materno => 'Caballero PPPP',
          :telefono => '9887731975',
          :correos => 'pepito@ulima.pe',
          :placa => 'B6Q-388 adfadf',
          :vehiculo => 'Hyundai Accent 2018',
        }.to_json
        contacto = {
          :dni => 'Biopolímero a partir del almidón de papaya',
          :empleado_id => 2,
          :codigo_empleado => 1,
          :nombres => 'Karry Felix',
          :paterno => 'Mickleburgh',
          :materno => 'XD',
          :cargo => 'Secretaria',
          :telefon => '987731000',
          :correo => 'KaMick@ulima.pe',
        }.to_json
        visita = {
          :motivo => 'Biopolímero a partir del almidón de papaya',
          :dia => '12/12/2015',
          :hora => '10am',
        }.to_json
        url = 'visita/editar?id=' + id + '&visitante=' + visitante + '&contacto=' + contacto + '&visita=' + visita
        test = App.new(url)
        test.post()
        puts test.response.body
        expect(test.response.code).to eq(200)
        expect(test.response.body).not_to include('error')
        expect(test.response.body).to include('Se ha editado la visita')
        expect(test.response.body).to include('success')
      end
    end
  end
end

def eliminar
  RSpec.describe App do
    describe '3. Eliminar visitas: ' do
      it '3.1 Conexión con backend' do
        url = 'test/conexion'
        test = App.new(url)
        test.get()
        expect(test.response.code).to eq(200)
      end
      it '3.2 Eliminar visitas' do
        data = {
          :nuevos => [
          ],
          :editados => [
          ],
          :eliminados => [
            '5acccbd6ef09513d1f000001',
            '5acccc07ef09513dec000001',
            '5acccc13ef09513e4e000001',
            '5acccc1aef09513eae000001',
            '5acccc29ef09513f1c000001',
            '5acccc3eef09513f9b000001',
            '5acccc52ef09514019000001',
          ]
        }.to_json
        url = 'visita/guardar?data=' + data
        test = App.new(url)
        test.post()
        puts test.response.body
        expect(test.response.code).to eq(200)
        expect(test.response.body).not_to include('error')
        expect(test.response.body).to include('Se ha registrado los cambios en las visitas')
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

crear
#editar
#eliminar
#listar
