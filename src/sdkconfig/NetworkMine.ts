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
    addViewer: {
        methodName: 'Y10030',
        params:{
            openId: true,
            // 购票人证件类型，1：身份证，2：护照；3：港澳通行证，4：台胞证，5：士兵/军官
            cardType: true,
            // 购票人证件号
            buyerCarNo: true,
            // 购票人姓名
            buyerName: true,
            // 购票人电话国家代码
            countryCode: true,
            // 购票人电话
            phone: true
        }
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
    }
}
