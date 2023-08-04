import React, { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import axios from "axios";
import html2canvas from "html2canvas";
import { API_URL } from "../../config";
import { data } from "../../utils/data";
import { fnv } from "../../utils/data";
import { fbto } from "../../utils/data";
import { dgp } from "../../utils/data";
import LetterAccordian from "../../components/Letter/LetterAccordian";
import Link from "next/link";
import { useRouter } from 'next/router'

const Letter = () => {
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

  const [ontvangen, setOntvangen] = useState(false);
  const [sportsAddress, setSportsAddress] = useState("");
  const [fnvAddress, setFnvAddress] = useState("");
  const [fbtoAddress, setFbtoAddress] = useState([]);
  const [dgpAddress, setDgpAddress] = useState([]);
  const [internet, setInternet] = useState("");
  const [televisie, setTelevisie] = useState("");
  const [vasteTelefonie, setVasteTelefonie] = useState("");
  const [mobieleTelefonie, setMobieleTelefonie] = useState("");
  const [mailboxId, setMailboxId] = useState("");

  const onOptionChangeHandler = (event) => {
    let selectVal = event.target.value;
    let val = data.filter((item) => item.key === selectVal);
    setSportsAddress(val[0].value);
  };
  const onOptionChangeHandlerFnv = (event) => {
    let selectVal = event.target.value;
    let val = fnv.filter((item) => item.key === selectVal);
    console.log(val);
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

  const companyName = companyUrlRoute?.companyName;
  const categoryName = companyUrlRoute?.category?.categoryName;
  const categoryRoute = companyUrlRoute?.category?.route;
  const address = companyUrlRoute?.Address;
  const categoryId = companyUrlRoute?.category?._id;
  const content = companyUrlRoute?.Content;
  const fields = companyUrlRoute?.Fields;

  const otherCountryCompany = [
    "HBO Max",
    "Nextory",
    "Tinder Gold",
    "Parship",
    "Discovery Plus",
    "Spotify",
    "Apple TV",
    "Zalando Plus",
    "SportCity",
    "FNV",
  ];

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
  const handleClick = async (e) => {
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
      let base64 = await convertToBase64();
      // console.log(base64)
      let data = {
        mailboxId: mailboxId,
        formData: info,
        company: companyUrlRoute?._id,
        companyName: companyUrlRoute?.companyName,
        letterPdf: base64,
      };
      console.log(data);
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
          // orderId
          if (response?.data) {
            console.log(
              window.origin + "/order/" + response?.data?.data?.orderId
            );
            console.log(response?.data?.data);
            window.location.href =
              window.origin + "/order/" + response?.data?.data?.orderId;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    if(router.isReady){
      document.title = companyUrlRoute?.Title
      ? companyUrlRoute?.Title
      : "Letter - Abbostop";
      document.title = companyUrlRoute?.Title
          ? companyUrlRoute?.Title
          : "Letter - Abbostop";
      document.getElementsByTagName("META")[2].name="description"
      document.getElementsByTagName("META")[2].content = companyUrlRoute?.Meta
          ? companyUrlRoute?.Meta
          : "Letter - Abbostop";

      getCompanyByRoute();
      getMailboxId();
    }
  }, [router.isReady]);

  const printRef = React.useRef();
  let signatureImg = React.createRef();

  const printGenerator = async () => {
    let companyName = "";
    let address = "";
    let letterDate = "";
    let subject = "";
    let greeting = "";
    let letterIntro = "";
    let requestSection = "";
    let ulElement = "";
    let liElements = "";
    let diensten = null;
    let reason = "";
    let endRequestMsg = "";
    let confirmAgreementMsg = "";
    let signoffMsg = "";
    let signature = "";
    let letterName = "";

    if (document.getElementById("companyName")) {
      companyName = document.getElementById("companyName").innerText;
    }
    if (document.getElementById("letter-address")) {
      address = document.getElementById("letter-address");
    }
    if (document.getElementById("letterDate")) {
      letterDate = document.getElementById("letterDate").innerText;
    }
    if (document.getElementById("subject")) {
      subject = document.getElementById("subject").innerText;
      console.log("---------------");
      console.log(subject);
    }
    if (document.getElementById("greeting")) {
      greeting = document.getElementById("greeting").innerText;
    }
    if (document.getElementById("letterIntro")) {
      letterIntro = document.getElementById("letterIntro").innerText;
    }
    if (document.getElementById("requestSection")) {
      requestSection = document.getElementById("requestSection").innerText;
    }
    if (document.querySelector("#fields")) {
      ulElement = document.querySelector("#fields");
    }

    if (ulElement.querySelectorAll("li")) {
      liElements = ulElement.querySelectorAll("li");
    }
    if (document.getElementById("diensten")) {
      diensten = document.getElementById("diensten").innerText;
    }
    if (document.getElementById("reason")) {
      reason = document.getElementById("reason").innerText;
    }
    if (document.getElementById("endRequestMsg")) {
      endRequestMsg = document.getElementById("endRequestMsg").innerText;
    }
    if (document.getElementById("confirmAgreementMsg")) {
      confirmAgreementMsg = document.getElementById(
        "confirmAgreementMsg"
      ).innerText;
    }
    if (document.getElementById("signoffMsg")) {
      signoffMsg = document.getElementById("signoffMsg").innerText;
    }
    if (document.getElementById("signature")) {
      signature = document.getElementById("signature");
    }
    if (document.getElementById("letterName")) {
      letterName = document.getElementById("letterName").innerText;
    }

    // const fontDataUrl = await getFontDataUrl();

    const doc = new jsPDF();
    const htmlElement = signatureImg.current;

    var htmlCanvas = await html2canvas(htmlElement);

    var htmlDataURL = htmlCanvas.toDataURL("image/png");

    //  debugger
    // Set the font family to 'Satisfy'
    let y = 45;
    let x = 25;
    let lineWrap = 220;
    letterIntro = doc.splitTextToSize(letterIntro, 250, 5);
    requestSection = doc.splitTextToSize(requestSection, 250, 5);
    confirmAgreementMsg = doc.splitTextToSize(confirmAgreementMsg, 250, 5);
    endRequestMsg = doc.splitTextToSize(endRequestMsg, 250, 5);
    reason = doc.splitTextToSize(reason, 250, 5);
    doc.setFontSize(10);
    doc.setTextColor(75, 85, 99);
    doc.setFont("Helvetica", "normal");
    console.log(address);
    console.log(doc.getFont());
    console.log(doc.getFont());
    doc.text(x, y, companyName);
    doc.text(x, (y += 5), "");
    address.childNodes.forEach(function (item) {
      doc.text(x, (y += 5), item.innerText);
    });
    doc.text(x, (y += 10), letterDate);
    doc.text(x, (y += 15), subject);
    doc.text(x, (y += 10), greeting);
    doc.text(x, (y += 4), "");
    letterIntro.forEach((line) => {
      doc.text(x, (y += 5), line);
    });
    doc.text(x, (y += 4), "");
    requestSection.forEach((line) => {
      doc.text(x, (y += 5), line);
    });
    doc.text(x, (y += 5), "");
    liElements.forEach((line, index) => {
      if (index % 2 == 0) {
        y += 7;
        doc.setFont("Helvetica", "Bold");
        doc.setTextColor(75, 85, 99);
        doc.text(x, y, line.innerText);
      } else {
        doc.setFont("Helvetica", "normal");
        doc.text(100, y, line.innerText);
      }
    });
    if (diensten) {
      diensten = diensten.split(":");
      doc.setFont("Helvetica", "Bold");
      console.log(console.log("Helvetica -----------"));
      console.log(doc.getFont());
      doc.text(x, (y += 5), `${diensten[0]}:`);
      doc.setFont("Helvetica", "normal");
      console.log("Mozaic----------------");
      console.log(doc.getFont());
      doc.text(x + 16, y, diensten[1]);
    }
    if (reason?.length > 0) {
      doc.text(x, (y += 4), "");
      reason.forEach((line) => {
        doc.text(x, (y += 5), line);
      });
    }

    endRequestMsg.forEach((line) => {
      doc.text(x, (y += 5), line);
    });
    doc.text(x, (y += 3), "");
    confirmAgreementMsg.forEach((line) => {
      doc.text(x, (y += 5), line);
    });
    doc.text(x, (y += 8), signoffMsg);

    // doc.setFont('DancingScript');

    // doc.setTextColor("#0090e3");
    // doc.setFontSize(25);
    // doc.text(x, (y += 3),``)
    doc.addImage(htmlDataURL, "JPEG", x, (y += 4), 155, 15);
    doc.text(x, (y += 12), ``);
    // doc.text(x, (y += 13), signature);
    console.log("satisfy------------a");
    console.log(doc.getFont());
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(75, 85, 99);
    doc.setFontSize(10);
    doc.text(x, (y += 7), letterName);
    console.log("Show all font in jsPDF", doc.getFontList());
    return doc;
  };

  const printPdf = async () => {
    const doc = await printGenerator();
    // doc.then((res)=>res.save(`${companyName}-letter.pdf`)).catch(err => console.log(err))
    doc.save(`${companyName}-letter.pdf`);
  };

  const convertToBase64 = async () => {
    const doc = await printGenerator();
    // doc.then((res) =>res).catch(err => err)
    const pdfBase64 = doc.output("datauristring"); // This returns the Base64
    const base64Data = pdfBase64.split(",")[1];
    return base64Data;
    // You can use this Base64 string as needed
  };

  return (
    <>
      <main id="main">
        {/* <div className="d-flex justify-content-center align-item-center">
      <Loader/>
        </div> */}
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
                        // to={`/categorieen/${categoryRoute
                        //   ?.toLowerCase()
                        //   .replaceAll(" ", "-")}`}
                        href={{
                            pathname: `/categorieen/${categoryRoute
                                ?.toLowerCase()
                                .replaceAll(" ", "-")}`,
                            query: {
                                id: categoryId,
                              }
                        }}
                        as={`/categorieen/${categoryRoute
                            ?.toLowerCase()
                            .replaceAll(" ", "-")}`}
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
                    {/* -<br /> */}
                  </p>
                </div>
                <div className="col-lg-4 col-sm-4 col-xs-4 arrow-mid-line">
                  <div className="svg-img">
                    <img src={'/assets/images/Icon_Brief3.svg'} />
                  </div>
                  <p>
                    <strong>Je brief wordt direct verstuurd. </strong>
                    {/* <br /> zo hoef je niets meer te doen{companyName} */}
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
                            {/* <img src={arrow} /> */}
                            <img src={'/assets/images/step-heading.svg'} />
                          </span>
                        </div>

                        <div className="line-arrow"></div>
                        <form>
                          <div className="row bg-trans">
                            {fields?.map((item, index) => {
                              let keyname = item.name;
                              return (
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
                              );
                            })}
                            {(companyName === "Vitens" ||
                              companyName === "Innova Energie" ||
                              companyName === "Budget Energie") && (
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
                                      {/* Kies een datum */}
                                      {/* {datumDate && ( */}
                                      {/* // <div className="form-group"> */}
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
                              companyName === "Storytel" ||
                              companyName === "Apple TV" ||
                              companyName === "Caiway" ||
                              companyName === "CV.nl" ||
                              companyName === "Cvster.nl" ||
                              companyName === "Knab" ||
                              companyName === "Kobo Plus" ||
                              companyName === "MAX Magazine" ||
                              companyName === "Mikro Gids" ||
                              companyName === "NRC Handelsblad" ||
                              companyName === "Plus Magazine" ||
                              companyName === "Tinder Gold" ||
                              companyName === "TrosKompas" ||
                              companyName === "VISpas" ||
                              companyName === "Zalando Plus" ||
                              companyName === "Pathé Unlimited") && (
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
                                  {/* {datumDate && (
                                    <div className="form-group">
                                      <input
                                        type="date"
                                        id="date-open"
                                        name="datumdate"
                                        className="showdatumdate"
                                        onChange={handleChange}
                                      />
                                    </div>
                                  )} */}
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
                                    {/* <label>Verhuisdatum / overdacht</label> */}
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
                                      {/* Kies een datum */}
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
                              companyName === "Canal Digitaal" ||
                              companyName === "Caiway") && (
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
                            {companyName === "Disney Plus" && (
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label htmlFor="reason">Betaalmethode</label>
                                  <textarea
                                    type="text"
                                    name="betaalmethode"
                                    placeholder="Credit Card (+ laatste 4 cijfers van de kaart) of Paypal (+ Paypal email adres) of IDEAL automatische incasso"
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
                              <p id="companyName">{companyName}</p>

                              <div id="letter-address" className="mt-3">
                                {companyName === "SportCity"
                                  ? sportsAddress
                                      ?.split(",")
                                      .map((address, index) => {
                                        return (
                                          <p className="address-linehight" key={index}>
                                            {address}
                                          </p>
                                        );
                                      })
                                  : companyName === "FNV"
                                  ? fnvAddress
                                      ?.split(",")
                                      .map((address, index) => {
                                        return (
                                          <p className="address-linehight" key={index}>
                                            {address}
                                          </p>
                                        );
                                      })
                                  : address?.split(",").map((adres, index) => {
                                      return (
                                        <p className="address-linehight" key={index}>
                                          {adres}
                                        </p>
                                      );
                                    })}
                                {!otherCountryCompany.includes(companyName) ? (
                                  <p className="county-addres">Nederland</p>
                                ) : (
                                  <></>
                                )}
                              </div>
                              {/* <p>3068 AV Rotterdam</p> */}
                            </div>
                            <div className="midSection">
                              <p id="letterDate">
                                {info.woonplaats || <span>[Woonplaats]*</span>}{" "}
                                ,{" "}
                                {new Date().getDate() +
                                  "-" +
                                  (new Date().getMonth() + 1) +
                                  "-" +
                                  new Date().getFullYear()}
                              </p>
                              <p id="subject">
                                {companyName === "FBTO" ? (
                                  <>{fbtoAddress}</>
                                ) : companyName === "DPG Media" ? (
                                  <>{dgpAddress}</>
                                ) : (
                                  <>
                                    Betreft: Beëindiging overeenkomst{" "}
                                    {companyName}
                                  </>
                                )}
                              </p>
                            </div>
                            <div className="midtopSection">
                              <p id="greeting">Geachte heer, mevrouw,</p>
                              {/* <p>{companyUrlRoute?.category?.letterIntro}</p> */}
                              <p id="letterIntro">
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
                              {/* {companyUrlRoute?.category?.letterIntro.map(
                                (item) => {
                                  let dateflag = false;
                                  if (dateflag == false) {
                                    return (
                                      <>
                                        <p>
                                          
                                          {item?.head}
                                          {datumDate ? (
                                            <>
                                              {item?.dateBefore +
                                              " " +
                                              info.datumdate
                                                ? info.datumdate
                                                : <>[Date*]</> +
                                                  " " +
                                                  item?.dateAfter}
                                            </>
                                          ) : (
                                            item?.soon
                                          )}
                                        </p>
                                      </>
                                    );
                                  }
                                  dateflag = true;
                                }
                              )} */}
                              <p id="requestSection">
                                Om de opzegging op een correcte wijze af te
                                handelen, staat hieronder een overzicht van mijn
                                gegevens:
                              </p>
                            </div>
                            <div className="bottomSectionTwo">
                              <ul id="fields">
                                {fields?.map((item, index) => {
                                  let keyname = item?.name;
                                  if (item.label.includes("(optioneel)")) {
                                    if (info[keyname]) {
                                      return (
                                        <div key={index} id="field">
                                          <li className="">
                                            {item.name === "opzeggen"
                                              ? "Vanaf wanneer wil je opzeggen?"
                                              : item.name === "lotnummers"
                                              ? "lotnummers"
                                              : item.label}
                                            {" : "}
                                          </li>

                                          <li className="fieldValue">
                                            {info[keyname] ? (
                                              <span>{info[keyname]}</span>
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
                                          {" : "}
                                        </li>
                                        <li className="fieldValue">
                                          {info[keyname] ? (
                                            <span>{info[keyname]}</span>
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
                                companyName === "Ziggo" ||
                                companyName === "Caiway") && (
                                <p className="diensten" id="diensten">
                                  <strong>Diensten: </strong>
                                  {internet && `${internet},`}
                                  {televisie && `${televisie},`}
                                  {vasteTelefonie && `${vasteTelefonie},`}
                                  {mobieleTelefonie && `${mobieleTelefonie},`}
                                </p>
                              )}
                            </div>
                            <div className="midtopSection">
                              <p id="reason">
                                {info?.reason ? <>{info?.reason}</> : ""}
                              </p>
                              {/* <p>{info.reason || <span>[Reden]*</span>}</p> */}
                              <p id="endRequestMsg">
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
                              <p id="confirmAgreementMsg">
                                Graag ontvang ik een bevestiging van de
                                beëindiging van de overeenkomst. Deze
                                bevestiging kunt u per post versturen aan het
                                bovenstaande adres.
                              </p>
                              <p id="signoffMsg">Met vriendelijke groet</p>
                            </div>
                            <div className="midTopLevel">
                              <div
                                ref={signatureImg}
                                className="sign-svg"
                                id="signature"
                              >
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
                              <p id="letterName" className="topMargPara">
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
                  // console.log(item);
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

export default Letter;
