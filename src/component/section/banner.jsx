


const subTitle = "";
const title = <h2 className="title"><span className="d-lg-block">Spring Field</span> Junior High School</h2>;
const desc = "Welcome to Spring Field Junior High School, where we nurture young minds to shape a bright future. Located in the beautiful city of Haldwani, Uttrakhand our school offers a comprehensive educational experience for students from nursery to 8th class. Discover our engaging curriculum, dedicated staff, and vibrant community by exploring our website.";


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
                                <h6 className="subtitle text-uppercase fw-medium">{subTitle}</h6>
                                {title}
                                <p className="desc">{desc}</p>
                              
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
                        <div className="col-xxl-6 col-xl-6">
                            <div className="banner-thumb">
                                <img src="assets/images/banner/02.png" alt="img" />
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