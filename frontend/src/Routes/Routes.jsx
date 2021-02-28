import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../Components/Dashboard';
import Login from '../Components/Login';
import Navbar from '../Components/Navbar';
import Registration from '../Components/Registration';
import DisplayItem from "../Components/DisplayItem";


export default function Routes() {
    return (
        <div>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Registration} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/view-product/:id" component={DisplayItem} />
            </Switch>
        </div>
    )
}
