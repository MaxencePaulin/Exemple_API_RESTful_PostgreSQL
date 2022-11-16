import pool from '../../db.js';
import queries from './queries.js';

const getProfesseursByNbSoutenance = (req, res) => {
    const nb = parseInt(req.params.nb);
    pool.query(queries.getProfesseursByNbSoutenance, [nb], (error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        if (results.rowCount === 0) {
            return res.status(400).send({success: 0, data: "Aucun professeur trouvé"});
        }
        res.status(200).send(results.rows);
    });
}

const addProfesseur = (req, res) => {
    const {nomprofesseur} = req.body;
    pool.query(queries.getProfesseurByName, [nomprofesseur], (error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        if (results.rowCount > 0) {
            return res.status(409).send({success: 0, data: "Le professeur existe déjà"});
        }
        pool.query(queries.addProfesseur, [nomprofesseur], (error, results) => {
            if (error) {
                return res.status(400).send({success: 0, data: error});
            }
            res.status(200).send({success: 1, data: "Professeur ajouté avec succès"});
        });
    });
}

export default {
    getProfesseursByNbSoutenance,
    addProfesseur,
}