import { Link } from "react-router-dom"

function Navbar(){
    return (
    <nav>
        <Link to="/">Inicio</Link>
        <Link to="/pagina_dos">Segunda pagina</Link>
        <Link to="/pagina_tres">Tercera Pagina</Link>
        <Link to= "/pagina_cuatro">Cuarta Pagina</Link>
    </nav>
    )
}

export default Navbar;