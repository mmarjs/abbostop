import React, { useEffect } from "react";
import Link from "next/link";

const Mijn = () => {
  useEffect(() => {
    document.title = "Mijn Abbo Stop | Eenvoudig Abonnementen Beheren & Opzeggen";
  }, []);
  
  return (
    <section className="">
      <div className="container mijn">
        <div className="row">
          <div className="col-md-12">
            <h1>Wil je lid worden van Mijn Abbo Stop?</h1>
            <p>
              Neem het heft in eigen handen met Mijn Abbo Stop! Nooit meer
              onnodige kosten, geen gedoe meer met het opzeggen van
              abonnementen. Mijn Abbo Stop stelt je in staat om abonnementen
              moeiteloos en zonder extra kosten op te zeggen, je abonnementen
              inzichtelijk te krijgen, en je maandelijkse uitgaven drastisch te
              verlagen. Zeg vaarwel tegen onnodige uitgaven en verwelkom de
              vrijheid om je abonnementen naar wens te beheren. Sluit je aan bij
              Mijn Abbo Stop en begin vandaag nog met het besparen van honderden
              euro's per jaar!{" "}
            </p>
          </div>
        </div>
        <div className="leftright-section">
          <div className="sec">
            <h2>Met Mijn Abbo Stop krijg je: </h2>
            <ul>
              <li>
                <i className="fa-solid fa-check"></i>
                <p>
                  De mogelijkheid om gemakkelijk abonnementen op te zeggen
                  zonder extra kosten
                </p>
              </li>
              <li>
                <i className="fa-solid fa-check"></i>
                <p>24/7 toegang tot al je abonnementsinformatie</p>
              </li>
              <li>
                <i className="fa-solid fa-check"></i>
                <p>
                  Automatische meldingen wanneer opzegtermijnen naderen
                </p>{" "}
              </li>
              <li>
                <i className="fa-solid fa-check"></i>
                <p>Kansen om te besparen op je maandelijkse uitgaven</p>{" "}
              </li>
              <li>
                <i className="fa-solid fa-check"></i>
                <p>
                  Proactieve suggesties om te besparen op vergelijkbare diensten
                </p>
              </li>
              <li>
                <i className="fa-solid fa-check"></i>
                <p>Geen verborgen kosten </p>
              </li>
            </ul>
          </div>
          <div className="sec right-sec">
            <h2>Zonder Mijn Abbo Stop krijg je te maken met:</h2>
            <ul>
              <li>
                <i className="fa-solid fa-xmark"></i>
                <p>Een tarief van 29,95 euro per opzegging</p>
              </li>
              <li>
                <i className="fa-solid fa-xmark"></i>
                <p>
                  Het tijdrovende proces om elk abonnement afzonderlijk op te
                  zeggen
                </p>
              </li>
              <li>
                <i className="fa-solid fa-xmark"></i>
                <p>
                  Geen overzicht van al je lopende abonnementen op één plaats
                </p>
              </li>
              <li>
                <i className="fa-solid fa-xmark"></i>
                <p>
                  Het risico om opzegtermijnen te missen en onnodige kosten te
                  maken
                </p>
              </li>
              <li>
                <i className="fa-solid fa-xmark"></i>
                <p>
                  De frustratie en het ongemak van het handmatig opzeggen van
                  diensten
                </p>
              </li>
              <li>
                <i className="fa-solid fa-xmark"></i>
                <p>
                  Mogelijke verborgen kosten bij het opzeggen van sommige
                  diensten
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="row button-sec">
          <div className="col-md-12">
            <Link className="but-cont" href="/contact">
              Word Lid
            </Link>
          </div>
          <div className="col-md-12 text-center my-3">
            <p>
              Door je te registreren voor Mijn Abbo Stop, neem je een
              aanzienlijke stap in de richting van effectief beheer en controle
              van je abonnementen. Door akkoord te gaan met onze{" "}
              <Link href="/algemene-voorwaarden">algemene voorwaarden</Link>,
              krijg je toegang tot een efficiënte abonnementsbeheerdienst
              tijdens een proefperiode van 7 dagen, zonder kosten. Na deze
              proefperiode en bij tevredenheid over onze dienstverlening,
              machtig je ons om een maandelijkse bijdrage van € 4,95 via
              SEPA-incasso af te schrijven. Flexibiliteit is een kernelement van
              onze dienstverlening, daarom bieden we je altijd de mogelijkheid
              om je Mijn Abbo Stop-account op te zeggen. Dit kan gemakkelijk via
              ons platform of door een e-mail te sturen naar
              support@abbostop.nl. Bij Mijn Abbo Stop behoud je altijd de
              controle.{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mijn;
