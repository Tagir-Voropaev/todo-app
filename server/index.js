import express from 'express'
import jwt from 'jsonwebtoken';
import sequelize from './db/database.js'
import {registerValidation} from './validations/auth.js'
import {validationResult} from 'express-validator'
import bcrypt from 'bcrypt'


import UserModel from './db/models/UserModel.js'


const PORT = 5000;

try {
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
app.post('/auth/register', registerValidation, async (req, res) =>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json(errors.array());
        }
        
        //Шифрование пароля
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
    
        // Получение данных пользователя
        const doc = new UserModel({
            email: req.body.email,
            username: req.body.username,
            password: passwordHash
        })
    
        const user = await doc.save();
        const token = jwt.sign({
            _id : user.id,   
        }, 'secret123', 
        {
             expiresIn: '30d',
        })
        // Ответ ()
        res.json(
            ...user,
            token
        )
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться',
        });
    }
})

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log(`Server OK ${PORT}`)

})
