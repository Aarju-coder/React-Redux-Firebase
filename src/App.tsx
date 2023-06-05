import { useEffect } from 'react';
import './App.css';
import { currentAuth } from './redux/firebaseState/selectors'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/type';
import { LoginComponent } from './components/pages/login';
import { LayoutComponent } from './components/navigationLayout/Layout';
import NotificationPage from './components/pages/notification';
import TutorialPage from './components/pages/tutorial';
import TermPage from './components/pages/terms';
import SurferSkinPage from './components/pages/surferSkins';
import SharkSkinPage from './components/pages/sharkSkins';
import PrivacyPolicyPage from './components/pages/privacyPolicy';
import PowerUpPage from './components/pages/powerup';
import Credits from './components/pages/credits';
import ContactUs from './components/pages/contactUs';
import PlayerPage from './components/pages/players';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import firebase from './firebase/config'
import { getUserByIdAction, setLoadingAction, setNeedVerification } from './redux/firebaseState/api';
import Loader from './components/UI/Loader';
import PromoPage from './components/pages/promoCode';
import MusicPage from './components/pages/musicVideo';
import AppPurchase from './components/pages/inAppPurchase';


const router = createBrowserRouter([
  {
    path: "AfterLogin",
    element: <LayoutComponent />,
    //errorElement: <ErrorPage />,
    children: [
      {
        path: "notification",
        element: <NotificationPage />,
      },
      {
        path: "music",
        element: <MusicPage />,
      },
      {
        path: "tutorial",
        element: <TutorialPage />,
      },
      {
        path: "term",
        element: <TermPage />,
      },
      {
        path: "surferSkin",
        element: <SurferSkinPage />,
      }, {
        path: "sharkSkin",
        element: <SharkSkinPage />,
      }, {
        path: "privacyPolicy",
        element: <PrivacyPolicyPage />,
      }, {
        path: "powerUp",
        element: <PowerUpPage />,
      }, {
        path: "credits",
        element: <Credits />,
      }, {
        path: "ContactUs",
        element: <ContactUs />,
      },
      {
        path: "Promo",
        element: <PromoPage />,
      },
      {
        path: "Purchase",
        element: <AppPurchase />,
      },
      {
        path: "",
        element: <PlayerPage />,
      },
    ],
  },
  {
    path: "*",
    element: <LoginComponent />,
  },

]);
function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector<RootState, RootState["auth"]>(currentAuth);
  
  console.log(router);
  // Check if user exists
  useEffect(() => {
    dispatch(setLoadingAction(true));
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
     
      if (user) {
        console.log("user in app", user.uid);
        //console.log("user in app", user)
        dispatch(setLoadingAction(true));
        dispatch(getUserByIdAction(user.uid));
        if (!user.emailVerified) {
          dispatch(setNeedVerification());
        }
      }
      dispatch(setLoadingAction(false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }
  return (
    <RouterProvider router={router} />
  );
}

export default App;
