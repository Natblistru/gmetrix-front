import React from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Breadcrumb = (props) => {
    const list = useSelector(state => state.breadcrumb);
    console.log(list)

    return (
        <ul className="breadcrumb">
            {list?.map((item, idx) => (
                idx <= props.step && item ? (
                    <li key={idx}>
                        <Link to={item.path}><span>{item.name}</span></Link>
                    </li>
                ) : null
            ))}
        </ul>
    );
};

export default Breadcrumb;
