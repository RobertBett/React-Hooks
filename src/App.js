import React, {useContext} from 'react';

import User from './components/User/User';
import { AuthContext } from './context/AuthContext';
import Auth from './components/Auth';


const App = props => {
  const authContext = useContext(AuthContext);
  let context = <Auth/>
  if(authContext.isAuth){
    context = <User />
  }
 return context
};

export default App;
