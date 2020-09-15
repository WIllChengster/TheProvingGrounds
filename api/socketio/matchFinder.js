//this file will have all the relating logic for sockets regarding matchfinding
exports.matchFinderNamespace = (io) => {
    
    const nsp = io.of('/matchFinder');



    let matchFindingInterval = setInterval( () => {
        let searchingRoom = nsp.adapter.rooms['searching']
        let players = {};
        if(searchingRoom !== undefined){
            players = searchingRoom.sockets

            let player1;
            let player2;
            for(let id in players){
                if(player1 === undefined){
                    player1 = id.toString();
                } else {
                    player2 = id.toString();
                    break;
                }
            }
            console.log(player1, player2);

            //tell players that match has been found and kick them from searching room
            if(player1 && player2){
                nsp.to(player1).emit('matchFound', player2);
                nsp.to(player2).emit('matchFound', player1)
                nsp.connected[player1].leave('searching');
                nsp.connected[player2].leave('searching');
            }

        }
        nsp.to('searching').emit('findingMatch', players);

    }, 3000)



    nsp.on('connection', socket => {
        console.log(`${socket.id} is connecting to match finder room`)

        socket.on('findMatch', (name) => {
            //push player into searching room and add them to connectPlayers object
                socket.join('searching')
        })

        socket.on('cancelFind', (name) => {
            socket.leave('searching')
        })
        
    })

    return nsp
}