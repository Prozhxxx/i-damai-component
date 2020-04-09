import {JNetworkWorker} from 'jbzfilmsdk';
import NetworkConfig from '../config/NetworkConfig'
import { revealNetwork } from './NetworkWorker'

class NetworkCity extends JNetworkWorker{
}

export default new (revealNetwork(NetworkCity, 'NetworkCity'))(NetworkConfig.getNetworkConfig());
