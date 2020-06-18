export default {
    collectPerformance: {
        methodName: 'Y10024',
        params:{
            openId: true,
            projectId: true,
            projectName: true,
            posterUrl: true,
            area: true,
            address: true,
            startTime: true,
            endTime: true,
        }
    },
    orderDetail: {
        methodName: 'Y10063',
        params:{
            openId: true,
            orderId: true,
        },
        book: [
            'orderId'
        ]
    },
    buyerList: {
        methodName: 'Y10039',
        params:{
            openId: true,
        },
        // 有问题
        // useParams: ['openId']
    },
    addBuyer: {
        methodName: 'Y10041',
        params:{
            openId: true,
            // 购票人证件类型，1：身份证，2：护照；3：港澳通行证，4：台胞证，5：士兵/军官
            cardType: true,
            // 证件号
            cardNo: true,
            // 联系电话
            phone: true,
            // 联系姓名
            userName: true,
        }
    },
    addressList: {
        methodName: 'Y10034',
        params: {
            openId: true,
        }
    },
    addAddress: {
        methodName: 'Y10034',
        params: {
            openId: true,
            areaId: true,
            cityId: true,
            countryId: true,
            provinceId: true,
            address: true,
            name: true,
            phone: true,
        }
    }
}
