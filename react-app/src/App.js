import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import {useDispatch} from 'react-redux';
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import SplashPage from './components/SplashPage'
import PlantPage from './components/PlantPage'
import UserProfile from './components/UserProfile'
import PlantProfilePage from './components/PlantProfilePage'
import PlantProfiles from './components/PlantProfiles'
import EntryForm from './components/EntryForm'
import PlantForm from './components/PlantForm'
import Dashboard from './components/Dashboard'
import { authenticate } from "./store/session";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <NavBar/>
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm/>
        </Route>
        <Route exact path='/'>
          <SplashPage/>
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route exact path='/plants/profile'>
          <PlantProfiles />
        </Route>
        <Route path='/plants/profile/:id'>
          <PlantProfilePage />
        </Route>
        <ProtectedRoute path='/plants/new' exact={true}>
          <PlantForm/>
        </ProtectedRoute>
        <ProtectedRoute exact path='/plants/:id/tend' exact={true}>
        </ProtectedRoute>
        <Route exact path='/plants/:id'>
          <PlantPage/>
        </Route>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <UserProfile />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <Dashboard />
        </ProtectedRoute>
      </Switch>
    </>
  );
}

export default App;
