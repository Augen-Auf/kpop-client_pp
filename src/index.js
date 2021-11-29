import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import './config/firebase-config'
import './style/main.css';
import App from './App';
import UserStore from "./store/UserStore";
import {FirebaseAuthContextProvider} from "./contexts/FirebaseAuthContext";


// export const Context = createContext(null);

// ReactDOM.render(
//     <Context.Provider value={{
//         user: new UserStore(),
//     }}>
//         <App />
//     </Context.Provider>,
//     document.getElementById('root')
// );

ReactDOM.render(
    <FirebaseAuthContextProvider>
        <App />
    </FirebaseAuthContextProvider>,
    document.getElementById('root')
);


