import NetworkWorker, {revealNetwork} from "./NetworkWorker";
import NetworkConfig from "../config/NetworkConfig";
import {JNetworkWorker} from "jbzfilmsdk/types/network";

class NetworkPerformance extends NetworkWorker{
}

export default new (revealNetwork(NetworkPerformance, 'NetworkPerformance'))(NetworkConfig.getNetworkConfig());

