import React from 'react';
import HomeView from '../views/home.view';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import './index.scss';
import 'cola.css/dist/index.min.css';
import NetworkCity from "../network/NetworkCity";
import NetworkPerformance from "../network/NetworkPerformance";

class App extends React.Component<any, any>{
    async componentDidMount() {
        // const city = (await NetworkCity.cityList()).find(_ => _.name === '北京市');
        // const category = (await NetworkPerformance.categoryList())[0];
        // const recommand = (await NetworkPerformance.recommendList(city.id))[0];
        // const hotList = (await NetworkPerformance.hotList(city.id));
        // const performanceDetail = (await NetworkPerformance.detail(recommand.projectId));
        // const performanceList = (await NetworkPerformance.listByCategory({
        //     cityId: city.id,
        //     classifyId: category.codeId
        // }));
        // const performanceStatus = (await NetworkPerformance.theStatus(recommand.projectId));
        // const perform = performanceDetail.damaiProjectPerformRespList[0];
        // const sessionStatus = (await NetworkPerformance.sessionStatus(perform.damaiProjectPerform.performId));
        // const ticketStatus = (await NetworkPerformance.ticketStatus(perform.damaiProjectPerformPricesList[0].priceId));
    }

    render(){
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <HomeView/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
