import {Welcome} from './components/pages/Welcome/Welcome'
import {Register} from './components/pages/Register/Register'
import {Routes, Route} from 'react-router'
import {Login} from './components/pages/Login/Login'
import {Home} from './components/pages/Home/Home'

export const App = () => {
  return (
    //rendering components; using this layout because i am not rendering them on the same page (clickable buttons move me from one page to the next)
    <Routes>
      <Route path='/' element={<Welcome/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
  )
}
