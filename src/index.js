const express = require ('express')
const cors = require('cors')

const userRouter = require ('./routers/userRouter.js')
const adminRouter = require ('./routers/adminRouter.js')
// const productsRouter = require ('./routers/productsRouter.js')

const app = express()
const port = 2019

// app.get('/', (req,res) => {
//     res.send(`<h1>test Run and port ${port}</h1>`)
// })

app.use(express.json())
app.use(cors())

app.use(userRouter)
app.use(adminRouter)
// app.use(productsRouter)

app.listen(port, (err) => {
    if(err) console.log("Failed Running Server");
    console.log("Running at port", port);
})