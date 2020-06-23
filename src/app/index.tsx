import React, {Fragment} from 'react';
import {connect} from "react-redux";
import CityLayer from '@/components/city.layer';
import {Router, Switch, Route} from 'react-router-dom';
import {Action, createBrowserHistory, Location} from 'history';
import LocationManager from "@/util/LocationManager";
import GlobalConstant from "@/util/GlobalConstant";
import NetworkCity from "@/network/NetworkCity";
import 'cola.css/dist/index.min.css';
import AccountManager from "@/util/AccountManager";
import Navigator from "@/components/navigator";
import {NavigatorContext} from "@/util/Context";
import NetworkAccount from "@/network/NetworkAccount";
import RouterManager, {routes} from "@/util/RouterManager";
import './index.scss';


const history = createBrowserHistory();
window.eventTarget = new EventTarget();

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
        return NetworkAccount.decrypt(AccountManager.accountSecret()).then(accont => {
            console.log(accont);
            return NetworkAccount.login(JSON.stringify({openId: accont.userid, type: ''}))
                .then((data) => {
                    AccountManager.updateAccount(accont);
                    this.setState({
                        loadOpenIdFinish: true
                    });
                    return data;
                }, error => {
                    console.log(error)
                })
        }, error => {
            console.log(error);
        });
    }

    async componentDidMount() {
        const getTitle = (location) => {
            const {pathname} = location;
            let title = '';
            if (pathname){
                title = routes.find(route => route.path === pathname)?.title ?? '';
            }
            return title;
        };
        RouterManager.updateNavigatorTitle(getTitle(history.location));
        RouterManager.updateNavigatorItem(null, null);
        history.listen((
            location,
            action,
        ) => {
            RouterManager.updateNavigatorTitle(getTitle(location));
            RouterManager.updateNavigatorItem(null, null);
        });
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
                    data: {...city}
                });
                GlobalConstant.store.dispatch({
                    type: 'UPDATE_USER_LOCATION_CITY',
                    data: {...city}
                });
                return setStatePromise({locationCityStatus: 'success'})
            }, error => {
                console.log(error);
                return setStatePromise({locationCityStatus: 'failure'})
            })
        });

        this.fetchCityList();
    }

    async fetchCityList() {
        return NetworkCity.cityList().then(cityList => {
            this.setState({
                cityList: cityList ?? []
            });
            return cityList;
        }, error => {
            console.log(error);
        })
    }


    renderRouter() {
        return (
            <Router basename={process.env.NODE_ENV === 'development' ? '/' : '/damai'} history={history}>
                <Switch>
                    {routes.map(route => {
                        return (
                            <route.component key={route.path} exact={route.exact} path={route.path}>
                            </route.component>
                        )
                    })}
                </Switch>
            </Router>
        )
    }

    render() {
        const {locationCityStatus, cityList, loadOpenIdFinish} = this.state;
        const {isShowCityLayer, navigator} = this.props;
        if (locationCityStatus !== 'success' && locationCityStatus !== 'failure') {
            return null;
        }
        if (!loadOpenIdFinish) return null;
        return (
            <NavigatorContext.Provider value={navigator}>
                <div className="App">
                    <Navigator history={history}/>
                    {isShowCityLayer ? <CityLayer cityList={cityList}/> : this.renderRouter()}
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

