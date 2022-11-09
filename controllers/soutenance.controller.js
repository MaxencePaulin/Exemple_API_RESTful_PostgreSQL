import soutenanceService from '../services/soutenance.service.js';

export const addSoutenance = (req, res) => {
    const body = req.body;
    soutenanceService.add(body, (error, results) => {
        if (error) {
            return res.status(400)
               .send({success:0,data:error});
        }
        return res.status(200).send(results);
    });
}