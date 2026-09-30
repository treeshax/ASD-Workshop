const express=require("express")
const fs = require("fs")
const app=express()
const path = require("path")
const port = 3000

const pathToFile = path.join(__dirname,"db.json")

async function readFile(){
    try{let data = await fs.promises.readFile(pathToFile,"utf-8");
    return JSON.parse(data);}
    catch(err){
        console.log(err)
    }
}

async function readFileWithDelay(){
    await new Promise((resolve,rejet)=>{
        setTimeout(resolve,1500)
    })
    return await readFile()
}
app.get('/products/:id', async(req, res) => {
    try{
        let products = await readFileWithDelay();
        let {id} = req.params;
        let product = products.find((items)=>{return items.id===id});
        res.json(product);
    }
    catch(err){
        console.log(err)
        res.status(500).send('Error');
    }
    
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});