import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/main/App'
import ViewImages from './pages/previews/ViewImages'
import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications';
import { Routes, Route,BrowserRouter as Router } from 'react-router-dom'
import TopHeader from './components/Header';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
            <NotificationsProvider position="top-right">
            <TopHeader/>
            <Routes>
                <Route path="/" element={<App />}/>
                <Route path="*" element={<ViewImages />}  />
            </Routes>
                       
            </NotificationsProvider>
        </MantineProvider>
    </Router>
)
