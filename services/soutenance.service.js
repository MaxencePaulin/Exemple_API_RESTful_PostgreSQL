// import { client } from '../server.js';
//
// const add = (body, callback) => {
//     // je peux faire les vérifications ici
//     let date = new Date();
//     date = (date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
//     client.query(
//         `INSERT INTO soutient (noetudiant, idjury, datesout, note) VALUES ($1, $2, $3, $4)`,
//         [body.noetudiant, body.idjury, date, body.note],
//         (error, results) => {
//             if (error) {
//                 console.log(error);
//                 return callback(error);
//             }
//             return callback(null, "Soutenance ajoutée");
//         }
//     );
// }
//
// export default {
//     add
// }