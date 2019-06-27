const bcrypt = require ('bcryptjs')
const router = require ('express').Router()
const isEmail = require('validator/lib/isEmail')
const conn = require ('../connection')
const multer = require ('multer')
const path = require ('path')
const fs = require ('fs')

// ============== Check data Users tabel by.... ==============

// router.get('/test', (req,res) => {
//     const sql = `SELECT * FROM users`
//     conn.query (sql, (err,result) => {
//         if (err) return res.send(err.sqlMessage);
//         res.send(result)
//     })
// })

//check username
router.get('/users/:user', (req,res) => {
    const username = req.params.user
    const sql = `SELECT username FROM users WHERE username = '${username}'`
    
    conn.query (sql, (err, result) => {
        if (err) return res.send(err.sqlMessage)
        console.log('Checking already run');
        
        res.send(result)
    })
})

// check username availability
router.get('/users/:username', (req,res) => {
    const username = req.params 
    const sql = `SELECT * FROM users WHERE username = '${username}'`

    conn.query(sql, (err,result) => {
        if(err) return res.send(err.sqlMessage)
        return res.send(result)
    })
})

// check user availability email & username
// router.get('/check/:username/:email', (req,res) => {
//     const username = req.params.username
//     const email = req.params.email
//     const sql = `SELECT * FROM users WHERE username = '${username}'`
//     const sql2 = `SELECT * FROM users WHERE email = '${email}`

//     conn.query (sql, (err, result) => {
//         if (err) return res.send(err.sqlMessage)
//         console.log('Checking username');
        
//         res.send(result)
//     })
// })

// login
router.get('/users/:user/:pass', (req,res) => {

    const username = req.params.user
    var password = req.params.pass
    const sql = `SELECT * FROM users WHERE username = '${username}'`
    const sql2 = `SELECT * FROM users WHERE email = '${username}'`
    
    if(!isEmail(req.body.username)) {
    conn.query (sql, async (err, result) => {
        if (err) return res.send(err.sqlMessage)
        console.log(sql); // jika username = username
        
        const user = result[0]
        console.log(user);
        
        if(!user) return res.send('User not available')
        
        const compare = await bcrypt.compare(password, user.password )
        console.log(compare);
        
        if(!compare) return requestAnimationFrame.send('Wrong password')
        
        res.send(user)
    })} else {
    conn.query (sql2, async (err, result) => {
        if (err) return res.send(err.sqlMessage)
        console.log(sql2); // jika username = emaila

        const user = result[0]
        if(!user) return res.send('User not available')
        
        const compare = await bcrypt.compare(password, user.password )
        if(!compare) return requestAnimationFrame.send('Wrong password')
        
        res.send(user)
    })}
})

// =============== Input data users ==================
// register (username,email,password)
router.post('/reguser', async (req, res) => {
    const sql = 'INSERT INTO users SET ?;'
    var data = req.body
    
    if(!req.body.username || !req.body.nama_depan || !req.body.nama_belakang || !req.body.email || !req.body.password) return res.send('Field must not empty')

    if(!isEmail(req.body.email)) return res.send('Email not valid')

    req.body.password = await bcrypt.hash(req.body.password, 8)
    // console.log('email verified & password hashed');
    console.log(req.body.password);
    
    conn.query (sql, data, (err, result) => {
        if (err) return res.send(err.sqlMessage)
            res.send(result)
    })
})


// ======================= Delete data users ===============

// delete user
router.delete('/user/delete/:id', (req,res) => {
    const id = req.params.id
    const sql = `DELETE FROM users WHERE id = ${id}`
    
    conn.query (sql, (err, result) => {
        if (err) return res.send(err.sqlMessage)
        res.send(result)
    })
})


// ======================= Upload picture ====================

// upload avatar
const uploadDir = path.join(__dirname + '/../upload/imgavatar/' )

const simpan = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, avatarDir)
    },
    filename : function (req, file, cb) {
        cb(null, Date.now() + file.fieldname + path.extname(file.originalname))
    }
})

const upstore = multer ({
    storage: simpan,
    limits: {
        fileSize: 10000000 // 10 MB
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)){
            return cb(new Error('use only jpg, jpeg, png, and webp format image'))
        }
        cb(undefined, true)
    }
})

// ================== Edit data users =====================

// Edit data users
    // edit profile (nama_lengkap, alamat, avatar)
// router.patch('/profiledit', upstore.single('avatar'), async (req, res) => {
//     
// })      
//     const sql = `INSERT INTO users SET ?`
// })




module.exports = router