import { Fragment } from "react";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import Footer from "../component/layout/footer";
import BookList from "../component/section/BookList";

const AboutPage = () => {
    return ( 
        <Fragment>
            <Header />
            <PageHeader title={'Book List'} curPage={'Book List'} />
            <BookList />
            <Footer />
        </Fragment>
    );
}

export default AboutPage;