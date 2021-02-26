// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject } from "rxjs";
import { Reimbursement } from "src/app/models/reimbursement.model";
import { Roles } from "src/app/models/roles.model";
import { Status } from "src/app/models/status.model";
import { Types } from "src/app/models/types.model";
import { User } from "src/app/models/user.model";

export const environment = {
  production: false,
  URL: 'http://localhost:8080/ers/'
};

export let ticketArray$: BehaviorSubject<Reimbursement[]> = new BehaviorSubject<Reimbursement[]>([new Reimbursement(0, 0, "", new Date(), new Date(), new User(0, "", "", "", "", "", new Roles(0, "")), new User(0, "", "", "", "", "", new Roles(0, "")), new Status(0, ""), new Types(0, ""))]);
// export let isFinancialManager$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
// export let isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(<boolean><unknown>this.cookieService.get("isLoggedIn"));
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
