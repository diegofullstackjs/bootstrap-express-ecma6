import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import path from 'path';
import cors from 'cors'
import bodyParser from 'body-parser';
import io from 'socket.io'

import IndexRoutes from './routes/index'
class Server {
     #conections;
    constructor(){
        this.env = dotenv.config({path: path.resolve(__dirname,'config','.env'),debug:true})
        this.conections = {}
        this.port = process.env.PORT? process.env.PORT : 3000
        this.serve = express();
        this.http = http.createServer(this.serve);
        this.io = io(this.http)
        this.middleware();
        this.routes();
    }
    socket(){
        this.io.on('connection',socket => {
            const {user_id} = socket.handshake.query;
            this.conections[user_id] = socket;
            this.io.on('disconnected',client => {
                delete this.conections[user_id];
            })
        })
    }
    middleware(){
        this.serve.use(cors())
        this.serve.use(bodyParser.json())
        this.serve.use(bodyParser.urlencoded({extended:true}))
        this.serve.use((req,res,next) => {
            req.io = this.io;
            req.userconnections = this.conections;
            next();
        })
    }
    routes(){
        this.serve.use('/',IndexRoutes)
    }
    run(){
        this.http.listen(this.port,() => {
            this.socket();
            console.log("SERVER RUNNABLE")
        })
    }
}

export default new Server;