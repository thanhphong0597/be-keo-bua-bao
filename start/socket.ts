
import Ws from 'App/Services/Ws'

Ws.boot()
//status: waitting cancle finished start 

const Rooms: number[] = [];

Ws.io.on('connection', (socket) => {

  console.log(`hello ${socket.id}`)
  let match_ex_id = 0;

  socket.on(`test:join`, (matchId: number, action: number) => {
    console.log(`matchid: ${matchId} - ${action}`)
    match_ex_id = matchId

    socket.join(matchId)
    console.log(`38 data: ${matchId} - ${action}`)
    if (action == 0) {
      Rooms.push(matchId)
      console.log(Rooms)
      Ws.io.emit(`server:msg`, 1)
    }
    else {
      // Ws.io.to(matchId).emit(`server:msg`, 2)
      socket.broadcast.emit(`server:msg`, 2)
    }
  })

  //ready button
  socket.on(`user:start`, async () => {
    console.log(`start`)
    Ws.io.to(match_ex_id).emit(`server:msg`, 3)
  })
  socket.on(`user:ready`, (data) => {
    console.log(`ready ${data}`)
    socket.broadcast.emit(`server:play`, data)
  })

  //playing game
  socket.on(`user:bet`, (role: string, bet: string) => {
    console.log(`${role} + ${bet}`)
    socket.broadcast.emit(`user:bet`, bet)
  })

  //sending result to client
  socket.on(`master:client`, (result, round) => {
    console.log(round)
    socket.broadcast.emit(`master:client`, result, round)
  })

  socket.on('disconnect', () => {
    console.log(`goodbye ${socket.id}`)
  })



})
