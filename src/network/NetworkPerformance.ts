import NetworkWorker, {revealNetwork} from "./NetworkWorker";
import NetworkConfig from "../config/NetworkConfig";

class NetworkPerformance extends NetworkWorker{
}

export default new (revealNetwork(NetworkPerformance, 'NetworkPerformance'))(NetworkConfig.getNetworkConfig());

