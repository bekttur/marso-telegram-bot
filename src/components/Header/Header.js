import React, { useRef, useState } from 'react'
import "./Header.css"
import { Link, Outlet } from 'react-router-dom'

const Header = () => {

    const menuRef = useRef(null);

    const [active, setActive] = useState("");

    const activeFunc = (e) => {
        console.log(e.target.innerText);
        setActive(e.target.innerText)
    }

    return (
        <>
            <header>
                <div className="horizontal-menu">
                    <div className="menu-container" ref={menuRef}>
                        <div className='menu-item'>
                            <Link to={"/"} onClick={activeFunc}>
                                <h5 className={active == "ЖЕНСКИЙ ПАРФЮМ" ? `active` : ''}>ЖЕНСКИЙ ПАРФЮМ</h5>
                            </Link>
                        </div>
                        <div className='menu-item'>
                            <Link to="/men" onClick={activeFunc}>
                                <h5 className={active == "МУЖСКОЙ ПАРФЮМ" ? `active` : ''} >МУЖСКОЙ ПАРФЮМ</h5>
                            </Link>
                        </div>
                        <div className='menu-item'>
                            <Link to="/unisex" onClick={activeFunc}>
                                <h5 className={active == "UNISEX ПАРФЮМ" ? `active` : ''}>UNISEX ПАРФЮМ</h5>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    )
}

export default Header






