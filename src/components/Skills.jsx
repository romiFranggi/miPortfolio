import "./Skills.css";

const devicon = (path) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;

// Skills agrupadas por categoría: cada categoría es una fila
const skillCategories = [
  {
    name: "Lenguajes",
    skills: [
      { name: "Java", logo: devicon("java/java-original.svg") },
      { name: "Python", logo: devicon("python/python-original.svg") },
      { name: "JavaScript", logo: devicon("javascript/javascript-original.svg") },
      { name: "C#", logo: devicon("csharp/csharp-original.svg") },
      { name: "PHP", logo: devicon("php/php-original.svg") },
    ],
  },
  {
    name: "Front-End",
    skills: [
      { name: "HTML", logo: devicon("html5/html5-original.svg") },
      { name: "CSS", logo: devicon("css3/css3-original.svg") },
      { name: "React", logo: devicon("react/react-original.svg") },
      { name: "Tailwind", logo: devicon("tailwindcss/tailwindcss-original.svg") },
      { name: "Ionic", logo: devicon("ionic/ionic-original.svg") },
    ],
  },
  {
    name: "Back-End",
    skills: [
      { name: "Node.js", logo: devicon("nodejs/nodejs-original.svg") },
      // el logo original de Express es negro y no se ve sobre la tarjeta gris
      { name: "Express", logo: "https://cdn.simpleicons.org/express/ffffff" },
      { name: "ASP.NET Core", logo: devicon("dot-net/dot-net-original.svg") },
      { name: "Entity Framework", logo: devicon("entityframeworkcore/entityframeworkcore-original.svg") },
      { name: "Laravel", logo: devicon("laravel/laravel-original.svg") },
      { name: "Postman", logo: devicon("postman/postman-original.svg") },
    ],
  },
  {
    name: "Bases de datos",
    skills: [
      { name: "SQL Server", logo: "https://www.svgrepo.com/show/303229/microsoft-sql-server-logo.svg" },
      { name: "MySQL", logo: devicon("mysql/mysql-original.svg") },
      { name: "MongoDB", logo: devicon("mongodb/mongodb-original.svg") },
      { name: "Cassandra", logo: devicon("cassandra/cassandra-original.svg") },
    ],
  },
  {
    name: "Datos y BI",
    skills: [
      { name: "Pandas", logo: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Pandas_logo.svg" },
      { name: "Jupyter", logo: devicon("jupyter/jupyter-original.svg") },
      { name: "Power BI", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" },
      { name: "Tableau", logo: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg" },
      { name: "Looker", logo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Looker.svg" },
      { name: "Superset", logo: "https://superset.apache.org/img/superset-logo-horiz.svg" },
    ],
  },
  {
    name: "Cloud y Herramientas",
    skills: [
      { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
      { name: "Azure", logo: devicon("azure/azure-original.svg") },
      { name: "Git", logo: devicon("git/git-original.svg") },
      // el logo original de GitHub es negro y no se ve sobre la tarjeta gris
      { name: "GitHub", logo: "https://cdn.simpleicons.org/github/ffffff" },
      { name: "Claude Code", logo: "https://cdn.simpleicons.org/claude" },
      { name: "Scrum", logo: "https://www.svgrepo.com/show/439311/scrum.svg" },
    ],
  },
];

const Skills = () => {
  return (
    <section className="skills">
      <h2>Mis Skills</h2>
      <div className="skills-categories">
        {skillCategories.map((category) => (
          <div className="skill-row" key={category.name}>
            <p className="skill-category">
              <span className="skill-category-slashes">{"//"}</span> {category.name}
            </p>
            <div className="skills-grid">
              {category.skills.map((skill) => (
                <div className="skill-card" key={skill.name}>
                  <img src={skill.logo} alt={skill.name} />
                  <p>{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
