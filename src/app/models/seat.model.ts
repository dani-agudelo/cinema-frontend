import { Theater } from "./theater.model";

export class Seat {
    id?: number;
    location: string;
    reclinig: boolean;
    theater_id?: number;
    theater?: Theater;
}