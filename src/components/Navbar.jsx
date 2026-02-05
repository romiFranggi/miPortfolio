export function Navbar() {
  const sections = ['home', 'skills', 'projects', 'contact'];

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        background: '#222',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '1.5rem',
        zIndex: 1000,
      }}
    >
      {sections.map((sec) => (
        <button
          key={sec}
          onClick={() => handleClick(sec)}
          style={{
            color: 'white',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            textTransform: 'capitalize',
            transition: 'color 0.3s',
          }}
          onMouseEnter={(e) => (e.target.style.color = 'cyan')}
          onMouseLeave={(e) => (e.target.style.color = 'white')}
        >
          {sec}
        </button>
      ))}
    </nav>
  );
}
