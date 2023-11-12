const env = {
    apiUrl: '',
    debug: true
};

export const REACT_APP_ENV = 'dev';

export const getBaseHost = () => {
    env.apiUrl = window.localStorage.getItem('apiUrl');
    return env.apiUrl;
};

export default env;