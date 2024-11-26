import axios from "axios";
import {StarFilled} from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, productData } from "../redux/actions";
import Header from "./Header";

const Product = () => {
    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productData(id));
    })

    useEffect(() => {
        const getProduct = async() => {
            setLoading(true);
            await axios.get(`https://fakestoreapi.com/products/${id}`)
                .then(response => setProduct(response.data))
            setLoading(false);
        }

        getProduct();
    },[])

    const Loading = () => {
        return (
            <div>
                Loading...
            </div>
        );
    }

    const addProduct = (product) => {
        dispatch(addToCart(product));
    }

    const ShowProduct = () => {
        return (
            <>
                <div style={{display:'flex'}}>
                    <div>
                        <img src={product.image} style={{objectFit:'contain'}} width={400}/>
                    </div>
                    <div style={{marginLeft:'250px'}}>
                        <h4 style={{textTransform:'uppercase'}}>{product.category}</h4>
                        <h1 className="display-5">{product.title}</h1>
                        <p className="lead">
                            Rating {product.rating && product.rating.rate}
                            <StarFilled />
                        </p>
                        <h3>$ {product.price}</h3>
                        <p className="lead">{product.description}</p>
                        <div>
                            <button className="btn btn-outline-dark" style={{borderRadius:'2px'}} onClick={() => {
                                addProduct(product);
                            }}>Add to Cart</button>
                            <NavLink to="/cart" className="btn btn-dark" style={{borderRadius:'2px'}}>Go to Cart</NavLink>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return (
        <>
            <Header />
            <div className="container" style={{marginTop:'100px'}}>
                <div className="row">
                    {loading ? <Loading /> : <ShowProduct />}
                </div>
            </div>
        </>
    );
}

export default Product;