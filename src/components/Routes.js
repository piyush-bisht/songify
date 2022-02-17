import React from 'react';

import {
    Route,
    Redirect
} from 'react-router-dom';

export const PrivateRoute = ({
    component: Component,
    authenticated,
    access_token,
    ...rest
}) => { 
    return (
    <Route
        {...rest}
        render={(props) =>
            authenticated === true ? (
                <Component {...props} />
            ) : 
                (<Redirect to={{
                    pathname: "/",
                    state: { 
                            from: props.location,
                            token: "access_token"
                        },
                  }}
                />
             )
          }
    />
    );
};
export const PublicRoute = ({
    component: Component,
    authenticated,
    ...rest
}) => { 
    return (
    <Route
        {...rest}
        render={(props) =>
            authenticated === false ? (
                <Component {...props} />
            ) : 
                (<Redirect to="/main" />
             )
          }
    />
    
    );
};