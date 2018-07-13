import React from 'react';
import { Route } from 'react-router-dom';

const RouteWithSubRoutes = (route) => {
  return (
      <Route path={route.path} render={props =>{
        return(
          // pass the sub-routes down to keep nesting
          <route.component {...props} {...route}/>
        )
      } }/>
  )
}

export default RouteWithSubRoutes;