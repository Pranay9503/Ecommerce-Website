import { useState } from 'react';
import { useNavigate } from 'react-router';
import '../Login.css'
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [state, setState] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        const {id,value} = e.target;
        setState(prevState => ({
            ...prevState,
            [id]: value
        }));
        setError('');
    }
    const handleSubmit = async() => {
        if(state.username === 'mor_2314' && state.password === '83r5^_'){
            let token = await axios.post('https://fakestoreapi.com/auth/login',{
                username: state.username,
                password: state.password
            });
            localStorage.setItem('user-token',JSON.stringify(token));
            localStorage.setItem('username',JSON.stringify(state.username));
            navigate('/');
        } else {
            if(state.username && state.password){
                setError('Wrong credentials');
            } else {
                setError('Please enter Username and Password')
            }
        }
    }

    return (
        <div style={{display:'flex',justifyContent:'center'}}>
            <div style={{ marginTop: '100px', width: '440px', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                <div>
                    <h1 style={{fontWeight:700, textAlign:'center'}}>LOG IN</h1>
                </div>
                <div className="form__group field">
                    <input type="input" className="form__field" placeholder="Username" name="username" id='username' value={state.username} onChange={handleChange} required />
                    <label htmlFor="username" className="form__label">Username</label>
                </div>
                <div className="form__group field">
                    <input type="input" className="form__field" placeholder="Password" name="password" id='password' value={state.password} onChange={handleChange} required />
                    <label htmlFor="password" className="form__label">Password</label>
                </div>
                <div style={{color:'red',marginTop:'5px',fontSize:'14px'}}>{error}</div>
                <div>
                    <button className='btn btn-dark' style={{borderRadius:0, width:'100%',marginTop:'50px',padding:'10px 0'}} onClick={handleSubmit}>LOG IN</button>
                </div>
                <div style={{textAlign:'center',marginTop:'40px',color:'rgb(150,150,150)',fontFamily:'Roboto, sans-serif'}}>
                    Don't have an account?
                </div>
                <div>
                    <button className='btn btn-outline-dark' style={{borderRadius:0, width:'100%',marginTop:'20px',padding:'10px 0'}} onClick={() => navigate('/register')}>CREATE AN ACCOUNT</button>
                </div>
            </div>
        </div>
    );
}

export default Login;