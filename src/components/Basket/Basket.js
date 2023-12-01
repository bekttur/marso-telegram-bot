import React, { useEffect, useState } from "react";
import "./Basket.css";
import { Link, useNavigate } from "react-router-dom";
import { useSpring, animated } from '@react-spring/web';

import axios from "axios";


function Number({ n }) {
    const { number } = useSpring({
        from: { number: 0 },
        number: n,
        delay: 200,
        config: { mass: 1, tension: 30, friction: 10 }
    })
    return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
}




const Basket = ({ basket, setBasket }) => {

    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        setTotalPrice(basket.reduce((acc, product) => acc + product.price * product.count, 0));
    }, [basket]);

    const [count, setCount] = useState(basket.length);
    const [productText, setProductText] = useState("товар");

    useEffect(() => {
        if (count === 1) {
            setProductText("товар");
        } else if (count > 1 && count <= 4) {
            setProductText("товара");
        } else if (count > 4) {
            setProductText("товаров");
        }
    }, [count]);

    const handleIncrement = (id) => {
        const updatedBasket = basket.map((item) => {
            if (id === item.id) {
                return { ...item, count: item.count + 1 };
            }
            return item;
        });

        setBasket(updatedBasket);

        console.log(updatedBasket);
    };

    const handleDecrement = (id) => {
        const updatedBasket = basket.map((item) => {
            if (id === item.id && item.count > 1) {
                return { ...item, count: item.count - 1 };
            }
            return item;
        });

        setBasket(updatedBasket);

        console.log(updatedBasket);
    };


    const clearBtn = () => {
        setBasket([])
        localStorage.setItem('basket', JSON.stringify(basket));

    }

    const deleteProduct = (id) => {
        const updatedBasket = basket.filter(item => item.id !== id);

        setCount(updatedBasket.length);
        setBasket(updatedBasket);

        console.log(updatedBasket);
    }













    // для запрос в телеграм бот
    const navigate = useNavigate();

    const clearData = {
        name: '',
        phone: '',
        address: '',
        basket: basket
    }

    const [isModal, setIsModal] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const [data, setData] = useState(clearData)



    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        // Проверяем, есть ли пустые поля в данных пользователя
        const isEmpty = !data.name || !data.phone || !data.address;
        setIsButtonDisabled(isEmpty);
    }, [data]);



    const handlePlaceOrder = () => {
        setIsModal(true)
    };


    
    const confirmationOrder = () => {
        const TOKEN = "6418207132:AAGXIk34bTGyoBzif6FGYgusAR7TZGr6gxc"; // Замените на токен вашего бота
        const CHAT_IDS = ["637137504", "564023521", "1142989702"];
        

        // Собираем информацию о заказе
        const userInfo = `Имя: ${data.name} \nТелефон: ${data.phone} \nАдрес доставки: ${data.address} \n`;
        const orderInfo = basket.map(item => `${item.name} - ${item.count} шт.`).join('\n');

        CHAT_IDS.forEach(chatId => {
            // Отправляем уведомление в Telegram
            fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: `Новый заказ:\n\nКонтактные данные:\n${userInfo}\n\nТовары: \n${orderInfo}\n\nИтого: ${totalPrice} тг.`,
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Message sent successfully:', data);
                    // Дополнительные действия после успешной отправки
                })
                .catch(error => {
                    console.error('Error sending message:', error);
                    // Обработка ошибки
                });

            setBasket([])
            localStorage.setItem('basket', JSON.stringify(basket));
            setData({
                name: '',
                phone: '',
                address: '',
                basket: basket
            })
        })

        setIsModal(false);
        setIsSuccess(true)
    }





    const handleModalClick = () => {
        setIsModal(false);
    }
    const handleSuccessClick = () => {
        setIsSuccess(false)
        navigate("/");
    }






    return (
        <div className="block">
            <h1 className="title-header">Корзина</h1>
            {basket.length !== 0 ? (
                <div className="basket-block">
                    <div className="basket-nav">
                        {/* <div style={{backgroundColor: "#f9f9f9"}}> */}
                            <p className="basket-text">В корзине {count} {productText} </p>
                        {/* </div> */}
                        <div className="clear">
                            <button className="clear-btn" onClick={clearBtn}>Очистить</button>
                        </div>

                    </div>
                    <div className="basket-products">
                        {basket.map((item) => {
                            return (
                                <>
                                    <div className="basket-card" key={item.id}>
                                        <div className="basket-img-block">
                                            <img className="basket-product-img" src={item.img} alt={item.name} />
                                        </div>
                                        <div className="basket-title">
                                            <Link to={`/perfume/${item.id}`} >
                                                <h4>{item.name}</h4>
                                            </Link>

                                        </div>
                                        <div className="basket-info-block">
                                            <div className="basket-price-block">
                                                <p style={{ fontWeight: 600 }}>18 000 тг.</p>
                                                <p style={{ fontSize: 13, color: "#a1a1a1" }}>цена за 1 шт</p>
                                            </div>
                                            <div className="counter">
                                                <div className="basket-btns">
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
                                                <span style={{ fontSize: "0.7rem", color: "#a1a1a1" }}>шт</span>
                                            </div>
                                            <div className="total-product-price">
                                                <p style={{ fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}><Number n={item.count * item.price} /><span>тг.</span> </p>
                                            </div>
                                        </div>
                                        <div className="product-out-block">
                                            <button className="product-out" onClick={() => { deleteProduct(item.id) }}></button>
                                        </div>
                                    </div>

                                </>

                            );
                        })}
                    </div>
                    <div className="total-basket">
                        <div className="total-products">
                            <div className="total">
                                <p>Итого:</p>
                            </div>
                            <div className="total-price">
                                <h2 className="totalPrice"><Number n={totalPrice} /> тг.</h2>
                            </div>
                            <div className="payment">
                                <button className="payment-btn" onClick={handlePlaceOrder}>Оформить заказ</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="basket-null">
                    <div className="basket-null-img">
                    </div>
                    <div className="basket-null-text">
                        <p style={{ fontSize: 36, color: "#bababa", marginBottom: 42 }}>Ваша корзина пуста</p>
                        <p><span><Link to={"/"} style={{ color: "#009897" }}>Нажмите здесь</Link></span>, чтобы продолжить покупки</p>
                    </div>
                </div>
            )}








            {isModal && (
                <div className='modal-body'>
                    <div className='modal-block'>
                        <div className="close-btn" onClick={handleModalClick}>
                        </div>
                        <h3 style={{ color: "#00adab" }}>Оформление заказа</h3>
                        <div className="modal">
                            <div className="modal-inputs">
                                <input type="text" className="modal-input" value={data.name} onChange={(e) => { setData(prev => ({ ...prev, name: e.target.value })) }} placeholder="Имя..." />
                                <input type="tel" className="modal-input" value={data.phone} onChange={(e) => { setData(prev => ({ ...prev, phone: e.target.value })) }} placeholder="Номер телефона..." />
                                <input type="text" className="modal-input" value={data.address} onChange={(e) => { setData(prev => ({ ...prev, address: e.target.value })) }} placeholder="Адрес доставки..." />
                            </div>
                            <div className='modal-btns'>
                                <button className="payment-btn" onClick={confirmationOrder} disabled={isButtonDisabled}>Подтвердить заказ</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {isSuccess && (
                <div class="modal-body">
                    <div class="modal-block">
                        <div class="success-card_img">
                            <div class="success-wrapper"> <svg class="animated-check" viewBox="0 0 24 24">
                                <path d="M4.1 12.7L9 17.6 20.3 6.3" fill="none" /> </svg>
                            </div>
                        </div>
                        <div class="success-card_text">
                            <h3>Спасибо за покупку.</h3>
                            <p>Мы свяжемся с вами в ближайшее время</p>
                            <button className="payment-btn" onClick={handleSuccessClick}>Главная страница</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default Basket