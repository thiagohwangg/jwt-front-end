import React, { useContext, useEffect } from 'react'
import { Route, useHistory } from 'react-router-dom/cjs/react-router-dom'
import { UserContext } from '../context/UserContext';

const PrivateRoutes = (props) => {
    const history = useHistory();
  const {user} = useContext(UserContext);
  console.log("user: ", user);


    useEffect(() => {
        let session = JSON.parse(sessionStorage.getItem('account'))
        if(!session) {
            history.push('/login')
            window.location.reload()
        }

        if(session) {
            //check role
        }
    }, [])
  return (
    <>
        <Route path={props.path} component={props.component} />
    </>
  )
}

export default PrivateRoutes