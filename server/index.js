const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const FoodModel = require("./models/Food")
app.use(express.json());
app.use(cors())
mongoose.connect("mongodb+srv://joao:duque123@crud.xiq3c.mongodb.net/food?retryWrites=true&w=majority",{
    useNewUrlParser:true,
});

app.post("/insert", async (req, res) => {
    const foodName = req.body.foodName;
    const days = req.body.days;
    const food = new FoodModel({foodName, daySinceIAte:days});
    try{
        await food.save();
        res.send("insert data")
    }catch(err){
        console.log(err)
    }
})
app.get("/read", async (req, res) => {
    FoodModel.find({}, (err, result)=>{
        if(err){
            res.send(err)
        }
        res.send(result)
    })
})
app.put("/update", async (req, res) => {
    const newFoodName = req.body.newFoodName;
    const id = req.body.id;
    try{
        await FoodModel.findById(id, (err, updatedFood)=>{
            updatedFood.foodName = newFoodName;
            updatedFood.save();
        });
        res.send("update")
    }catch(err){
        console.log(err)
    }
})
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id)
    await FoodModel.findByIdAndRemove(id).exec();
    res.send("deleted");
})

app.listen(3001,()=>{
    console.log("Server is running on port 3001...");
})