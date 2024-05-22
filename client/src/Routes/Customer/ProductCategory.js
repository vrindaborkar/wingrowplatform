import React from "react";
import "./Customer.css";
import { Link } from "react-router-dom";

export default function ProductCategory(props) {
  return (
    <div className="category">
    <Link className="link"
    to={`props.link`}
    >
             <img src={props.imgsrc} />
        <h5>{props.t(props.firstHalfTitle)} <br className="title-br" /> {props.t(props.secHalfTitle)} </h5>
    </Link>
 
    </div>
  );
}
