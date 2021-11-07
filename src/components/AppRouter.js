import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {authRoutes, publicRoutes} from "../routes";
import {NEWS_ROUTE, PORTAL_ROUTE} from "../utils/consts";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context);

    console.log(user);
    return (
        <div className="flex-grow">
            <Switch>
                {user.isAuth && authRoutes.map(({path, Component}) =>
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
};

export default AppRouter;
