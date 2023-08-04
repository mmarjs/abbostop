import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const Blog = () => {
  return (
    <div className="">
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all .15"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        //   deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        className=""
      >
        <div className="carousel-card-container">
          <img src={'/assets/images/caro-img-1.png'} className="carousel-img" />
          <div className="carousel-card  p-4 bg-card-1">
            <p className="text-white fw-bold carousel-font-size">
              De milieu-effecten van abonnementen
            </p>
            <p className="text-white carousel-font-size">
              Een manier waarop we ons steentje kunnen bijdragen aan een ...
            </p>
            <p className="carousel-font-size">05 mei 2023</p>
            <p className="fw-bolder carousel-font-size">Lees verder</p>
          </div>
        </div>
        <div className="carousel-card-container">
          <img src={'/assets/images/caro-img-2.png'} className="carousel-img" />
          <div className="carousel-card  p-4 bg-card-2">
            <p className="text-white fw-bold carousel-font-size">
              De milieu-effecten van abonnementen
            </p>
            <p className="text-white carousel-font-size">
              Een manier waarop we ons steentje kunnen bijdragen aan een ...
            </p>
            <p className="carousel-font-size">05 mei 2023</p>
            <p className="fw-bolder carousel-font-size">Lees verder</p>
          </div>
        </div>
        <div className="carousel-card-container">
          <img src={'/assets/images/caro-img-3.png'} className="carousel-img" />
          <div className="carousel-card  p-4 bg-card-3">
            <p className="text-white fw-bold carousel-font-size">
              De milieu-effecten van abonnementen
            </p>
            <p className="text-white carousel-font-size">
              Een manier waarop we ons steentje kunnen bijdragen aan een ...
            </p>
            <p className="carousel-font-size">05 mei 2023</p>
            <p className="fw-bolder carousel-font-size">Lees verder</p>
          </div>
        </div>
        <div className="carousel-card-container">
          <img src={'/assets/images/caro-img-2.png'} className="carousel-img" />
          <div className="carousel-card  p-4 bg-card-1">
            <p className="text-white fw-bold carousel-font-size">
              De milieu-effecten van abonnementen
            </p>
            <p className="text-white carousel-font-size">
              Een manier waarop we ons steentje kunnen bijdragen aan een ...
            </p>
            <p className="carousel-font-size">05 mei 2023</p>
            <p className="fw-bolder carousel-font-size">Lees verder</p>
          </div>
        </div>
        <div className="carousel-card-container">
          <img src={'/assets/images/caro-img-3.png'} className="carousel-img" />
          <div className="carousel-card  p-4 bg-card-2">
            <p className="text-white fw-bold carousel-font-size">
              De milieu-effecten van abonnementen
            </p>
            <p className="text-white carousel-font-size">
              Een manier waarop we ons steentje kunnen bijdragen aan een ...
            </p>
            <p className="carousel-font-size">05 mei 2023</p>
            <p className="fw-bolder carousel-font-size">Lees verder</p>
          </div>
        </div>
        <div className="carousel-card-container">
          <img src={'/assets/images/caro-img-1.png'} className="carousel-img" />
          <div className="carousel-card  p-4 bg-card-3">
            <p className="text-white fw-bold carousel-font-size">
              De milieu-effecten van abonnementen
            </p>
            <p className="text-white carousel-font-size">
              Een manier waarop we ons steentje kunnen bijdragen aan een ...
            </p>
            <p className="carousel-font-size">05 mei 2023</p>
            <p className="fw-bolder carousel-font-size">Lees verder</p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Blog;
