
import { Navbar } from './components/Navbar';
import Lanyard from './components/Lanyard';
import Home from './components/Home';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ParticlesBackground from "./components/ParticlesBackground";
import Footer from "./components/Footer"



function App() {
  return (
    <>
      <ParticlesBackground />
      <Navbar />
      <main>
        <section
          id="home"
          className="home-section"
          style={{ position: 'relative', minHeight: '100vh' }}
        >
          <div className="lanyard-wrapper">
            <Lanyard />
          </div>

          <div className="home-container">
            <Home />
          </div>
        </section>

        <section id="skills" className="section">
          <Skills />
        </section>

        <section id="projects" className="section">
          <Projects />
        </section>

        <section id="contact" className="section">
          <Contact />
        </section>
     
       <Footer/>
      </main>
    </>
  );
}

export default App;
