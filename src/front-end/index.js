import React from 'react'
import ReactDOM from "react-dom/client"

import App from './app.js'

import './index.html'
import './index.scss'

function main() {
    const root = ReactDOM.createRoot(document.querySelector('#main'))
    root.render(<App />)
}

main()