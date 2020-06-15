export default class RouterManager{
    static push(history, pathname, query={}, state = {}){
        history.push({
            pathname,
            search: Object.keys(query).map(_ => (`${encodeURIComponent(_)}=${encodeURIComponent(query[_])}`)).join('&'),
            state
        })
    }

    static pop(history){
        history.goBack()
    }

    static getParams(location): any{
        let search = location.search;
        if (search[0] === '?'){
            search = search.slice(1);
        }
        if (search.length === 0){
            return {};
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

