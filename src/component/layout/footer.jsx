
import { Link } from "react-router-dom";

const newsTitle = "Want Us To Email You About Special Offers And Updates?";
const siteTitle = "Site Map";
const useTitle = "Useful Links";
const socialTitle = "Social Contact";
const supportTitle = "Our Support";


const siteList = [
    {
        text: 'Documentation',
        link: '#',
    },
    {
        text: 'Feedback',
        link: '#',
    },
    {
        text: 'Plugins',
        link: '#',
    },
    {
        text: 'Support Forums',
        link: '#',
    },
    {
        text: 'Themes',
        link: '#',
    },
]

const useList = [
    {
        text: 'About Us',
        link: '#',
    },
    {
        text: 'Help Link',
        link: '#',
    },
    {
        text: 'Terms & Conditions',
        link: '#',
    },
    {
        text: 'Contact Us',
        link: '#',
    },
    {
        text: 'Privacy Policy',
        link: '#',
    },
]

const socialList = [
    {
        text: 'Facebook',
        link: '#',
    },
    {
        text: 'Twitter',
        link: '#',
    },
    {
        text: 'Instagram',
        link: '#',
    },
    {
        text: 'YouTube',
        link: '#',
    },
    {
        text: 'Github',
        link: '#',
    },
]

const supportList = [
    {
        text: 'Help Center',
        link: '#',
    },
    {
        text: 'Paid with Mollie',
        link: '#',
    },
    {
        text: 'Status',
        link: '#',
    },
    {
        text: 'Changelog',
        link: '#',
    },
    {
        text: 'Contact Support',
        link: '#',
    },
]



const Footer = () => {
    return (
        <div className="news-footer-wrap">
          
            

            
            <footer>
              
                <div className="footer-bottom style-2">
                    <div className="container">
                        <div className="section-wrapper">
                            <p>&copy; 2023 Spring Field Junior High School</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
 
export default Footer;