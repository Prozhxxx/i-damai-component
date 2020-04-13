import NetworkConfig from '../config/NetworkConfig'
import NetworkWorker, { revealNetwork } from './NetworkWorker'

class NetworkCity extends NetworkWorker{
}

export default new (revealNetwork(NetworkCity, 'NetworkCity'))(NetworkConfig.getNetworkConfig());
