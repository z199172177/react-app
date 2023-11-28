const env = {
    // apiUrl: '//www.zkwp.fun/api',
    apiUrl: '//localhost:8100',
    debug: true
};

export const REACT_APP_ENV = 'dev';

export const getBaseHost = () => {
    // env.apiUrl = window.sessionStorage.getItem('apiUrl');
    return env.apiUrl;
};

export default env;