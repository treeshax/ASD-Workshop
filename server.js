const express=require("express")
const fs = require("fs")
const app=express()

// app.get('/products',(req,res)=>{
//     fs.readFile('db.json','utf-8',(err,data)=>{
//         if(err){
//             return res.status(500).send('Error')
//         }else{
//             res.json(JSON.parse(data));
//         }
//     })
// })

// app.listen(3000)

app.get('/products/:id',(req,res)=>{
    fs.readFile('db.json','utf-8',(err,data)=>{
        if(err){
            return res.status(500).send('Error')
        }
        const products=JSON.parse(data);
        const product=products.find(p=>p.id==req.params.id)
        if(!product){
            return res.status(404).send('Product not found')
        }
        res.json(product)

    })
})
app.listen(3000)