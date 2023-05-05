
import { Link } from "react-router-dom";
import Rating from "../sidebar/rating";


const subTitle = "World-class Instructors";
const title = "Classes Taught By Real Creators";

const contactList = [
    {
        imgUrl: 'assets/images/icon/01.png',
        imgAlt: 'contact icon',
        title: 'Address',
        desc: 'Behind Ara Machine, Kidwai Nagar, Haldwani (Nainital) Uttrakhand',
    },
    {
        imgUrl: 'assets/images/icon/02.png',
        imgAlt: 'contact icon',
        title: 'Phone number',
        desc: '+91 8881177767',
    },
    {
        imgUrl: 'assets/images/icon/03.png',
        imgAlt: 'contact icon',
        title: 'Send email',
        desc: 'springfieldhld@gmail.com',
    },
    {
        imgUrl: 'assets/images/icon/04.png',
        imgAlt: 'contact icon',
        title: 'Our website',
        desc: 'www.springfieldhld.com',
    },
]

const instructorList = [
    {
        imgUrl: 'assets/images/instructor/01.jpg',
        imgAlt: 'instructor rajibraj91 rajibraj',
        name: 'Emilee Logan',
        degi: 'Master of Education Degree',
        courseCount: '08 courses',
        studentAnroll: '30 students',
    },
    {
        imgUrl: 'assets/images/instructor/02.jpg',
        imgAlt: 'instructor rajibraj91 rajibraj',
        name: 'Donald Logan',
        degi: 'Master of Education Degree',
        courseCount: '08 courses',
        studentAnroll: '30 students',
    },
    {
        imgUrl: 'assets/images/instructor/03.jpg',
        imgAlt: 'instructor rajibraj91 rajibraj',
        name: 'Oliver Porter',
        degi: 'Master of Education Degree',
        courseCount: '08 courses',
        studentAnroll: '30 students',
    },
    {
        imgUrl: 'assets/images/instructor/04.jpg',
        imgAlt: 'instructor rajibraj91 rajibraj',
        name: 'Nahla Jones',
        degi: 'Master of Education Degree',
        courseCount: '08 courses',
        studentAnroll: '30 students',
    },
]


const Instructor = () => {
    return (
        <div className="map-address-section padding-tb section-bg">
                <div className="container">
                    <div className="section-header text-center">
                   
                    </div>
                    <div className="section-wrapper">
                        <div className="row flex-row-reverse">
                            <div className="col-xl-4 col-lg-5 col-12">
                                <div className="contact-wrapper">
                                    {contactList.map((val, i) => (
                                        <div className="contact-item" key={i}>
                                            <div className="contact-thumb">
                                                <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                            </div>
                                            <div className="contact-content">
                                                <h6 className="title">{val.title}</h6>
                                                <p>{val.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-xl-8 col-lg-7 col-12">
                            <div className="banner-thumb">
                                <img src="assets/images/choose/01.png" alt="img" />
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}
 
export default Instructor;