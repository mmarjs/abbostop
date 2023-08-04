import React from "react";

const Accordian = () => {
  return (
    <>
      <section id="" className="bg-light mb-0 accordian-box">
        <p className="sub-headingtext text-center mb-4 ">
          Veelgestelde <span className="text-skyblue">vragen</span>
        </p>
        <p className="text-center mt-4 normal-text">
          Hier staan de vragen die het vaakst gesteld worden. Wellicht staat uw
          vraag hier al in?
        </p>

        <div>
          <div className="accordion mt-5" id="myAccordion">
            <div className="accordion-item bg-light">
              <h2 className="accordion-header" id="headingOne">
                <button
                  type="button"
                  className="bg-light text-secondary fw-bold accordion-button collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                >
                  Kan ik een abonnement opzeggen dat nog niet is in gegaan?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse"
                data-bs-parent="#myAccordion"
              >
                <div className="card-body">
                  <p>
                    Het hangt af van de specifieke voorwaarden van het
                    abonnement. In sommige gevallen is het mogelijk om een
                    abonnement op te zeggen voordat het ingaat, maar dit hangt
                    af van het beleid van het bedrijf of de serviceprovider.
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item bg-light">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  type="button"
                  className="bg-light text-secondary fw-bold accordion-button collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                >
                  Welke voorwaarden gelden er bij het opzeggen van een
                  abonnement?
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#myAccordion"
              >
                <div className="card-body">
                  <p>
                    De voorwaarden voor het opzeggen van een abonnement kunnen
                    variëren. Deze kunnen afhankelijk zijn van de looptijd van
                    het contract, de serviceprovider en de specifieke regels
                    rond opzeggingen. Het is belangrijk om deze voorwaarden te
                    controleren voordat je een abonnement opzegt.
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  type="button"
                  className="accordion-button text-secondary fw-bold bg-light collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                >
                  Hoe weet de organisatie dat de opzegbrief van mij is?
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse bg-light"
                data-bs-parent="#myAccordion"
              >
                <div className="card-body">
                  <p>
                    In de meeste gevallen moet de opzegbrief persoonlijke
                    informatie bevatten zoals uw volledige naam, adres, en
                    eventueel uw klantnummer of accountnummer. Dit helpt de
                    organisatie om te verifiëren dat de opzegbrief van u
                    afkomstig is.
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFour">
                <button
                  type="button"
                  className="accordion-button text-secondary fw-bold bg-light collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                >
                  Wat betekent een maand opzegtermijn voor een abonnement?
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse bg-light"
                data-bs-parent="#myAccordion"
              >
                <div className="card-body">
                  <p>
                    Een maand opzegtermijn voor een abonnement betekent dat u
                    verplicht bent om minstens een maand voor de gewenste
                    einddatum uw wens om het abonnement op te zeggen aan de
                    dienstverlener te communiceren. Als u bijvoorbeeld op 15
                    maart besluit dat u uw abonnement wilt opzeggen, dan zal het
                    abonnement daadwerkelijk eindigen op 15 april, mits u dit op
                    of vóór 15 maart heeft aangegeven. Dit geeft zowel u als de
                    dienstverlener de tijd om de nodige regelingen te treffen
                    voor de beëindiging van de dienst. De specifieke voorwaarden
                    en regels kunnen echter per dienstverlener verschillen, dus
                    het is altijd raadzaam om het opzegbeleid en de voorwaarden
                    te controleren.
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFive">
                <button
                  type="button"
                  className="accordion-button text-secondary fw-bold bg-light collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                >
                  Waarom is er een maand opzegtermijn voor het opzeggen van een
                  abonnement of contract?
                </button>
              </h2>
              <div
                id="collapseFive"
                className="accordion-collapse collapse bg-light"
                data-bs-parent="#myAccordion"
              >
                <div className="card-body">
                  <p>
                    Een maand opzegtermijn voor het beëindigen van een
                    abonnement of contract biedt zowel aan de dienstverlener als
                    aan de klant tijd om de nodige regelingen te treffen voor de
                    beëindiging. Dit kan om verschillende redenen nuttig zijn:
                  </p>
                  <p>
                    Voor de dienstverlener: Het geeft hen tijd om
                    administratieve wijzigingen door te voeren, eventuele
                    eindfacturen op te stellen, en hun bedrijfsplanning aan te
                    passen. Ook kunnen ze proberen om de klant te behouden door
                    bijvoorbeeld alternatieve diensten of kortingen aan te
                    bieden.
                  </p>
                  <p>
                    Voor de klant: Het geeft hen tijd om alternatieve diensten
                    te zoeken indien nodig, en om ervoor te zorgen dat er geen
                    onderbreking van de dienstverlening is. Ook stelt het hen in
                    staat om eventuele uitstaande betalingen te regelen en hun
                    financiële planning aan te passen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Accordian;
