import HomeView from "@/views/home.view";
import BuyerView from "@/views/manage/buyer.view";
import AddressView from "@/views/manage/address.view";
import AddBuyerView from "@/views/manage/add.buyer.view";
import AddAddressView from "@/views/manage/add.address.view";
import PerformanceDetailView from "@/views/performance/performance.detail.view";
import PerformanceListView from "@/views/performance/performance.list.view";
import PerformanceSelectView from "@/views/performance/performance.select.view";
import PerformanceSelectInfoView from "@/views/performance/performance.select.info.view";
import InvoiceIndexView from "@/views/invoice/invoice.index.view";
import InvoiceListView from "@/views/invoice/invoice.list.view";
import InvoiceDetailView from "@/views/invoice/invoice.detail.view";
import InvoiceFinishView from "@/views/invoice/invoice.finish.view";
import OrderDetailView from "@/views/order/order.detail.view";
import OrderConfirmView from "@/views/order/order.confirm.view";
import React from "react";
import GlobalConstant from "@/util/GlobalConstant";

const getRouterContext = (context, target) => {
    function isRouteContext(x){
        return x?.props?.[target] !== undefined
    }

    if (isRouteContext(context)){
        return context.props?.[target]
    } else {
        return context
    }
};

export default class RouterManager{
    static updateNavigatorTitle(title: string){
        GlobalConstant.store.dispatch({
            type: 'UPDATE_UI_NAVIGATOR',
            data: {
                title,
            }
        })
    }

    static updateNavigatorItem(leftItem: React.ReactElement, rightItem: React.ReactElement){
        GlobalConstant.store.dispatch({
            type: 'UPDATE_UI_NAVIGATOR',
            data: {
                leftItem,
                rightItem,
            }
        })
    }

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


const flat = (r, p?) => {
    p && (r.path = `${p.path}${r.path}`);
    if (r.children && r.children.length > 0){
        return [r, ...r.children.flatMap(c => flat(c, r))]
    }
    return [r]
};


export const routes = [{
    path: '/',
    component: HomeView,
    title: '首页',
    exact: true,
}, {
    name: 'Buyer',
    path: '/buyer',
    component: BuyerView,
    title: '购票人',
    exact: true,
}, {
    path: '/address',
    component: AddressView,
    title: '地址',
    exact: true,
}, {
    name: 'AddBuyer',
    path: '/add-buyer',
    component: AddBuyerView,
    title: '添加购票人',
    exact: true,
}, {
    path: '/add-address',
    title: '添加地址',
    exact: true,
    component: AddAddressView,
}, {
    path: '/performance-detail',
    component: PerformanceDetailView,
    title: '演出详情',
    exact: true,
}, {
    path: '/performance-list',
    component: PerformanceListView,
    title: '演出列表',
    exact: true,
}, {
    path: '/performance-select',
    component: PerformanceSelectView,
    title: '选择座位',
    exact: true,
}, {
    path: '/performance-select-info',
    component: PerformanceSelectInfoView,
    title: '',
    exact: true,
}, {
    path: '/invoice-index',
    component: InvoiceIndexView,
    title: '开发票',
    exact: true,
}, {
    path: '/invoice-list',
    component: InvoiceListView,
    title: '开票历史',
    exact: true,
}, {
    path: '/invoice-detail',
    component: InvoiceDetailView,
    title: '发票详情',
    exact: true,
},{
    path: '/invoice-finish',
    component: InvoiceFinishView,
    title: '提交成功',
    exact: true,
}, {
    path: '/order-detail',
    component: OrderDetailView,
    title: '订单详情',
    exact: true,
}, {
    name: 'OrderConfirm',
    path: '/order-confirm',
    component: OrderConfirmView,
    title: '确认订单',
    exact: false,
    children: [{
        name: 'SelectAddress',
        path: '/address',
        component: AddressView,
        title: '选择地址',
        exact: false,
    }, {
        name: 'SelectBuyer',
        path: '/buyer',
        component: BuyerView,
        title: '选择购票人',
        exact: false,
    }]
}].flatMap(r => flat(r)) as RouteModel[];


export const getRoute = (routeName: string): RouteModel[] => {
    if (/.*\|.*/g.test(routeName)){
        return routeName.split('|').map(routeName => routes.find(route => route.name === routeName))
    }
    return routes.filter(route => route.name === routeName)
};

