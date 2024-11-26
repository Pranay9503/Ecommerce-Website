import axios from "axios";
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import Header from "./Header";
import { productsData } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data)
    const [loading, setLoading] = useState(false)
    const products = useSelector(state => state.cart);
    const dispatch = useDispatch();
    let componentMounted = true;

    useEffect(() => {
        dispatch(productsData());
    })

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const responseData = await axios.get('https://fakestoreapi.com/products')
            if (componentMounted) {
                setData(responseData.data);
                setFilter(responseData.data);
                setLoading(false);
            }

            return () => {
                componentMounted = false;
            }
        }

        getProducts();
    }, [])

    const Loading = () => {
        return (
            <>
                Loading...
            </>
        );
    }

    const filterProduct = (cat) => {
        const updatedList = data.filter((product) => product.category === cat);
        setFilter(updatedList);
    }

    const ShowProducts = () => {
        return (
            <>
                <Header />
                <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <button className="btn btn-outline-dark me-2" onClick={() => setFilter(data)}>All</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("men's clothing")}>Men's Collection</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("women's clothing")}>Women's Collection</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("jewelery")}>Jewelery</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("electronics")}>Electronic</button>
                </div>
                {filter.map((product) => {
                    return (
                        <>
                            <div className="col-md-3 mb-4">
                                <div className="card h-100 text-center" style={{position:'unset',borderRadius:'2px',padding:'10px 0'}} key={product.id}>
                                    <img src={product.image} className="card-img-top" height={180} width={180} style={{objectFit:'contain'}} alt={product.title}/>
                                        <div className="card-body">
                                            <h5 className="card-title mb-0">{product.title.substring(0,12)}...</h5>
                                            <p className="card-text lead fw-bold">${product.price}</p>
                                            <NavLink to={`/products/${product.id}`} className="btn btn-outline-dark" style={{borderRadius:'2px'}}>Buy Now</NavLink>
                                        </div>
                                </div>
                            </div>
                        </>
                    );
                })}
            </>
        );
    }

    return (
        <div className="container my-5 py-5">
            <div className="row">
                <div className="col-12 mb-5">
                    <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
                    <hr />
                </div>
            </div>
            <div className="row justify-content-center">
                {loading ? <Loading /> : <ShowProducts />}
            </div>
        </div>
    );
}

export default Products;
