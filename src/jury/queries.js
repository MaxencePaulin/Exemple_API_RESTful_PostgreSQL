const getJuryById = "SELECT * FROM jury WHERE idjury = $1";
const getJuryByName = "SELECT * FROM jury WHERE nomjury = $1";

const addJury = "INSERT INTO jury (nomjury, idsalle) VALUES ($1, $2)";

export default {
    getJuryById,
    getJuryByName,
    addJury,
}
