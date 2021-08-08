import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

//import Components
// import NavigationBar from "./Components/navigation";

//import pages
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisPage from "./pages/register";

// import action
// import { keepLogin } from "./redux/action";
import {keepLogin} from "./redux/actions"

class App extends React.Component {
  componentDidMount() {
    let id = +localStorage.getItem("IdUser");
    // this.props.keepLogin(id);
    this.props.keepLogin(id)
  }
  render() {
    // if (this.props.role === "admin") {
    //   return (
    //     <div>
    //       <NavigationBar />
    //       <Switch>
    //         <Route path="/" component={HomePage} exact />
    //         <Route path="/login" component={LoginPage} />
    //         <Route path="/register" component={RegisPage} />
    //         <Route path="/details" component={Details} />
    //         <Route path="/cart" component={cart} />
    //         <Route path="/historyadmin" component={historyAdmin} />
    //         <Route path="*" component={NotFound} />
    //       </Switch>
    //     </div>
    //   );
    // } else if (this.props.role === "user") {
      return (
        <div>
         {/* <NavigationBar/> */}
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisPage} />
            
          </Switch>
          {/* <HomePage/> */}
          {/* <LoginPage/> */}
          {/* <RegisPage/> */}
        </div>
      );
    }
    // return (
    //   <div>
    //     <NavigationBar />
    //     <Switch>
    //       <Route path="/" component={HomePage} exact />
    //       <Route path="/login" component={LoginPage} />
    //       <Route path="/register" component={RegisPage} />
    //       <Route path="/details" component={Details} />
    //       <Route path="/cart" component={cart} />
    //       <Route path="/history" component={history} />
    //       <Route path="*" component={NotFound} />
    //     </Switch>
    //   </div>
    // );
  }

const mapStateToProps = (state) => {
  return {
    username : state.userReducer.username
  };
};
export default connect(mapStateToProps,{keepLogin}) (App);
