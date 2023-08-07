import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import LetterAccordian from "../../components/Letter/LetterAccordian";
import Link from "next/link";
import { API_URL } from "../../config";
import { data } from "../../utils/data";
import { fnv } from "../../utils/data";
import { fbto } from "../../utils/data";
import { dgp } from "../../utils/data";
import { useRouter } from 'next/router'

const CompanyLetter = () => {
  const [info, setInfo] = useState({});
  const [companyUrlRoute, setCompanyUrlRoute] = useState([]);
  const [datumDate, setDatumDate] = useState(false);
  const [checked, setChecked] = useState(true);
  const router = useRouter();
  const { name: companyRoute } = router.query;
  
  const getCompanyByRoute = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${API_URL}/company/route/${companyRoute?.split('-opzeggen')[0]}`,
      headers: {},
    };
    await axios
      .request(config)
      .then((response) => {
        console.log(response.data.result[0]);
        setCompanyUrlRoute(response.data.result[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const inputDate = useRef(null);
  const inputRadio = useRef(null);

  const handleDatum = (e) => {
    const value = e.target.value;
    console.log(value);

    if (value === "Kies een datum") {
      setDatumDate(true);
      setChecked(false);
      info.datumdate = "[Date]*";
    } else {
      setDatumDate(false);
      setChecked(true);
      info.datumdate = "";
    }
  };

  // const [firstnameFlag, setFirstnameFlag] = useState(false);
  // const [achternaamFlag, setAchternaamFlag] = useState(false);
  // const [postcodeFlag, setPostCodeFlag] = useState(false);
  // const [huisnrFlag, setHuisnrFlag] = useState(false);
  // const [woonplaatsFlag, setWoonplaatsFlag] = useState(false);
  // const [straatFlag, setStraatFlag] = useState(false);
  // const [emailFlag, setEmailFlag] = useState(false);

  const [company, setCompany] = useState([]);
  const [landingPageIntro, setLandingPageIntro] = useState([]);
  const [letterIntro, setLetterIntro] = useState("");
  const [ontvangen, setOntvangen] = useState(false);
  const [sportsAddress, setSportsAddress] = useState([]);
  const [fnvAddress, setFnvAddress] = useState([]);
  const [fbtoAddress, setFbtoAddress] = useState([]);
  const [dgpAddress, setDgpAddress] = useState([]);
  const [internet, setInternet] = useState("");
  const [televisie, setTelevisie] = useState("");
  const [vasteTelefonie, setVasteTelefonie] = useState("");
  const [mobieleTelefonie, setMobieleTelefonie] = useState("");
  const [mailboxId, setMailboxId] = useState("");
  const [LetterPdf, setLetterPdf] = useState("");

  const onOptionChangeHandler = (event) => {
    let selectVal = event.target.value;
    let val = data.filter((item) => item.key === selectVal);
    setSportsAddress(val[0].value);
  };
  const onOptionChangeHandlerFnv = (event) => {
    let selectVal = event.target.value;
    let val = fnv.filter((item) => item.key === selectVal);
    setFnvAddress(val[0].value);
  };
  const onOptionChangeHandlerfbto = (event) => {
    let selectVal = event.target.value;
    let val = fbto.filter((item) => item.key === selectVal);
    setFbtoAddress(val[0].value);
  };
  const onOptionChangeHandlerdgp = (event) => {
    let selectVal = event.target.value;
    let val = dgp.filter((item) => item.key === selectVal);
    setDgpAddress(val[0].value);
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log(name, value);
    if (name == "datumdate") {
      let val = value.split("-");
      if (val.length) {
        value = `${val[2]}-${val[1]}-${val[0]}`;
      }
    }

    setInfo({ ...info, [name]: value });
  };
  const handleChecked = (event) => {
    if (event.target.checked) {
      setOntvangen(true);
    } else {
      setOntvangen(false);
    }
  };
  const handleComChecked = (event) => {
    let name = event.target.name;
    // console.log(name);
    if (name == "internet") {
      if (event.target.checked) {
        setInternet("Internet");
      } else {
        setInternet("");
      }
    }
    if (name == "televisie") {
      if (event.target.checked) {
        setTelevisie("Televisie");
      } else {
        setTelevisie("");
      }
    }
    if (name == "mobieletelefonie") {
      if (event.target.checked) {
        setMobieleTelefonie("Mobiele Telefonie");
      } else {
        setMobieleTelefonie("");
      }
    }
    if (name == "vastetelefonie") {
      if (event.target.checked) {
        setVasteTelefonie("Vaste Telefonie");
      } else {
        setVasteTelefonie("");
      }
    }
  };

//   const location = useLocation();

  const companyName = companyUrlRoute?.companyName;
  const categoryName = companyUrlRoute?.category?.categoryName;
  const address = companyUrlRoute?.Address;
  const categoryId = companyUrlRoute?.category?._id;
  const content = companyUrlRoute?.Content;
  const fields = companyUrlRoute?.Fields;

  // console.log("fields", fields);
  const getMailboxId = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${API_URL}/mailbox`,
      headers: {},
    };
    await axios
      .request(config)
      .then((response) => {
        setMailboxId(response.data.data[0].id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClick = (e) => {
    e.preventDefault();
    let input = document.getElementsByTagName("input");
    let flag = true;
    for (let [key, value] of Object.entries(input)) {
      console.log("value :" + value.value);
      if ((value.required && value.value == "") || value.value === undefined) {
        value.className = "border-2 border-danger shadow-danger form-control";
        console.log(value.value);
        console.log(value.name);
        let label = document.getElementById(value.name);
        label.className = "text-danger";
        flag = false;
      } else if (value.required && value.value) {
        value.className = "form-control";
        console.log(value.value);
        console.log(value.name);
        let label = document.getElementById(value.name);
        label.className = "text-dark";
      }
    }
    if (flag) {
      getbase64();
      if (LetterPdf) {
        let data = {
          mailboxId: mailboxId,
          formData: info,
          company: companyUrlRoute?._id,
          letterPdf: LetterPdf,
        };
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${API_URL}/payment`,
          headers: {},
          data: data,
        };
        axios
          .request(config)
          .then((response) => {
            window.location.href =
              response?.data?.data?.paymentResponse._links?.checkout?.href;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  let companyUrl = `${API_URL}/company/category/${categoryId}`;

  const fetchCategory = () => {
    axios
      .get(companyUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log("aa", res.data.result);
        setCompany(res?.data?.result);
        setLetterIntro(res?.data?.result[0]?.category?.letterIntro);
        setLandingPageIntro(res?.data?.result[0]?.category?.landingPageIntro);
      })
      .catch((error) => {
        console.log("Error :" + error);
      });
  };
  useEffect(() => {
    if(router.isReady){
      document.title = companyUrlRoute?.Title
      ? companyUrlRoute?.Title
      : "Letter - Abbostop";
      document.title = companyUrlRoute?.Title
          ? companyUrlRoute?.Title
          : "Letter - Abbostop";
      document.getElementsByTagName("META")[2].content = companyUrlRoute?.Meta
          ? companyUrlRoute?.Meta
          : "Letter - Abbostop";
      getCompanyByRoute();
      getMailboxId();
    }
  }, [router.isReady]);

  const printRef = React.useRef();

  const printPdf = () => {
    const element = printRef.current;
    // element.innerHTML = htmlContent;
    // const modifiedHtmlContent = modifyHtmlContent(element);

    // element.innerHTML = modifiedHtmlContent;

    // html2pdf()
    //   .set({
    //     margin: [0, 0, 0, 0],
    //     filename: `${companyName}-opzeggen.pdf`,
    //     image: { type: "jpeg", quality: 1 },
    //     html2canvas: { dpi: 400, letterRendering: true },
    //   })
    //   .from(element)
    //   .save();
    // .output('blob')
    // .then((blob) => {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     const base64data = reader.result;
    //     console.log(base64data)
    //   };
    //   reader.readAsDataURL(blob);
    // });
  };

  const getbase64 = async () => {
    const element = printRef.current;
    // let pdf = await html2pdf()
    //   .set({
    //     margin: [0, 0, 0, 0],
    //     filename: "letter.pdf",
    //     image: { type: "jpeg", quality: 1 },
    //     html2canvas: { dpi: 400, letterRendering: true },
    //   })
    //   .from(element)
    //   .output("blob")
    //   .then((blob) => {
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //       const base64data = reader.result;
    //       const matches = base64data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    //       if (matches && matches.length === 3) {
    //         setLetterPdf(matches[2]);
    //         return;
    //       }
    //     };
    //     reader.readAsDataURL(blob);
    //   });
  };

  return (
    <>
      <main id="main">
        <div className="bgForPage">
          <section className="breadcrumbs">
            <div className="container">
              <div className="row">
                <div className="col-md-6 breadcrumb-section">
                  <ol>
                    <li>
                      <Link href="/">Opzeggen</Link>
                    </li>
                    <li>
                      <Link href="/categorieen/">Categorieën</Link>
                    </li>
                    <li>
                      <Link
                        key={categoryId}
                        // state={{
                        //   id: categoryId,
                        // }}
                        // to={`/categorieen/${categoryName?.toLowerCase()}`}
                        href={{
                            pathname: `/categorieen/${categoryName?.toLowerCase()}`,
                            query: {
                                id: categoryId,
                              }
                        }}
                        as={`/categorieen/${categoryName?.toLowerCase()}`}
                      >
                        {categoryName}
                      </Link>
                    </li>
                    <li className="active">
                      <span>{companyName}</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </section>
          <section className="chub-Section">
            <div className="container bg-col-book aos-init aos-animate">
              <div className="row justify-content-center">
                <div className="col-lg-12 text-center">
                  <h1 className="headCub">
                    <span className="title">{companyName}</span>{" "}
                    <span> opzeggen</span>
                  </h1>
                  <p>
                    {companyUrlRoute?.category?.landingPageIntro[0]}{" "}
                    {companyUrlRoute?.companyName}{" "}
                    {companyUrlRoute?.category?.landingPageIntro[1]}{" "}
                    {companyUrlRoute?.companyName}{" "}
                    {companyUrlRoute?.category?.landingPageIntro[2]}
                  </p>
                </div>
              </div>

              <div className="row my-4">
                <div className="col-lg-4 col-sm-4 col-xs-4 arrow-mid-line">
                  <div className="svg-img">
                    <img src={'/assets/images/Icon_Brief1.svg'} />
                  </div>
                  <p>
                    <strong>
                      Vul je gegevens in via onderstaand formulier
                    </strong>
                  </p>
                </div>
                <div className="col-lg-4 col-sm-4 col-xs-4 arrow-mid-line">
                  <div className="svg-img">
                    <img src={'/assets/images/Icon_Brief2.svg'} />
                  </div>
                  <p>
                    <strong>Onderteken gemakkelijk je opzegbrief</strong>
                  </p>
                </div>
                <div className="col-lg-4 col-sm-4 col-xs-4 arrow-mid-line">
                  <div className="svg-img">
                    <img src={'/assets/images/Icon_Brief3.svg'} />
                  </div>
                  <p>
                    <strong>Je brief wordt direct verstuurd. </strong>
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="form-section-legend">
            <div className="container">
              <div className="row">
                <div className="bgStepForm">
                  <fieldset className="col-md-12">
                    <legend>{companyName} opzeggen</legend>
                    <div className="row justify-content-center">
                      <div className="col-lg-6">
                        <div className="cub-heading">
                          <span className="step-one">Stap 1</span>
                          <span className="step-text">Vul je gegevens in</span>
                          <span className="step-image">
                            <img src={'/assets/images/step-heading.svg'} />
                          </span>
                        </div>

                        <div className="line-arrow"></div>
                        <form>
                          <div className="row bg-trans">
                            {fields?.map((item, index) => {
                              let keyname = item.name;
                              return (
                                <>
                                  <div className={item.col} key={index}>
                                    <div className="form-group">
                                      <label id={item.name}>{item.label}</label>
                                      <input
                                        type={item.type}
                                        name={item.name}
                                        placeholder={item.placeholder}
                                        className="form-control"
                                        onChange={handleChange}
                                        required
                                      />
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                            {(companyName === "Vitens" ||
                              companyName === "Innova Energie") && (
                              <>
                                <div className="col-md-12 overdacht">
                                  <div className="form-group">
                                    <label id="overdacht">
                                      Datum Overdacht
                                    </label>
                                    <div className="d-flex gap-2 align-items-center">
                                      <input
                                        id="checked"
                                        type="radio"
                                        name="overdacht"
                                        value="Zo snel mogelijk"
                                        className="viten-radio"
                                        onChange={handleDatum}
                                        checked={checked}
                                      />
                                      Zo snel mogelijk
                                    </div>
                                    <div className="d-flex gap-2 align-items-center">
                                      <input
                                        type="radio"
                                        name="overdacht"
                                        value="Kies een datum"
                                        className="viten-radio"
                                        onChange={handleDatum}
                                        ref={inputRadio}
                                        htmlFor="myInput"
                                      />
                                      <label id="datumdate"></label>
                                      <input
                                        type="date"
                                        id="calendar"
                                        name="datumdate"
                                        className="showdatumdate"
                                        onChange={handleChange}
                                        autoFocus={true}
                                        placeholder="Choose Date"
                                        minDate="0"
                                        required={datumDate}
                                        disabled={datumDate ? false : true}
                                        ref={inputDate}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                            {(companyName === "Interpolis" ||
                              companyName === "Harmony Service Center" ||
                              companyName === "Chubb" ||
                              companyName === "Ardanta" ||
                              companyName === "Youfone" ||
                              companyName === "Budget Mobiel" ||
                              companyName === "Discovery Plus" ||
                              companyName === "DPG Media" ||
                              companyName === "Luxplus" ||
                              companyName === "NLZIET" ||
                              companyName === "NS" ||
                              companyName === "Squla" ||
                              companyName === "Storytel") && (
                              <>
                                <div className="col-md-12 overdacht">
                                  <div className="form-group">
                                    <label>
                                      {companyName === "Youfone"
                                        ? "Opzeggen vanaf"
                                        : "Opzegdatum"}
                                    </label>
                                    <div className="d-flex gap-2 align-items-center">
                                      <input
                                        type="radio"
                                        name="overdacht"
                                        value="Zo snel mogelijk"
                                        className="viten-radio"
                                        onChange={handleDatum}
                                        checked={checked}
                                      />
                                      Zo snel mogelijk
                                    </div>
                                    <div className="d-flex gap-2 align-items-center">
                                      <input
                                        type="radio"
                                        name="overdacht"
                                        value="Kies een datum"
                                        htmlFor="date-open"
                                        className="viten-radio"
                                        onChange={handleDatum}
                                      />
                                      {/* Kies een datum */}
                                      <label id="datumdate"></label>
                                      <input
                                        type="date"
                                        name="datumdate"
                                        className="showdatumdate"
                                        onChange={handleChange}
                                        autoFocus={true}
                                        placeholder="Choose Date"
                                        required={datumDate}
                                        disabled={datumDate ? false : true}
                                        ref={inputDate}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                            {(companyName === "Eneco" ||
                              companyName === "Essent" ||
                              companyName === "Vattenfall" ||
                              companyName === "Cordaid" ||
                              companyName === "Tele2" ||
                              companyName === "T-Mobile" ||
                              companyName === "Vodafone" ||
                              companyName === "FNV" ||
                              companyName === "Oxxio") && (
                              <>
                                <div className="col-md-12 overdacht">
                                  <div className="form-group">
                                    {companyName === "Staatsloterij" ||
                                    companyName === "Cordaid" ||
                                    companyName === "Tele2" ||
                                    companyName === "T-Mobile" ||
                                    companyName === "Vodafone" ||
                                    companyName === "FNV" ? (
                                      <label id="overdacht">Opzegdatum</label>
                                    ) : companyName === "Eneco" ||
                                      companyName === "Essent" ||
                                      companyName === "Oxxio" ? (
                                      <label id="overdacht">
                                        Datum overdacht
                                      </label>
                                    ) : (
                                      <label id="overdacht">
                                        Verhuisdatum / overdacht
                                      </label>
                                    )}
                                    <div className="d-flex gap-2 align-items-center">
                                      <input
                                        type="radio"
                                        name="overdacht"
                                        value="Zo snel mogelijk"
                                        className="viten-radio"
                                        onChange={handleDatum}
                                        checked={checked}
                                      />
                                      Zo snel mogelijk
                                    </div>
                                    <div className="d-flex gap-2 align-items-center">
                                      <input
                                        type="radio"
                                        name="overdacht"
                                        value="Kies een datum"
                                        className="viten-radio"
                                        onChange={handleDatum}
                                      />
                                      <label id="datumdate"></label>
                                      <input
                                        type="date"
                                        name="datumdate"
                                        className="showdatumdate"
                                        onChange={handleChange}
                                        autoFocus={true}
                                        placeholder="Choose Date"
                                        required={datumDate}
                                        disabled={datumDate ? false : true}
                                        ref={inputDate}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                            {companyName === "Vodafone" && (
                              <>
                                <div className="col-md-12 overdacht">
                                  <div className="form-group">
                                    <label id="overdacht">
                                      Selecteer dienst(en) die je wil opzeggen:
                                    </label>
                                    <div className="d-flex gap-2 align-items-center">
                                      <input
                                        type="radio"
                                        name="selectmob"
                                        value="Vaste Telefonie"
                                        className="viten-radio"
                                        onChange={handleDatum}
                                      />
                                      Vaste Telefonie
                                    </div>
                                    <div className="d-flex gap-2 align-items-center">
                                      <input
                                        type="radio"
                                        name="selectmob"
                                        value="Mobiele Telefonie"
                                        className="viten-radio"
                                        onChange={handleChange}
                                      />
                                      Mobiele Telefonie
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                            {companyName === "SportCity" && (
                              <>
                                <div className="col-md-12 dropdown">
                                  <div className="form-group">
                                    <label>SportCity Vestiging</label>
                                    <select
                                      className="sport-dropdown"
                                      onChange={onOptionChangeHandler}
                                    >
                                      <option>...</option>
                                      {data.map((item, index) => {
                                        return (
                                          <option value={item.key} key={index}>
                                            {item.key}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                </div>
                              </>
                            )}
                            {companyName === "DPG Media" && (
                              <>
                                <div className="col-md-12 dropdown">
                                  <div className="form-group">
                                    <label>Tijdschrift</label>
                                    <select
                                      className="sport-dropdown"
                                      onChange={onOptionChangeHandlerdgp}
                                    >
                                      <option>
                                        Welk tijdschrift wil je opzeggen?
                                      </option>
                                      {dgp.map((item, index) => {
                                        return (
                                          <option value={item.key} key={index}>
                                            {item.key}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                </div>
                              </>
                            )}
                            {companyName === "FBTO" && (
                              <>
                                <div className="col-md-12 dropdown">
                                  <div className="form-group">
                                    <label>Verzekering</label>
                                    <select
                                      className="sport-dropdown"
                                      onChange={onOptionChangeHandlerfbto}
                                    >
                                      <option>...</option>
                                      {fbto.map((item, index) => {
                                        return (
                                          <option value={item.key} key={index}>
                                            {item.key}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                </div>
                              </>
                            )}
                            {companyName === "FNV" && (
                              <>
                                <div className="col-md-12 dropdown">
                                  <div className="form-group">
                                    <label>Vakvereniging</label>
                                    <select
                                      className="sport-dropdown"
                                      onChange={onOptionChangeHandlerFnv}
                                    >
                                      <option>...</option>
                                      {fnv.map((item, index) => {
                                        return (
                                          <option value={item.key} key={index}>
                                            {item.key}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                </div>
                              </>
                            )}
                            {(companyName === "Tele2" ||
                              companyName === "Ziggo" ||
                              companyName === "Canal Digitaal") && (
                              <>
                                <div className="col-md-12 dropdown">
                                  <div className="form-group">
                                    <label className="">
                                      Selecteer dienst(en) die je wil opzeggen:
                                    </label>
                                    <div className="checkval">
                                      <input
                                        type="checkbox"
                                        className=""
                                        name="internet"
                                        // value="Internet"
                                        onChange={handleComChecked}
                                      />
                                      Internet
                                    </div>
                                    <div className="checkval">
                                      <input
                                        type="checkbox"
                                        className=""
                                        name="televisie"
                                        // value="Televisie"
                                        onChange={handleComChecked}
                                      />
                                      Televisie
                                    </div>
                                    <div className="checkval">
                                      <input
                                        type="checkbox"
                                        className=""
                                        name="vastetelefonie"
                                        // value="Vaste Telefonie"
                                        onChange={handleComChecked}
                                      />
                                      Vaste Telefonie
                                    </div>
                                    <div className="checkval">
                                      <input
                                        type="checkbox"
                                        className=""
                                        name="mobieletelefonie"
                                        // value="Mobiele Telefonie"
                                        onChange={handleComChecked}
                                      />
                                      Mobiele Telefonie
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                            {companyName === "NLZIET" && (
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label htmlFor="reason">Betaalgegevens</label>
                                  <textarea
                                    type="text"
                                    name="betaalgegevens"
                                    placeholder="Rekeningnummer of Laatste 4 cijfers creditcardnummer of Paypal gebruikersnaam. "
                                    className="form-control"
                                    onChange={handleChange}
                                  ></textarea>
                                </div>
                              </div>
                            )}
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="reason">Reden</label>
                                <textarea
                                  type="text"
                                  name="reason"
                                  placeholder="Reden van opzegging (optioneel)"
                                  className="form-control"
                                  onChange={handleChange}
                                ></textarea>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label id="iban">IBAN</label>
                                <input
                                  type="text"
                                  name="iban"
                                  placeholder="IBAN voor eenmalige automatische incasso"
                                  className="form-control"
                                  onChange={handleChange}
                                  required
                                />
                              </div>

                              <div className="form-group">
                                <label className="sr-only"></label>
                                <div className="custom-control custom-checkbox custom-control-inline">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    name="reclame"
                                    value="Ik wil geen reclame meer ontvangen"
                                    onChange={handleChecked}
                                  />
                                  <label className="custom-control-label check">
                                    Ik wil geen reclame meer ontvangen
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="cub-heading">
                                <span className="step-one">Stap 2</span>
                                <span className="step-text">
                                  Verstuur mijn opzegging
                                </span>
                              </div>
                            </div>

                            <div className="col-md-12 bgLight">
                              <div className="form-group">
                                <label className="sr-only"></label>
                                <div className="custom-control custom-checkbox custom-control-inline">
                                  <input
                                    type="checkbox"
                                    className="radioty"
                                    name="brief"
                                    value="Ik wil dat de brief zo snel mogelijk verstuurd
                                  wordt en zie daarom af van mijn wettelijke
                                  herroepingsrecht"
                                  />
                                  <label className="colorLight" htmlFor="yes">
                                    Ik heb de{" "}
                                    <Link href="/privacyverklaring">
                                      privacyverklaring
                                    </Link>{" "}
                                    en{" "}
                                    <Link href="/algemene-voorwaarden">
                                      algemene voorwaarden
                                    </Link>{" "}
                                    gelezen en ga hiermee akkoord. Ik geef Abbo
                                    Stop toestemming om deze opzegbrief namens
                                    mij af te drukken en per post te verzenden.
                                    Ik accepteer dat de kosten van{" "}
                                    <strong>29,95</strong> euro voor deze dienst
                                    via een SEPA-betaling direct bij mij in
                                    rekening worden gebracht.*
                                  </label>
                                </div>
                              </div>
                              <div className="form-group">
                                <label className="sr-only"></label>
                                <div className="custom-control custom-checkbox custom-control-inline">
                                  <input
                                    type="checkbox"
                                    className="radioty"
                                    name="akkoord"
                                    value="Ik ga akkoord met de algemene voorwaarden en
                                  geef hierbij toestemming aan Metis om deze
                                  opzegbrief namens mij af te drukken en per
                                  post te verzenden. De kosten van 30 euro voor
                                  het uitvoeren van deze dienstverlening, mogen
                                  achteraf bij mij in rekening gebracht worden"
                                  />
                                  <label className="colorLight" htmlFor="yes">
                                    Ik wil dat mijn brief zo snel mogelijk
                                    verzonden wordt en doe daarom vrijwillig
                                    afstand van mijn wettelijk recht op
                                    herroeping.*
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-12 text-center">
                              <button
                                className="btn btn-primary btn-mju shade"
                                onClick={handleClick}
                              >
                                {companyName} opzeggen <br />
                                <span className="smallTxxt">
                                  {/* met betaalverplichtings */}
                                </span>
                              </button>
                            </div>
                            {/* <p className="smText mrgTop text-center">
                            <span className="svg-img-fire">
                              <img src={iconfire} />
                            </span> */}
                            {/* Meer dan <strong>2,6 miljoen </strong>consumenten */}
                            {/* zeiden al op via abbostop.nl */}
                            {/* </p> */}
                          </div>
                        </form>
                      </div>
                      <div className="col-lg-6">
                        <div className="cub-heading">
                          <span className="lftTxt">
                            {companyName} opzegbrief:
                          </span>
                        </div>
                        <div className="">
                          <div ref={printRef} className="bgWhiteForm">
                            <div className="topSection">
                              <p>{companyName}</p>

                              <p>
                                {companyName === "SportCity"
                                  ? sportsAddress
                                  : companyName === "FNV"
                                  ? fnvAddress
                                  : address}
                              </p>
                              {/* <p>3068 AV Rotterdam</p> */}
                            </div>
                            <div className="midSection">
                              <p>
                                {info.woonplaats || <span>[Woonplaats]*</span>}{" "}
                                ,{" "}
                                {new Date().getDate() +
                                  "-" +
                                  (new Date().getMonth() + 1) +
                                  "-" +
                                  new Date().getFullYear()}
                              </p>
                              {companyName === "FBTO" ? (
                                <>{fbtoAddress}</>
                              ) : companyName === "DPG Media" ? (
                                <>{dgpAddress}</>
                              ) : (
                                <p>
                                  Betreft: Beëindiging overeenkomst{" "}
                                  {companyName}
                                </p>
                              )}
                            </div>
                            <div className="midtopSection">
                              <p>Geachte heer, mevrouw,</p>
                              {/* <p>{companyUrlRoute?.category?.letterIntro}</p> */}
                              <p>
                                {companyUrlRoute?.category?.letterIntro[0].head}{" "}
                                {datumDate
                                  ? companyUrlRoute?.category?.letterIntro[2]
                                      .dateBefore +
                                    " " +
                                    info?.datumdate +
                                    " " +
                                    companyUrlRoute?.category?.letterIntro[3]
                                      .dateAfter
                                  : companyUrlRoute?.category?.letterIntro[1]
                                      .soon}
                              </p>
                              <p>
                                Om de opzegging op een correcte wijze af te
                                handelen, staat hieronder een overzicht van mijn
                                gegevens:
                              </p>
                            </div>
                            <div className="bottomSectionTwo">
                              <ul>
                                {fields?.map((item, index) => {
                                  let keyname = item?.name;
                                  // console.log(info[keyname]);
                                  if (item.label.includes("(optioneel)")) {
                                    if (info[keyname]) {
                                      return (
                                        <div key={index}>
                                          <li>
                                            {item.name === "opzeggen"
                                              ? "Vanaf wanneer wil je opzeggen?"
                                              : item.name === "lotnummers"
                                              ? "lotnummers"
                                              : item.label}
                                          </li>

                                          <li>
                                            {info[keyname] ? (
                                              <span>{info[keyname]}*</span>
                                            ) : (
                                              <span>
                                                [
                                                {item.name === "opzeggen"
                                                  ? "Vanaf wanneer wil je opzeggen?"
                                                  : item.label}
                                                ]*
                                              </span>
                                            )}
                                          </li>
                                        </div>
                                      );
                                    }
                                  } else {
                                    return (
                                      <div key={index}>
                                        <li>
                                          {item.name === "opzeggen"
                                            ? "Vanaf wanneer wil je opzeggen?"
                                            : item.label}
                                        </li>

                                        <li>
                                          {info[keyname] ? (
                                            <span>{info[keyname]}*</span>
                                          ) : (
                                            <span>
                                              [
                                              {item.name === "opzeggen"
                                                ? "Vanaf wanneer wil je opzeggen?"
                                                : item.label}
                                              ]*
                                            </span>
                                          )}
                                        </li>
                                      </div>
                                    );
                                  }
                                })}
                              </ul>
                              {(companyName === "Tele2" ||
                                companyName === "Canal Digitaal" ||
                                companyName === "Ziggo") && (
                                <p className="diensten">
                                  <strong>Diensten: </strong>
                                  {internet && `${internet},`}
                                  {televisie && `${televisie},`}
                                  {vasteTelefonie && `${vasteTelefonie},`}
                                  {mobieleTelefonie && `${mobieleTelefonie},`}
                                </p>
                              )}
                            </div>
                            <div className="midtopSection">
                              <p>{info?.reason ? <>{info?.reason}</> : ""}</p>
                              {/* <p>{info.reason || <span>[Reden]*</span>}</p> */}
                              <p>
                                Ik verzoek u conform de overeenkomst te handelen
                                tot aan de datum van opzegging en de
                                incassomachtiging te beëindigen.{" "}
                                {ontvangen && (
                                  <span>
                                    Ook wens ik niet langer geadresseerde post
                                    voor reclamedoeleinden te ontvangen.
                                  </span>
                                )}
                              </p>
                              <p>
                                Graag ontvang ik een bevestiging van de
                                beëindiging van de overeenkomst. Deze
                                bevestiging kunt u per post versturen aan het
                                bovenstaande adres.
                              </p>
                              <p>Met vriendelijke groet</p>
                            </div>
                            <div className="midTopLevel">
                              <div className="sign-svg">
                                {info.voornaam ? info.voornaam : ""}{" "}
                                {info.achternaam ? info.achternaam : ""}
                                <span>
                                  {info.voornaam === "" &&
                                  info.achternaam === "" ? (
                                    <>[handtekening]*</>
                                  ) : (
                                    <></>
                                  )}
                                </span>
                              </div>
                              <p className="topMargPara">
                                {info?.voornaam ? (
                                  <>{info.voornaam}</>
                                ) : (
                                  <>[Voornaam]*</>
                                )}{" "}
                                {info?.achternaam ? (
                                  <>{info.achternaam}</>
                                ) : (
                                  <>[Achternaam]*</>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="downloadText">
                          {" "}
                          <i
                            onClick={printPdf}
                            className="downloadFix fa-regular fa-download"
                          ></i>
                        </p>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </section>
          <section className="text-section desk-acc">
            <div className="container bg-col-book aos-init aos-animate">
              {content?.map((item, index) => {
                if (item.key === "paragraph") {
                  return (
                    <div className="row" key={index}>
                      <div className="col-lg-12">
                        <p>{item.value}</p>
                      </div>
                    </div>
                  );
                } else if (item.key === "point") {
                  return (
                    <div className="row" key={index}>
                      <div className="col-lg-12">
                        <h4>{item.heading}</h4>
                        <ul>
                          {item.value.map((arritem, index) => {
                            return (
                              <li key={index}>
                                <strong>{Object.keys(arritem)}</strong> :{" "}
                                {Object.values(arritem)}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  );
                } else if (item.key === "normal") {
                  return (
                    <div className="row" key={index}>
                      <div className="col-lg-12">
                        <h4>{item.heading}</h4>
                        <p>{item.value}</p>
                      </div>
                    </div>
                  );
                } else if (item.key === "step") {
                  return (
                    <div className="row" key={index}>
                      <div className="col-lg-12">
                        <p>
                          <strong>{item.heading}: </strong>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                } else if (item.key === "keypoint") {
                  return (
                    <div className="row" key={index}>
                      <div className="col-lg-12">
                        <p>
                          <strong>{item.heading}: </strong>
                        </p>
                        <p>{item.value}</p>
                      </div>
                      <div className="col-lg-12">
                        <ul>
                          {item?.point?.map((pointItem, index) => {
                            return <li key={index}>{pointItem}</li>;
                          })}
                        </ul>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </section>

          <section
            id="accordian"
            className="d-flex justify-content-center mobile"
          >
            <LetterAccordian content={content} companyName={companyName} />
          </section>
        </div>
      </main>

      <div className="wave">
        <img src={'/assets/images/subtract.png'} alt="wave"></img>
      </div>
    </>
  );
};

export default CompanyLetter;
