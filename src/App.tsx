import {Welcome} from './components/pages/Welcome/Welcome'
import {Register} from './components/pages/Register/Register'
import {Routes, Route} from 'react-router'

export const App = () => {
  return (
    //rendering components; using this layout because i am not rendering them on the same page (clickable buttons move me from one page to the next)
    <Routes>
      <Route path='/' element={<Welcome/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
  )
}
