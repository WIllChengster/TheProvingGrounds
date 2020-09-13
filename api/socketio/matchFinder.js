//this file will have all the relating logic for sockets regarding matchfinding

const connectedPlayers = []

module.exports = (io) => {
    
    const nsp = io.of('/matchFinder');

    

    nsp.on('connection', socket => {
        let findInerval;
        console.log(`${socket.id} is connecting to match finder room`)

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

            findInterval = setInterval( () => {
                socket.emit('findingMatch', connectedPlayers)
            }, 1000 )


            
        })

        socket.on('cancelFind', (name) => {
            for(let i = 0; i < connectedPlayers.length; i++){
                if(socket.id === connectedPlayers[i]){
                    connectedPlayers.splice(i,1);
                };
                clearInterval(findInterval);
                 
            }
        })
        
    })

    return nsp
}