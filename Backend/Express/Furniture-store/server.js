const express = require("express");
const app = express();

const PORT = 3000;

const store = [
    { name: "table", inventory: 3, price: 800 },
    { name: "chair", inventory: 16, price: 120 },
    { name: "couch", inventory: 1, price: 1200 },
    { name: "picture frame", inventory: 31, price: 70 }


]

app.use(express.static("dist"));

// Root route
app.get("/", (req, res) => {
  res.send("Server is up and running smoothly");
});

app.get("/priceCheck/:name", (req,res) => {
    const itemName = req.params.name; 
    const item = store.find(product => product.name === itemName);
    if (item) {
    return res.json({ price: item.price });
  }

  res.json({ price: null });
})
app.get("/buy/:name", (req,res) => {
  const itemName = req.params.name;
   const item = store.find(product => product.name === itemName);

   if (!item) {
    return res.json({ error: "Item not found" });
  }
  if (item.inventory <= 0) {
    return res.json({ error: "Out of stock =>", item });
  }

  item.inventory -= 1; // מוריד 1 מהמלאי

  res.json(item); // מחזיר את המוצר המעודכן
})

app.get("/sale", (req,res) => {
   const isAdmin = req.query.admin

   if(isAdmin === "true")
    {
      store.forEach(item =>{
        if(item.inventory >= 10){
          item.price = item.price * 0.5;
        }
      })
   }
   res.send(store);

})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Open UI at http://localhost:${PORT}/index.html`);
});