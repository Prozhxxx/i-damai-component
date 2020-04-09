import React from 'react';
import HomeView from '../views/home.view';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import './index.css';
import 'cola.css/dist/index.min.css';

class App extends React.Component<any, any>{
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
