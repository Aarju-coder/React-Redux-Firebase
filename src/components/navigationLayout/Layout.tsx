import { useEffect, FC } from "react";
import TopNavComponent from './TopNav';
import SideLayoutComponent from './sideNav'
import SkinPupupComponent from "./SkinsPopup";
import PlayerDataPopup from "../UI/playerData";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  RootState } from "../../redux/type";
import { getAllPlayers } from "../../redux/players/api";
import { currentAuth } from "../../redux/firebaseState/selectors";
import { getAllCharachters } from "../../redux/charachters/api";
import { getPowerUps } from "../../redux/powerUps/api";
import { saveNotiffication } from "../../redux/notifiation/api";
import { getAllPromoCodes } from "../../redux/promocode/api";
import { getAllPurchases } from "../../redux/appPurchase/api";


export type playerData = {
  playerData: [];
}
export const LayoutComponent: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authenticated } = useSelector<RootState, RootState["auth"]>(currentAuth);
  

  useEffect(() => {
    if (!authenticated) {
      console.log("authenticated")
      navigate('/', {})
    }
  }, [authenticated, navigate])
 
  useEffect(()=>{
    if (authenticated) {
      dispatch(getAllCharachters(0));
      dispatch(getAllPlayers());
      dispatch(getPowerUps(0));
      dispatch(getAllPromoCodes());
      dispatch(getAllPurchases(0));
    }
      // saveNotiffication();
  },[]);
  console.log("layout Component")
  return (
    <div className="sb-nav-fixed">
      <TopNavComponent />
      <div id="layoutSidenav">
        <SideLayoutComponent />
        <div id="layoutSidenav_content">
          <main>
            <Outlet />
          </main>
           <footer className="py-4 bg-light mt-auto">
              <div className="container-fluid px-4">
                  <div className="d-flex align-items-center justify-content-between small">
                      <div className="text-muted">Copyright &copy; Your Website 2022</div>
                  </div>
              </div>
          </footer> 
        </div>
      </div>
      <SkinPupupComponent />
      <PlayerDataPopup />
    </div>
  );
}