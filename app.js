const maten = ["6-8 jaar","8-10 jaar","10-12 jaar","12-14 jaar","XXS","XS","S","M","L","XL","XXL"];

["maat_shirt","maat_broek","maat_jack"].forEach(id=>{
    const sel = document.getElementById(id);
    maten.forEach(m=>{
        let o = document.createElement("option");
        o.value = o.textContent = m;
        sel.appendChild(o);
    });
});

let registraties = JSON.parse(localStorage.getItem("registraties") || "[]");

function saveRegistraties() {
    localStorage.setItem("registraties", JSON.stringify(registraties));
}

function updateTeamFilter() {
    const teams = [...new Set(registraties.map(r=>r.team))];
    const tf = document.getElementById("teamFilter");
    tf.innerHTML = '<option value="">Alle teams</option>';
    teams.forEach(t=>{
        tf.innerHTML += `<option value="${t}">${t}</option>`;
    });
}

function updateTable() {
    const filterTeam = document.getElementById("teamFilter").value;
    const tbody = document.querySelector("#registratieTable tbody");
    tbody.innerHTML = "";

    registraties
        .filter(r => filterTeam === "" || r.team === filterTeam)
        .forEach((r, i)=>{
            tbody.innerHTML += `
                <tr>
                    <td>${r.naam}</td>
                    <td>${r.team}</td>
                    <td>${r.shirt}</td>
                    <td>${r.broek}</td>
                    <td>${r.jack}</td>
                    <td>${r.sokken}</td>
                    <td><button onclick="verwijderReg(${i})">X</button></td>
                </tr>`;
        });

    updateTeamFilter();
}

document.getElementById("kledingForm").addEventListener("submit", e=>{
    e.preventDefault();

    const r = {
        naam: naam.value,
        team: team.value,
        shirt: maat_shirt.value,
        broek: maat_broek.value,
        jack: maat_jack.value,
        sokken: maat_sokken.value
    };

    registraties.push(r);
    saveRegistraties();

    verlaagVoorraad("shirt", r.shirt);
    verlaagVoorraad("broek", r.broek);
    verlaagVoorraad("jack", r.jack);
    verlaagVoorraad("sokken", r.sokken);

    e.target.reset();
    updateTable();
});

function verwijderReg(i) {
    registraties.splice(i,1);
    saveRegistraties();
    updateTable();
}

function exportCSV() {
    let csv = "Naam,Team,Shirt,Broek,Rok,Jack,Sokken\n";
    registraties.forEach(r=>{
        csv += `${r.naam},${r.team},${r.shirt},${r.broek},${r.rok},${r.jack},${r.sokken}\n`;
    });
    const blob = new Blob([csv], {type:"text/csv"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "kledingregistratie.csv";
    a.click();
}

document.addEventListener("DOMContentLoaded", updateTable);
