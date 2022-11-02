export { Article, tipus };

let tipus = ["Patata", "Brocoli", "Salmó", "Hamburguesa"]
class Article {
    constructor(tipus, quantitat = 1) {
        this.codi;
        this.nom;
        this.quantitat = quantitat;
        this.preu;
        this.total;
        setTipus(tipus, this)
    }
}
function setTipus(tipus, article) {

    switch (tipus) {
        case "Patata":
            article.codi = "082"
            article.nom = "Patata";
            article.preu = 0.50;
            article.total = article.preu * article.quantitat;
            break;

        case "Brocoli":
            article.codi = "536"
            article.nom = "Brocoli";
            article.preu = 1.00;
            article.total = article.preu * article.quantitat;
            break;

        case "Salmó":
            article.codi = "342"
            article.nom = "Salmó";
            article.preu = 1.50;
            article.total = article.preu * article.quantitat;
            break;

        case "Hamburguesa":
            article.codi = "131"
            article.nom = "Hamburguesa";
            article.preu = 2.50;
            article.total = article.preu * article.quantitat;
            break;

        default:
            break;
    }
}