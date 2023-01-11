import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ViewImages from './ViewImages'
import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications';
import { Routes, Route,BrowserRouter as Router } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Router>
        <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
            <NotificationsProvider position="top-right">
            <Routes>
                <Route path="/" element={<App />}/>
                <Route path="*" element={<ViewImages />}  />
            </Routes>
                       
            </NotificationsProvider>
        </MantineProvider>
    </Router>
  // </React.StrictMode>,
)
