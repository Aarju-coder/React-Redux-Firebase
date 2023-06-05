import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


export const findPageTitle = (pageName: any) => {
    switch (pageName) {
        case "/AfterLogin/notification": return "Notification"
        case "/AfterLogin/surferSkin": return "Surfer Skin"
        case '/AfterLogin/sharkSkin': return "Shark Skin"
        case '/AfterLogin/powerUp': return "Power Up"
        case '/AfterLogin/tutorial': return "Tutorial"
        case '/AfterLogin/privacyPolicy': return "Privacy Policy"
        case '/AfterLogin/term': return 'Terms and Conditions'
        case '/AfterLogin/AboutUs': return 'About Us'
        case '/AfterLogin/ContactUs': return 'Contact Us'
        default: return "Players"
    }
}

export default function TopNavComponent() {
    const [pageTitle, setPageTitle] = useState("");
    const location = useLocation();
    useEffect(() => {
        console.log(location)
        setPageTitle(findPageTitle(location.pathname))
    },[location])
    function toggle() {
        const sidebarToggle = document.body.querySelector('#sidebarToggle');
        if (sidebarToggle) {
            // Uncomment Below to persist sidebar toggle between refreshes
            // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
            //     document.body.classList.toggle('sb-sidenav-toggled');
            // }
            console.log("sidebar toggle")
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', String(document.body.classList.contains('sb-sidenav-toggled')));

        }
    }
    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark">
            {/* {Players.map(players => (<>
        
      </>))} */}

            {/* <!-- Navbar Brand--> */}
            <a className="navbar-brand ps-3" href="index.html">
                <img src={"/assets/img/SurfSharks.svg"} alt="SurfShark.svg" />
            </a>
            {/* <!-- Sidebar Toggle--> */}
            <button onClick={() => toggle()} className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0 d-lg-none" id="sidebarToggle"><i className="fas fa-bars"></i></button>

            {/* <!-- page title --> */}
            <h1 className="pageTitle" >
                {pageTitle}
            </h1>
            {/* <!-- Navbar Search--> */}
            {/* <form className="d-none d-md-inline-block form-inline searchInput me-0 me-md-3 my-2 my-md-0">
                <div className="input-group">
                    <button className="btn btn-primary p-0 bg-transparent border-0" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
                    <input className="form-control" type="text" placeholder="Search..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                </div>
            </form> */}
            {/* <!-- Navbar--> */}
            <div className="loggedUser ms-auto me-3 me-lg-4">
                <div className="name">
                    <div className="userTitle">Game Admin</div>
                    <div className="userSubTitle">Game Admin</div>
                </div>
                <div className="pic">
                    <img src={"/assets/img/snap.png"} alt="snap" />
                </div>
            </div>
        </nav>
    );
}