import { useState } from 'react';
import '../Login.css'
import { useNavigate } from 'react-router';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [state, setState] = useState({
        username: "",
        email: "",
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
        if(state.password && state.email && state.username){
            const id = await axios.post('https://fakestoreapi.com/users',{
                username: state.username,
                email: state.email,
                password: state.password
            });
            localStorage.setItem('user-id',JSON.stringify(id));
            localStorage.setItem('username',JSON.stringify(state.username))
            navigate('/')
        } else {
            setError('Please fill out the fields!');
        }
    }
    return (
        <div style={{display:'flex',justifyContent:'center'}}>
            <div style={{ marginTop: '80px', width: '440px', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <h1 style={{fontWeight:700, textAlign:'center',width:'250px'}}>CREATE AN ACCOUNT</h1>
                </div>
                <div className="form__group field">
                    <input type="input" className="form__field" placeholder="Username" name="username" id='username' value={state.username} onChange={handleChange} required />
                    <label htmlFor="username" className="form__label">Username</label>
                </div>
                <div class="form__group field">
                    <input type="input" class="form__field" placeholder="Email" name="email" id='email' value={state.email} onChange={handleChange} required />
                    <label for="email" class="form__label">Email</label>
                </div>
                <div class="form__group field">
                    <input type="input" class="form__field" placeholder="Password" name="password" id='password' value={state.password} onChange={handleChange} required />
                    <label for="password" class="form__label">Password</label>
                </div>
                <div style={{color:'red',marginTop:'5px',fontSize:'14px'}}>{error}</div>
                <div>
                    <button className='btn btn-dark' style={{borderRadius:0, width:'100%',marginTop:'50px',padding:'10px 0'}} onClick={handleSubmit}>CREATE ACCOUNT</button>
                </div>
                <div style={{textAlign:'center',marginTop:'40px',color:'rgb(150,150,150)',fontFamily:'Roboto, sans-serif'}}>
                    Already have an account?
                </div>
                <div>
                    <button className='btn btn-outline-dark' style={{borderRadius:0, width:'100%',marginTop:'20px',padding:'10px 0'}} onClick={() => {navigate('/login')}}>LOGIN</button>
                </div>
            </div>
        </div>
    );
}

export default Register;