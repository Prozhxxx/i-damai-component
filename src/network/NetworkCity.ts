import NetworkConfig from '../config/NetworkConfig'
import NetworkWorker, { revealNetwork } from './NetworkWorker'
import {JToolAsyncNetwork} from 'jbzfilmsdk';

class NetworkCity extends NetworkWorker{
    [bindMethods: string]: any

    cityByCoordinate(){
        return this.async_cityByCoordinate().then(data => {
            if (data.requestId){
                return JToolAsyncNetwork
                    .tryRequest(this.async_cityByCoordinateResult.bind(this), [data.requestId], 10)
                    .then(responseData => {
                        if (responseData){
                            return responseData;
                        }
                        throw new Error('请求超时');
                    })
            }
            return data;
        })
    }
}

export default new (revealNetwork(NetworkCity, 'NetworkCity'))(NetworkConfig.getNetworkConfig());
