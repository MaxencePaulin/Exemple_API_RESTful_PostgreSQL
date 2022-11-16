import pool from '../../db.js';
import queries from './queries.js';
import queriesEtudiant from '../etudiant/queries.js'

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

const addEntreprise = (req, res) => {
    const {nomentreprise} = req.body;
    if (!nomentreprise || nomentreprise === "") {
        return res.status(400).send({success: 0, data: "Veulliez insérer un nom d'entreprise"});
    }
    pool.query(queries.getEntrepriseByName, [nomentreprise], (error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        if (results.rowCount > 0) {
            return res.status(409).send({success: 0, data: "L'entreprise existe déjà"});
        }
        pool.query(queries.addEntreprise, [nomentreprise], (error, results) => {
            if (error) {
                return res.status(400).send({success: 0, data: error});
            }
            res.status(200).send({success: 1, data: "Entreprise ajoutée avec succès"});
        });
    });
}

const deleteEntreprise = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getEntrepriseById, [id], (error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        if (results.rowCount === 0) {
            return res.status(400).send({success: 0, data: "Aucune entreprise trouvé"});
        }
        pool.query(queriesEtudiant.getEntrepriseEtudiant, [id], (error, results) => {
            if (error) {
                return res.status(400).send({success: 0, data: error});
            }
            if (results.rowCount > 0) {
                return res.status(409).send({success: 0, data: "Impossible de supprimer l'entreprise, elle est liée à un ou des étudiants"});
            }
            pool.query(queries.deleteEntreprise, [id], (error, results) => {
                if (error) {
                    return res.status(400).send({success: 0, data: error});
                }
                res.status(200).send({success: 1, data: "Entreprise supprimé avec succès"});
            });
        });
    });
}

export default {
    getEntreprises,
    addEntreprise,
    deleteEntreprise,
}