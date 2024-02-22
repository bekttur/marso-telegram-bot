import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Women = ({ women, basket }) => {
    const [products, setProducts] = useState(women);

    console.log("basket:", basket);

    

    const handleIncrement = (id) => {
        // Create a new array of products with the updated count
        const updatedProducts = products.map((item) => {
            if (id === item.id) {
                return { ...item, count: item.count + 1 };
            }
            return item;
        });
        setProducts(updatedProducts);
    };

    const handleDecrement = (id) => {
        // Create a new array of products with the updated count
        const updatedProducts = products.map((item) => {
            if (id === item.id && item.count > 0) {
                return { ...item, count: item.count - 1 };
            }
            return item;
        });
        setProducts(updatedProducts);
    };


    const addBasket = (id) => {
        let itemAdded = false; // Flag variable to track whether the item was added to the basket
    
        products.forEach((product) => {
            if (id == product.id) {
                if (basket.length !== 0) {
                    basket.forEach((item) => {
                        if (item.id == product.id) {
                            item.count += product.count;
                            itemAdded = true; // Set the flag to true when the item is found
                        }
                    });
                    if (!itemAdded) {
                        basket.push(product); // Add the item if it wasn't found
                    }
                } else {
                    basket.push(product);
                }
            }
        });
    
        localStorage.setItem('basket', JSON.stringify(basket));
    
        const updatedProducts = products.map((product) => {
            if (id == product.id) {
                // Toggle visibility when the product is added to the basket
                return { ...product, visible: !product.visible };
            }
            return product;
        });
    
        setProducts(updatedProducts);
    };
    



    return (
        <div className="block">
            <h3 className="title-header">Женский парфюм</h3>
            <div className="perfumes-block">
                {products.map((item, index) => {
                    return (
                        <div
                            className="perfume-card"
                            key={item.id}
                        >
                            <div className="perfume-elements">
                                <Link to={"/perfume/" + `${item.id}`}>
                                    <div className="perfume-img-block">
                                        <img className="perfume-img" src={item.img} alt={item.name} />
                                    </div>
                                    <div className="perfume-title">
                                        <p style={{ color: "#009897", fontSize: 14 }}>{item.name}</p>
                                        <div className="stock">
                                            <span className="icon-stock"></span>
                                            <span>Есть в наличии</span>
                                        </div>
                                        <p style={{ fontWeight: 600, color: "#000" }}>{item.price} тг.</p>
                                    </div>
                                </Link>
                                { (item.visible && (
                                    <div className="hover-block">
                                        <div className="main-basket-btns">
                                            <button className="handle-btn" onClick={() => handleDecrement(item.id)}>
                                                -
                                            </button>
                                            <div className="count">
                                                <span>{item.count}</span>
                                            </div>
                                            <button className="handle-btn" onClick={() => handleIncrement(item.id)}>
                                                +
                                            </button>
                                        </div>
                                        <div className="main-basket-btn-block">
                                            <button className="main-basket-btn" disabled={item.count === 0 ? true : false} onClick={() => addBasket(item.id)}>
                                                В КОРЗИНУ
                                            </button>
                                        </div>
                                    </div>
                                )) || !item.visible && (
                                    <div className="hover-block">
                                        <div className="main-basket-btn-block">
                                            <Link to={"/basket"} className="main-basket-btn">
                                                В КОРЗИНЕ
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


export default Women