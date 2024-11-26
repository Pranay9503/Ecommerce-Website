import { useSelector } from "react-redux";
import '../Login.css'
import Header from "./Header";

const ManageOrders = () => {
    const state = useSelector(state => state.cartReducer);
    //console.log('state:', state);
    let today  = new Date();
    const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    //console.log(date)
    const user_username = localStorage.getItem('username');

    const emptyOrders = () => {
        return (
            <div>Empty Orders</div>
        );
    }

    const ordersShow = (order) => {
        //console.log(order);
        let total = 0;
        order.forEach((item) => {
            total = total + (item.price * item.qty);
        });

        return (
        <div>
            <section class="h-100 gradient-custom" >
                <div class="container py-4 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-lg-10 col-xl-8">
                            <div class="card" style={{ borderRadius: '10px'}}>
                                <div class="card-header px-4 py-4" style={{display:'flex',justifyContent:'space-between' }}>
                                    <h5 class="text-muted mb-0">Order#: {(Math.random()*100000000).toFixed(0)}</h5>
                                    <h5 className="text-muted mb-0">Placed Date: {date}</h5>
                                </div>
                                <div class="card-body p-4">
                                    {order.map((item) => {
                                        return (
                                            <div class="card shadow-0 border mb-4">
                                                <div class="card-body">
                                                    <div class="row " style={{height:'90px',display:'flex',alignItems:'center'}}>
                                                        <div style={{display:'flex',justifyContent:'space-between'}}>
                                                            <div style={{display:'flex',}}>
                                                                <div>
                                                                    <img src={item.image} width={80}/>
                                                                </div>
                                                                <div style={{marginLeft:'20px'}}>
                                                                    <div className="col-md-12" style={{fontSize:'15px'}}>
                                                                        {item.title}
                                                                    </div>
                                                                    <div style={{fontSize:'15px',fontWeight:'600'}}>
                                                                        Qty: {item.qty}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div style={{fontSize:'15px',fontWeight:'600'}}>
                                                                ${item.price * item.qty}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );    
                                    })}
                                    <hr />

                                    <div class="d-flex justify-content-between pt-2">
                                        <p class="fw-bold mb-0">Order Details</p>
                                        <p class="text-muted mb-0"><span class="fw-bold me-4">Total</span> ${total}</p>
                                    </div>

                                    <div class="d-flex justify-content-between pt-2">
                                        <p class="text-muted mb-0">Invoice Number : 788152</p>
                                        <p class="text-muted mb-0"><span class="fw-bold me-4">Discount</span> $19.00</p>
                                    </div>

                                    <div class="d-flex justify-content-between">
                                        <p class="text-muted mb-0">Invoice Date : 22 Dec,2019</p>
                                        <p class="text-muted mb-0"><span class="fw-bold me-4">GST 18%</span> 123</p>
                                    </div>

                                    <div class="d-flex justify-content-between mb-5">
                                        <p class="text-muted mb-0">Recepits Voucher : 18KU-62IIK</p>
                                        <p class="text-muted mb-0"><span class="fw-bold me-4">Delivery Charges</span> Free</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </div>
        );
    }

    return (
        <body style={{backgroundColor:'rgb(230, 230, 230)'}}>
            <Header />
            <div style={{marginTop:'72px'}}>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <div style={{display:'flex',justifyContent:'space-between',width:'850px',marginTop:'20px'}}>
                        <div style={{fontSize:'22.5px',fontWeight:'700',color:'rgb(51,51,51)'}}>Manage Orders</div>
                        <div style={{fontSize:'18px',fontWeight:'600'}}>User: {JSON.parse(user_username)}</div>
                    </div>
                </div>
                {/* console.log(state.orders.length);
            console.log(1); */}

                {
                    state.orders.length === 0 ? emptyOrders() :
                        state.orders.map((order) => {
                            //console.log(order);
                            return ordersShow(order);
                        })
                }
            </div>
        </body>
    );
}

export default ManageOrders;