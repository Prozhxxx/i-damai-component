import NetworkConfig from '../config/NetworkConfig'
import NetworkWorker, { revealNetwork } from './NetworkWorker'

class NetworkInvoice extends NetworkWorker{
}

export default new (revealNetwork(NetworkInvoice, 'NetworkInvoice'))(NetworkConfig.getNetworkConfig());
