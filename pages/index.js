import React, { useEffect, useState } from "react";
import axios from "axios";
import Testimonial from "../components/Home/TestimonialSlider";
import Blog from "../components/Home/Blog";
import Accordian from "../components/Home/HomeAccordian";
import Link from "next/link";
import SearchAutocomplete from "../components/Home/AutoSuggestion";
import { API_URL } from "../config";

const Home = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [allCompany, setAllCompany] = useState([]);
  const [SelectedCompany, setSelectedCompany] = useState({});
  const [searchCompany, setSearchCompany] = useState([]);

  const fetchAllCategories = async () => {
    let categoriesUrl = `${API_URL}/category`;
    await axios
      .get(categoriesUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setAllCategories(res.data.result);
        // console.log(res.data);
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
        setAllCompany(res.data.result);
      })
      .catch((error) => {
        console.log("Error :" + error);
      });
  };
  const mostSearched = async () => {
    let searchUrl = `${API_URL}/company/search`;
    await axios
      .get(searchUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res.data);
        setSearchCompany(res.data.result);
      })
      .catch((error) => {
        console.log("Error :" + error);
      });
  };

  const handleSearch = async () => {
    // console.log(SelectedCompany);
    let data = JSON.stringify({
      address: SelectedCompany?.Address,
      companyName: SelectedCompany?.companyName,
      category: SelectedCompany?.category._id,
      content: SelectedCompany?.Content,
      fields: SelectedCompany?.Fields,
      companyId: SelectedCompany?._id,
      route: SelectedCompany?.route,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${API_URL}/company/search`,
      headers: {
        "Content-Type": "application/json",
      },

      data: data,
    };

    axios
      .request(config)

      .then((response) => {
        // console.log(JSON.stringify(response.data));
      })

      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAllCategories();
    fetchAllCompany();
    mostSearched();
    document.title = "Abbo Stop | Eenvoudig Online Al Je Abonnementen Opzeggen";
  }, []);
  return (
    <div className="">
      <section className="bg-light" id="section1">
        <div className="container">
          <div className="row">
            <div className="col-md-7 sec1-text-container order-md-1 order-2 pt-3">
              <div className="">
                <p className="sec1-head-text mt-4">
                  Abonnement direct
                  <span className="text-skyblue"> opzeggen?</span>
                </p>
              </div>
              <p className="sec1-subhead-text text-blue">
                Verstuur eenvoudig en snel een gratis opzegbrief voor al je
                abonnementen
                {/* <span className="fw-bold"> opzegbrief</span> */}
              </p>
              <div className="search-container row">
                <div className="col-8 p-0">
                  <SearchAutocomplete
                    companies={allCompany}
                    setSelectedCompany={setSelectedCompany}
                  />
                </div>
                <div className="col-4">
                  {SelectedCompany._id ? (
                    <Link
                      // href={`/${SelectedCompany?.route}-opzeggen`}
                      href={{
                        pathname: `/${SelectedCompany?.route}-opzeggen`,
                        query: {
                          categoryName: SelectedCompany?.category.categoryName,
                          Address: SelectedCompany?.Address,
                          companyName: SelectedCompany?.companyName,
                          categoryId: SelectedCompany?.category._id,
                          content: SelectedCompany?.Content,
                          fields: SelectedCompany?.Fields,
                        }
                      }}
                      as={`/${SelectedCompany?.route}-opzeggen`}
                      // state={{
                      //   categoryName: SelectedCompany?.category.categoryName,
                      //   Address: SelectedCompany?.Address,
                      //   companyName: SelectedCompany?.companyName,
                      //   categoryId: SelectedCompany?.category._id,
                      //   content: SelectedCompany?.Content,
                      //   fields: SelectedCompany?.Fields,
                      // }}
                    >
                      <button
                        className="search-btn rounded-pill shade"
                        onClick={handleSearch}
                      >
                        Zoeken
                      </button>
                    </Link>
                  ) : (
                    <button className="search-btn rounded-pill shade">
                      Zoeken
                    </button>
                  )}
                </div>
              </div>
              <p className="home-sub">Meest opgezegde abonnementen:</p>
              <div className="d-flex align-items-center section1-btn gap-3 w-100 flex-wrap my-2">
                {searchCompany?.map((item) => {
                  // console.log("aa", item);
                  return (
                    <div>
                      <Link
                        // href={`/${item?.route}-opzeggen`}
                        href={{
                          pathname: `/${item?.route}-opzeggen`,
                          query: {
                            categoryName: item?.category?.categoryName,
                            Address: item?.address,
                            companyName: item?.companyName,
                            categoryId: item?.category?._id,
                            categoryLetterIntro: item?.category.letterIntro,
                            categoryLandingPageIntro:
                              item?.category?.landingPageIntro,
                            content: item?.content,
                            fields: item?.fields,
                          }
                        }}
                        as={`/${item?.route}-opzeggen`}
                        // state={{
                        //   categoryName: item?.category?.categoryName,
                        //   Address: item?.address,
                        //   companyName: item?.companyName,
                        //   categoryId: item?.category?._id,
                        //   categoryLetterIntro: item?.category.letterIntro,
                        //   categoryLandingPageIntro:
                        //     item?.category?.landingPageIntro,
                        //   content: item?.content,
                        //   fields: item?.fields,
                        // }}
                      >
                        <div
                          className="btn-text card px-4 py-2 shadow-sm"
                          key={item._id}
                        >
                          {item.companyName}
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-md-5 sec1-img-box order-sm-1 order-md-2">
              <img src={'/assets/images/Unsubscribe.svg'} className="sec1-img" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-0">
        <div
          id="section2"
          className="d-flex bg-white flex-column justify-content-center  align-items-center container"
          data-mdb-animation-on-scroll="repeat"
        >
          <p className="sub-headingtext">
            In 3 stappen <span className="text-skyblue">opzeggen</span>
          </p>
          <p className="text-center text-wrap p-spacing">
            Zeg uw abonnement op en profiteer daarbij van onze gratis
            opzegbrief. Via onze verzendservice zullen we uw opzegging direct
            verzenden. Volg deze simpele 3 stappen.
          </p>
          <div className="three-box">
            <div className="card card-size">
              <div className="d-flex justify-content-between m-3 mb-5 align-items-center">
                <div className="card-img-1-box">
                  <img src={'/assets/images/Vector1.png'} className="service-card-img" alt="" />
                </div>
                <img
                  src={'/assets/images/01.png'}
                  height={65}
                  width={109}
                  className="num-img"
                  alt=""
                />
              </div>
              <p className="text-center card-text mt-4 mb-2 mx-3">
                Zoek de organisatie waar u een abonnement of contract wilt
                opzeggen.
              </p>
            </div>
            <div className="card card-size">
              <div className="d-flex justify-content-between m-3 mb-5 align-items-center">
                <div className="card-img-2-box">
                  <img
                    src={'/assets/images/Vector2.png'}
                    height={55}
                    width={60}
                    className="service-card-img"
                    alt=""
                  />
                </div>
                <img
                  src={'/assets/images/02.png'}
                  height={65}
                  width={109}
                  className="num-img"
                  alt=""
                />
              </div>
              <p className="text-center card-text mt-4 mb-2 mx-3">
                Vul uw gegevens in op het online formulier en check het
                real-time voorbeeld van de opzegbrief.
              </p>
            </div>
            <div className="card card-size">
              <div className="d-flex justify-content-between m-3 mb-5 align-items-center">
                <div className="card-img-3-box">
                  <img
                    src={'/assets/images/Vector3.png'}
                    height={55}
                    width={60}
                    className="service-card-img"
                    alt=""
                  />
                </div>
                <img
                  src={'/assets/images/03.png'}
                  height={65}
                  width={109}
                  className="num-img"
                  alt=""
                />
              </div>
              <p className="text-center card-text mt-4 mb-2 mx-3">
                Selecteer uw gewenste verzendoptie en Abbo Stop verstuurt de
                opzegbrief direct!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-light pb-5">
        <div className="container">
          <p className="sub-headingtext text-center mt-4 mb-3 pt-4">
            Categorieën
          </p>
          <p className="category-subtext text-center mt-1">
            Kies een categorie voor uw opzegging
          </p>
          <div className="row">
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
                    // href={`/categorieen/${route}`}
                    href={{
                      pathname: `/categorieen/${route}`,
                      query: {
                        id: id,
                      }
                    }}
                    as={`/categorieen/${route}`}
                    key={id}
                    // state={{
                    //   id: id,
                    // }}
                    className="single-card"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: img }}></div>
                    {/* <p className="single-cart-text text-break">{name}</p> */}
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
      <section className="bg-light">
        <div id="section3" className="my-3 container ">
          <div className="row">
            <div className="col-lg-6 pt-5 order-lg-2 section3">
              <p className="sub-headingtext px-3 mb-3">
                Over <span className="text-skyblue">Abbo Stop</span>
              </p>
              <p className="text-wrap normal-text">
                Abbo Stop is uw vertrouwde platform voor het moeiteloos
                opzeggen van abonnementen, contracten, verzekeringen en
                lidmaatschappen. Het opstellen van een opzegbrief moet op een
                specifieke manier gebeuren, wat een uitdaging kan zijn. Dit
                komt bovenop de tijdrovende taak van het zoeken naar de juiste
                contactgegevens. Bovendien kan het vinden van de benodigde
                informatie om een opzegging te regelen eveneens lastig zijn.
                Al deze stappen kunnen het beëindigen van een abonnement of
                contract een frustrerend proces maken.
              </p>
              <p className="text-wrap normal-text mt-4">
                Daarvoor is Abbo Stop opgericht. Wij zijn hier om u te helpen
                met het soepel beëindigen van uw abonnementen, verzekeringen,
                contracten of lidmaatschappen. We hebben opzegbrieven voor
                allerlei organisaties. Kies de organisatie die u wilt opzeggen
                en wij genereren snel en efficiënt een opzegbrief voor u. Maak
                vervolgens gebruik van onze verzendservice met verschillende
                verzendopties en we kunnen de opzegbrief direct voor u
                versturen. Bij Abbo Stop maken we opzeggen gemakkelijk, zonder
                gedoe.
              </p>
            </div>
            <div className="col-lg-6 d-flex justify-content-center align-items-center order-lg-1">
              <img src={'/assets/images/overons.png'} className="overons-img" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-light py-5">
        <div
          id="section4"
          className="pb-5 container d-flex justify-content-center align-item-center"
        >
          <Testimonial />
        </div>
      </section>
      <section className="bg-white" style={{ display: "none" }}>
        <div className="mt-4 container" id="section5">
          <h5 className="sub-headingtext mb-3 mt-4 text-center">Blog</h5>
          <p className="normal-text text-center mb-5">
            Lees hier het laatste nieuws
          </p>
          <div className="my-4">
            <Blog />
          </div>
        </div>
      </section>
      <section className="bg-light">
        <div
          id="accordian"
          className="container d-flex justify-content-center"
        >
          <Accordian />
        </div>
      </section>
      <div className="bg-light">
        <img
          src={'/assets/images/wave.png'}
          className="wave-hight"
          height={"20%"}
          width={"100%"}
          alt=""
        />
      </div>
    </div>
  );
};

export default Home;
