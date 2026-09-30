const express=require("express")
const fs = require("fs")
const app=express()
const path = require("path")
const port = 3000

const pathToFile = path.join(__dirname,"db.json")

async function readFile(){
    let data = await fs.promises.readFile(pathToFile,"utf-8");
    return JSON.parse(data);
}

app.get('/products/:id', async(req, res) => {
    try{
        let products = await readFile();
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