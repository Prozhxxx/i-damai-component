import {RouteComponentProps} from "react-router";
import * as H from "history";
import {Component} from "react";

const getRouterContext = (context, target) => {
    function isRouteContext(x){
        return x?.props?.[target] !== undefined
    }

    if (isRouteContext(context)){
        return context.props?.[target]
    } else {
        return context
    }
}

export default class RouterManager{
    static push(context: any, pathname, query={}, state = {}){
        const push = getRouterContext(context, 'history')?.['push'];
        if (push === undefined){
            console.error('没有找到push方法')
        }
        push?.({
            pathname,
            search: Object.keys(query).map(_ => (`${encodeURIComponent(_)}=${encodeURIComponent(query[_])}`)).join('&'),
            state
        })
    }

    static pop(context){
        const goBack = getRouterContext(context, 'history')?.['goBack'];
        if (push === undefined){
            console.error('没有找到goBack方法')
        }
        goBack()
    }

    static getParams(context): any{
        const location = getRouterContext(context,'location');
        let search = location.search;
        if (search.length === 0){
            return {};
        }
        if (search[0] === '?'){
            search = search.slice(1);
        }
        const params = {};
        for (let str of search.split('&')){
            const strArr = str.split('=');
            params[decodeURIComponent(strArr[0])] = decodeURIComponent(strArr[1]);
        }
        return params;
    }
}

export const push = RouterManager.push;
export const pop = RouterManager.pop;
export const getParams = RouterManager.getParams;

