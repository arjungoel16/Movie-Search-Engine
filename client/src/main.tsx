import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './app.tsx'
import LandingPage from './components/LandingPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [
        {index: true, element:<LandingPage/>}
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)