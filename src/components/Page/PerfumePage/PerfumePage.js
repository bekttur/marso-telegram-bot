import React, { useState } from "react";
import { useParams } from "react-router";
import "./PerfumePage.css"
import { Link } from "react-router-dom";

const PerfumePage = ({ perfumes, basket }) => {
  let { id } = useParams();

  const allPerfumes = [...perfumes.men, ...perfumes.women, ...perfumes.unisex];

  const [products, setProducts] = useState(allPerfumes);

  const handleIncrement = (id) => {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            count: product.count + 1,
          };
        }
        return product;
      });
    });
  };

  const handleDecrement = (id) => {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.id === id && product.count > 0) {
          return {
            ...product,
            count: product.count - 1,
          };
        }
        return product;
      });
    });
  };

  const addBasket1 = (id) => {
    // Your existing code to add the product to the basket
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
    console.log(basket);

    // Update the visibility of the product
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            visible: !product.visible,
          };
        }
        return product;
      });
    });

  };

  return (
    <div className="page-block">
      {products.map((item) => {
        if (item.id == id) {
          return (
            <div key={item.id} className="product-page">
              <h1 className="title-header">{item.name}</h1>
              <div className="product-info-block">
                <div className="product-img-block">
                  <img className="page-img" src={item.img} />
                </div>
                <div className="product-title-block">
                  <div className="page-buy-block">
                    <div className="page-stock">
                      <span className="icon-stock"></span>
                      <span>Есть в наличии</span>
                    </div>
                    {(item.visible ? (
                      <div className="page-hover-block">
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
                          <button className="main-basket-btn" disabled={item.count === 0 ? true : false} onClick={() => addBasket1(item.id)}>
                            В КОРЗИНУ
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="page-hover-block">
                        <div className="main-basket-btn-block">
                          <Link to={"/basket"} className="main-basket-btn">
                            В КОРЗИНЕ
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="products-info">
                    <p>{item.description}</p>
                    <br />
                    <p><b>Верхние ноты</b>: <span>{item.top_notes}</span></p>
                    <p><b>Ноты сердца</b>: <span>{item.heart_notes}</span></p>
                    <p><b>Базовые ноты</b>: <span>{item.base_notes}</span></p>
                    <br />
                    <p><b>Аромат</b>: <span>{item.aroma}</span></p>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};


export default PerfumePage