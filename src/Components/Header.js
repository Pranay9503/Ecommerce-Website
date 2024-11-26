import React, { useEffect, useState } from "react";
import { ShoppingCartOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import Dropdown from "antd/es/dropdown/dropdown";
import { NavLink, useNavigate } from "react-router-dom";
import '../Header.css'
import { useSelector } from "react-redux";

const Header = () => {
    const state = useSelector(state => state.cartReducer);
    //console.log(state.cart);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        userId: ''
    });
    const user_username = localStorage.getItem('username');
    const user_id = localStorage.getItem('user-id');
    useEffect(() => {
        if(user_username || user_id){
            setUser(prevUser => ({
                ...prevUser,
                username: JSON.parse(user_username),
                userId: JSON.parse(user_id)
            }));   
        }
    },[user_username,user_id])
    const items = [
        {
            label: <a onClick={() => {
                navigate('/manageorders')
            }}>Manage Orders</a>,
            key: '1'
        },
        {
            label: <a onClick={(e) => {
                e.preventDefault();
                localStorage.clear();
                setUser({
                    username:'',
                    userId:''
                })
                navigate('/login');
            }}>Log out</a>,
            key: '0'
        },
    ]
    return (
        <header style={{ position: 'fixed', top: 0, right: 0, left: 0, zIndex: 100 }}>
            <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-light py-3 shadow-sm bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        COLLECTION
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/products">Products</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contact">Contact</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="buttons" style={{display:'flex',alignItems:'center'}}>
                        {user.username || user.userId ?
                        <>
                            <div style={{textTransform:'uppercase',marginRight:'10px'}}>{user.username}</div>
                            <Dropdown
                                menu={{ items }}
                                trigger={['click']}
                                className="btn"
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                        <UserOutlined />
                                </a>
                            </Dropdown>
                        </> :
                            <>
                                <NavLink to="/login" className="btn btn-outline-dark" style={{borderRadius:'2px'}}>
                                    Login
                                </NavLink>
                                <NavLink to="/register" className="btn btn-outline-dark" style={{borderRadius:'2px'}}>
                                    <UserAddOutlined style={{ marginRight: '4px' }} />
                                    Register
                                </NavLink>
                            </>
                        }
                        <NavLink to="/cart" className="btn btn-outline-dark" style={{borderRadius:'2px'}}>
                            <ShoppingCartOutlined style={{ marginRight: '4px' }} />
                            Cart ({state.cart.length})
                        </NavLink>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;