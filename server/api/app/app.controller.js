'use strict';

// import Org from './../../models/js-data/org.model';
// import OrgAccount from './../../models/js-data/orgAccount.model';
// import OrgApp from './../../models/js-data/orgApp.model';
// import App from './../../models/js-data/app.model';
import {stapiBaseController} from 'sistemium-node';
import stapiApp from './../../models/app.model';
// import co from 'co';

let ctrl = stapiBaseController(stapiApp);

// ctrl.findAll = (req, res) => {
//
//   co(function *() {
//
//     let account = req && req.user;
//
//     let orgAccounts = yield OrgAccount.findAll({accountId: account.id});
//
//     let orgs = [];
//     if (orgAccounts) {
//       for (let i = 0; i < orgAccounts.length; i++) {
//         let org = yield Org.find(orgAccounts[i].orgId);
//         orgs.push(org);
//       }
//     }
//
//     let apps = [];
//     if (orgs) {
//       for (let i = 0; i < orgs.length; i++) {
//         let orgApps = yield OrgApp.findAll({orgId: orgs[i].orgId});
//         for (let j = 0; j < orgApps.length; j++) {
//           let app = yield App.find(orgApps[j].appId);
//           apps.push(app);
//         }
//       }
//     }
//
//     return res.json(apps);
//
//   }).catch((err) => {
//     console.log(err);
//     return res.sendStatus(500);
//   });
//
// };

export default ctrl;
