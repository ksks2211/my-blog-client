let backendHost = 'http://192.168.0.3:8080'

if(process.env.NODE_ENV === 'production'){
  backendHost = `${process.env.REACT_APP_BACKEND_HOST}`;
}

export const API_BASE_URL = `${backendHost}`;