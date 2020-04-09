import {revealNetwork as _revealNetwork, JNetworkWorker} from 'jbzfilmsdk';
import JConfig from '../sdkconfig/JConfig';
class NetworkWorker extends JNetworkWorker{

}
export default NetworkWorker;
export const revealNetwork = (networkClass, networkName) => _revealNetwork(networkClass, networkName, JConfig)
