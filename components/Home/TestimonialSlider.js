import React from "react";

export default function Testimonial() {
  return (
    <div className="d-flex align-items-center testimonial-box">
      <div className="">
        <div
          id="mycarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-bs-target="#mycarousel"
              data-bs-slide-to="0"
              className="active"
            ></li>
            <li data-bs-target="#mycarousel" data-bs-slide-to="1"></li>
            <li data-bs-target="#mycarousel" data-bs-slide-to="2"></li>
          </ol>
          <div className="carousel-inner pb-5">
            <p
              className="sub-headingtext text-center px-4
                pt-4 pb-4"
            >
              Wat mensen zeggen over het platform
            </p>
            <div className="carousel-item active">
              <div className="row px-3">
                <div className="col-lg-4 d-flex justify-content-center pb-3">
                  {/* <img src={Quotation_marks} className="testimonial-QM-img" /> */}
                  <img src={'/assets/images/blog1.png'} className="testimonial-img" alt="..." />
                </div>
                <div className="col-lg-8">
                  <div className="d-flex flex-column padd">
                    <div className="name d-flex mt-4 order-lg-2">
                      <div className="text-blue fs-sm fw-bold">
                        Tim Hoekstra <br />
                        <div className="small">
                          Heeft VriendenLoterij opgezegd
                        </div>
                      </div>
                      <div className="mx-5 d-flex gap-2 mt-1">
                        <i className="fa fa-star mb-0"></i>
                        <i className="fa fa-star mb-0"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                    </div>
                    <p className="review-text text-wrap order-lg-1">
                      Ging super snel en eenvoudig, echt klantvriendelijk!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row px-3">
                <div className="col-lg-4 d-flex justify-content-center pb-3">
                  {/* <img src={Quotation_marks} className="testimonial-QM-img" /> */}
                  <img src={'/assets/images/blog2.png'} className="testimonial-img" alt="..." />
                </div>
                <div className="col-lg-8">
                  <div className="d-flex flex-column mt-4  ">
                    <div className="name d-flex order-lg-2">
                      <p className="text-blue fs-sm fw-bold">
                        Laura van der Linden <br />
                        <small className="small">
                          Heeft Netflix opgezegd
                        </small>
                      </p>
                      <div className="mx-5 d-flex gap-2 mt-1">
                        <i className="fa fa-star mb-0"></i>
                        <i className="fa fa-star mb-0"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                    </div>
                    <p className="review-text mt-2 order-lg-1">
                      Helemaal top! Snel geregeld en netjes afgewerkt, dank je
                      wel en een fijne dag!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="carousel-item">
              <div className="row px-3">
                <div className="col-lg-4 d-flex justify-content-center pb-3">
                  {/* <img src={Quotation_marks} className="testimonial-QM-img" /> */}
                  <img src={'/assets/images/blog3.png'} className="testimonial-img" alt="..." />
                </div>
                <div className="col-lg-8">
                  <div className="d-flex flex-column mt-4 padd">
                    <div className="name d-flex order-lg-2">
                      <p className="text-blue fs-sm fw-bold">
                        Elise Brouwer <br />
                        <small className="small">
                          Heeft Basic-Fit opgezegd
                        </small>
                      </p>
                      <div className="mx-5 d-flex gap-2 mt-1">
                        <i className="fa fa-star mb-0"></i>
                        <i className="fa fa-star mb-0"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </div>
                    </div>
                    <p className="review-text mt-2 order-lg-1">
                      Betrouwbaar en snel!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
