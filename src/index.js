import React from 'react'
import ReactDOM from 'react-dom/client'
import ReactModal from 'react-modal';
import { BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App'

ReactModal.setAppElement('#root');

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<BrowserRouter><App /></BrowserRouter>)