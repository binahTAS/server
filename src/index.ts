import express from 'express'
import {Server} from 'ws'
import {crawlWeb} from "../../crawler/src/net/Scraper";
import config from '../../crawler/config.json'
import {doConn} from "../../crawler/src/etc/Database";

const app = express()

const start = async () => {
    if(!(await doConn())) {
        process.exit()
    }

    const wsServer = new Server({noServer: true});

    wsServer.on('connection', (socket) => {
        socket.on('message', async message => {
            const requestInput = JSON.parse(message.toString());
            await crawlWeb(`${config.wikiUrl}/wiki/${requestInput.from}`, `${config.wikiUrl}/wiki/${requestInput.to}`, 5, socket)
            socket.close()
        })
    })

    const server = app.listen(3000, () => {
        console.log('listening')
    });


    server.on('upgrade', (req, socket, head) => {
        wsServer.handleUpgrade(req, socket, head, socket => {
            wsServer.emit('connection', socket, req)
        })
    })
}

start().then(() => {
    console.log('Exiting...')
})