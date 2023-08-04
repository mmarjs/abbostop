import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { API_URL } from "../../../config";
import { useRouter } from 'next/router'

const Category = () => {
  const [allCompanies, setAllCompanies] = useState([]);
  const [categoryName, setCategoryName] = useState({});
  const [categoryContent, setCategoryContent] = useState([]);
  const [count, setCount] = useState(0);
  const router = useRouter();
  var id = router.query.id;
  if (router.query.name == "verzekeringen") {
    id = "649ef6605002c4e803195bfe";
  }
  if (router.query.name == "mobiele-telefonie") {
    id = "649ef54c43ae16a0e205989a";
  }
  if (router.query.name == "fitness") {
    id = "649ef3a043ae16a0e2059882";
  }
  if (router.query.name == "goede-doelen") {
    id = "649ef4a743ae16a0e205988b";
  }
  
  const fetchAllCategories = async (companyUrl) => {
    await axios
      .get(companyUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setCategoryName(res.data?.category);
        setAllCompanies(res.data?.company);
        setCount(res.data?.company?.length);
        setCategoryContent(res.data?.category?.categoryContent);
      })
      .catch((error) => {
        console.log("Error :" + error);
      });
  };

  useEffect(() => {
    if(router.isReady){
      let companyUrl = `${API_URL}/category/route/${router.query.name}`
      fetchAllCategories(companyUrl);
      fetchAllCompany();
    }
  }, [router.isReady]);

  useEffect(() => {
    document.title = categoryName?.Title;
    document.getElementsByTagName("META")[2].content = categoryName?.Meta
      ? categoryName?.Meta
      : "Letter - Abbostop";
  }, [categoryName]);
  
  const fetchAllCompany = async () => {
    let companyUrl = `${API_URL}/company`;
    await axios
      .get(companyUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setAllCompany(res.data?.result);
      })
      .catch((error) => {
        console.log("Error :" + error);
      });
  };

  const groupedArray = mapAndSortArrayByAlphabet(allCompanies);
  function mapAndSortArrayByAlphabet(arr) {
    const sortedArray = arr?.sort();

    const groupedArray = sortedArray?.reduce((grouped, element) => {
      const alphabet = element.companyName.charAt(0).toUpperCase();

      grouped[alphabet] = grouped[alphabet] || [];

      grouped[alphabet].push(element);

      return grouped;
    }, {});
    return groupedArray;
  }

  return (
    <main id="main">
        <div className="bgForcatPage cate sub-comp">
            <section className="breadcrumbs category sub-comp">
            <div className="container">
                <div className="row">
                <div className="col-md-6 breadcrumb-section">
                    <ol>
                        <li>
                            <Link href="/">Opzeggen</Link>
                        </li>
                        <li>
                            <Link href="/categorieen">Categorieën</Link>
                        </li>
                        <li className="active">
                            <Link href="#">{categoryName?.categoryName}</Link>
                        </li>
                    </ol>
                </div>
                </div>
            </div>
            </section>
            <section className="categorieen sub-comp" id="">
            <div className="container category-sec">
                <div className="row">
                <h1>{categoryName?.categoryName}</h1>
                <p className="sub-heading">
                    Er zijn {count} opzegbrieven in de categorie{" "}
                    {categoryName?.categoryName}
                </p>
                </div>
                <div className="category-image">
                <div
                    className="svg-cat"
                    dangerouslySetInnerHTML={{
                    __html: categoryName?.categoryLogo,
                    }}
                ></div>
                {/* <img src={catimg} alt="cat-img" /> */}
                </div>
            </div>
            <div className="search-container row category">
            </div>
            <div className="search-companies container">
                {groupedArray && Object?.entries(groupedArray)
                ?.sort((a, b) => a[0].localeCompare(b[0]))
                ?.map((item, index) => {
                    return (
                    <div key={index}>
                        <div className="company-listing" key={index}>
                        <h2 className="alph-name">{item[0]}</h2>
                        {item[1]?.map((name) => {
                            return (
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
                                as={`/${name.route}-opzeggen`}
                                // to={`/${name.route}-opzeggen`}
                                // state={{
                                // companyName: name.companyName,
                                // categoryName: name.category.categoryName,
                                // Address: name.Address,
                                // categoryId: name.category._id,
                                // content: name?.Content,
                                // fields: name?.Fields,
                                // }}
                                key={name._id}
                                onClick={() => {
                                window.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: "smooth",
                                });
                                }}
                            >
                                {name.companyName}
                            </Link>
                            );
                        })}
                        </div>
                    </div>
                    );
                })}
            </div>
            </section>
            <section className="company-listing"></section>
            <section className="catogory-content text-section sub-comp">
            <div className="container">
                {categoryContent?.map((item, index) => {
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
                            {item.point.map((arritem, index) => {
                            return <li key={index}>{arritem}</li>;
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
                        <div>
                            <h4>{item.heading}: </h4>
                            {item.value}
                        </div>
                        <ul>
                            {item.step.map((arritem, index) => {
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
                }
                })}
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

export default Category;
