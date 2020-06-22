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
                leftItem: null,
                rightItem: null,
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


export const routes = [{
    path: '/',
    component: HomeView,
    title: '首页',
}, {
    path: '/buyer',
    component: BuyerView,
    title: '购票人',
}, {
    path: '/address',
    component: AddressView,
    title: '地址',
}, {
    path: '/add-buyer',
    component: AddBuyerView,
    title: '添加购票人',
}, {
    path: '/add-address',
    title: '添加地址',
    component: AddAddressView,
}, {
    path: '/performance-detail',
    component: PerformanceDetailView,
    title: '演出详情',
}, {
    path: '/performance-list',
    component: PerformanceListView,
    title: '演出列表',
}, {
    path: '/performance-select',
    component: PerformanceSelectView,
    title: '选择座位',
}, {
    path: '/performance-select-info',
    component: PerformanceSelectInfoView,
    title: '',
}, {
    path: '/invoice-index',
    component: InvoiceIndexView,
    title: '',
}, {
    path: '/invoice-list',
    component: InvoiceListView,
    title: '',
}, {
    path: '/invoice-detail',
    component: InvoiceDetailView,
    title: '',
},{
    path: '/invoice-finish',
    component: InvoiceFinishView,
    title: '',
}, {
    path: '/order-detail',
    component: OrderDetailView,
    title: '订单详情',
}, {
    path: '/order-confirm',
    component: OrderConfirmView,
    title: '确认订单',
}];


