import pool from '../../db.js';
import queries from './queries.js';

const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) {
            return res.status(500).send({succes: 0, data: error});
        }
        if (results.rowCount === 0) {
            return res.status(400).send({succes: 0, data: "Aucun étudiant trouvé"});
        }
        res.status(200).send({succes: 1, data: results.rows});
    });
}

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        if (results.rowCount === 0) {
            return res.status(400).send({success: 0, data: "Etudiant inexistant avec cet identifiant"});
        }
        res.status(200).send(results.rows);
    });
}

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const {name, email, age, dob} = req.body;
    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        if (results.rowCount === 0) {
            return res.status(400).send({success: 0, data: "Etudiant inexistant avec cet identifiant"});
        }
        pool.query(queries.getStudentByEmail, [email], (error, results) => {
            if (error) {
                return res.status(400).send({success: 0, data: error});
            }
            if (results.rowCount > 0) {
                return res.status(409).send({success: 0, data: "L'adresse email existe déjà"});
            }
            pool.query(queries.updateStudent, [name, email, age, dob, id], (error, results) => {
                if (error) {
                    return res.status(400).send({success: 0, data: error});
                }
                res.status(200).send({success: 1, data: "Etudiant modifié avec succès"});
            });
        });
    });
}

const addStudent = (req, res) => {
    const {name, email, age, dob} = req.body;
    pool.query(queries.getStudentByEmail, [email], (error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        if (results.rowCount > 0) {
            return res.status(409).send({success: 0, data: "L'adresse email existe déjà"});
        }
        pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
            if (error) {
                return res.status(400).send({success: 0, data: error});
            }
            res.status(201).send({success: 1, data: "Etudiant ajouté avec succès"});
        });
    });
}

const deleteStudent = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) {
            return res.status(400).send({success: 0, data: error});
        }
        if (results.rowCount === 0) {
            return res.status(400).send({success: 0, data: "Etudiant inexistant avec cet identifiant"});
        }
        pool.query(queries.deleteStudent, [id], (error, results) => {
            if (error) {
                return res.status(400).send({success: 0, data: error});
            }
            res.status(200).send({success: 1, data: "Etudiant supprimé avec succès"});
        });
    });
}

export default {
    getStudents,
    getStudentById,
    updateStudent,
    addStudent,
    deleteStudent
}
