import React from 'react';
import {  Navigate } from 'react-router-dom';
import { isAuthenticated } from './index';

const PrivateRoutes = ( {children })=> {
  return (
    isAuthenticated() ? children :<Navigate to="/signin" />
    )
};

export default PrivateRoutes;
