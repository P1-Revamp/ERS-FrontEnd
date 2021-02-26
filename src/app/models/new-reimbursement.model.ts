import { Status } from "./status.model";
import { Types } from "./types.model";
import { User } from "./user.model";

export class NewReimbursement {

    constructor(public amount: number, public description: string, public author: User, public status: Status, public type: Types) {
        this.amount = amount;
        this.description = description;
        this.author = author;
        this.status = status;
        this.type = type;
    }
}
