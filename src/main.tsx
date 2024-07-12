import React from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import { AppThemeProvider } from './providers/AppThemeProvider.tsx'
import { AppRouteProvider } from './providers/AppRouteProvider.tsx'
import { AppQueryProvider } from './providers/AppQueryProvider.tsx'
import { AppLocalizationProvider } from './providers/AppLocalizationProvider.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppLocalizationProvider>
      <AppQueryProvider>
        <AppThemeProvider>
          <AppRouteProvider />
        </AppThemeProvider>
      </AppQueryProvider>
    </AppLocalizationProvider>
  </React.StrictMode>,
)
