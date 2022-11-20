const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.port || 3000;

app.use(cors());
app.use(express.json());



app.get("/cats_products/:id", (req, res)=>{
    
    res.sendFile("./cats_products/" + req.params.id + ".json", {
        root: __dirname
    });
});

app.get("/cart/:id", (req, res)=>{
    
    res.sendFile("./cart/" + req.params.id + ".json", {
        root: __dirname
    });
});

app.get("/products/:id", (req, res)=>{
    
    res.sendFile("./products/" + req.params.id + ".json", {
        root: __dirname
    });
});

app.get("/products_comments/:id", (req, res)=>{
    
    res.sendFile("./products_comments/" + req.params.id + ".json", {
        root: __dirname
    });
});

app.get("/cats/:id", (req, res)=>{
    
    res.sendFile("./cats/" + req.params.id + ".json", {
        root: __dirname
    });
});

app.get("/user_cart/:id", (req, res)=>{
    
    res.sendFile("./user_cart/" + req.params.id + ".json", {
        root: __dirname
    });
});

app.post("/user_cart", (req, res) => {
    const {road, doorNumb, c, creditC, secCode, venc, sumatory} = req.body;
    console.log(road);
    console.log(doorNumb);
    console.log(c);
    console.log(creditC);
    console.log(secCode);
    console.log(venc);
    console.log(sumatory);

    res.send(req.body);

})

app.listen(port, ()=>{
    console.log(`http//:localhost:${port}/`);
})
