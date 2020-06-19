interface BuyerModel{
    id: number;
    bank: string;
    userName: string;
    cardType: number;
    cardNo: string;
    phone: string;
    openId: string;
    status: string;
    createTime: number;
    updateTime: number;
}

interface AddressModel {
    openId: string
    id: number
    isDefault: number
    countryId: number
    provinceId: number
    cityId: number
    areaId: number
    address: string
    email: null
    countryCode: string
    name: string
    phone: string
    status: string
    createdTime: number
    updateTime: number
    bank: string
}

interface ShopModel {
    pointId: number
    longitude: string
    pointAddr: string
    bizTimeShow: string
    exchangeType: string
    latitude: string
    pointName: string
    pointType: string
    remark: string
    validPeriod: string
}
