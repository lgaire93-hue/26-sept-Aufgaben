let aufgaben = [
    {
        titel: "Hausaufgaben machen",
        beschreibung: "Matheaufgaben für morgen bearbeiten",
        prioritaet: "Hoch",
        status: "Offen"
    },
    {
        titel: "Einkaufen",
        beschreibung: "Lebensmittel für die Woche kaufen",
        prioritaet: "Mittel",
        status: "Offen"
    },
    {
        titel: "Zimmer aufräumen",
        beschreibung: "Schreibtisch und Schrank aufräumen",
        prioritaet: "Niedrig",
        status: "Erledigt"
    },
    {
        titel: "Präsentation vorbereiten",
        beschreibung: "Folien für die Präsentation erstellen",
        prioritaet: "Hoch",
        status: "Offen"
    },
    {
        titel: "E-Mail schreiben",
        beschreibung: "Eine wichtige E-Mail beantworten",
        prioritaet: "Mittel",
        status: "Erledigt"
    }
];

const aufgabenListe =
    document.getElementById("aufgabenListe");

const aufgabenFormular =
    document.getElementById("aufgabenFormular");

const titelEingabe =
    document.getElementById("titel");

const beschreibungEingabe =
    document.getElementById("beschreibung");

const prioritaetEingabe =
    document.getElementById("prioritaet");

const fehlermeldung =
    document.getElementById("fehlermeldung");

const statusFilter =
    document.getElementById("statusFilter");

const prioritaetFilter =
    document.getElementById("prioritaetFilter");


const gesamtAnzahl =
    document.getElementById("gesamtAnzahl");

const offenAnzahl =
    document.getElementById("offenAnzahl");

const erledigtAnzahl =
    document.getElementById("erledigtAnzahl");


function zeigeAufgaben() {

    aufgabenListe.innerHTML = "";

    const gewaehlterStatus =
        statusFilter.value;

    const gewaehltePrioritaet =
        prioritaetFilter.value;

    for (let i = 0; i < aufgaben.length; i++) {

        const aufgabe = aufgaben[i];

        if (
            gewaehlterStatus !== "Alle" &&
            aufgabe.status !== gewaehlterStatus
        ) {
            continue;
        }

        if (
            gewaehltePrioritaet !== "Alle" &&
            aufgabe.prioritaet !== gewaehltePrioritaet
        ) {
            continue;
        }

        const aufgabenElement =
            document.createElement("div");

        aufgabenElement.classList.add("aufgabe");

        if (aufgabe.prioritaet === "Hoch") {

            aufgabenElement.classList.add(
                "prioritaet-hoch"
            );

        } else if (aufgabe.prioritaet === "Mittel") {

            aufgabenElement.classList.add(
                "prioritaet-mittel"
            );

        } else if (aufgabe.prioritaet === "Niedrig") {

            aufgabenElement.classList.add(
                "prioritaet-niedrig"
            );
        }

        if (aufgabe.status === "Erledigt") {

            aufgabenElement.classList.add(
                "erledigt"
            );
        }
        const titel =
            document.createElement("h3");

        titel.textContent =
            aufgabe.titel;


        const beschreibung =
            document.createElement("p");

        beschreibung.textContent =
            aufgabe.beschreibung;


        const prioritaet =
            document.createElement("p");

        prioritaet.textContent =
            "Priorität: " + aufgabe.prioritaet;


        const status =
            document.createElement("p");

        status.textContent =
            "Status: " + aufgabe.status;

        status.classList.add("status");

        if (aufgabe.status === "Offen") {

            status.classList.add(
                "status-offen"
            );

        } else {

            status.classList.add(
                "status-erledigt"
            );
        }


        // Elemente in die Aufgaben-Karte einfügen
        aufgabenElement.appendChild(titel);
        aufgabenElement.appendChild(beschreibung);
        aufgabenElement.appendChild(prioritaet);
        aufgabenElement.appendChild(status);

        if (aufgabe.status === "Offen") {

            const erledigtButton =
                document.createElement("button");

            erledigtButton.textContent =
                "Als erledigt markieren";


            erledigtButton.addEventListener(
                "click",
                function() {

                    aufgabe.status = "Erledigt";

                    zeigeAufgaben();
                }
            );


            aufgabenElement.appendChild(
                erledigtButton
            );
        }

        const loeschenButton = document.createElement("button");

        loeschenButton.textContent =
            "Löschen";


        loeschenButton.addEventListener(
            "click",
            function() {

                aufgaben.splice(i, 1);

                zeigeAufgaben();
            }
        );


        aufgabenElement.appendChild(
            loeschenButton
        );

        aufgabenListe.appendChild(
            aufgabenElement
        );
    }
    aktualisiereDashboard();
}

function aktualisiereDashboard() {

    let offeneAufgaben = 0;
    let erledigteAufgaben = 0;

    for (let i = 0; i < aufgaben.length; i++) {

        if (aufgaben[i].status === "Offen") {

            offeneAufgaben++;

        } else if (
            aufgaben[i].status === "Erledigt"
        ) {

            erledigteAufgaben++;
        }
    }

    gesamtAnzahl.textContent = aufgaben.length;
    offenAnzahl.textContent = offeneAufgaben;
    erledigtAnzahl.textContent = erledigteAufgaben;
}

aufgabenFormular.addEventListener(
    "submit",
    function(event) {
        event.preventDefault();
        const titel =
            titelEingabe.value.trim();

        const beschreibung =
            beschreibungEingabe.value.trim();

        const prioritaet =
            prioritaetEingabe.value;

        if (
            titel === "" ||
            beschreibung === "" ||
            prioritaet === ""
        ) {

            fehlermeldung.textContent =
                "Bitte fülle alle Felder aus.";

            return;
        }

        const neueAufgabe = {
            titel: titel,
            beschreibung: beschreibung,
            prioritaet: prioritaet,
            status: "Offen"
        };

        aufgaben.push(neueAufgabe);
        fehlermeldung.textContent = "";
        aufgabenFormular.reset();
        zeigeAufgaben();
    }
);

statusFilter.addEventListener(
    "change",
    zeigeAufgaben
);

prioritaetFilter.addEventListener(
    "change",
    zeigeAufgaben
);

zeigeAufgaben();
