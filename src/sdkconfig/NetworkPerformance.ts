export default {
    categoryList: {
        methodName: 'Y10002',
    },
    hotList: {
        methodName: 'Y10003',
        params: {
            cityId: true
        },
        book: ['cityId']
    },
    recommendList: {
        methodName: 'Y10004',
        params: {
            cityId: true,
            longitude: true,
            latitude: true,

        },
    },
    detail: {
        methodName: 'Y10005',
        params: {
            projectId: true
        },
        book: ['projectId']
    },
    listByCategory: {
        methodName: 'Y10006',
        params: {
            cityId: true,
            classifyId: true,
        }
    },
    theStatus: {
        methodName: 'Y10007',
        params: {
            projectId: true
        },
        book: ['projectId']
    },
    // 场次状态 一次演出可能会包含多个场次
    sessionStatus: {
        methodName: 'Y10008',
        params: {
            performId: true
        },
        book: ['performId']
    },
    ticketStatus: {
        methodName: 'Y10009',
        params: {
            priceIds: true
        },
        book: ['priceIds']
    }
}
