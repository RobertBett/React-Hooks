import React, {useState} from 'react';

import Card from '../UI/Card';
import './UserForm.css';
import LoadingIndicator from '../UI/LoadingIndicator';

const UserForm = React.memo(props => {
  // const [inputState, setInputState ] =  useState({
  //   firstName:'',
  //   Age:''
  // })
  const [ enteredfirstName, setfirstName] = useState('');
  const [ enteredAge, setAge] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.setUsers({
      firstName:enteredfirstName, 
      age:enteredAge
    })
    // ...
  };

  return (
    <section className="user-form">
    <Card>
      <h1>{enteredfirstName}</h1>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName"  
                value={enteredfirstName} 
                onChange={event => setfirstName(event.target.value)}/>
          </div>
          <div className="form-control">
            <label htmlFor="Age">Age</label>
            <input type="number" id="Age" 
                value={enteredAge} 
                onChange={event => setAge(event.target.value)}/>
          </div>
          <div className="user-form__actions">
            <button type="submit">Add Person</button>
            {props.loading && <LoadingIndicator/>}
          </div>
        </form>
      </Card> 
    </section>
  );
});

export default UserForm;
