import React from "react";
import ContextData from "../components/context/ContextData";
import { Link } from 'react-router-dom';

const Breadcrumb = (props) => {
    const { stateData } = React.useContext(ContextData);
    const list = stateData.breadcrumb;

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
