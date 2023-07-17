import React, {useState, useEffect} from 'react'
import api from './api.js'

function App() {
    const [user, setUser] = useState({})
    const [state, setState] = useState({})

    useEffect(() => {
        api.get((user) => {
            setUser(user)
        })
    }, [])

    useEffect(() => {
        setState({email: user.email})
    }, [user])

    useEffect(() => {
        api.update(state.email, state.password, () => {})
    }, [state])

    const emailChangeCb = (email) => {
        setState({...state, email})
    }

    const passwordChangeCb = (password) => {
        setState({...state, password})
    }

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
                    defaultValue={state.email}
                    onBlur={(ev) => {
                        emailChangeCb(ev.target.value)
                    }}
                />
                <input type="password" name="password" id="password" 
                    onBlur={(ev) => {
                        passwordChangeCb(ev.target.value)
                    }}
                />
            </div>
        </div>
    )
}

export default App