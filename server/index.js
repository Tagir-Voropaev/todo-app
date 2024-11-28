import express from 'express'

const PORT = 3001;

const app = express();




app.get('/api', (req, res) => {
    res.send("Hello")
})


app.listen(PORT, () => {
    console.log(`Server listening port ${PORT}`)
})
