//import React, { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

export type playerData ={
    playerData: [];
}
export const findPageTitle = (pageName: any) => {
    switch(pageName){
        case "/AfterLogin/notification": return "Notification"
        case "/AfterLogin/surferSkin": return "SurferSkin"
        case '/AfterLogin/sharkSkin': return "SharkSkin"
        case '/AfterLogin/powerUp' : return "PowerUp"
        case '/AfterLogin/tutorial': return "Tutorial"
        case '/AfterLogin/privacyPolicy': return "PrivacyPolicy"
        case '/AfterLogin/term' : return 'TermsAndConditions'
        case '/AfterLogin/AboutUs' : return 'AboutUs'
        case '/AfterLogin/ContactUs' : return 'ContactUs'
        case '/AfterLogin/': return 'Players' 
        default: return "Players"
    }
}
export default function SideLayoutComponent(){
    const [childPage, setChildPage] = useState("");
    const location = useLocation();
    useEffect(()=>{
        console.log(location.pathname)
        setChildPage(findPageTitle(location.pathname))
        
        if(childPage){
            document.querySelectorAll('.nav-link')!.forEach((ele:any)=>{
                ele.classList.remove("active")
            });
            document.getElementById(childPage)!.classList.add("active")
        }
        
    },[location, childPage])

    function handleClick(e: any){
        e.preventDefault();
        window.open("https://play.google.com/console/u/0/developers/6350789107840497487/app/4976299613973479140/user-feedback/reviews"); 
        window.open("https://appstoreconnect.apple.com/apps/6446239864/appstore/activity/ios/ratingsResponses") 
    }
    
  return (
    <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
              <div className="sb-sidenav-menu">
                  <div className="nav pt-4">
                      <NavLink className="nav-link " to="/AfterLogin/" id="Players">
                          Players
                      </NavLink>
                      <NavLink className="nav-link " to="/AfterLogin/surferSkin" id="SurferSkin">
                          Surfer Skins
                      </NavLink>
                      <NavLink className="nav-link " to="/AfterLogin/sharkSkin" id="SharkSkin" >
                          Shark Skins
                          </NavLink>
                          <NavLink className="nav-link " to="/AfterLogin/powerUp" id="PowerUp">
                          Power-Ups
                          </NavLink>
                      <NavLink className="nav-link " to="/AfterLogin/tutorial" id="Tutorial">
                          Tutorial
                      </NavLink>
                      <a className="nav-link " rel="noreferrer" target="_blank" href="https://play.google.com/console/u/0/developers/6350789107840497487/app/4976299613973479140/user-feedback/reviews">
                      Rating & Reviews - PlayStore
                      </a>
                      <a className="nav-link " rel="noreferrer" target="_blank" href="https://appstoreconnect.apple.com/apps/6446239864/appstore/activity/ios/ratingsResponses">
                      Rating & Reviews - AppleStore
                      </a>
                      {/* <div className="nav-link " onClick={(e) => handleClick(e)}  >
                          Rating & Reviews
                      </div> */}
                      <NavLink className="nav-link" to="/AfterLogin/notification" id="Notification">
                          Notificans/Updates
                      </NavLink>
                      <NavLink className="nav-link" to="/AfterLogin/music" id="Music">
                          Music Video
                      </NavLink>
                      <a className="nav-link " rel="noreferrer" target="_blank" href="https://analytics.google.com/analytics/web/?authuser=0&hl=en#/p327703164/reports/dashboard?r=firebase-overview">
                          Report & Analytics
                      </a>
                      <a className="nav-link collapsed" data-bs-toggle="collapse"
                          data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts" type="button" href="#!">
                          Content
                          <div className="sb-sidenav-collapse-arrow"><i className="fa-solid fa-caret-down"></i></div>
                      </a>
                      <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne"
                          data-bs-parent="#sidenavAccordion">
                          <nav className="sb-sidenav-menu-nested nav">
                             {/* <NavLink className="nav-link " to="/AfterLogin/privacyPolicy" id="PrivacyPolicy">Credits</NavLink> */}
                             <NavLink className="nav-link " to="/AfterLogin/term" id="TermsAndConditions">Terms & Conditions</NavLink>
                             <NavLink className="nav-link " to="/AfterLogin/credits" id="AboutUs">Credits</NavLink>
                             <NavLink className="nav-link " to="/AfterLogin/ContactUs" id="ContactUs">Contact us</NavLink>
                             <NavLink className="nav-link " to="/AfterLogin/Promo" id="Promo">Promo Codes</NavLink>
                             <NavLink className="nav-link " to="/AfterLogin/Purchase" id="Promo">In App purchase</NavLink>
                          </nav>
                      </div>
                  </div>
              </div>
          </nav>
          <Outlet />
          </div>
    
    
  );
}