import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom'

import PageApp from './PageApp';
import HomePage from './HomePage';
import RouteWithSubRoutes from './Route';

const routes = [
  {
    component: PageApp,
    routes: [
      {
        exact:true,
        path:'/',
        component: HomePage
      },
    ]
  }
];

const AppRoute = () => (
	<Router>
		<div>
			{routes.map((route, i) => (
		 		<RouteWithSubRoutes key={i} {...route} text="Daniel Agus" />
			))}
		</div>
	</Router>
);

export default AppRoute;