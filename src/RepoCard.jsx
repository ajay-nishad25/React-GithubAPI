import React from "react";
import "./RepoCard.css";
const RepoCard = (props) =>{
    return (
        <>
            <div className="repo-card-div">
                <li style={{listStyleType:"none"}}>
                    <p>Repo name : <span style={{textDecoration:"underline", color:"red"}}>{props.name}</span></p>
                    <p>Description : {props.desc}</p>
                    <p>Visit : <a href={props.url} target="_blank">{props.url}</a></p>
                    <p>Language : <span style={{color:"green"}}>{props.lang}</span>  </p>
                    <p>Created at : {props.create} </p>
                    <p>Updated at : {props.updated} </p>
                    <p>Pushed at : {props.pushed} </p>
                </li>

            </div>
        </>
    );
}
export default RepoCard;
