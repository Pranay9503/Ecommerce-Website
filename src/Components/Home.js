import '../home.css';
import { useNavigate } from 'react-router-dom';
import Products from './Products';
import Header from './Header';

const Home = () => {
    const Navigate = useNavigate();
    return(
        <>
            <Header />
            <div style={{marginTop:'73px',position:''}}>
                    <img src={require("../images/hero-2.jpg")} style={{width:'100%'}} alt="Background"/>
                    <div style={{display:'flex',flexDirection:'column',position:'absolute',top:'270px',left:'570px',alignItems:'center',right:'550px'}}>
                        <h1 style={{whiteSpace:'nowrap',fontSize:'72px',fontWeight:700,marginBottom:'60px'}}>New Trend</h1>
                        <button className="shop-btn" onClick={() => {
                            Navigate('/products')
                        }}>SHOP NOW</button>
                    </div>
            </div>
            <Products />
        </>
    );
}

export default Home;