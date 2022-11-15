import pool from '../../db.js';
import queries from './queries.js';

const getEntreprises = (req, res) => {
    pool.query(queries.getEntreprises, (error, results) => {
        if (error) {
            return res.status(500).send({succes: 0, data: error});
        }
        if (results.rowCount === 0) {
            return res.status(400).send({succes: 0, data: "Aucune entreprise trouvée"});
        }
        res.status(200).send({succes: 1, data: results.rows});
    });
}

export default {
    getEntreprises,
}