// import { client } from '../server.js';
//
// const find = (body, callback) => {
//     client.query(
//         `SELECT * FROM etudiant WHERE noetudiant = $1`,
//         [body.noetudiant],
//         (error, results) => {
//             if (error) {
//                 console.log(error);
//                 return callback(error);
//             }
//             if (results.rowCount === 0) {
//                 return callback("L'étudiant n'existe pas");
//             }
//             return callback(null, results.rows);
//         }
//     );
// }
//
// export default {
//     find
// }