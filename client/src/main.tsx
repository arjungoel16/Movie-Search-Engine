import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './app.tsx'
import LandingPage from './pages/LandingPage/LandingPage.tsx'

import SavedMovies from './pages/SavedMovies.tsx'
import SearchMovies from './pages/SearchMovies.tsx'
import LoginForm from './components/LoginForm.tsx'
import NavBar from './components/NavBar.tsx'
import SignupForm from './components/SignupForm.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // {
      //   index: true,
      //   element: <div>Hello</div>
      // },
      // {
      //   path: "/test",
      //   element: <div>Test</div>
      // },
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: '/SavedMovies',
        element: <SavedMovies />,
      },
      {
        path: '/LoginForm',
        element: <LoginForm handleModalClose={() => { /* handle modal close logic */ }} />,
      },
      {
        path: '/NavBar',
        element: <NavBar showModal={false} setShowModal={() => {}} activeTab="" setActiveTab={() => {}} />,
      },
      {
        path: '/SignupForm',
        element: <SignupForm handleModalClose={() => { /* handle modal close logic */ }} />,
      },
      {

        path: '/searchMovies',
        element: <SearchMovies></SearchMovies>
      }

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)