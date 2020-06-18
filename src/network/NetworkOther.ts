import {JNetworkOther} from "jbzfilmsdk";
import {revealNetwork} from "@/network/NetworkWorker";
import NetworkConfig from "@/config/NetworkConfig";

class NetworkOther extends JNetworkOther{
    payFlagEncrypt(payFlag: any, paybackgr: any) {
        let params;
        if (String(paybackgr) === '3') {
            params = JSON.stringify({encryptData: payFlag, type: 'encryptPaySignValue'})
            // @ts-ignore
            return this.encrypt(params).then(_ => ({payFlag: '', paySignValue: _}));
        } else {
            params = JSON.stringify({encryptData: payFlag, type: 'cardsm2sign'});
            // @ts-ignore
            return this.encrypt(params).then(_ => ({payFlag: _, paySignValue: ''}));
        }
    }

    normalEncrypt(plain) {
        const params = JSON.stringify({encryptData: plain, type: 'encrypt'})
        // @ts-ignore
        return this.encrypt(params)
    }
}

export default new (revealNetwork(NetworkOther, 'NetworkOther'))(NetworkConfig.getNetworkConfig());
