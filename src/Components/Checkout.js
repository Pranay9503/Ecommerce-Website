import { Input, Form, Select, Checkbox, message, Button } from 'antd';
import '../Login.css';
import { useNavigate } from 'react-router';
import { LeftOutlined } from '@ant-design/icons';
import Header from './Header';
import Order from './Order';
import { useForm } from 'antd/es/form/Form';
import { useSelector } from 'react-redux';

const Checkout = ({setEmail, setAddress}) => {
    const [form] = useForm();
    const navigate = useNavigate();
    const state = useSelector(state => state.cartReducer);

    return (
        <>
            <Header />
            <div style={{marginTop:'72px',display:'flex',justifyContent:'center'}}>
                <div style={{width:'670px',padding:'20px 0',marginRight:'60px'}}>
                    <div>
                        <div style={{fontSize:'20px',fontWeight:'600',color:'rgb(58, 58, 58)'}}>
                            Contact Information
                        </div>
                        <div style={{fontSize:'13px',marginTop:'10px'}}>We'll use this email to send you details and updates about your order.</div>
                        <div>
                            <Input placeholder='Email' style={{height:'40px',marginTop:'15px'}} rules={[{required:true, message:'This information is required'}]} className='email-input' onChange={(e) => {
                                setEmail(e.target.value)
                            }}/>
                        </div>
                    </div>
                    <div>
                        <div style={{fontSize:'20px',fontWeight:'600',color:'rgb(58, 58, 58)',marginTop:'20px'}}>
                            Shipping Address
                        </div>
                        <div style={{fontSize:'13px',marginTop:'10px',marginBottom:'15px'}}>Enter the physical address where you want us to deliver your order.</div>
                        <Form
                            form={form}
                            layout="horizontal"
                            style={{
                                maxWidth: 670
                            }}
                            onFinish={(values) => {
                                //console.log(values);
                                setAddress(values);
                                //form.submit();
                                navigate('/payment')
                            }}
                            preserve={true}
                        >
                            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                <Form.Item name="first name" rules={[{required: true, message: 'This information is required'}]} preserve>
                                    <Input placeholder='First Name' style={{height:'40px',width:'300px'}} className='email-input'/>
                                </Form.Item>
                                <Form.Item name="last name" rules={[{required: true, message: 'This information is required'}]} preserve>
                                    <Input placeholder='Last Name' style={{height:40,width:'300px'}} className='email-input'/>
                                </Form.Item>
                            </div>
                            <Form.Item name="address" rules={[{required: true, message: 'This information is required'}]} preserve>
                                <Input placeholder='Street Address' style={{height:40}} className='email-input'/>
                            </Form.Item>
                            <Form.Item name="apartment" rules={[{required:true,message:'This information is required'}]} preserve>
                                <Input placeholder='Apartment, suite,etc.' style={{height:40}} className='email-input'/>
                            </Form.Item>
                            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                <Form.Item name="country" rules={[{required: true, message: 'This information is required'}]} preserve>
                                    <Select options={[{value:'India'}]} placeholder='Country / Region' style={{height:40,width:300}} className='email-input'/>
                                </Form.Item>
                                <Form.Item name="city" rules={[{required: true, message: 'This information is required'}]} preserve>
                                    <Input placeholder='Town / City' style={{height:40,width:300}} className='email-input'/>
                                </Form.Item>
                            </div>
                            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                <Form.Item name="state" rules={[{required: true, message: 'This information is required'}]} preserve>
                                    <Select options={[{value:'Andhra Pradesh'}]} placeholder='State' style={{height:40,width:300}} className='email-input'/>
                                </Form.Item>
                                <Form.Item name="zip" rules={[{required: true, message: 'This information is required'}]} preserve>
                                    <Input placeholder='Zip' style={{height:40,width:300}} className='email-input'/>
                                </Form.Item>
                            </div>
                            <Form.Item name="phone" preserve>
                                <Input placeholder='Phone (optional)' style={{height:40}} className='email-input'/>
                            </Form.Item>
                            <Form.Item>
                                <div style={{display:'flex'}}>
                                    <Checkbox className='custom-checkbox' style={{}}/>
                                    <div style={{marginLeft:'15px'}}>Use same address for billing</div>
                                </div>
                            </Form.Item>
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                    <button style={{border:'none',fontSize:'13px',fontWeight:'600',backgroundColor:'white',color:'rgb(36, 41, 45)',padding:0}} onClick={() => navigate('/cart')}>
                                        <LeftOutlined />
                                        BACK TO CART
                                    </button>
                                <Form.Item>
                                    <Button htmlType='submit' className='btn btn-dark' style={{padding:'20px 10px',display:'flex',alignItems:'center',borderRadius:'2px',margin:0}}>
                                        PROCEED TO PAYMENT
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div>
                <Order />
            </div>
        </>
    );
}

export default Checkout;