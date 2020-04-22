import React from 'react';
import {connect} from "react-redux";
import HomeView from '../views/home.view';
import PerformanceDetailView from '../views/performance.detail.view';
import PerformanceListView from '../views/performance.list.view';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import './index.scss';
import 'cola.css/dist/index.min.css';
import LocationManager from "@/util/LocationManager";

class App extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        LocationManager.defaultManager().getLocation().then(data => {
            console.log(data);
        }, error => {
            console.log(error);
        });
    }

    render(){
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <HomeView/>
                        </Route>
                        <Route exact path="/performance-detail">
                            <PerformanceDetailView/>
                        </Route>
                        <Route exact path="/performance-list">
                            <PerformanceListView/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default connect(
    state => ({
        location: state['location']
    })
)(App);
