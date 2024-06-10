import React, { useEffect } from 'react'
import { Route, useHistory } from 'react-router-dom/cjs/react-router-dom'

const PrivateRoutes = (props) => {
    const history = useHistory();

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