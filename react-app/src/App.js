import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import {useDispatch} from 'react-redux';
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UserPage/UsersList";
import SearchBar from './components/SearchBar'
import SplashPage from './components/SplashPage'
import PlantPage from './components/PlantPage'
import UserProfile from './components/UserProfile'
import PlantProfilePage from './components/PlantProfilePage'
import PlantProfiles from './components/PlantProfiles'
import EntryForm from './components/EntryForm'
import PlantForm from './components/PlantForm'
import EditPlant from './components/EditPlant'
import EditProfile from './components/EditProfile'
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
  }, [dispatch]);

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
        <Route path='/plants/profile/:id'>
          <PlantProfilePage />
        </Route>
        <Route exact path='/plants/profile'>
          <PlantProfiles />
        </Route>
        <ProtectedRoute path='/plants/new' exact={true}>
          <PlantForm/>
        </ProtectedRoute>
        <ProtectedRoute path='/plants/:id/tend' exact={true}>
          <EntryForm />
        </ProtectedRoute>
        <ProtectedRoute path='/plants/:id/edit' exact={true}>
          <EditPlant /> 
        </ProtectedRoute>
        <ProtectedRoute path='/users/edit' exact={true}>
          <EditProfile /> 
        </ProtectedRoute>
        <Route exact path='/plants/search'>
          <SearchBar/>
        </Route>
        <Route path='/plants/:id'>
          <PlantPage/>
        </Route>
        <Route path='/users/:id'>
          <UserProfile />
        </Route>
        <Route exact path='/users'>
          <UsersList />
        </Route>
        <ProtectedRoute path="/" exact={true}>
          <Dashboard />
        </ProtectedRoute>
      </Switch>
    </>
  );
}

export default App;
