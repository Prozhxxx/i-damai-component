import NetworkConfig from '../config/NetworkConfig'
import NetworkWorker, { revealNetwork } from './NetworkWorker'

class NetworkTrade extends NetworkWorker{
}

export default new (revealNetwork(NetworkTrade, 'NetworkTrade'))(NetworkConfig.getNetworkConfig());
