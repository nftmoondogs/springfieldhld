


const subTitle = "";
const title = "Principal's Message";
const desc = "Welcome to Spring Field Junior High School, an institution committed to academic excellence and student empowerment. Our dedicated faculty and staff strive to provide a comprehensive education tailored to individual needs, fostering both intellectual growth and personal development. We pride ourselves on nurturing a diverse and vibrant learning community, equipped with state-of-the-art facilities and a dynamic curriculum. I encourage you to explore our website and learn about the enriching opportunities Spring Field Junior High School offers. Sincerely, Nighat Parveen Principal, Spring Field Junior High School.";



const aboutList = [
    {
        imgUrl: 'assets/images/about/icon/01.jpg',
        imgAlt: 'about icon rajibraj91 rajibraj',
        title: 'Skilled Instructors',
        desc: 'Distinctively provide acces mutfuncto users whereas communicate leveraged services',
    },
    {
        imgUrl: 'assets/images/about/icon/02.jpg',
        imgAlt: 'about icon rajibraj91 rajibraj',
        title: 'Get Certificate',
        desc: 'Distinctively provide acces mutfuncto users whereas communicate leveraged services',
    },
    {
        imgUrl: 'assets/images/about/icon/03.jpg',
        imgAlt: 'about icon rajibraj91 rajibraj',
        title: 'Online Classes',
        desc: 'Distinctively provide acces mutfuncto users whereas communicate leveraged services',
    },
]


const About = () => {
    return (
        <div className="about-section">
            <div className="container">
                <div className="row justify-content-center row-cols-xl-2 row-cols-1 align-items-end flex-row-reverse">
                    <div className="col">
                        <div className="about-right padding-tb">
                            <div className="section-header">
                                <span className="subtitle">{subTitle}</span>
                                <h1>Principal's Message</h1>
    <p>Welcome to Spring Field Junior High School, an institution committed to academic excellence and student empowerment. Our dedicated faculty and staff strive to provide a comprehensive education tailored to individual needs, fostering both intellectual growth and personal development.</p>
    <p>We pride ourselves on nurturing a diverse and vibrant learning community, equipped with great facilities and a dynamic curriculum. I encourage you to explore our website and learn about the enriching opportunities Spring Field Junior High School offers.</p>
    <p>Sincerely,</p>
    <p><br></br><strong>Principal, Spring Field Junior High School</strong></p>
                                
                            </div>
                            <div className="section-wrapper">
                        
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="about-left">
                            <div className="about-thumb">
                                <img src="assets/images/about/01.png" alt="about" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default About;