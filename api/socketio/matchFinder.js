//this file will have all the relating logic for sockets regarding matchfinding

const connectedPlayers = []

module.exports = (io) => {
    
    const nsp = io.of('/matchFinder');

    nsp.on('connection', socket => {
        console.log(`${socket.id} is connecting to match finder room`)
        // console.log(socket.handshake.query);

        socket.on('findMatch', (name) => {

            //check if socket/player is connectedPlayers Arr, if not then push into array
            let isPlayerInArr = false;
            for(let i = 0; i < connectedPlayers.length; i++){
                if(socket.id === connectedPlayers[i]){
                    isPlayerInArr = true;
                };
                 
            }
            if(!isPlayerInArr){
                connectedPlayers.push(socket.id)
            }

            socket.emit('findingMatch', connectedPlayers)

        })
        
    })

    return nsp
}