//this file will have all the relating logic for sockets regarding matchfinding
exports.matchFinderNamespace = (io) => {
    
    const nsp = io.of('/matchFinder');



    let matchFindingInterval = setInterval( () => {
        let searchingRoom = nsp.adapter.rooms['searching']
        let players = {};
        if(searchingRoom !== undefined){
            players = searchingRoom.sockets
        }
        nsp.to('searching').emit('findingMatch', players);

        console.log('firing find-match-emit');
    }, 1000)



    nsp.on('connection', socket => {
        console.log(`${socket.id} is connecting to match finder room`)

        socket.on('findMatch', (name) => {

            //check if socket/player is connectedPlayers Arr

            //push player into searching room and add them to connectPlayers object
                socket.join('searching')

            
        })

        socket.on('cancelFind', (name) => {
            socket.leave('searching')
        })
        
    })

    return nsp
}