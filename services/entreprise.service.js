import { client } from '../server.js';

const list = (callback) => {
    client.query(
        `SELECT * FROM entreprise`,
        (error, results) => {
            if (error) {
                console.log(error);
                return callback(error);
            }
            return callback(null, results.rows);
        }
    );
}

const add = (body, callback) => {
    // je peux faire les vérifications ici
    client.query(
        `INSERT INTO entreprise (nomentreprise) VALUES ($1)`,
        [body.nomentreprise],
        (error, results) => {
            if (error) {
                console.log(error);
                return callback(error);
            }
            return callback(null, "Entreprise ajoutée");
        }
    );
}

const find = (params, callback) => {
    client.query(
        `SELECT identreprise FROM entreprise WHERE identreprise = $1`,
        [params.id],
        (error, results) => {
            if (error) {
                console.log(error);
                return callback(error);
            }
            if (results.rowCount === 0) {
                return callback("Entreprise inexistante");
            }
            return callback(null, results.rows);
        }
    );
}

const unlinked = (params, callback) => {
    client.query(
        `SELECT identreprise FROM etudiant WHERE identreprise = $1`,
        [params.id],
        (error, results) => {
            if (error) {
                console.log(error);
                return callback(error);
            }
            if (results.rowCount > 0) {
                return callback("Supression interdite, entreprise liée à un étudiant");
            }
            return callback(null, results.rows);
        }
    );
}

const del = (params, callback) => {
    // ou je peux faire directement les vérifications ici et supprimer l'entreprise si elle n'est pas liée
    client.query(
        `DELETE FROM entreprise WHERE identreprise = $1`,
        [params.id],
        (error, results) => {
            if (error) {
                console.log(error);
                return callback(error);
            }
            return callback(null, "Entreprise supprimée");
        }
    );
}

export default {
    list,
    add,
    find,
    unlinked,
    del
}