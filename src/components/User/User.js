import React, {useState, useReducer ,useEffect, useCallback} from 'react';

import UserForm from './UserForm';
import Search from './Search';
import UserList from './UserList';
import ErrorModal from '../UI/ErrorModal';

const userReducer = ( currentUser, action ) =>{
  switch (action.type) {
    case 'SET':
        console.log(action)
       return action.users
    case 'ADD':
        return [...currentUser, action.users];
    case 'DELETE':
        return currentUser.filter((ig)=> ig.id !== action.id )
    default:
      
  }
}

const User = () => {
  const [users, dispatch ] = useReducer(userReducer, [])
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    fetch('https://react-hooks-update-a73c0.firebaseio.com/users.json')
      .then(res => res.json())
      .then(resData =>{
        const loadedUsers = [];
        for(const key in resData){
          loadedUsers.push({
            id:key,
            firstName: resData[key].firstName,
            age: resData[key].age
          })
        };
        dispatch({type:'SET', users: loadedUsers})
      })
  }, []);

  useEffect(() =>{
    console.log('RENDER UserS');
  })
  const filterUsersHandler = useCallback(filteredUsers =>{
    // setUsers(filteredUsers)
    dispatch({type:'SET', users: filteredUsers})
  }, [])

  const handleAddUser = user => {
    setIsloading(true)
    fetch('https://react-hooks-update-a73c0.firebaseio.com/users.json', {
      method:'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json'}
    }).then(res =>{
      return res.json()
    }).then(resData =>{
      // setusers( prevusers =>[ ...prevusers, {id: resData.name, ...user} ])
      dispatch({type:'ADD', users:{id: resData.name, ...user} })
      setIsloading(false)
    });

  };

  const onRemoveItem = id =>{
    setIsloading(true)
    fetch(`https://react-hooks-update-a73c0.firebaseio.com/users/${id}.json`, {
      method:'DELETE',
    }).then(()=>{
      setIsloading(false)
      // setusers(prevusers => prevusers.filter((ig)=> ig.id !== id ))
      dispatch({type:'DELETE', id})
    }).catch((err)=>{
        setError(err.message)
        setIsloading(false)
    })
  };

  return (
    <div className="App">
      {error && <ErrorModal onClose={()=> setError()}>{error}</ErrorModal>}
      <UserForm setUsers={handleAddUser} loading={isloading}/>
      <section>
        <Search onLoadUsers={filterUsersHandler} />
        {/* Need to add list here! */}
        <UserList users={users} onRemoveItem={onRemoveItem}/>
      </section>
    </div>
  );
}

export default User;
