import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import SplashPage from './components/SplashPage'
import PlantPage from './components/PlantPage'
import UserProfile from './components/UserProfile'
import PlantProfilePage from './components/PlantProfile'
import PlantProfiles from './components/PlantProfiles'
import EntryForm from './components/EntryForm'
import PlantForm from './components/PlantForm'
import Dashboard from './components/Dashboard'
import { authenticate } from "./services/auth";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <NavBar setAuthenticated={setAuthenticated} authenticated={authenticated}/>
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route exact path='/'>
          <SplashPage authenticated={authenticated}/>
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
        <Route path='/plants/profile/:id'>
          <PlantProfilePage />
        </Route>
        <Route exact path='/plants/profile'>
          <PlantProfiles />
        </Route>
        <ProtectedRoute path='/plants/new' exact={true} authenticated={authenticated}>
          <PlantForm authenticated={authenticated}/>
        </ProtectedRoute>
        <ProtectedRoute exact path='/plants/:id/tend' exact={true} authenticated={authenticated}>
          <EntryForm authenticated={authenticated}/>
        </ProtectedRoute>
        <Route exact path='/plants/:id'>
          <PlantPage authenticated={authenticated}/>
        </Route>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <UserProfile />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
          <Dashboard authenticated={authenticated}/>
        </ProtectedRoute>
      </Switch>
    </>
  );
}

export default App;
