import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {authRoutes, publicRoutes} from "../routes";
import {NEWS_ROUTE, PORTAL_ROUTE} from "../utils/consts";
import { useAuth } from "../contexts/FirebaseAuthContext";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const { userStore } = useAuth();

    return (
        <div className="flex-grow">
            <Switch>
                {userStore.isAuth && authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact/>
                )}
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact/>
                )}
                <Route exact path="/">
                    <Redirect to={NEWS_ROUTE}/>
                </Route>
                {/*<Redirect to={PORTAL_ROUTE}/>*/}
            </Switch>
        </div>
    );
});

export default AppRouter;
