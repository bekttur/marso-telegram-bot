import React, { useEffect, useState } from 'react'
import "./BasketBtn.css"
import { Link } from 'react-router-dom';

const BasketBtn = ({basket}) => {
    const [count, setCount] = useState(0)
    useEffect(() => {
        const totalCount = basket.length;
        setCount(totalCount);
    }, [basket]);


    return (
        <Link to={"/basket"}>
            <div className='basketBtn'>
                <div className='basketBtn-icon'></div>
                {/* <div className='basketBtn-count'>{count}</div> */}
            </div>
        </Link>
    )

}

export default BasketBtn