import { client } from '../server.js';

const more5OrEquals = (callback) => {
    client.query(
        `select p.noprofesseur, p.nomprofesseur, count(*) as nbSoutenances 
        from soutient sou 
            inner join secompose sec on sec.idJury = sou.idJury 
            inner join professeur p on p.noprofesseur = sec.noprofesseur
        group by p.noprofesseur, p.nomprofesseur
        having count(*) >= 5;`,
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
        `INSERT INTO professeur (nomprofesseur) VALUES ($1)`,
        [body.nomprofesseur],
        (error, results) => {
            if (error) {
                console.log(error);
                return callback(error);
            }
            return callback(null, "Professeur ajouté");
        }
    )
}

export default {
    more5OrEquals,
    add
}