import "./Projects.css";

const projectsData = [
  {
    title: "Proyecto 1",
    link: "https://github.com/tuusuario/proyecto1",
    description: ""
  },
  {
    title: "Proyecto 2",
    link: "https://github.com/tuusuario/proyecto2",
    description: ""
  },
  {
    title: "Proyecto 3",
    link: "https://github.com/tuusuario/proyecto3",
    description: ""
  },
  {
    title: "Proyecto 4",
    link: "https://github.com/tuusuario/proyecto4",
    description: ""
  },
  {
    title: "Proyecto 5",
    link: "https://github.com/tuusuario/proyecto5",
    description: ""
  },
  {
    title: "Proyecto 6",
    link: "https://github.com/tuusuario/proyecto6",
    description: ""
  },
];

const Projects = () => {
  return (
    <section className="projects">
      <h2>Mis Proyectos</h2>
      <div className="projects-grid">
        {projectsData.map((project, index) => (
          <div className="project-card" key={index}>
            <h3>{project.title}</h3>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              Ver repositorio
            </a>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
