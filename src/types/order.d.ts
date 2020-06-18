type ConfirmData = {order: Order, orderSubList: SubOrder[]}

interface Order {
    addressInfo: string;
    applyInfo: string;
    bank: string
    buyTime: null
    buyType: number
    cityId: number
    confirmOrderTime: null
    count: number
    createTime: number
    deliveryType: number
    farePrice: number
    id: string
    invokeRefundTime: null
    isHandRefund: null
    jbzPrice: number
    memo: null
    openId: string
    orderId: string
    payNo: null
    payPrice: number
    performName: string
    priceName: string
    projectId: number
    projectName: string
    refundNo: null
    refundTime: null
    seatInfo: null
    showTime: string
    status: number
    ticketMode: number
    totalPrice: number
    updateTime: number
    userIds: string
}

interface SubOrder {
    userName: string
    cardNo: string
    combineId: number
    createTime: number
    entry: null
    id: number
    orderId: string
    originPrice: number
    phone: string
    priceId: number
    realPrice: number
    seatAreaId: null
    seatAreaName: null
    seatFloorId: null
    seatFloorName: null
    seatGroup: number
    seatId: null
    seatName: null
    seatRowId: null
    seatRowName: null
    seatType: null
    standId: null
    standName: null
    subOrderId: number
    success: null
    updatetime: number
    voucherId: null
}

interface PayData {
    amount: string
    merId: string
    orderDate: string
    orderTime: string
    orderValidTime: string
    payNo: string
    shopName: string
}
