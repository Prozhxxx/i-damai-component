import React from 'react';
import {connect} from "react-redux";
import HomeView from '../views/home.view';
import PerformanceDetailView from '../views/performance.detail.view';
import PerformanceListView from '../views/performance.list.view';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import LocationManager from "@/util/LocationManager";
import GlobalConstant from "@/util/GlobalConstant";
import NetworkCity from "@/network/NetworkCity";
import 'cola.css/dist/index.min.css';
import './index.scss';


class App extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.state = {
            locationStatus: 'resting',
            locationCityStatus: 'resting',
        }
    }

    async componentDidMount() {
        const setStatePromise = (state) => {
            return new Promise((resolve) => {
                this.setState(state, resolve)
            })
        };
        await setStatePromise({ locationStatus: 'pending' });
        LocationManager.defaultManager().getLocation().then(data => {
            return setStatePromise({ locationStatus: 'success' })
        }, error => {
            console.log(error);
            return setStatePromise({ locationStatus: 'failure' })
        }).finally(async () => {
            await setStatePromise( {locationCityStatus: 'pending'} )
            NetworkCity.useParams('coordinate').cityByCoordinate().then(data => {
                const city = {
                    cityId: data.id,
                    name: data.name,
                    address: data.formatAddress,
                    hasLocationCity: true,
                };
                GlobalConstant.store.dispatch({
                    type: 'UPDATE_LOCATION_CITY',
                    data: { ...city }
                });
                GlobalConstant.store.dispatch({
                    type: 'UPDATE_USER_LOCATION_CITY',
                    data: { ...city }
                });
                return setStatePromise( {locationCityStatus: 'success'} )
            }, error => {
                console.log(error);
                return setStatePromise( {locationCityStatus: 'failure'} )
            })
        });
    }

    render(){
        const {locationCityStatus} = this.state;
        if (locationCityStatus !== 'success' && locationCityStatus !== 'failure'){
            return null;
        }
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
