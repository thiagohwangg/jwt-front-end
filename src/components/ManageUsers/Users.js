import React, { useEffect } from 'react'

import './Users.scss'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const Users = (props) => {
  const history = useHistory();

    useEffect(() => {
        let session = JSON.parse(sessionStorage.getItem('account'))
        console.log("session: ", session);
        if(!session) {
            history.push('/login')
        }
    }, [])
  return (
    <div>Users</div>
  )
}

export default Users