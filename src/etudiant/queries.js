const getEtudiantByNoetudiant = "SELECT * FROM etudiant WHERE noetudiant = $1";
const getEntrepriseEtudiant = "SELECT * FROM etudiant WHERE identreprise = $1";

export default {
    getEtudiantByNoetudiant,
    getEntrepriseEtudiant,
}