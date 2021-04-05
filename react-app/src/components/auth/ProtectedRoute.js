import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux'


const ProtectedRoute = props => {
  const me = useSelector((state) => state.session.user)
  return (
    <Route {...props}>
      {(me)? props.children  : <Redirect to="/login" />}
    </Route>
  )
};


export default ProtectedRoute;
