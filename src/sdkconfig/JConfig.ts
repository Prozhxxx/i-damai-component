import NetworkCity from './NetworkCity';
import NetworkMine from './NetworkMine';
import NetworkPerformance from './NetworkPerformance';

const DEFAULT_NETWORK_CONFIG = {
  precook: (_) => _.data,
  cook: (_) => _,
  method: 'post',
  url: '',
  book: null,
  params: {},
  headers: {},
  bodyData: {},
  useParams: [],
  useHeaders: [],
  useBodyData: [],
  rule: [0, 1, 2],
  encryption: {
    required: () => true,
    paramsInterceptor: (params, self) => {
      return ({...params, ...self.pickInjectParams()});
    }
  },
};

export default {
  NetworkCity,
  NetworkMine,
  NetworkPerformance,
  DEFAULT_NETWORK_CONFIG
}
