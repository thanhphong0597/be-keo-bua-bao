export default class matchModel {
    public id: number;
    public status: string;
    public user_id_1: number
    public user_id_2: number
    public user_1: string;
    public user_2?: string;
    public winner: string;
    public score: string;

    constructor(id: number, status: string, user_id_1: number, user_id_2: number, user_1: string, user_2: string | undefined, winner_id: string, score: string) {
        this.id = id;
        this.status = status;
        this.user_id_1 = user_id_1
        this.user_id_2 = user_id_2
        this.user_1 = user_1;
        this.user_2 = user_2;
        this.winner = winner_id;
        this.score = score;
    }
}