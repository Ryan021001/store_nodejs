import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import checkToken from './authentication/auth.js'
import connect from './database/database.js'

import {
    addressRouter,
    cartRouter,
    categoryRouter,
    orderRouter,
    productsRouter,
    usersRouter,
} from './routes/index.js'
dotenv.config()

const app = express()
app.use(cors());
app.use(checkToken)
app.use(express.json())
const port = process.env.PORT ?? 3000

const corsOptions = {
    origin: 'http://localhost:5173'
};

app.use(cors(corsOptions));

app.use('/users', usersRouter)
app.use('/address', addressRouter)
app.use('/products', productsRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)
app.use('/category', categoryRouter)

app.get('/', (req, res) => {
    res.send('response from root router')
})
app.listen(port, async () => {
    await connect()
    console.log(`listening on port : ${port}`)
})