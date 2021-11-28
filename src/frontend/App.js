import './App.css';
import WaitForAdmin from './User/WaitForAdmin';
import Header from './Header'
import Footer from './User/Footer'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checking from './Checking'
import Deposite from './admin/Deposite'
import Withdraw from './admin/Withdraw'
import Admin_User from './Admin_User';
import Userlogin from './Userlogin';
import Adminlogin from './Adminlogin';
import User_signup from './User_signup';
import AdminHeader from './AdminHeader';
import AdminChecking from './AdminChecking';
import Openaccount from "./admin/Openaccount";
import Deleteaccount from './admin/Deleteaccount'
import MakeTransaction from './User/MakeTransaction';
import Pending from './admin/Pending'
import SeeChecking from './SeeChecking'
import Internal from './Internal'
import SeeSaving from './SeeSaving'

function App() {
  return (
    <Router>
        <div className="app">
          <Switch>
            <Route path="/checking">
              <Header/>
              <Checking />
            </Route>
            <Route path="/adminpage">
              <AdminHeader/>
              <AdminChecking />
            </Route>
            <Route path="/pending">
              <AdminHeader />
              <Pending />
            </Route>
            <Route path="/deposite">
              <AdminHeader />
              <Deposite />
            </Route>
            <Route path="/seechecking">
              <Header />
              <SeeChecking />
            </Route>
            <Route path="/seesaving">
              <Header />
              <SeeSaving />
            </Route>
            <Route path="/withdraw">
              <AdminHeader />
              <Withdraw />
            </Route>
            <Route path="/transaction">
              <Header />
              <MakeTransaction />
            </Route>
            <Route path="/adminlogin">
              <Adminlogin />
            </Route>
            <Route path="/openaccount">
              <AdminHeader />
              <Openaccount />
            </Route>
            <Route path="/remaccount">
              <AdminHeader />
              <Deleteaccount />
            </Route>
            <Route path="/userlogin">
              <Userlogin />
            </Route>
            <Route path="/afterlogin">
              <Header />
              <WaitForAdmin />
              <Footer />
            </Route>
            <Route path="/internal">
              <Header />
              <Internal />
            </Route>
            <Route path="/User_signup">
              <User_signup />
            </Route>
            <Route path="/">
                <Admin_User />
            </Route>
          </Switch>
        </div>
    </Router>
  );
}

export default App;
