import React from "react";
import { Link } from 'react-router-dom';

const Breadcrumb = (props) => {
    return <ul className="breadcrumb">
                {
                    props.list?.map((item,idx) => (
                        <li key={idx}>
                            <Link to={item.path}><span>{item.name}</span></Link>
                        </li>
                    ))
                }

          </ul>
    };
export default Breadcrumb;