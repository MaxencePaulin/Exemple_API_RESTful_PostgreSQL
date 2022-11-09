import { client } from '../server.js';

const add = (body, callback) => {
    client.query(
        `INSERT INTO jury (nomjury, idsalle) VALUES ($1, $2)`,
        [body.nomjury, body.idsalle],
        (error, results) => {
            if (error) {
                console.log(error);
                return callback(error);
            }
            return callback(null, "Jury ajouté");
        }
    );
}

const find = (body, callback) => {
    client.query(
        `SELECT * FROM jury WHERE idjury = $1`,
        [body.idjury],
        (error, results) => {
            if (error) {
                console.log(error);
                return callback(error);
            }
            if (results.rowCount === 0) {
                return callback("Jury inexistant");
            }
            return callback(null, results.rows);
        }
    );
}

export default {
    add,
    find
}