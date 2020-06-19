export default {
    shopList: {
        methodName: 'Y10051',
        params:{
            projectId: true,   //用户唯一标识
        },
        book: [ 'projectId' ]
    },
    createOrder: {
        methodName: 'Y10021',
        params:{
            openId: true,   //用户唯一标识
            projectId:true, //项目ID
            performId:true, // 场次ID
            priceId:true, // 价格Id
            deliveryType:true, // 取票方式： 1，无纸化；2，快递票；3，自助换票；4，门店自取。1和3为电子票，2和4为纸质票
            count:true, // 购买张数
            addressId: false, // 联系人地址id
            userIds:true, // 用户信息ids
            seatInfo: false, // 座位信息
            memo: false, // 备注
            longitude: true,
            latitude: true,
        },
    },
    confirmOrder: {
        methodName: 'Y10022',
        params:{
            openId: true,   //用户唯一标识
            id:true, //金保证订单ID
        },
        book: [ 'id' ]
    },
    confirmPay: {
        methodName: 'Y10060',
        params:{
            openId: true,   //用户唯一标识
            jsonStr: true, //支付json传 参考广发
        },
        book: [ 'jsonStr' ]
    }
}

