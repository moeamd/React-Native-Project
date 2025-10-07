import app from './app.js'
import { env } from './config/env.js'

const server = app.listen(env.PORT , ()=> {
    console.log(`server is listening on Port ${env.PORT}`);
})
