import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import Link from "next/link";

const Categories = () => {
  const [allCategories, setAllCategories] = useState([]);
  let categoriesUrl = `${API_URL}/category`;

  const fetchAllCategories = () => {
    axios
      .get(categoriesUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setAllCategories(res.data.result);
      })
      .catch((error) => {
        console.log("Error :" + error);
      });
  };
  useEffect(() => {
    fetchAllCategories();
    document.title =
      "Ontdek Alle Categorieën & Zeg Abonnementen Op | Abbo Stop";
  }, []);
  return (
    <main id="main">
    <div className="bgForPage cate">
        <section className="breadcrumbs category">
        <div className="container">
            <div className="row">
            <div className="col-md-6 breadcrumb-section">
                <ol>
                <li>
                    <Link href="/">Opzeggen</Link>
                </li>
                <li className="active">
                    <a>Categorieën</a>
                </li>
                </ol>
            </div>
            </div>
        </div>
        </section>
        <section className="categorieen" id="">
        <div className="container">
            <div className="row">
            <h1>Categorieën</h1>
            <p className="sub-heading">
                Kies de categorie van jouw opzegging
            </p>

            <div className="category-section my-4">
                {allCategories?.map((item) => {
                const {
                    _id: id,
                    categoryLogo: img,
                    categoryName: name,
                    route: route,
                } = item;

                return (
                    <Link
                        href={{
                            pathname: `/categorieen/${route}`,
                            query: {
                                id: id,
                            }
                        }}
                        as={`/categorieen/${route}`}
                        key={id}
                        // state={{
                        //     id: id,
                        // }}
                        onClick={() => {
                            window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                            });
                        }}
                        className="single-card"
                    >
                    <div dangerouslySetInnerHTML={{ __html: img }}></div>

                    <p className="single-cart-text text-break">
                        {name === "Consumentenorganisaties"
                        ? "Consumenten organisaties"
                        : name === "Streamingdiensten"
                        ? "Streaming diensten"
                        : name === "Water bedrijven"
                        ? "Waterbedrijven"
                        : name === "Televisie, Internet & Telefoon"
                        ? "TV, Internet & Telefoon"
                        : name === "Kranten en tijdschriften"
                        ? "Kranten & Tijdschriften"
                        : name}
                    </p>
                    </Link>
                );
                })}
            </div>
            </div>
        </div>
        </section>
        <section className="catogory-content">
        <div className="container">
            <div className="row">
            <h2>Categorieën</h2>
            <p>
                Op abbostop.nl vind je van honderden bedrijven, organisaties
                en diensten een eenvoudig te gebruiken opzegbrief. Nadat je
                jouw gegevens invoert - dit duurt slechts enkele seconden –
                kies je de manier van verzending en betaal je via een incasso
                van je bankrekening. Vervolgens versturen wij je opzegbrief en
                hoef je je geen zorgen meer te maken over onnodige kosten die
                met regelmaat automatisch van je bankrekening worden
                afgeschreven. Wij hebben de specifieke opzegbrieven opgedeeld
                in verschillende categorieën, dit maakt het zoeken extra
                makkelijk. Hieronder beschrijven wij een aantal populaire
                categorieën.
            </p>
            </div>
            <div className="row">
            <h2>Dating</h2>
            <p>
                Online daten is hét succes van de 21e eeuw. Omdat iedereen het
                constant zo druk heeft en altijd onderweg is, is het vinden
                van een levenspartner niet meer zo eenvoudig als vroeger. Of
                misschien zijn we gewoon veeleisender met zijn allen? Feit
                blijft dat als je eenmaal je partner gevonden hebt en gelukkig
                bent samen, je geen lidmaatschap meer nodig hebt bij Lexa of
                Relatieplanet. Ook al zijn deze sites nog zo’n behulpzame tool
                voor het vinden van een geschikte partner, na verloop van tijd
                is het nut ervan wel bewezen. Het is niet nodig om je te
                verdiepen in de algemene voorwaarden van deze datingsites, je
                zegt ze heel snel en eenvoudig op middels een opzegbrief van
                abbostop.nl.
            </p>
            </div>
            <div className="row">
            <h2>Mobiele telefonie</h2>
            <p>
                Iedereen heeft een mobiele telefoon. Met de vele concurrentie
                tussen de aanbieders van abonnementen en prepaid diensten zijn
                er constant mooie aanbiedingen te vinden. Als jouw abonnement
                dit toelaat is het dus de moeite waard om goed rond te kijken
                en te wisselen van aanbieder. In sommige gevallen is het dan
                wel nodig dat je eerst je huidige mobiele telefoonabonnement
                stopzet. abbostop.nl heeft de opzegbrieven klaar voor meer dan
                20 mobiele telefoonaanbieders, dus de kans is groot dat ook
                jouw huidige provider daarbij zit. Voorkom dat je teveel
                betaalt voor je mobiele telefoonrekening en zeg je abonnement
                tijdig stop via onze eenvoudige dienstverlening.
            </p>
            </div>
            <div className="row">
            <h2>Sport en Fitness</h2>
            <p>
                Een sportschoolabonnement is razendsnel afgesloten maar vaak
                niet zo eenvoudig stopgezet. Om welke reden dan ook dat je
                klaar bent met sporten in je sportschool, of geen lid meer
                wilt zijn van een bepaalde landelijke sportorganisatie, je
                kunt eenvoudig jouw abonnement stopzetten met een brief via
                abbostop.nl. Stop met onnodig betalen als je stopt met
                sporten!
            </p>
            </div>
            <div className="row">
            <h2>Voeding</h2>
            <p>
                Het succes van bedrijven die bijvoorbeeld wekelijks een box
                met boodschappen bezorgen is hard aan het groeien in
                Nederland. Natuurlijk is deze dienst erg makkelijk en kan het
                leven aangenamer maken. Maar helaas zitten er niet alleen
                voordelen aan de dienst van bijvoorbeeld HelloFresh. Na
                verloop van tijd gaan de maaltijdboxen soms vervelen, of de
                producten voldoen niet aan de verwachtingen. In dat geval moet
                je natuurlijk direct het abonnement stopzetten, want je
                betaalt veel geld aan producten waar je eigenlijk niet op zit
                te wachten. Kies in de categorie voeding voor de bezorgdienst
                die je wilt annuleren, vul je gegevens in en laat de brief
                bezorgen. Voor een zeer laag bedrag ben je vervolgens verlost
                van deze geldverslindende voedselbezorgers.
            </p>
            </div>
            <div className="row">
            <h2>Loterijen</h2>
            <p>
                Loterijen zijn er goed in om je te laten denken dat je een
                goede kans maakt om te winnen. In werkelijkheid is de kans
                groter dat je geraakt wordt door de bliksem dan dat je
                daadwerkelijk een hoog geldbedrag zult winnen in een loterij.
                Heb je je ooit (online) lid laten maken van een loterij
                waarvan je bijdrage via automatische incasso wordt
                afgeschreven? Dan is het verstandig deze zo spoedig mogelijk
                op te zeggen. Of je nu jouw automatische deelname aan de
                Staatsloterij, de Lotto, Lucky Day, Dayzers of de
                Vriendenloterij op wilt zeggen, je vindt de juiste opzegbrief
                op abbostop.nl.
            </p>
            </div>
            <div className="row">
            <h2>Waarom kiezen voor abbostop.nl</h2>
            <p>
                Wij zijn de meest ervaren en grootste serviceprovider voor het
                opzeggen van abonnementen en diensten in Nederland. Wij
                besparen je bergen tijd en moeite door jou direct de juiste
                brief voor het juiste abonnement aan te bieden. Je kunt deze
                brief door ons per post laten bezorgen voor een zeer kleine
                vergoeding. Vervolgens heb je er geen omkijken meer naar en
                start je direct met geld besparen. Bekijk nu alle categorieën
                waarbinnen wij opzegbrieven voor je klaar hebben staan.
            </p>
            </div>
        </div>
        </section>
        <div className="">
        <img
            src={'/assets/images/wave.png'}
            className="wave-hight"
            height={"20%"}
            width={"100%"}
        />
        </div>
    </div>
    </main>
  );
};

export default Categories;
