# server
 Handles incoming trace requests and Websocket channels.


# Send a request
    Websocket: `ws://DOMAIN:6969`

After the initial connection, the client needs to send an opening message like this
```json
{
  "from": "Main_Page",
  "to": "Wikipedia"
}
```

The server will then start to work and will send every step as follows
```json
{
  "layer": 472,
  "scanned": 511,
  "current": "/wiki/Wikipedia:Village_pump_(policy)/Archive_40",
  "finished": false,
  "runId": "db2be109-a1dd-473d-be4e-f46b454f2451"
}
```