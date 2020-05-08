import NetworkConfig from '../config/NetworkConfig'
import NetworkWorker, { revealNetwork } from './NetworkWorker'

class NetworkAccount extends NetworkWorker{
}

export default new (revealNetwork(NetworkAccount, 'NetworkAccount'))(NetworkConfig.getNetworkConfig());
