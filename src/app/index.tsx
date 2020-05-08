import React, {Fragment} from 'react';
import {connect} from "react-redux";
import HomeView from '../views/home.view';
import PerformanceDetailView from '@/views/performance/performance.detail.view';
import PerformanceListView from '@/views/performance/performance.list.view';
import PerformanceSelectView from '@/views/performance/performance.select.view';
import CityLayer from '@/components/city.layer';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import LocationManager from "@/util/LocationManager";
import GlobalConstant from "@/util/GlobalConstant";
import NetworkCity from "@/network/NetworkCity";
import NetworkAccount from "@/network/NetworkAccount";
import 'cola.css/dist/index.min.css';
import './index.scss';
import AccountManager from "@/util/AccountManager";


class App extends React.Component<any, {
    locationStatus: string,
    locationCityStatus: string,
    cityList: CityModel[],
}>{
    constructor(props) {
        super(props);
        this.state = {
            locationStatus: 'resting',
            locationCityStatus: 'resting',
            cityList: [],
        }
    }

    async componentDidMount() {
        NetworkAccount.login(AccountManager.accountInfo().sessionId).then(data => {
            console.log(data);
        }, error => {
            console.log(error);
        });
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

        this.fetchCityList();
    }

    async fetchCityList(){
        return NetworkCity.cityList().then(cityList => {
            this.setState({
                cityList
            });
            return cityList;
        }, error => {
            console.log(error);
        })
    }


    renderRouter(){
        return (
            <Router basename="/damai">
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
                    <Route exact path="/performance-select">
                        <PerformanceSelectView/>
                    </Route>
                </Switch>
            </Router>
        )
    }

    render(){
        const {locationCityStatus, cityList} = this.state;
        const {isShowCityLayer} = this.props;
        if (locationCityStatus !== 'success' && locationCityStatus !== 'failure'){
            return null;
        }
        return (
            <div className="App">
                { isShowCityLayer ? <CityLayer cityList={cityList}/> : this.renderRouter() }
            </div>
        );
    }
}

export default connect(
    state => ({
        isShowCityLayer: state['ui']['layer']['cityLayer'],
    }),
)(App);
