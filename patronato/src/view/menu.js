import './menu.css';
import './menuScript';
import 'bootstrap/dist/css/bootstrap.min.css';

function Menu() {
    return (
        <nav className="navbar navbar-expand-custom navbar-mainbg">
        <a className="navbar-brand navbar-logo" href="google.com">Navbar</a>
        <button className="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars text-white"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                <div className="hori-selector"><div className="left"></div><div className="right"></div></div>
                <li className="nav-item">
                    <a className="nav-link" href="google.com"><i className="fas fa-tachometer-alt"></i>Dashboard</a>
                </li>
                <li className="nav-item active">
                    <a className="nav-link" href="google.com"><i className="far fa-address-book"></i>Address Book</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="google.com"><i className="far fa-clone"></i>Components</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="google.com"><i className="far fa-calendar-alt"></i>Calendar</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="google.com"><i className="far fa-chart-bar"></i>Charts</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="google.com"><i className="far fa-copy"></i>Documents</a>
                </li>
            </ul>
        </div>
    </nav>
    );
}

export default Menu;
