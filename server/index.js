const express = require("express");
const mongoose = require("mongoose");
const app = express();
const FoodModel = require("./models/Food")
app.use(express.json());
mongoose.connect("mongodb+srv://joao:duque123@crud.xiq3c.mongodb.net/food?retryWrites=true&w=majority",{
    useNewUrlParser:true,
});

app.get("/", async (req, res) => {
    const food = new FoodModel({foodName:"Apple", daySinceIAte:3});
    try{
        await food.save();
        res.send("insert data")
    }catch(err){
        console.log(err)
    }
})
app.listen(3001,()=>{
    console.log("Server is running on port 3001...");
})