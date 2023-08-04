import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { API_URL } from "../../config";

const Footer = () => {
  const [allCompanies, setAllCompanies] = useState([]);
  const fetchAllCompany = async () => {
    let companyUrl = `${API_URL}/company`;
    await axios
      .get(companyUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setAllCompanies(res.data.result);
      })
      .catch((error) => {
        console.log("Error :" + error);
      });
  };

  useEffect(() => {
    fetchAllCompany();
  }, []);
  
  return (
    <footer id="footer" className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-3 col-md-12 footer-info custom-width-foot">
              <Link
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                  });
                }}
                href="/"
                className="logo "
              >
                <img alt="logo" src={'/assets/images/AbboStop_Logo_or.svg'} />
              </Link>
              <p className="addFooter">
                {/* <span>Algemene opzegbrief</span> <br />{" "} */}
                <Link
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    });
                  }}
                  href="/contact"
                >
                  Contact
                </Link>
              </p>
            </div>
            <div className="col-lg-3 col-md-12 footer-links custom-link-mobile">
              <h4>Meest opgezegd</h4>
              <ul>
                {allCompanies?.map((item, index) => {
                  if (item.companyName === "VriendenLoterij") {
                    return (
                      <li key={index}>
                        <Link
                          onClick={() => {
                            // window.location.href("/vriendenLoterij-opzeggen")
                            window.scrollTo({
                              top: 0,
                              left: 0,
                              behavior: "smooth",
                            });
                          }}
                          // href="/vriendenLoterij-opzeggen"
                          href={{
                            pathname: '/vriendenLoterij-opzeggen',
                            query: {
                              categoryName: item?.category.categoryName,
                              Address: item?.Address,
                              companyName: item?.companyName,
                              categoryId: item?.category._id,
                              content: item?.Content,
                            }
                          }}
                          as='/vriendenLoterij-opzeggen'
                          // state={{
                          //   categoryName: item?.category.categoryName,
                          //   Address: item?.Address,
                          //   companyName: item?.companyName,
                          //   categoryId: item?.category._id,
                          //   content: item?.Content,
                          // }}
                        >
                          VriendenLoterij
                        </Link>
                      </li>
                    );
                  }
                  if (item.companyName === "Chubb") {
                    return (
                      <li key={index}>
                        <Link
                          onClick={() => {
                            // window.location.href("/chubb-opzeggen");
                            window.scrollTo({
                              top: 0,
                              left: 0,
                              behavior: "smooth",
                            });
                          }}
                          href={{
                            pathname: "/chubb-opzeggen",
                            query: {
                              categoryName: item?.category.categoryName,
                              Address: item?.Address,
                              companyName: item?.companyName,
                              categoryId: item?.category._id,
                              content: item?.Content,
                            }
                          }}
                          as="/chubb-opzeggen"
                          // href="/chubb-opzeggen"
                          // state={{
                          //   categoryName: item?.category.categoryName,
                          //   Address: item?.Address,
                          //   companyName: item?.companyName,
                          //   categoryId: item?.category._id,
                          //   content: item?.Content,
                          // }}
                        >
                          Chubb
                        </Link>
                      </li>
                    );
                  }
                  if (item.companyName === "FNV") {
                    return (
                      <li key={index}>
                        <Link
                          onClick={() => {
                            // window.location.href("/fnv-opzeggen");
                            window.scrollTo({
                              top: 0,
                              left: 0,
                              behavior: "smooth",
                            });
                          }}
                          href={{
                            pathname: "/fnv-opzeggen",
                            query: {
                              categoryName: item?.category.categoryName,
                              Address: item?.Address,
                              companyName: item?.companyName,
                              categoryId: item?.category._id,
                              content: item?.Content,
                            }
                          }}
                          as="/fnv-opzeggen"
                          // href="/fnv-opzeggen"
                          // state={{
                          //   categoryName: item?.category.categoryName,
                          //   Address: item?.Address,
                          //   companyName: item?.companyName,
                          //   categoryId: item?.category._id,
                          //   content: item?.Content,
                          // }}
                        >
                          FNV
                        </Link>
                      </li>
                    );
                  }
                  if (item.companyName === "Lexa.nl") {
                    return (
                      <li key={index}>
                        <Link
                          onClick={() => {
                            // window.location.href("/lexa-nl-opzeggen");
                            window.scrollTo({
                              top: 0,
                              left: 0,
                              behavior: "smooth",
                            });
                          }}
                          href={{
                            pathname: "/lexa-nl-opzeggen",
                            query: {
                              categoryName: item?.category.categoryName,
                              Address: item?.Address,
                              companyName: item?.companyName,
                              categoryId: item?.category._id,
                              content: item?.Content,
                            }
                          }}
                          as="/lexa-nl-opzeggen"
                          // href="/lexa-nl-opzeggen"
                          // state={{
                          //   categoryName: item?.category.categoryName,
                          //   Address: item?.Address,
                          //   companyName: item?.companyName,
                          //   categoryId: item?.category._id,
                          //   content: item?.Content,
                          // }}
                        >
                          Lexa
                        </Link>
                      </li>
                    );
                  }
                  if (item.companyName === "Nationale Postcode Loterij") {
                    return (
                      <li key={index}>
                        <Link
                          onClick={() => {
                            // window.location.href(
                            //   "/nationale-postcode-loterij-opzeggen"
                            // );
                            window.scrollTo({
                              top: 0,
                              left: 0,
                              behavior: "smooth",
                            });
                          }}
                          href={{
                            pathname: "/nationale-postcode-loterij-opzeggen",
                            query: {
                              categoryName: item?.category.categoryName,
                              Address: item?.Address,
                              companyName: item?.companyName,
                              categoryId: item?.category._id,
                              content: item?.Content,
                            }
                          }}
                          as="/nationale-postcode-loterij-opzeggen"
                          // href="/nationale-postcode-loterij-opzeggen"
                          // state={{
                          //   categoryName: item?.category.categoryName,
                          //   Address: item?.Address,
                          //   companyName: item?.companyName,
                          //   categoryId: item?.category._id,
                          //   content: item?.Content,
                          // }}
                        >
                          Nationale Postcode Loterij
                        </Link>
                      </li>
                    );
                  }
                  if (item.companyName === "Seniorenvoordeelpas") {
                    return (
                      <li key={index}>
                        <Link
                          onClick={() => {
                            // window.location.href(
                            //   "/seniorenvoordeelpas-opzeggen"
                            // );
                            window.scrollTo({
                              top: 0,
                              left: 0,
                              behavior: "smooth",
                            });
                          }}
                          href={{
                            pathname: "/seniorenvoordeelpas-opzeggen",
                            query: {
                              categoryName: item?.category.categoryName,
                              Address: item?.Address,
                              companyName: item?.companyName,
                              categoryId: item?.category._id,
                              content: item?.Content,
                            }
                          }}
                          as="/seniorenvoordeelpas-opzeggen"
                          // href="/seniorenvoordeelpas-opzeggen"
                          // state={{
                          //   categoryName: item?.category.categoryName,
                          //   Address: item?.Address,
                          //   companyName: item?.companyName,
                          //   categoryId: item?.category._id,
                          //   content: item?.Content,
                          // }}
                        >
                          Seniorenvoordeelpas
                        </Link>
                      </li>
                    );
                  }
                  if (item.companyName === "Prime Video") {
                    return (
                      <li key={index}>
                        <Link
                          onClick={() => {
                            // window.location.href("/prime-video-opzeggen");
                            window.scrollTo({
                              top: 0,
                              left: 0,
                              behavior: "smooth",
                            });
                          }}
                          href={{
                            pathname: "/prime-video-opzeggen",
                            query: {
                              categoryName: item?.category.categoryName,
                              Address: item?.Address,
                              companyName: item?.companyName,
                              categoryId: item?.category._id,
                              content: item?.Content,
                            }
                          }}
                          as="/prime-video-opzeggen"
                          // href="/prime-video-opzeggen"
                          // state={{
                          //   categoryName: item?.category.categoryName,
                          //   Address: item?.Address,
                          //   companyName: item?.companyName,
                          //   categoryId: item?.category._id,
                          //   content: item?.Content,
                          // }}
                        >
                          Prime Video
                        </Link>
                      </li>
                    );
                  }
                  if (item.companyName === "Basic-Fit") {
                    return (
                      <li key={index}>
                        <Link
                          onClick={() => {
                            // window.location.href("/basic-fit-opzeggen");
                            window.scrollTo({
                              top: 0,
                              left: 0,
                              behavior: "smooth",
                            });
                          }}
                          href={{
                            pathname: "/basic-fit-opzeggen",
                            query: {
                              categoryName: item?.category.categoryName,
                              Address: item?.Address,
                              companyName: item?.companyName,
                              categoryId: item?.category._id,
                              content: item?.Content,
                            }
                          }}
                          as="/basic-fit-opzeggen"
                          // href="/basic-fit-opzeggen"
                          // state={{
                          //   categoryName: item?.category.categoryName,
                          //   Address: item?.Address,
                          //   companyName: item?.companyName,
                          //   categoryId: item?.category._id,
                          //   content: item?.Content,
                          // }}
                        >
                          Basic-Fit
                        </Link>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
            <div className="col-lg-3 col-md-12 footer-links">
              <h4>Populaire categorieën</h4>
              <ul>
                <li>
                  <Link
                    onClick={() => {
                      // window.location.href("/categorieen/goede-doelen");
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                    href={{
                      pathname: "/categorieen/goede-doelen",
                      query: {
                        id: "649ef4a743ae16a0e205988b",
                      }
                    }}
                    as="/categorieen/goede-doelen"
                    // href="/categorieen/goede-doelen"
                    // state={{
                    //   id: "649ef4a743ae16a0e205988b",
                    // }}
                  >
                    Goede doelen
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      // window.location.href("/categorieen/fitness");
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                    href={{
                      pathname: "/categorieen/fitness",
                      query: {
                        id: "649ef3a043ae16a0e2059882",
                      }
                    }}
                    as="/categorieen/fitness"
                    // href="/categorieen/fitness"
                    // state={{
                    //   id: "649ef3a043ae16a0e2059882",
                    // }}
                  >
                    Fitness
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      // window.location.href("/categorieen/mobiele-telefonie");
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                    href={{
                      pathname: "/categorieen/mobiele-telefonie",
                      query: {
                        id: "649ef54c43ae16a0e205989a",
                      }
                    }}
                    as="/categorieen/mobiele-telefonie"
                    // href="/categorieen/mobiele-telefonie"
                    // state={{
                    //   id: "649ef54c43ae16a0e205989a",
                    // }}
                  >
                    Mobiele Telefonie
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      // window.location.href("/categorieen/verzekeringen");
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                    href={{
                      pathname: "/categorieen/verzekeringen",
                      query: {
                        id: "649ef6605002c4e803195bfe",
                      }
                    }}
                    as="/categorieen/verzekeringen"
                    // href="/categorieen/verzekeringen"
                    // state={{
                    //   id: "649ef6605002c4e803195bfe",
                    // }}
                  >
                    Verzekeringen
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-12 footer-links desk-footer">
              <h4>Informatie</h4>
              <ul>
                <li>
                  <Link
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                    href="/"
                  >
                    Homepage
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      // window.location.href("/categorieen");
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                    href="/categorieen"
                  >
                    Categoriëen
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                    href="/contact"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      // window.location.href("/algemene-voorwaarden");
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                    href="/algemene-voorwaarden"
                  >
                    Algemene voorwaarden
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      // window.location.href("/privacyverklaring");
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                    href="/privacyverklaring"
                  >
                    Privacyverklaring
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      // window.location.href("/sitemap");
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                    href="/sitemap"
                  >
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            © Abbostop.nl | 2023 | Alle Rechten Voorbehouden.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
