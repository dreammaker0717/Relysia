import { envMODE } from './envMode'
import { initializeApp } from 'firebase/app'
import apiConfig from './relysiaApi'

//DEV or PROD
const firebaseConfig =
  envMODE === 'DEV'
    ? {
        apiKey: 'AIzaSyCy7FEYBtNLZA3Vt1cosiBYN_zgWMEVtSw',
        authDomain: 'vaionexalpha.firebaseapp.com',
        databaseURL: 'https://vaionexalpha-default-rtdb.firebaseio.com',
        projectId: 'vaionexalpha',
        storageBucket: 'vaionexalpha.appspot.com',
        messagingSenderId: '1062576213072',
        appId: '1:1062576213072:web:bbad5e0a082cb8bc119555',
        measurementId: 'G-RL65RXT0FL',
      }
    : {
        apiKey: 'AIzaSyCGzjD8zb2yJzRi6W54FJvfj55CWu_36q4',
        authDomain: 'hivedb-cdbf7.firebaseapp.com',
        databaseURL: 'https://hivedb-cdbf7.firebaseio.com',
        projectId: 'hivedb-cdbf7',
        storageBucket: 'hivedb-cdbf7.appspot.com',
        messagingSenderId: '882176606224',
        appId: '1:882176606224:web:4b5a448b3bf607e1680a95',
        measurementId: 'G-89Z5B2W3KM',
      }

if (envMODE === 'DEV') {
  apiConfig.defaults.headers.common['serviceId'] =
    '7a8ca3a7-02bb-42e8-9d70-dec87390c0fd'
}
export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseConfigure = firebaseConfig
