import { useState } from "react";
import Home from "./Nav";
import Login from "./component/Login";

const App = () => {
  const [isLog, setIslog] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div className="pageConntainer">
      <div className="h1Container">
        <h1 className="socialMediaHeader">M & M </h1>
        <h1 className="userNameHeader">{user?.name}</h1>
      </div>
      {isLog && (
        <Home id={user.id} user={user} setUser={setUser} setIsLog={setIslog} />
      )}
      {!isLog && <Login setIslog={setIslog} setUser={setUser} isLog={isLog} />}
    </div>
  );
};

export default App;

// import { useState } from 'react';
// import './App.css';
// import Home from './Home';
// import Info from './component/Info';
// import Login from './component/Login';
// import Posts from './component/Posts';
// import Todos from './component/Todos';
// import { Route, Routes, Navigate } from 'react-router-dom';

// function App() {
//   const [isLog, setIsLog]= useState(false);
//   return (
//     <div className="App">
//       {isLog && <Home/>}
//       <Routes>
//         <Route index element={<Navigate to='Login' />} />
//         <Route path='/login' element={<Login isLog={isLog} setIsLog={setIsLog}/>} />
//         <Route path='/home/:userName' element={<Home />} />
//         <Route path='/home/:userName/Posts' element={<Posts/>} />
//         <Route path='/home/:userName/Todos' element={<Todos/>} />
//         <Route path='/home/:userName/Info' element={<Info/>} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
