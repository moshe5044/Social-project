import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Posts from './component/Posts';
import Todos from './component/Todos';
import Albums from './component/Albums';
import Photos from './component/Photos';
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
        <Link to='/Login' className='navBarLinks'>
          Logout
        </Link>
      </nav>

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/info' element={<Info />} />
        <Route path='/Photos/:albumId' element={<Photos />} />
        {/* <Route path='/Albums' element={<Albums id={id} user={user} />} /> */}
        <Route path='/Posts' element={<Posts id={id} user={user} />} />
        <Route path='/Todos' element={<Todos id={id} user={user} />} />
        <Route index element={<Logout setUser={setUser} setIslog={setIsLog} />} />
      </Routes>
    </div>
  );
}

export default Nav;


// import React from 'react'
// import { useNavigate } from "react-router-dom";


// const Home = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('currentUser'))


//   function navTo(e) {
//     if (e == 'log Out' ){
//       localStorage.removeItem('currentUser');
//       navigate(`/login`);
//       return
//     }
//     navigate(`/home/${user.username}/${e}`);
//   }
//   return (
//     <>
//       <h1 className="userNameHeader">{user.name}</h1>

//       <nav className='navBar'>
//         <div className='navButtons' onClick={(e) => navTo(e.target.innerText)}>Info</div>
//         <div className='navButtons' onClick={(e) => navTo(e.target.innerText)}>Todos</div>
//         <div className='navButtons' onClick={(e) => navTo(e.target.innerText)}>Posts</div>
//         <div className='navButtons' onClick={(e) => navTo(e.target.innerText)}>log Out</div>
//       </nav>
//     </>

//   )
// }

// export default Home