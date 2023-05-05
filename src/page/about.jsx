import { Fragment } from "react";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import AchievementTwo from "../component/section/achievement-2";
import Blog from "../component/section/blog";
import Instructor from "../component/section/instructor";
import Skill from "../component/section/skill";
import Student from "../component/section/student";




const subTitle = "Book List";



const AboutPage = () => {
    return ( 
        <Fragment>
        
            <PageHeader title={'Book List'} curPage={'Book List'} />
            <div className="iframe-container">
    <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTDi7IHo9o7iXqPzex3HMOCcFzj59pqjoP69vkDdBRDCYyYCi2PT5XDBXp_acSsm7oAMfhfN6oukBY7/pubhtml?widget=true&amp;headers=false" width="100%" height="10000"></iframe>
</div>

        </Fragment>
    );
}

export default AboutPage;
 