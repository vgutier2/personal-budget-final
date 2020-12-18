const express = require('express')
const app = express()
// const bodyParser = require('body-parser');
const routesUrls = require('./routes/routes')
const cors = require('cors')


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});

app.use(express.json())
app.use(cors())
app.use('/api', routesUrls)
app.listen(4000, () => console.log("server is running"))