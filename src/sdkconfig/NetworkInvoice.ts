export default {
    applyForInvoice: {
        methodName: 'Y10070',
        params: {
            type: true,
            title: true,
            taxNo: false,
            orderId: true,
            name: true,
            phone: true,
            area: true,
            address: true,
            email: true,
            remark: false,
            registerAddress: false,
            registerPhone: false,
            openBank: false,
            bankCard: false
        }
    },
    invoiceList: {
        methodName: 'Y10071'
    }
}
