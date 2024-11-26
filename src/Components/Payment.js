import { Menu } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import '../Login.css'
import Header from "./Header";
import Order from "./Order";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../redux/actions";

const Payment = ({email,address}) => {
    const [current, setCurrent] = useState('Pay via Credit ot debit card');
    const state = useSelector(state => state.cartReducer);
    //console.log(state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onClick = (e) => {
        setCurrent(e.key);
    };
    const items = [
        {
          label: 'Credit or debit card',
          key: 'Pay via Credit or debit card'
        },
        {
          label: 'Net Banking',
          key: 'Pay via Net Banking'
        },
        {
            label: 'Other UPI Apps',
            key: 'Pay via UPI'
        },
        {
          label: 'Cash on delivery',
          key: 'Pay with Cash'
        },
      ];

    return (
        <>
            <Header />
            <div style={{marginTop:'72px', display:'flex', justifyContent:'center'}}>
                <div style={{width:'670px',margin:'30px 60px 30px 0'}}>
                    <div style={{border:'0.8px solid rgb(223, 227, 231)',borderRadius:'5px',padding:'15px 20px',marginBottom:'50px'}}>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <div style={{display:'flex'}}>
                                <div style={{marginRight:'20px',fontSize:'15px',color:'rgb(115,115,115)'}}>Contact</div>
                                <div style={{fontSize:'15px',fontWeight:'600',color:'rgb(51,51,51)'}}>{email}</div>
                            </div>
                            <div className="change-btn" onClick={() => {
                                navigate('/checkout')
                            }}>Change</div>
                        </div>
                        <hr />
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <div style={{display:'flex'}}>
                                <div style={{marginRight:'20px',fontSize:'15px',color:'rgb(115,115,115)'}}>Ship To</div>
                                <div style={{fontSize:'15px',fontWeight:'600',color:'rgb(51,51,51)'}}>{address.apartment}, {address.address}, {address.city}, {address.state}, {address.country}</div>
                            </div>
                            <div className="change-btn" onClick={() => {
                                navigate('/checkout');
                            }}>Change</div>
                        </div>
                        <hr />
                        <div style={{display:'flex'}}>
                            <div style={{marginRight:'20px',fontSize:'15px',color:'rgb(115,115,115)'}}>Method</div>
                            <div style={{fontSize:'15px',fontWeight:'600',color:'rgb(51,51,51)'}}>{current}</div>
                        </div>
                    </div>
                    <div>
                        <div style={{fontSize:'22.5px',fontWeight:'600',color:'rgb(58,58,58)',marginTop:'11px',marginBottom:'15px'}}>Payment Methods</div>
                        <div style={{marginBottom:'16px',fontSize:'13px',color:'rgb(75,79,88)'}}>Select payment options below.</div>
                        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{display:'flex',justifyContent:'space-around'}}/>
                        <div style={{margin:'20px 0',fontSize:'15px',color:'rgb(75,79,88)'}}>{current}</div>
                        <button className="btn btn-dark" style={{borderRadius:0,width:'100%',fontSize:'15px',fontWeight:'700',padding:'10px 0'}} onClick={() => {
                            dispatch(placeOrder(state.cart));
                            navigate('/');
                        }}>Place Order</button>
                    </div>
                </div>
                <Order />
            </div>
        </>
    );
}

export default Payment;