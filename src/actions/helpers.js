const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';


// Creates request types for a given base constant
export function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE].forEach(type => void (res[type] = `${base}_${type}`));
  return res;
}


// Creates action with a given type & payload
export function action(type, payload = {}) {
  return { type, payload };
}

export function requestAction(type, params = []) {
  const objFromArgs = (args) => {
    if (params.length === 0) {
      return args[0];
    }
    return params.reduce(
      (acc, name, key) => {
        acc[name] = args[key];  // eslint-disable-line no-param-reassign
        return acc;
      },
      {},
    );
  };

  return {
    request: (...args) => action(type.REQUEST, objFromArgs(args)),
    success: (response) => action(type.SUCCESS, response),
    failure: (error) => action(type.FAILURE, error),
  };
}
