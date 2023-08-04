import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { API_URL } from "../config";

const Sitemap = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [allCompany, setAllCompany] = useState([]);

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
  const fetchAllCompany = async () => {
    let companyUrl = `${API_URL}/company`;
    await axios
      .get(companyUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data?.result);
        setAllCompany(res.data?.result);
      })
      .catch((error) => {
        console.log("Error :" + error);
      });
  };
  useEffect(() => {
    fetchAllCategories();
    fetchAllCompany();
    document.title = "Sitemap - Abbostop";
  }, []);
  return (
    <main id="main">
        <div className="bgForPage sitemap">
            <section className="breadcrumbs category">
            <div className="container">
                <div className="row">
                <div className="col-md-6 breadcrumb-section">
                    <ol>
                        <li>
                            <Link href="/">Opzeggen</Link>
                        </li>
                        <li className="active">
                            <a>Sitemap</a>
                        </li>
                    </ol>
                </div>
                </div>
            </div>
            </section>
            <section className="categorieen" id="">
            <div className="container">
                <div className="row">
                <h1>Sitemap</h1>

                <div className="sitemap-section my-4">
                    <h3>Pagina's</h3>
                    <div className="sitemap-listing">
                    <ul>
                        <li>
                        <Link href="/">Home Page</Link>
                        </li>
                        <li>
                        <Link href="/categorieen">Categoriëen</Link>
                        </li>
                        <li>
                        <Link href="/contact">Contact</Link>
                        </li>
                        <li>
                        <Link href="/algemene-voorwaarden">
                            Algemene voorwaarden
                        </Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Link href="/mijn-abbo-stop">Mijn Abbo Stop</Link>
                        </li>
                            
                        <li>
                            <Link href="/privacyverklaring">Privacyverklaring</Link>
                        </li>
                        <li>
                            <Link href="/sitemap">Sitemap</Link>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="sitemap-section my-4">
                    <div className="sitemap-listing">
                    <div className="col-md-10 px-0">
                        <h3>Categorieen</h3>
                        <ul>
                        {allCategories?.map((item) => {
                            const {
                            _id: id,
                            categoryLogo: img,
                            categoryName: name,
                            } = item;

                            return (
                            <>
                                <li key={id}>
                                <Link
                                    href={{
                                        pathname: `/categorieen/${name
                                            .toLowerCase()
                                            .replaceAll(" ", "-")}`,
                                        query: {
                                            id: id,
                                            }
                                    }}
                                    // to={`/categorieen/${name
                                    // .toLowerCase()
                                    // .replaceAll(" ", "-")}`}
                                    key={id}
                                    // state={{
                                    // id: id,
                                    // }}
                                >
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
                                </Link>
                                </li>
                            </>
                            );
                        })}
                        </ul>
                    </div>
                    <div className="col-md-2">
                        <h3>Companies</h3>
                        <ul>
                        {/* <li className="first-company">Companies</li> */}
                        {allCompany?.map((name) => {
                            return (
                            <li key={name._id}>
                                <Link
                                href={{
                                    pathname: `/${name.route}-opzeggen`,
                                    query: {
                                        companyName: name.companyName,
                                        categoryName: name.category.categoryName,
                                        Address: name.Address,
                                        categoryId: name.category._id,
                                        content: name?.Content,
                                        fields: name?.Fields,
                                    }
                                }}
                                // to={`/${name.route}-opzeggen`}
                                // state={{
                                //     companyName: name.companyName,
                                //     categoryName: name.category.categoryName,
                                //     Address: name.Address,
                                //     categoryId: name.category._id,
                                //     content: name?.Content,
                                //     fields: name?.Fields,
                                // }}
                                key={name.id}
                                >
                                {name.companyName}
                                </Link>
                            </li>
                            );
                        })}
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
        </div>
    </main>
  );
};

export default Sitemap;
