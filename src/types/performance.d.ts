interface PerformanceModel {
    projectId: number
    projectName: string
    projectType: number
    showPic: string
    showTime: string
    minPrice: number
    maxPrice: number
    showStartTime: number
    showEndTime: number
    venueName: string
    [extraProps: string]: any
}

interface PerformanceDetailCommonModel{
    cityId: number
    cityName: string
    provinceId: number
    provinceName: string
    countryId: number
    countryName: string
    venueAddress: string
    venueId: number
    venueLat: number
    venueLng: number
    venueName: string

    projectId: number
    projectName: string
    projectStatus: number
    projectType: number
    introduce: string
    classifyCode: string
    classifyName: string
    subClassifyCode: string
    subClassifyName: string
    posterUrl: string
    isHasSeat: number
    isTest: number
    remark: string

    updateTime: number
    traderIds: string
    traderNames: string
}

interface PerformanceDetailInfoModel{
    artists: string
    deliveryTypes: string
    depositInfo: string
    ipCard: string
    limitNotice: string
    performTimeDetail: string
    pickupAddressList: string
    policyOfReturn: string
    postCity: string
    prohibitedItems: string
    projectId: number
    realNameNotice: string
    showDetail: string
    showEndTime: number
    showPic: string
    showStartTime: number
    showTime: string
}

interface PerformanceSessionCommonModel{
    projectId: number
    performId: number
    performName: string
    performStatus: number
    performType: number
    cardType: string
    isOneOrderOneCard: number
    isOneTicketOneCard: number
    isRealNameEnter: number
    issueEnterModes: string
    issueTicketModes: string
    remark: string
    reserveSeat: number
    saleType: number
    startTime: number
    endTime: number
    subPerformList: null
    takeTicketTypes: null
    weeklyList: null
    changeReason: null
    isChangePerformTime: null
}

interface PerformanceSessionPriceModel{
    ableSell: string
    maxStock: number
    openCombinePrices: null
    performId: number
    price: number
    priceId: number
    priceName: string
    priceType: number
    projectId: number
    subStatus: null
}

interface PerformanceDetailModel {
    damaiProject: PerformanceDetailCommonModel
    damaiProjectDetail: PerformanceDetailInfoModel
    damaiProjectPerformRespList?: ({
        damaiProjectPerform: PerformanceSessionCommonModel,
        damaiProjectPerformPricesList?: PerformanceSessionPriceModel[]
    })[]
    distance: number;
    maxPrice: number;
    minPrice: number;
}