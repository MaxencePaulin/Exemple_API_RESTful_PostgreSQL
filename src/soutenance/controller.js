import pool from '../../db.js';
import queries from './queries.js';
import queriesEtudiant from '../etudiant/queries.js';
import queriesJury from '../jury/queries.js';

const addSoutenance = (req, res) => {
    let {noetudiant, idjury, datesout, note} = req.body;
    if (!note || parseFloat(note) < 0 || parseFloat(note) > 20) {
        return res.status(400).send({success: 0, data: "Veulliez insérer une note comprise entre 0 et 20"});
    }
    note = parseFloat(note);
    // if (!datesout) {
    //     datesout = new Date().toLocaleDateString("fr");
    // }
    if (!datesout || datesout === "") {
        return res.status(400).send({success: 0, data: "Veulliez insérer une date de soutenance"});
    }
    if (!noetudiant || noetudiant === "") {
        return res.status(400).send({success: 0, data: "Veulliez insérer un numéro d'étudiant"});
    }
    pool.query(queriesEtudiant.getEtudiantByNoetudiant, [noetudiant], (error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        if (results.rowCount === 0) {
            return res.status(400).send({success: 0, data: "L'étudiant n'existe pas"});
        }
        if (!idjury || idjury === "") {
            return res.status(400).send({success: 0, data: "Veulliez insérer un identifiant de jury"});
        }
        pool.query(queriesJury.getJuryById, [idjury], (error, results) => {
            if (error) {
                return res.status(400).send({success: 0, data: error});
            }
            if (results.rowCount === 0) {
                return res.status(400).send({success: 0, data: "Le jury n'existe pas"});
            }
            pool.query(queries.addSoutenance, [noetudiant, idjury, datesout, note], (error, results) => {
                if (error) {
                    return res.status(400).send({success: 0, data: error});
                }
                res.status(200).send({success: 1, data: "Soutenance ajoutée avec succès"});
            });
        });
    });
}

export default {
    addSoutenance,
}