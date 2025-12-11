// export const BASE_URL='/api/'

export const BASE_URL= location.hostname ==='localhost'?'http://localhost:3000/':'/api'
export const SOCKET_URL = location.hostname === 'localhost' ? 'http://localhost:3000' : '';