interface InvoiceNavigatorModel {
    isShowLeft: Boolean,
    leftText?: String,
    isShowCenter: Boolean,
    centerText?: String,
    isShowRight: Boolean,
    rightText?: String
}

interface ApplyForInvoice {
    deliveryType: number,
    type: number,
    title: string,
    taxNo: string,
    name: string,
    phone: number,
    area: string,
    address: string,
    email: string,
    remark: string
}

interface InvoiceMoreInfos {
    registerAddr: string,
    registerTel: number,
    registerBank: string,
    bankNo: number,
    message: string
}
