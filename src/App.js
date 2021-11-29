import React, {useContext, useState, useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import {observer} from "mobx-react-lite";

const App = observer(() => {
    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen">
                <NavBar/>
                <AppRouter/>
                <Footer/>
            </div>
        </BrowserRouter>
    );

});

export default App;
