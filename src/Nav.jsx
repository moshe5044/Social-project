import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Posts from './component/Posts';
import Todos from './component/Todos';
// import Albums from './component/Albums';
// import Photos from './component/Photos';
import Logout from './component/Logout';
import Info from './component/Info';
import Login from './component/Login';

const Nav = ({ id, user, setUser, setIsLog }) => { 
  return (
    <div>
      <nav className='navBar'>
      <Link to='/Info' className='navBarLinks'>
          Info
        </Link>
        <Link to='/Posts' className='navBarLinks'>
          Posts
        </Link>
        {/* <Link to='/Albums' className='navBarLinks'>
          Albums
        </Link> */}
        <Link to='/Todos' className='navBarLinks'>
          Todos
        </Link>
        <Link to='/Logout' className='navBarLinks'>
          Logout
        </Link>
      </nav>

      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/info' element={<Info />} />
        {/* <Route path='/Photos/:albumId' element={<Photos />} /> */}
        {/* <Route path='/Albums' element={<Albums id={id} user={user} />} /> */}
        <Route path='/Posts' element={<Posts id={id} user={user} />} />
        <Route path='/Todos' element={<Todos id={id} user={user} />} />
        <Route path='/Logout' element={<Logout setUser={setUser} setIslog={setIsLog} />} />
      </Routes>
    </div>
  );
}

export default Nav;

