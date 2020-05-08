export default {
    buy: {
        methodName: 'Y10021',
        params:{
            openId: true,   //用户唯一标识
            userId: true,   //用户信息（浦发特有）
            projectId:true, //项目ID
            projectName:true, // 项目名称
            performId:true, // 场次ID
            performName:true, // 场次名
            priceId:true, // 价格Id
            priceName:true, // 价格名称
            posterUrl:true, // 项目图片路径
            combineId:true, // 套票id
            seatInfo:true, // 座位信息
            totalPrice:true, // 总价
            ticketMode:true, // 出票方式： 1.纸质票， 2.身份证电子票， 3.二维码电子票， 4.短信电子票
            buyType:true, // 购票类型 1.自助选座 2.系统购买 非选座类，全部为2
            deliveryType:true, // 取票方式： 1，无纸化；2，快递票；3，自助换票；4，门店自取。1和3为电子票，2和4为纸质票
            count:true, // 购买张数
            cityId:true, // 城市ID
            farePrice: false,// 运费信息
            buyerId:true, // 购票人信息id
            addressId:true, // 联系人地址id
            userIds:true, // 用户信息ids
            memo: false, // 备注
        },
    }
}
