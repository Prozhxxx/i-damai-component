import NetworkConfig from '../config/NetworkConfig'
import NetworkWorker, { revealNetwork } from './NetworkWorker'

class NetworkMine extends NetworkWorker{
}

export default new (revealNetwork(NetworkMine, 'NetworkMine'))(NetworkConfig.getNetworkConfig());
