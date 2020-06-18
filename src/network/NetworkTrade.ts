import NetworkConfig from '../config/NetworkConfig'
import NetworkWorker, { revealNetwork } from './NetworkWorker'
import NetworkOther from "@/network/NetworkOther";
import AccountManager from "@/util/AccountManager";
import {baseUrl as BASE_URL} from '@/util/GlobalConstant';

const getpayParams = (order: Order, payData: PayData, account: AccountModel) => {
    const orderId = order.orderId
    const merId = payData.merId;   // 商户号
    const count = order.totalPrice;  // 总价
    const orderNum = order.payNo;  // 流水号
    const shopName = encodeURIComponent(payData.shopName);  // 商户名
    const payFlag = `${merId}|${orderNum}|${count}`;  // 加密前的payflag
    const shop = payData.merId;  // 商户号
    const actionFlag = 'payorder';  // 支付标识
    const orderData = payData.orderDate.replace(/-/g, '');  // 订单日期
    const orderTime = payData.orderTime.replace(/:/g, '');  // 订单时间
    const orderValidTime = payData.orderValidTime.replace(/[-:\D]/g, '');  // 订单有效时间
    const orderString = encodeURIComponent(`${order.projectName}|${order.count}张|`);
    const URL4 = `${BASE_URL}cgb/user/${orderId}`;  // 支付完成跳转页面 ==》 个人中心
    const indexURL = `${BASE_URL}pay/cgbcardpaynotify/${orderId}`;
    const siteURL = `${BASE_URL}cgb/orderdetail/${orderId}`;  // 查看订单跳转页面 ==》 订单详情
    // rsa_random_num, rsa_time_flag, paybackbr: {1: 电子支付，2：卡交换，3：中台}，url带过来不用管
    const rsaRandomNum = account.rsa_random_num;
    const rsaTimeFlag = account.rsa_time_flag;
    const payBackgr = account.paybackgr;
    return {
        payFlag,
        payBackgr,
        orderNum,
        count,
        shop,
        shopName,
        orderData,
        orderTime,
        orderValidTime,
        orderString,
        indexURL,
        siteURL,
        rsaRandomNum,
        rsaTimeFlag,
        URL4,
        actionFlag,
    };
};


class NetworkTrade<T> extends NetworkWorker{

    buy(...args){
        const self: any = this;
        return self.useParams('openId', 'coordinate').createOrder(...args).then(({id}) => {
            return self.useParams('openId').confirmOrder(id).then(({order, orderSubList}: ConfirmData) => {
                const account = AccountManager.accountInfo();
                const params = JSON.stringify({
                    id: order.id,
                    openId: account.openId,
                    paybackgr: account.paybackgr,
                    // 未用到
                    // options: this.newFlag ? Options : '-',
                    // onsale: (this.cardFlag || this.newCardFlag) ? crGroupNbr : '-'
                });
                return self.useParams('openId').confirmPay(params).then(payData => {
                    const {
                        payFlag,
                        payBackgr,
                        orderNum,
                        count,
                        shop,
                        shopName,
                        orderData,
                        orderTime,
                        orderValidTime,
                        orderString,
                        indexURL,
                        siteURL,
                        rsaRandomNum,
                        rsaTimeFlag,
                        URL4,
                        actionFlag,
                    } = getpayParams(order, payData, account)
                    return NetworkOther.payFlagEncrypt(payFlag, payBackgr).then(payData => {
                        let payFlag = encodeURIComponent(payData.payFlag);
                        let paySignValue = payData.paySignValue;
                        let plain = `ordernum=${orderNum}&count=${count}&shop=${shop}&shopname=${shopName}&orderdata=${orderData}&ordertime=${orderTime}`+
                        `&orderValidTime=${orderValidTime}&indexURL=${indexURL}&siteURL=${siteURL}&payflag=${payFlag}&paySignValue=${paySignValue}`+
                        `&rsa_random_num=${rsaRandomNum}&rsa_time_flag=${rsaTimeFlag}&order=${orderString}&paybackgr=${payBackgr}`
                        let code = '';
                        console.log(plain)
                        NetworkOther.normalEncrypt(plain).then(encryptData => {
                            code = encryptData;
                            let targetURL = `${URL4}?actionflag=${actionFlag}&${code}`;
                            console.log(targetURL)
                            window.location.href = targetURL;
                        }, err => {
                            console.log(err)
                        })
                    });
                })
            });
        });
    }
}

export default new (revealNetwork(NetworkTrade, 'NetworkTrade'))(NetworkConfig.getNetworkConfig());
