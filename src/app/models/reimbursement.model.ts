import { Status } from "./status.model";
import { Types } from "./types.model";
import { User } from "./user.model";

export class Reimbursement {

    constructor(public reimbId: number, public amount: number, public description: string, public resolved: Date, public submitted: Date, public author: User, public resolver: User, public status: Status, public type: Types) {
        this.reimbId = reimbId;
        this.amount = amount; //
        this.description = description; //
        this.resolved = resolved;
        this.submitted = submitted;
        this.author = author; //
        this.resolver = resolver;
        this.status = status; //
        this.type = type; //
    }
}
