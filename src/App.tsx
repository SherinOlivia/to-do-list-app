
import './App.css'
import  {BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Register, Login, Profile, Dashboard, TaskList, CreateTask } from './pages'
import AppProvider from './provider/AppProvider'

function App() {

  return (
    <>
      <h1>Hello World</h1>
        <BrowserRouter>
          <AppProvider>
            <Routes>
              <Route path='/' element={<Navigate to="/login" />} />
              <Route path='/login' element={<Login />} /> 
              <Route path='/register' element={<Register />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/task' element={<TaskList />} />
              <Route path='/add' element={<CreateTask />} />
            </Routes>
          </AppProvider>
        </BrowserRouter>
    </>
  )
}

export default App
