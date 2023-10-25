let express = require('express');
let app = express();

//connect to DB
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://xxu:hK2ixfyTWX3nxbc4@flicker-test.zxjmy0x.mongodb.net/?retryWrites=true&w=majority");
db.on("ready", () => {
    console.log("Connected to the database");
});
db.connect();

app.use(express.json());
app.use('/', express.static('public'));

// let flicks = [];

app.post('/flicks', (req, res) => {
    console.log(req.body);

    //limit date() to show only dates
    let currentDate = new Date();
    let time = currentDate.toDateString().slice(0, 15);
    let obj = {
        date: time,
        name: req.body.name,
        rate: req.body.rate
    }

    //add values to the DB
    db.push("flicks", obj);

    // flicks.push(obj);
    // console.log(flicks);
    res.json({ task: "success" });
})

app.get('/data', (req, res) => {

    //fetch from the DB
    db.get("flicks").then(flicks => {
        let obj = { data: flicks };
        res.json(obj);
    })

    // let obj = { data: flicks };
    // res.json(obj);
})

app.listen(3000, () => {
    console.log('listening at localhost:3000');
})