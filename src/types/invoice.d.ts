interface ApplyForInvoice {
    deliveryType?: number,
    type?: number,
    title: string,
    taxNo: string,
    name: string,
    phone: string,
    area: string,
    address: string,
    email: string,
    remark?: string,
    createTime?: string,
    orderId?: string,
    expressNo?: number,
    projectName?: string,
    amount?: number,
    tails?: {
        statusCN?: string
    },

}

interface InvoiceMoreInfos {
    registerAddr: string,
    registerTel: number,
    registerBank: string,
    bankNo: number,
    message: string
}
