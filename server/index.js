import express from 'express'
import sequelize from './db/database.js'
import authorization from './modules/authorization.js';
import registration from './modules/registration.js';


const PORT = 5000;

try {
    (async () => {
        await sequelize.sync({force: true})
    })()
    await sequelize.authenticate()
    console.log('DB is OK')
  } catch (e) {
    console.log('DB is BAD ', e)
  }
const app = express();


app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello")
})
app.get('/auth/register', (req, res) =>{
    res.send("auth/register")
})

//Авторизация
app.post('/auth/login',  authorization)


app.post('/auth/register', registration)

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log(`Server OK ${PORT}`)

})
