import React from "react";
import "./Card.css";

const Card = (props)=>{
    return(
        <>
            <div className="container">
                <h3 style={{textAlign:"center"}}><img className="circle-image" src={props.image} alt="user-image" height="150px" width="150px"/></h3>
                <li className="li-holder" style={{listStyleType:"none"}}>
                    <p>Username : {props.name}</p>
                    <p>Visit : <a href={props.url} target="_blank"> {props.url}</a></p>
                    <p>ID : {props.id}</p>
                </li>
            </div>
        </>
    );
}

export default Card;