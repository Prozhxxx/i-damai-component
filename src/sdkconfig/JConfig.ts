import NetworkCity from './NetworkCity';

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
  rule: [0, 1, 2]
};

export default {
  NetworkCity,
  DEFAULT_NETWORK_CONFIG
}
