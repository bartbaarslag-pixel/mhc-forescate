let voorraad = JSON.parse(localStorage.getItem("voorraad")) || {
    shirt: { "6-8 jaar":5,"8-10 jaar":5,"10-12 jaar":5,"12-14 jaar":5, XXS:5, XS:5,S:5,M:5,L:5,XL:5,XXL:5 },
    broek: { "6-8 jaar":5,"8-10 jaar":5,"10-12 jaar":5,"12-14 jaar":5, XXS:5, XS:5,S:5,M:5,L:5,XL:5,XXL:5 },
    jack:  { "6-8 jaar":5,"8-10 jaar":5,"10-12 jaar":5,"12-14 jaar":5, XXS:5, XS:5,S:5,M:5,L:5,XL:5,XXL:5 },
    sokken:{ "28-32":10,"33-36":10,"36-40":10,"40-44":10,"45-47":10 }
};

function saveVoorraad() {
    localStorage.setItem("voorraad", JSON.stringify(voorraad));
}

function toonVoorraad() {
    let html = "<table><tr><th>Maat</th><th>Shirt</th><th>Broek/Rok</th><th>Jack</th><th>Sokken</th></tr>";

    const alleMaten = new Set([
        ...Object.keys(voorraad.shirt),
        ...Object.keys(voorraad.broek),
        ...Object.keys(voorraad.jack),
        ...Object.keys(voorraad.sokken)
    ]);

    alleMaten.forEach(m => {
        html += `
            <tr>
                <td>${m}</td>
                <td>${voorraad.shirt[m] ?? ""}</td>
                <td>${voorraad.broek[m] ?? ""}</td>
                <td>${voorraad.jack[m] ?? ""}</td>
                <td>${voorraad.sokken[m] ?? ""}</td>
            </tr>`;
    });

    html += "</table>";
    document.getElementById("voorraad-table").innerHTML = html;
}

function verlaagVoorraad(type, maat) {
    if (voorraad[type][maat] > 0) {
        voorraad[type][maat]--;
        saveVoorraad();
        toonVoorraad();
    } else {
        alert(`Let op: voorraad van ${type} maat ${maat} is op!`);
    }
}

document.addEventListener("DOMContentLoaded", toonVoorraad);
