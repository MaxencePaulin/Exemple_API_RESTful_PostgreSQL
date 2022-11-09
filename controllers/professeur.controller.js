import professeurService from '../services/professeur.service.js';

export const moreOrEquals5Sout = (req, res) => {
    professeurService.more5OrEquals((error, results) => {
        if (error) {
            return res.status(400)
               .send({success:0,data:error});
        }
        return res.status(200).send(results);
    });
}

export const addProfesseur = (req, res) => {
    const body = req.body;
    professeurService.add(body, (error, results) => {
        if (error) {
            return res.status(400)
               .send({success:0,data:error});
        }
        return res.status(200).send(results);
    });
}