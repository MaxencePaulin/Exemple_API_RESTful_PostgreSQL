const getProfesseurByName = "SELECT * FROM professeur WHERE nomprofesseur = $1";
const getProfesseursByNbSoutenance = "select p.noprofesseur, p.nomprofesseur, count(*) as nbSoutenances " +
    "from soutient sou " +
    "inner join secompose sec on sec.idJury = sou.idJury " +
    "inner join professeur p on p.noprofesseur = sec.noprofesseur " +
    "group by p.noprofesseur, p.nomprofesseur having count(*) > $1";

const addProfesseur = "INSERT INTO professeur (nomprofesseur) VALUES ($1)";

export default {
    getProfesseurByName,
    getProfesseursByNbSoutenance,
    addProfesseur,
}