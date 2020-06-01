import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

const Navbar = ({ auth: { isAuthenticated, loading }, quest, logout }) => {


    const [sidebarOpen, setSidebarOpen] = useState(false);

    let navLinksClass = 'nav-links'; 
    let burgerClass = 'burger';
    if (sidebarOpen) {
        navLinksClass += ' nav-active';
        burgerClass += ' toggle';
    }

    const toggleSidebar = () => {
        setSidebarOpen(sidebarOpen => !sidebarOpen);
    }

    const onLogout = e => {
        e.preventDefault();
        toggleSidebar();
        logout();
    }

    const colors =["#E6471F", "#F48C26", "#FFEE32", "#408222", "#2164FB", "#793D88"]

    let navStyle = {}
    const numberSteps = quest && quest.pages ? quest.pages.length : 0;
    if (numberSteps > 0) {
        const navColors = Array(colors.length).fill("#39393cfa").concat(colors.slice(0, numberSteps).join(", "));
        navStyle["background"] = `linear-gradient(to right, ${navColors})`;
    }

    //const createIcon = <i class="fas fa-edit nav-link-icon"></i>;

    const sidebar = (
        <ul className={navLinksClass}>
            <li>
                <Link onClick={toggleSidebar} to='/dashboard'>
                    <i className="fas fa-house-user nav-link-icon"></i>
                    <span className='nav-link-label'>Dashboard</span>
                </Link>
            </li>
            {quest && !quest.loading &&  
            <li>
                <Link onClick={toggleSidebar} to={`/quest/${quest.id}`}>
                   <i className="far fa-map nav-link-icon"></i>
                    <span className='nav-link-label'>Quest Map</span>
                </Link>
            </li>}
            <li>
                <Link onClick={toggleSidebar} to='/about'>
                    <i className="fas fa-ship nav-link-icon"></i>
                    <span className='nav-link-label'>About</span>
                </Link>
            </li>
            <li>
                <Link onClick={onLogout} to='/logout'>
                    <i className="fas fa-sign-out-alt nav-link-icon"></i>
                    <span className='nav-link-label'>Logout</span>
                </Link>
             </li>
        </ul> 
    );


    const sidebarPresent = !loading && isAuthenticated;
    
    const overlayClass = "overlay" + (sidebarOpen ? " active" : "");
    //console.log(overlayClass);
    return (
        <nav style={navStyle}>
            {
                sidebarPresent &&
                <div className={burgerClass} onClick={toggleSidebar}>
                    <div className="line line1"></div>
                    <div className="line line2"></div>
                    <div className="line line3"></div>
                </div>
            }
            <div className='logo'>
                <Link to='/'>
                    <span className='logo-text'>
                        hammurabbi
                    </span>
                </Link>
            </div>
            { sidebarPresent && sidebar }
            <div className={overlayClass} onClick={toggleSidebar}>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    //sidebarOpen: PropTypes.bool.isRequired,
    //toggleSidebar: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
}


const mapStateToProps = state => ({
    auth: state.auth,
    quest: state.quest
});

export default connect(mapStateToProps, { logout })(Navbar);