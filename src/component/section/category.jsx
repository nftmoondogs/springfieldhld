


const subTitle = "";
const title = <h2 className="title"><span className="d-lg-block">Spring Field</span> Junior High School</h2>;
const desc = "";


const catagoryList = [

]


const shapeList = [

]

const Banner = () => {
    return (
        <section className="banner-section">
            <div className="container">
                <div className="section-wrapper">
                    <div className="row align-items-center">
                        <div className="col-xxl-6 col-xl-6 col-lg-10">
                            <div className="banner-content">
                            
                                <h1>Our Vision</h1>
    <p>At Spring Field Junior High School, we strive to cultivate a community of lifelong learners, prepared to excel in a constantly evolving global landscape. Our vision encompasses fostering intellectual curiosity, critical thinking, empathy, and resilience in our students.</p>
    <p>Through our dedicated faculty and staff, we deliver a comprehensive education tailored to individual strengths and interests. By embracing diversity and inclusivity, we aim to prepare our students to thrive in a multicultural world, empowering them to shape a brighter future for themselves and society.</p>
                              
                                <div className="banner-catagory d-flex flex-wrap">
                                    <p></p>
                                    <ul className="lab-ul d-flex flex-wrap">
                                        {catagoryList.map((val, i) => (
                                            <li key={i}><a href={val.link}>{val.name}</a></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl- col-xl-6">
                            <div className="banner-thumb">
                                <img src="assets/images/banner/01.png" alt="img" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
            <div className="cbs-content-list d-none">
                <ul className="lab-ul">
                    {shapeList.map((val, i) => (
                        <li className={val.className} key={i}><a href={val.link}>{val.name}</a></li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
 
export default Banner;