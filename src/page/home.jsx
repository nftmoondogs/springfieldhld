import { Fragment, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import About from "../component/section/about";
import Achievement from "../component/section/achievement";
import Banner from "../component/section/banner";
import Category from "../component/section/category";
import Instructor from "../component/section/instructor";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <Fragment>
      <Header />
      <Banner />
      <About />
      <Category />
      <Achievement />
      <Instructor />
      <Footer />
    </Fragment>
  );
};

export default Home;
