import { useState } from "react";
import "./App.css";
import axios from "axios";
import Card from "./Card.jsx";
import RepoCard from "./RepoCard";

function App() {

  // useState()
  const [getText, setText] = useState();
  const [getData, setData] = useState([]);

  // below code is only to know total count response.data provide 
  const [totalRepo, setRepo] = useState([]);

  //repo data
  const [getRepoData, setRepoData] = useState([]);

  // profile data
  const [getUserData , setProfielData] = useState([]);

  // visible
  const [getVisibility, setVisibility] = useState(true);


  // input onChange
  const handleOnChange = (event) => {
    if(event.target.value !== ""){
      setText(event.target.value);
    }
  }

  // onSubmit
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!getText) {
      alert("Input field is empty");
      return;
    }

    console.log("Search keyword =>",getText);
    try {
      async function getGeneralData() {
        const response = await axios.get(`https://api.github.com/search/users?q=${getText}`);
        setData(response.data.items);
        setRepo(response.data);
      }
      getGeneralData();
    } catch (error) {
      console.log(error);
    }
  }

  // onClicking card component
  const handleCardClick = (name) => {
    // console.log("this card has been clicked", name);
    // for repo i.e right-div
    try{
      async function getMoreData(){
        const response = await axios.get(`https://api.github.com/users/${name}/repos`);
        setRepoData(response.data);
        // console.log(response.data.length);
        if(response.data.length !== 0){
          setVisibility(false);
        }else{
          setVisibility(true);
        }
        // console.log(response.data);
        // response.data.map((currentElement)=>{
        //   console.log(currentElement.name);
        // })
        // console.log(getRepoData);
      }
      getMoreData();
    }catch(error){
      console.log("error at getMoreData()",error);
    }

    // for left-div
    try{
      async function getProfileData(){
        const response = await axios.get(`https://api.github.com/users/${name}`);
        // console.log(response.data);
        setProfielData(response.data);
        // console.log(getUserData);
      }
      getProfileData();
    }catch(error){
      console.log("error at getProfileData()",error);
    }

  }

  return (
    <>
    <div className="main-container">

      {/* Left div */}
      <div className="App">
          <form>
            {/* <h1>Search GitHub Users and Their Repositories</h1> */}
            <h5>Search username : {" "}  
              <input type="text" width="20px" height="20px" placeholder ="e.g ajay-nishad25" onChange={handleOnChange} />
            </h5>
            <h3 style={{textAlign:"center"}}><button type="submit" onClick={handleSubmit}>Search</button></h3>
          </form>
          <li>
          <p style={{marginLeft:"2px"}}>Total Count : <span style={{color:"red"}}>{totalRepo.total_count}</span></p>
          </li>
          
          
          <li className="about-profile">
            <h3 style={{textAlign:"center"}}><img className="circle-image" src={getUserData.avatar_url} alt="user-image" height="150px" width="150px"/></h3>
            <p>Username : {getUserData.login}</p>
            <p>Name : {getUserData.name}</p>
            <p>Bio : {getUserData.bio} </p>
            <p>Company : {getUserData.company} </p>
            <p>Location : {getUserData.location} </p>
            <p>Total public repo : {getUserData.public_repos} </p>
            <p>Created on : {getUserData.created_at} </p>
            <p>followers : {getUserData.followers} </p>
            <p>following : {getUserData.following} </p>
            <p>Visit github :<a href={getUserData.html_url}>{getUserData.html_url}</a></p>
          </li>
      </div>

      {/* Center Div */}
      <div className="lower-div">
        { getData &&
          getData.map((currentElement)=>{
            {/* console.log(currentElement); */}
            return (
              <div style={{display:"inline"}} onClick={()=>{handleCardClick(currentElement.login)}} key={currentElement.id}>
                <Card
                key={currentElement.id}
                image={currentElement.avatar_url}
                name={currentElement.login}
                url={currentElement.html_url}
                id = {currentElement.id}
                />
              </div>
            );
          })
        }
      </div>

      {/* Right Div */}
      <div className="last-div">
        <h3 style={{marginTop:"0px"}}>Repo Details</h3>
        {getVisibility===true ? <h4 style={{color:"red"}}>No repo present</h4> : <h1 style={{visibility:"hidden",fontSize:"1px"}}>Repo present</h1>}
        { 
          getRepoData && getRepoData.map((currentElement)=>{
            {/* console.log(getRepoData.length); */}
            return(
              <div>
                <RepoCard 
                  key={currentElement.id}
                  name={currentElement.name}
                  desc = {currentElement.description}
                  url={currentElement.html_url}
                  lang={currentElement.language}
                  create={currentElement.created_at}
                  updated={currentElement.updated_at}
                  pushed={currentElement.pushed_at}
                />
              </div>
            );
          })
        }
      </div>
    </div>
    </>
  );
}

export default App;

