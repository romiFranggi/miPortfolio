import './Home.css';
import { FaDownload } from 'react-icons/fa';

function Home() {



  return (
    <div className="home-container">
      <h1 className="typewriter">Bienvenidos ! Soy Romi.</h1>
      <h2 >Software developer.</h2>
      <p>
        Soy Analista en Tecnologías de la Información, egresada de la Universidad ORT,
        con formación en desarrollo Full-Stack y profundizacion en análisis de datos (Big Data).

      </p>

      <a href="/curriculum.pdf" download className="btn-download-cv">
        <FaDownload style={{ marginRight: '8px' }} />
        Descargar CV
      </a>
      {/* Botón para descargar Escolaridad */}
      <a href="/escolaridad.pdf" download className="btn-download-cv">
        <FaDownload style={{ marginRight: '8px' }} />
        Descargar Escolaridad
      </a>



    </div>
  );
}

export default Home;
