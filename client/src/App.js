import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [newFoodName, setNewFoodName] = useState("");
  const [foodList, setFoodList] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/read").then((response)=>{
      console.log(response)
      setFoodList(response.data)
    })
  },[])
  const addToList = () => {
    axios.post("http://localhost:3001/insert",{
      foodName:foodName,
      days:days
    })
    setFoodName("")
    setDays(0)
  }
  const updateFood = (id) => {
    console.log(id)
    axios.put("http://localhost:3001/update",{
      id:id,
      newFoodName:newFoodName
    })
  }
  const deleteFood = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
    console.log(id)
  }
  return (
    <div className="App">
      <h1>CRUD App with MERN</h1>
      <label>Food Name:</label>
      <input type="text" value={foodName} onChange={(ev)=>{
        setFoodName(ev.target.value)
      }}/>
      <label>Day Since You Ate It:</label>
      <input type="number" value={days} onChange={(ev)=>{
        setDays(ev.target.value)
      }}/>
      <button onClick={addToList}>Add To List</button>
      <h1>Food List</h1>
      {foodList.map((val,key)=>{
        return(
          <div key={key} className="food">
            <h1>{val.foodName}</h1><h1>{val.daySinceIAte}</h1>
            <input type="text" placeholder="New Food name"onChange={(ev)=>{
             setNewFoodName(ev.target.value)
            }}/>
            <button onClick={()=>updateFood(val._id)}>Update</button>
            <button onClick={()=>deleteFood(val._id)}>Delete</button>
          </div>
        )
      })}
    </div>
  );
}

export default App;