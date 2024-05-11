import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
// import { Slide } from "react-slideshow-image";
// import image1 from "../assets/images/image1.jpg";
// import image2 from "../assets/images/image2.jpg";
// import image3 from "../assets/images/image3.jpg";
// import "react-slideshow-image/dist/styles.css";

// const spanStyle = {
//   padding: "20px",
//   background: "#efefef",
//   color: "#000000",
// };

// const divStyle = {
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   backgroundSize: "cover",
//   height: "18.5rem",
// };
// const slideImages = [
//   {
//     url: image1,
//   },
//   {
//     url: image2,
//   },
//   {
//     url: image3,
//   },
// ];

export default function Home() {
  const addToCartHandler = () => {};


  return (
    <div className="home">
      <section></section>
      {/* <div className="slide-container">
        <Slide>
          {slideImages.map((slideImage, index) => (
            <div key={index}>
              <div
                style={{
                  ...divStyle,
                  backgroundImage: `url(${slideImage.url})`,
                }}
              >
                <span style={spanStyle}>{slideImage.caption}</span>
              </div>
            </div>
          ))}
        </Slide>
      </div> */}
      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More{" "}
        </Link>
      </h1>
      <main>
        <ProductCard
          productId="bada"
          name="MacBook"
          price={4545}
          stock={500}
          handler={addToCartHandler}
          photo="https://m.media-amazon.com/images/I/316ArzLeJ2L._SY445_SX342_QL70_FMwebp_.jpg"
        />
      </main>
    </div>
  );
}
