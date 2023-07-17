import React, {useState, useEffect, useRef} from 'react'
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
        setState({
            email: user.email, 
            avatarPath: user.avatarPath || null
        })
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

    const fileChangeCb = (file) => {
        api.upload(file, (body) => {
            setState(body)
        })
    }

    const file = useRef()

    return (
        <div id="app">
            <div className="avatar-container">
                {
                    state.avatarPath
                    
                    ?
                    <img className="avatar" src={state.avatarPath} />

                    :
                    null
                }
                <div>
                    <input ref={file} type="file" accept="image/*" name="file" id="file" />
                    <button onClick={() => {
                        fileChangeCb(file.current.files[0])
                    }}>upload</button>
                </div>
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