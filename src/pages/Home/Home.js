import { Layout } from "../../components/Layout/Layout";
import { Header } from "../../components/Header/Header";
import BackGroundVideo from "../../assets/videos/background.mp4";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { fetchData } from "../../services/dataService";
import { Product } from "../../components/product/product";

export function Home () {
      const [topProducts, setTopProducts] = useState([])
        console.log('Number of products ', topProducts);
      useEffect(() => {
            const dataService = async () => {
            const data = await fetchData({path: "http://localhost:5000/products/top-sold", method: 'get'})
            const {results} = data;
            setTopProducts(results)
        }
        dataService();
        }, [])
        console.log('Hello')
    return (
        <Layout>
            
            <Header />
            <section className = "intro__box">
                    <div className="text__nav__wrapper">
                        <h3 className="content__heading">Where we help you build your dreams</h3>
                        <button onClick={() => {
                            console.log('Clicked');
                        }}>Purchase Now</button>
                    </div>
                    <video  
                    autoPlay = {true} 
                    loop ={true} 
                    muted = {true}>
                        <source src = {BackGroundVideo} type="video/mp4"></source>
                    </video>
            </section>
            
            <section>

                <h3>Featured Products</h3>
                <div>
                        {topProducts.map((product) => {
                            return (<div>{product.name}</div>)
                        })}
                </div>
            </section>
        </Layout> 
    )
}