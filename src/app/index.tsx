import React, {Fragment} from 'react';
import {connect} from "react-redux";
import HomeView from '../views/home.view';
import PerformanceDetailView from '@/views/performance/performance.detail.view';
import PerformanceListView from '@/views/performance/performance.list.view';
import PerformanceSelectView from '@/views/performance/performance.select.view';
import BuyerView from  "@/views/manage/buyer.view";
import AddBuyerView from "@/views/manage/add.buyer.view";
import OrderDetailView from "@/views/order/order.detail.view";
import CityLayer from '@/components/city.layer';
import {Router, Switch, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import LocationManager from "@/util/LocationManager";
import GlobalConstant from "@/util/GlobalConstant";
import NetworkCity from "@/network/NetworkCity";
import 'cola.css/dist/index.min.css';
import './index.scss';
import AccountManager from "@/util/AccountManager";
import Navigator from "@/components/navigator";
import {NavigatorContext} from "@/util/Context";
import NetworkAccount from "@/network/NetworkAccount";

const history = createBrowserHistory();
class App extends React.Component<any, {
    locationStatus: string,
    locationCityStatus: string,
    cityList: CityModel[],
    loadOpenIdFinish: boolean
}>{
    constructor(props) {
        super(props);
        this.state = {
            locationStatus: 'resting',
            locationCityStatus: 'resting',
            cityList: [],
            loadOpenIdFinish: false
        }
    }

    prepareAccount(){
        NetworkAccount.decrypt(AccountManager.accountInfo().secretObject).then(data => {
            NetworkAccount.login(JSON.stringify({openId: data.userid, type: ''}))
                .then((data) => {
                    AccountManager.updateAccountOpenId(data.openId);
                    this.setState({
                        loadOpenIdFinish: true
                    });
                    return data.openId;
                }, error => {
                    console.log(error)
                })
        }, error => {
            console.log(error);
        });
    }

    async componentDidMount() {
        this.prepareAccount();
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
            <Router basename={process.env.NODE_ENV === 'development' ? '/' : '/damai'} history={history}>
                <Switch>
                    <Route exact path="/">
                        <HomeView/>
                    </Route>
                    <Route exact path="/buyer">
                        <BuyerView/>
                    </Route>
                    <Route exact path="/add-buyer">
                        <AddBuyerView/>
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
                    <Route exact path="/order-detail">
                        <OrderDetailView/>
                    </Route>
                </Switch>
            </Router>
        )
    }

    render(){
        const {locationCityStatus, cityList, loadOpenIdFinish} = this.state;
        const {isShowCityLayer, navigator} = this.props;
        if (locationCityStatus !== 'success' && locationCityStatus !== 'failure'){
            return null;
        }
        if (!loadOpenIdFinish) return null;
        return (
            <NavigatorContext.Provider value={navigator}>
                <div className="App">
                    <Navigator history={history}/>
                    { isShowCityLayer ? <CityLayer cityList={cityList}/> : this.renderRouter() }
                </div>
            </NavigatorContext.Provider>
        );
    }
}

export default connect(
    state => ({
        isShowCityLayer: state['ui']['layer']['cityLayer'],
        navigator: state['ui']['navigator'],
    }),
)(App);

