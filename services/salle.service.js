import { client } from '../server.js';

const find = (body, callback) => {
    client.query(
        `SELECT idsalle FROM salle WHERE idsalle = $1`,
        [body.idsalle],
        (error, results) => {
            if (error) {
                console.log(error);
                return callback(error);
            }
            if (results.rowCount === 0) {
                return callback("Salle inexistante");
            }
            return callback(null, results.rows);
        }
    );
}

export default {
    find
}