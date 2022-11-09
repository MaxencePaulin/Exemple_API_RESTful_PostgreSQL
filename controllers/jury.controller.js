import juryService from '../services/jury.service.js';

export const addJury = (req, res) => {
    const body = req.body;
    juryService.add(body, (error, results) => {
        if (error) {
            return res.status(400)
               .send({success:0,data:error});
        }
        return res.status(200).send(results);
    });
}