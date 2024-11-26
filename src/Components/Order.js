import { useState } from "react";
import { useSelector } from "react-redux";
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import Input from "antd/es/input/Input";

const Order = () => {
    const [orderShow,setOrderShow] = useState(true);
    const [couponShow, setCouponShow] = useState(false);
    const state = useSelector(state => state.cartReducer);

    let total = 0;
    let shippingCharge = localStorage.getItem('shipping-charge');
    const shipping = JSON.parse(shippingCharge);
    console.log(shipping)
    
    state.cart.map(pro => {
        total = total + (pro.price * pro.qty)
    });

    return (
        <div style={{width:'480px',padding:'20px 0'}}>
            <div style={{display:'flex',justifyContent:'space-between',cursor:'pointer'}} onClick={() => {
                setOrderShow(prevState => !prevState);
            }}>
                <div style={{fontSize:'19px',fontWeight:'600',color:'rgb(58,58,58)'}}>Your order</div>
                <div>
                    {orderShow ? <UpOutlined /> : <DownOutlined />}
                </div>
            </div>
            {orderShow && 
            <div style={{margin:'30px 0'}}>
                {state.cart.map((cartItem) => {
                    return(
                        <div style={{margin:'25px 0'}} key={cartItem.id}>
                            <div style={{display:'flex',justifyContent:'space-between'}}>        
                                <div style={{display:'flex'}}>
                                    <img src={cartItem.image} width={65} height={65} style={{marginRight:'25px'}}/>
                                    <div style={{display:'flex',flexDirection:'column'}}>
                                        <div className='col-md-12' style={{fontSize:'15px',color:'rgb(64,64,64)'}}>
                                            {cartItem.title}
                                        </div>
                                        <div style={{fontWeight:'600'}}>Qty: {cartItem.qty}</div>
                                    </div>
                                </div> 
                                <div style={{fontSize:'15px',fontWeight:'600',color:'rgb(51,51,51)'}}>
                                    ${cartItem.price * cartItem.qty}    
                                </div>                           
                            </div>
                        </div>
                    );
                })}
            </div>
            }
            <div style={{display:'flex',justifyContent:'space-between',margin:'20px 0'}}>
                <div style={{fontSize:'15px',fontWeight:'700',color:'rgb(75,79,88)'}}>Subtotal</div>
                <div style={{fontSize:'15px',fontWeight:'600',color:'rgb(51,51,51)'}}>${total.toFixed(2)}</div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <div style={{fontSize:'15px',fontWeight:'700',color:'rgb(75,79,88)'}}>Shipping</div>
                <div style={{fontSize:'15px',fontWeight:'600',color:'rgb(51,51,51)'}}>${shipping.toFixed(2)}</div>
            </div>
            <hr />
            <div style={{display:'flex',justifyContent:'space-between',cursor:'pointer'}} onClick={() => {
                setCouponShow(prevState => !prevState);
            }}>
                <div style={{fontSize:'19px',fontWeight:'600',color:'rgb(58,58,58)'}}>Coupon Code?</div>
                <div>
                    {couponShow ? <UpOutlined /> : <DownOutlined />}
                </div>
            </div>
            {couponShow && <div style={{display:'flex',justifyContent:'space-between',marginTop:'18px'}}>
                <Input placeholder='Enter Code' className='email-input' style={{width:'284px',height:'45px',borderRadius:'4px'}}/>
                <button className='btn btn-dark' style={{borderRadius:0,fontSize:'15px',fontWeight:'700',width:'170px'}}>Apply</button>
            </div>
            }
            <hr />
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{fontSize:'19px',fontWeight:'700',color:'rgb(75,79,88)'}}>Total</div>
                <div style={{fontSize:'19px',fontWeight:'600',color:'rgb(51,51,51)'}}>${(total+shipping).toFixed(2)}</div>
            </div>
        </div>
    );
}

export default Order;