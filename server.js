const express = require('express');
const app = express();
const helmet = require('helmet');
const PORT = process.env.PORT || 9000;
require('isomorphic-fetch');
app.use(helmet());

app.get("/api/:name/:type", (req,res) =>{
    const name = req.params.name; 
    const type = req.params.type;
    // api link
    fetch(`https://itunes.apple.com/search?term=${name}&entity=${type}&limit=5`)
            // makes it readable
            .then(res => res.json())
            .then((info) => {
                items= info.results;
                res.send(items)
                }),
            error => {
                console.log(error);
            }
})
app.listen(PORT, () => {
    console.log("It's working on port 9000")
})