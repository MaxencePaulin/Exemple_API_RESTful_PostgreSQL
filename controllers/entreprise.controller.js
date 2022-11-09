import entrepriseService from '../services/entreprise.service.js';

export const listEntreprise = (req, res) => {
    entrepriseService.list((error, results) => {
        if (error) {
            return res.status(400)
               .send({success:0,data:error});
        }
        return res.status(200).send(results);
    });
}

export const addEntreprise = (req, res) => {
    const body = req.body;
    entrepriseService.add(body, (error, results) => {
        if (error) {
            return res.status(400)
               .send({success:0,data:error});
        }
        return res.status(200).send(results);
    });
}