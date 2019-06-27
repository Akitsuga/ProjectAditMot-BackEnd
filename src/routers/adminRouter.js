const bcrypt = require ('bcryptjs')
const router = require ('express').Router()
const isEmail = require('validator/lib/isEmail')
const conn = require ('../connection')
// const multer = require ('multer')
// const path = require ('path')
// const fs = require ('fs')


// register
/* //not used for better security
router.post('/admreg', async (req, res) => {
    var sql = `INSERT INTO users SET ?`
    var sql2 = `SELECT * FROM users;`
    var data = req.body

    if(!isEmail(req.body.email)) return res.send("Email not valid")

    req.body.password = await bcrypt.hash(req.body.password,8)

    conn.query(sql, data, (err, result) => { 
        if (err) return res.send(err.sqlMessage) // Error pada post data
        // sendVerify(req.body.username, req.body.name, req.body.email)

        conn.query(sql2, (err, result) => {
            if (err) return res.send(err); res.send(result) // Error pada select data
       })
    })
})
*/

// Login
router.post('/admlogin',  (req, res) => {
    const {login, password} = req.body
    const sql = `SELECT * FROM adms WHERE username = ${login}`

    conn.query(sql, (err, result) => {
        if (err) return res.send(err.message) // Error pada query SQL
        const user = result[0] // result berupa array of object
        if (!user) return res.send("User Not Found") 
        if(!user.verified) return res.send("Please, verify yor email") 
        const hash =  bcrypt.compare(password, user.password) // true or false await
        if(!hash) return res.send ("Wrong Pass")
        res.send(user)
    })
})

// show all users
router.get('/usersall', (req,res) => {
    var sql = 'SELECT * FROM users;'

    conn.query(sql, (err, result) => {
        if(err) return res.send(err.sqlMessage)
        res.send(result)
    })
})



module.exports = router