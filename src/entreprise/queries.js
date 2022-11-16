const getEntreprises = "SELECT * FROM entreprise";
const getEntrepriseById = "SELECT * FROM entreprise WHERE identreprise = $1";
const getEntrepriseByName = "SELECT * FROM entreprise WHERE nomentreprise = $1";

const addEntreprise = "INSERT INTO entreprise (nomentreprise) VALUES ($1)";

const deleteEntreprise = "DELETE FROM entreprise WHERE identreprise = $1";

export default {
    getEntreprises,
    getEntrepriseById,
    getEntrepriseByName,
    addEntreprise,
    deleteEntreprise,
}