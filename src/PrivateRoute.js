import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useStateValue } from "./StateProvider"
import Sidebar from "./Sidebar"
import Chat from "./Chat"

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const [{ user }] = useStateValue()

  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <div className="app__body">
            <Component {...props} />
          </div>
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
      }
    />
  )
}
