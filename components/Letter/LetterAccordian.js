import React from "react";

const LetterAccordian = (props) => {
  return (
    <section className=" accordian-box">
        <div>
            <div className="accordion" id="myAccordion">
                <div className="accordion-item ">
                    <h2 className="accordion-header" id="headingOne">
                    <button
                        type="button"
                        className="text-secondary fw-bold accordion-button collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                    >
                        Meer informatie over het opzeggen van {props.companyName}
                    </button>
                    </h2>
                    <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    data-bs-parent="#myAccordion"
                    >
                    <div className="card-body">
                        {props.content?.map((item, index) => {
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
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default LetterAccordian;
