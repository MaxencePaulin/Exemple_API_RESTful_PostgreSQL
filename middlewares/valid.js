import etudiantService from '../services/etudiant.service.js';
import juryService from '../services/jury.service.js';
import salleService from "../services/salle.service.js";
import entrepriseService from '../services/entreprise.service.js';

const validNameEntreprise = (req, res, next) => {
    const body = req.body;
    if (!body.nomentreprise) {
        return res.status(400).send(
                {
                    success:0,
                    data:"Le nom de l'entreprise est obligatoire"
                });
    }
    next();
}

const validNameProfesseur = (req, res, next) => {
    const body = req.body;
    if (!body.nomprofesseur) {
        return res.status(400).send(
                {
                    success:0,
                    data:"Le nom du professeur est obligatoire"
                });
    }
    next();
}

const validIdSalle = (req, res, next) => {
    const body = req.body;
    if (!body.idsalle) {
        return res.status(400).send(
                {
                    success:0,
                    data:"L'identifiant de la salle est obligatoire"
                });
    }
    next();
}

const validNameJury = (req, res, next) => {
    const body = req.body;
    if (!body.nomjury) {
        return res.status(400).send(
                {
                    success:0,
                    data:"Le nom du jury est obligatoire"
                });
    }
    next();
}

const verifExistIdSalle = (req, res, next) => {
    const body = req.body;
    if (!body.idsalle) {
        return res.status(400).send(
                {
                    success:0,
                    data:"L'identifiant de la salle est obligatoire"
                });
    }
    salleService.find(body, (error, results) => {
        if (error) {
            return res.status(400)
                .send({success:0,data:error});
        }
        next();
    });
}

const verifExistEtudiant = (req, res, next) => {
    const body = req.body;
    if (!body.noetudiant) {
        return res.status(400).send(
            {
                success:0,
                data:"Le numéro de l'étudiant est obligatoire"
            });
    }
    etudiantService.find(body, (error, results) => {
        if (error) {
            return res.status(400)
                .send({success:0,data:error});
        }
        next();
    });
}

const verifExistJury = (req, res, next) => {
    const body = req.body;
    if (!body.idjury) {
        return res.status(400).send(
            {
                success:0,
                data:"L'identifiant du jury est obligatoire"
            });
    }
    juryService.find(body, (error, results) => {
        if (error) {
            return res.status(400)
                .send({success:0,data:error});
        }
        next();
    });
}

const validNote = (req, res, next) => {
    const body = req.body;
    if (!body.note) {
        return res.status(400).send(
            {
                success:0,
                data:"La note est obligatoire"
            });
    }
    if (body.note < 0 || body.note > 20) {
        return res.status(400).send(
            {
                success:0,
                data:"La note doit être comprise entre 0 et 20"
            });
    }
    next();
}

const validIdEntreprise = (req, res, next) => {
    const params = req.params;
    if (!params.id) {
        return res.status(400).send(
                {
                    success:0,
                    data:"L'identifiant de l'entreprise est obligatoire"
                });
    }
    entrepriseService.find(params, (error, results) => {
        if (error) {
            return res.status(400)
                .send({success:0,data:error});
        }
        next();
    });
}

const EntrepriseNonLiee = (req, res, next) => {
    const params = req.params;
    entrepriseService.unlinked(params, (error, results) => {
        if (error) {
            return res.status(400)
                .send({success:0,data:error});
        }
        next();
    });
}

export default {
    validNameEntreprise,
    validNameProfesseur,
    validIdSalle,
    validNameJury,
    verifExistIdSalle,
    verifExistEtudiant,
    verifExistJury,
    validNote,
    validIdEntreprise,
    EntrepriseNonLiee
}