export { factura };
import { Article } from "./articles.js";
//import { Articles } from "./articles.js";
import { mostrarArticle } from "./main.js";
class factura {
    constructor(codi) {
        if (codi >= localStorage.getItem("cantitatFactures")) {
            this.codi = new Date().getFullYear().toString() + "/" + codi;
            this.articles = [];
            this.total = 0;
        } else {

        }
    }
    afegirArticle(article) {
        if (document.getElementById("taula").innerHTML.includes(article.nom)) {
            alert("Ja existeix");
            return;
        }
        this.articles.push(article);

        var total = 0;
        this.articles.forEach(article => {
            total = total + article.total;
        });
        this.total = total;
        var preusFinals = '<p>Base Imposable: ' + this.total + '</p><p>IVA: ' + (this.total * 0.21).toFixed(2) + '</p><p>Import: ' + (this.total * 1.21).toFixed(2) + '</p>';
        document.getElementsByTagName("div")[0].innerHTML = preusFinals;

        mostrarArticle(article, this);
        this.guardarFactura()
    }
    guardarFactura() {
        var codi = this.codi.split("/")[1];
        localStorage.setItem(this.codi, JSON.stringify(this));
        if (codi > localStorage.getItem("cantitatFactures")) {
            localStorage.setItem("cantitatFactures", parseInt(localStorage.getItem("cantitatFactures")) + 1);
        }
    }
    carregarByCodi(codi) {
        var factura = JSON.parse(localStorage.getItem(codi));
        if (factura == null) {
            alert("La factura no existeix");
            return;
        }
        //change and show new code
        this.codi = factura['codi'];
        document.getElementsByTagName("p")[0].innerHTML = "Num factura: " + this.codi;
        //delete old articles
        this.articles = [];
        document.getElementById("taula").innerHTML = "<tr><th>Codi</th><th>Nom</th><th>Quantitat</th><th>Preu</th><th>Total</th></tr>";
        //load new articles
        factura['articles'].forEach(article => {
            this.articles.push(new Article(article['nom'], article['quantitat']))
        });
        this.articles.forEach(article => {
            mostrarArticle(article, this);
        });
        //load total
        this.total = factura['total'];
        //show total
        var preusFinals = '<p>Base Imposable: ' + this.total + '</p><p>IVA: ' + (this.total * 0.21).toFixed(2) + '</p><p>Import: ' + (this.total * 1.21).toFixed(2) + '</p>';
        document.getElementsByTagName("div")[0].innerHTML = preusFinals;
    }
}