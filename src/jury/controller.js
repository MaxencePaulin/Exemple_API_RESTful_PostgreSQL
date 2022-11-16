import pool from '../../db.js';
import queries from './queries.js';
import queriesSalle from '../salle/queries.js';

const addJury = (req, res) => {
    const {nomjury, idsalle} = req.body;
    if (!idsalle || idsalle === "") {
        return res.status(400).send({success: 0, data: "Veuillez insérer un identifiant de salle"});
    }
    pool.query(queriesSalle.getSalleById, [idsalle], (error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        if (results.rowCount === 0) {
            return res.status(400).send({success: 0, data: "La salle n'existe pas"});
        }
        if (!nomjury || nomjury === "") {
            return res.status(400).send({success: 0, data: "Veuillez insérer un nom de jury"});
        }
        pool.query(queries.getJuryByName, [nomjury], (error, results) => {
            if (error) {
                return res.status(400).send({success: 0, data: error});
            }
            if (results.rowCount > 0) {
                return res.status(409).send({success: 0, data: "Le jury existe déjà"});
            }
            pool.query(queries.addJury, [nomjury, idsalle], (error, results) => {
                if (error) {
                    return res.status(400).send({success: 0, data: error});
                }
                res.status(200).send({success: 1, data: "Jury ajouté avec succès"});
            });
        });
    });
}

export default {
    addJury,
}