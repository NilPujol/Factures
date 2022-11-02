import { Article, tipus } from "./articles.js";
import { factura } from "./factures.js";
export { mostrarArticle };
window.onload = function () {
    let factura = generarFactura();
    emplenarValors(factura);
    assignarTriggers(factura);
}
function emplenarValors(factura) {

    let desplegable = document.getElementById("articles");
    tipus.forEach(element => {
        var opt = document.createElement("option");
        opt.value = element;
        opt.innerHTML = element;
        desplegable.appendChild(opt);
    });
    document.getElementsByTagName("p")[0].innerHTML += factura.codi;
}
function assignarTriggers(factura) {
    document.getElementsByTagName("button")[0].onclick = function () { factura.afegirArticle(new Article(document.getElementById("articles").value)); };
    document.getElementsByTagName("button")[1].onclick = function () { factura.carregarByCodi(document.getElementById("numFactura").value) }

}
function generarFactura() {
    localStorage.setItem("cantitatFactures", localStorage.getItem("cantitatFactures") == null ? 0 : localStorage.getItem("cantitatFactures"));
    return new factura(parseInt(localStorage.getItem("cantitatFactures")) + 1);
}
function mostrarArticle(article, factura) {
    let linea = document.getElementById('taula').insertRow(-1);
    linea.innerHTML = '<td>' + article.codi + '</td>' + '<td>' + article.nom + '</td>' + '<td><input type="text" value="' + article.quantitat + '"></td>' + '<td>' + article.preu + '</td>' + '<td>' + article.total + '</td>';
    linea.onchange = function () { recalcular(article, factura, linea) };
}
function recalcular(article, factura, linea) {
    var index = factura.articles.indexOf(article);
    factura.articles[index].quantitat = parseInt(linea.children[2].children[0].value);
    factura.articles[index].total = article.quantitat * article.preu;
    if (factura.articles[index].quantitat <= 0) {
        factura.articles.splice(index, 1);
    }
    document.getElementById("taula").innerHTML = "<tr><th>Codi</th><th>Nom</th><th>Quantitat</th><th>Preu</th><th>Total</th></tr>";
    var total = 0;
    factura.articles.forEach(article => {
        mostrarArticle(article, factura);
        total = total + article.total;
    });
    factura.total = total;
    var preusFinals = '<p>Base Imposable: ' + factura.total + '</p><p>IVA: ' + (factura.total * 0.21).toFixed(2) + '</p><p>Import: ' + (factura.total * 1.21).toFixed(2) + '</p>';
    document.getElementsByTagName("div")[0].innerHTML = preusFinals;

    factura.guardarFactura()

}