import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegitserPage';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import SearchRide from './components/SearchRide';
import OfferRide from './components/OfferRide';
import NavBar from './components/NavBar';
import FooterBar from './components/FooterBar';
import Loading from './components/Loading';

import  PrivateRoute from './privateRoutes/privateRoute'
import  PrivateRouteSearch from './privateRoutes/privateRouteSearch'
import  PrivateRouteOffer from './privateRoutes/privateRouteOffer'



function App() {
  return (
    <div className="App">
      <BrowserRouter>

      <NavBar/>
      <Loading/>
      <Switch> 
       <Route exact path="/" component={HomePage}/>
       <Route exact path="/register" component={RegisterPage}/>
       <Route exact path="/login" component={LoginPage}/>
       <PrivateRoute exact path="/profile" component={ProfilePage}/>
       <PrivateRouteSearch exact path="/searchRide" component={SearchRide}/>
       <PrivateRouteOffer exact path="/offerRide" component={OfferRide}/>

      </Switch>

      <FooterBar/>

      </BrowserRouter>
    </div>
  );
}

export default App;
