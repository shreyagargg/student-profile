// const {Pool} = require('./config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

exports.register = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        const userCheck = await pool.query(
            'SELECT * from users where email = $1', [email]
        )

        if(userCheck.rows.length > 0)
            return res.status(400).json({"message": "User already exist"})

        const hashpass = await bcrypt.hash(password, 10)
        const result = await pool.query(
            'insert into users (name, email, password) values ($1, $2, $3) returning id, email',
            [name, email, hashpass]
        )

        res.status(200).json({
            "message": "User created",
            user: result.rows[0]
        })
    } catch(error){
        console.error(error)
        res.status(500).json({
            "message": "O bhai pta ni kya hogya"
        })
    }
}


exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;

        const result = await pool.query(
            'select * from users where email = $1', [email]
        )
        if(result.rows.length === 0)
            return res.status(404).json("invalid credentials")

        const user = result.rows[0]

        const is_match = await bcrypt.compare(password, user.password)
        if(!is_match)
            return res.status(400).json("invalid babu")

        const token = jwt.sign(
            {userId: user.id},
            process.env.JWT,
            {expiresIn: '1d'}
        )

        res.json({token})

    } catch(error){
        console.error(error)
        res.status(500).json("don't know broo")
    }
}