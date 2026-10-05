import './Home.css';
import { FaDownload } from 'react-icons/fa';

function Home() {
  return (
    <div className="home-intro">
      {/* Bloque estilo editor: cada fila lleva su número de línea al costado */}
      <div className="code-block">
        <div className="code-line">
          <span className="line-number">01</span>
          <p className="code-prompt">
            <span className="prompt-user">romina@portfolio</span>
            <span className="prompt-path">:~$</span> whoami
          </p>
        </div>

        <div className="code-line">
          <span className="line-number">02</span>
          <h1 className="home-title">
            <span className="code-tag">&lt;h1&gt;</span>
            <span className="typewriter">Bienvenidos ! Soy Romi.</span>
            <span className="code-tag">&lt;/h1&gt;</span>
          </h1>
        </div>

        <div className="code-line">
          <span className="line-number">03</span>
          <h2 className="home-subtitle">Software developer.</h2>
        </div>

        <div className="code-line">
          <span className="line-number">04</span>
          <p className="code-comment">
            <span className="comment-slashes">{'//'}</span> Full-Stack · Análisis de datos
          </p>
        </div>

        <div className="code-line">
          <span className="line-number">05</span>
          <p className="home-paragraph">
            Soy Analista en Tecnologías de la Información, egresada de la Universidad ORT,
            con formación en desarrollo Full-Stack y profundizacion en análisis de datos (Big Data).
          </p>
        </div>

        <div className="code-line">
          <span className="line-number">06</span>
          <p className="home-paragraph">
            Cuento con experiencia en desarrollo Front-End y Back-End, integración de APIs y
            manejo de bases de datos.
          </p>
        </div>
      </div>

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
