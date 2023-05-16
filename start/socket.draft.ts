import Ws from 'App/Services/Ws'

Ws.boot()

const rooms: [{ match_id, status, player1, player2 }] = [{ match_id: null, status: null, player1: null, player2: null }]
//status: waitting cancle finished start 

const Rooms: number[] = [];

Ws.io.on('connection', (socket) => {
  console.log(`10: `, Rooms)
  console.log(`hello ${socket.id}`)

  socket.on('room:join', (id: number) => {
    console.log(id)
    //join the room no matter what
    socket.join(id)
    socket.on('disconnect',socket=>{
      console.log(`goodbye`)
    })
    const room = Rooms.find(a => (a == id))
    if (room !== 0 && id) {
      console.log('c')
      if (room) {
        console.log('a')
        console.log(`room 15: ${room}`)
        console.log(Rooms)
        socket.to(id).emit('client:message', {matchId:id,status:1,message:"Vừa có người tham gia!!"})
        socket.emit('client:message', {matchId:id,status:1,message:"Chào mừng!!"})

      }
      else {
        console.log('b')
        Rooms.push(id)
        console.log(Rooms)
        socket.emit('client:message', {status:0,message:"Chào mừng!!"})
      }
    }

  })


  socket.on('disconnect', () => {
    console.log(`goodbye ${socket.id}`)
  })

  socket.on('message:client',message=>{
    socket.emit('message:server',`server ${message}`)
  })

  socket.on('test:client',data=>{
    console.log(data)
    socket
    socket.emit('test:server',data)
  })

})
