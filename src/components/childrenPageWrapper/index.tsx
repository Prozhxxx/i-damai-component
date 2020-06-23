import React from "react";
import {Switch} from "react-router";
import * as H from "history";
import cn from "classnames";
import style from './index.module.scss'


export function childrenPageWrapper(...routes: RouteModel[]): React.ReactElement {
    return (
        <Switch>
            {routes.map(route => (
                <route.component key={`${route.path}`}
                                 path={`${route.path}`}>
                </route.component>
            ))}
        </Switch>
    )
}

export class ChildrenPage extends React.Component<{
    routes: RouteModel[],
    pathname: string,
    location: H.Location
}, {
}> {

    constructor(props) {
        super(props);
    }

    renderChildrenRouter(routes){
        return (
            <div className={cn()}>
                {childrenPageWrapper(...routes)}
            </div>
        )
    }

    render(){
        const {children, routes, pathname, location} = this.props;
        if (new RegExp(`^${pathname}$`, 'g').test(location.pathname)){
            return (
                <div>
                    {children}
                </div>
            )
        }
        const isMatch = new RegExp(`^${pathname}$`, 'g').test(location.pathname);
        if (new RegExp(`^${pathname}.*$`, 'g').test(location.pathname)){
            return (
                <div>
                    {/*<div>*/}
                    {/*    {children}*/}
                    {/*</div>*/}
                    {/*{!isMatch && this.renderChildrenRouter(routes)}*/}
                    {this.renderChildrenRouter(routes)}
                </div>
            )
        }
        return null;
    }
}

