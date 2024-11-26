import { useDispatch, useSelector } from "react-redux";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { addToCart, deleteFromCart, deleteItem } from "../redux/actions";
import { useNavigate } from "react-router";
import Header from "./Header";
import { useState } from "react";
import { Radio } from "antd";

const Cart = () => {
    const state = useSelector(state => state.cartReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let total = 0;
    const [value, setValue] = useState(0);
    console.log(state);
    state.cart?.map(pro => {
        total = total + (pro.price * pro.qty)
    });
    
    const onChange = (e) => {
        localStorage.setItem('shipping-charge',JSON.stringify(e.target.value));
        setValue(e.target.value);
        total += e.target.value;
    };

    const emptyCart = () => {
        return (
            <div style={{height:'90vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <div>
                    <img src={require("../images/empty-cart-150x150.png")}/>
                </div>
                <div style={{fontSize:'20px',fontWeight:'600',color:'rgb(110, 109, 118)',marginBottom:'30px'}}>Your cart is currently empty.</div>
                <button className="btn btn-dark" style={{borderRadius:'2px'}} onClick={() => {navigate('/products')}}>RETURN TO SHOP</button>
            </div>
        );
    }
    const cartItems = (cartItem) => {
        return (
            <>
                <div style={{ margin: '40px 0' }} key={cartItem.id}>
                    <div className="container">
                        <button className="btn-close float-end" aria-label="Close"
                            onClick={() => dispatch(deleteItem(cartItem.id))}></button>
                        <div style={{ display: 'flex', }}>
                            <div style={{ marginRight: '20px' }}>
                                <img src={cartItem.image} alt={cartItem.title} height="70px" width="60px" style={{ cursor: 'pointer' }} onClick={() => { navigate(`/products/${cartItem.id}`) }} />
                            </div>
                            <div className="col-md-6">
                                <div style={{ fontSize: '12px', fontWeight: 600, color: 'rgb(100,100,100)', marginBottom: '2px' }}>
                                    ${cartItem.price}
                                </div>
                                <div className="col-md-16" style={{ fontFamily: 'Roboto', fontSize: '12px', fontWeight: 500, color: '#3a3a3a', marginBottom: '5px' }}>{cartItem.title}</div>
                                <div style={{ display: 'flex', alignItems: 'center', color: 'grey' }}>
                                    <MinusOutlined style={{ fontSize: '10px' }} onClick={() => {
                                        dispatch(deleteFromCart(cartItem.id));
                                    }} />
                                    <div style={{ padding: '0 14px', fontSize: '15px' }}>
                                        {cartItem.qty}
                                    </div>
                                    <PlusOutlined style={{ fontSize: '10px' }} onClick={() => {
                                        dispatch(addToCart(cartItem));
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return (
        <body style={{ backgroundColor: 'rgb(235,235,235)', }}>
            <Header />
            {state.cart.length === 0 && emptyCart()}
            {state.cart.length !== 0 &&
                <div style={{ marginTop: '72px', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ padding: '10px 0', marginRight: '15px' }}>
                        <div style={{ width: '600px', backgroundColor: 'white', padding: '30px 30px 10px 30px' }}>
                            <div style={{ fontSize: '16px', fontWeight: 550, color: 'rgb(80,80,80)' }}>MY BAG</div>
                            <hr style={{ color: 'rgb(160,160,160)' }} />
                            <div>
                                {state.cart.map(cartItems)}
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div></div>
                                    <div style={{ width: '150px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontSize: '13px', fontWeight: '600', color: 'rgb(70,70,70)' }}>SUBTOTAL</div>
                                        <div style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(90,90,90)' }}>${total.toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{ marginTop: '10px', width: '456px', backgroundColor: 'white', padding: '30px' }}>
                            <div style={{ fontSize: '16px', fontWeight: 550, color: 'rgb(80,80,80)' }}>TOTAL</div>
                            <hr style={{ color: 'rgb(160,160,160)' }}/>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px',alignItems:'center' }}>
                                <div style={{fontSize:'15px',fontWeight:'700',color:'rgb(75,79,88'}}>Subtotal</div>
                                <div style={{fontSize:'15px',fontWeight:'600',color:'rgb(85,85,85)'}}>${total.toFixed(2)}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between',alignItems:'center' }}>
                                <div style={{fontSize:'15px',fontWeight:'700',color:'rgb(75,79,88'}}>Shipping</div>
                                <div style={{fontSize:'15px',fontWeight:'600',color:'rgb(85,85,85)'}}>${value.toFixed(2)}</div>
                            </div>
                            <div>
                                <Radio.Group style={{display: 'flex', flexDirection: 'column'}} onChange={onChange} value={value}>
                                    <Radio value={10}>
                                        <div style={{marginTop:'15px'}}>Flat rate:</div>
                                        <div style={{fontWeight:'600'}}>$10.00</div>
                                    </Radio>
                                    <Radio value={0}>
                                        <div style={{marginTop:'15px'}}>Free shipping</div>
                                        <div style={{fontWeight:'600'}}>$0.00</div>
                                    </Radio>
                                </Radio.Group>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between',alignItems:'center', marginTop: '30px', marginBottom: '15px' }}>
                                <div style={{fontSize:'20px',fontWeight:'700',color:'rgb(75,79,88'}}>Total</div>
                                <div style={{fontSize:'18px',fontWeight:'600',color:'rgb(85,85,85)'}}>${(total+value).toFixed(2)}</div>
                            </div>
                            <button className="btn btn-dark" style={{ borderRadius: '2px', width: '100%', padding:'15px 0', fontSize:'13px',fontWeight:'700'}} onClick={() => {
                                navigate('/checkout');
                            }}>PROCEED TO CHECKOUT</button>
                        </div>
                    </div>
                </div>
            }
        </body>
    );
}

export default Cart;