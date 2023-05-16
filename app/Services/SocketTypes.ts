
declare module "socket.io" {
    interface Socket {
        match_id?: number,
        player_1:number,
        player_2:number
    }
}