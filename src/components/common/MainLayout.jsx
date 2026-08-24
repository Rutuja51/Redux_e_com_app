import React from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import Footer from "./Footer";
import { Provider } from "react-redux";
import {store} from '../../redux/store'
export default function MainLayout(){
    return(
        <div className="max-w-screen-xl mx-auto">
            <Provider store={store}>
                <Header />
                <Outlet />
                <Footer />
            </Provider>
        </div>
    )
}