const express = require("express");
const escape = require('escape-html');
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const app = express();
const port = process.env.port || 3000;
const fs = require("fs");
app.use(cors());
app.use(express.json());

const json_user_data = fs.readFileSync('src/shopping.json', 'utf-8');
const shoppingData = JSON.parse(json_user_data);

// set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per windowMs
});

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

app.post("/user_cart", limiter, (req, res) => {
    const {r, doorNumb, esq, creditC, secCode, venc, sumatory, subtGeneral, resultShipCost, bankAccount} = req.body;
    

    let dataObj = {};

    if(bankAccount===""){
        dataObj = {
            r,
                doorNumb,
                esq,
                creditC,
                secCode,
                venc,
                sumatory,
                subtGeneral,
                resultShipCost,
        };
    }else{
        dataObj = {
            r,
                doorNumb,
                esq,
                sumatory,
                subtGeneral,
                resultShipCost,
                bankAccount
        };
    }
    
    
    

    

    shoppingData.push(dataObj);

    const json_user_data = JSON.stringify(shoppingData);
    fs.writeFileSync('src/shopping.json', json_user_data, 'utf-8');


    /*console.log(road);
    console.log(doorNumb);
    console.log(c);
    console.log(creditC);
    console.log(secCode);
    console.log(venc);
    console.log(sumatory);*/

    const escape = require('escape-html');
    const sanitizedBody = {};
    for (const key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            sanitizedBody[key] = escape(req.body[key]);
        }
    }
    res.send(sanitizedBody);

})

app.listen(port, ()=>{
    console.log(`http//:localhost:${port}/`);
})
