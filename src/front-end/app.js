import React, {useState, useEffect} from 'react'
import api from './api.js'

function App() {
    const [user, setUser] = useState({})

    useEffect(() => {
        api.get((user) => {
            setUser(user)
        })
    }, [])

    return (
        <div id="app">
            <div className="avatar-container">
                {
                    user.avatarPath
                    
                    ?
                    <img src={user.avatarPath} />

                    :
                    null
                }
            </div>
            <div className="info-container">
                <input type="email" name="email" id="email" 
                    defaultValue={user.email}
                />
            </div>
        </div>
    )
}

export default App