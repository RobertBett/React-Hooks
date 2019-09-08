import React, {useState, useEffect, useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(({onLoadUsers}) => {
  const [firstNameFilterValue, setFirstNameFilterValue] = useState('');
  const [ageFilterValue, setAgeFilterValue] = useState('');
    const firstNameInputRef = useRef();
    const ageInputRef = useRef()
      useEffect(() => {
          const timer  = setTimeout(() => {
            if(firstNameFilterValue === firstNameInputRef.current.value || ageFilterValue === ageInputRef){
            console.log(firstNameFilterValue)

            if(firstNameFilterValue){
              fetch(`https://react-hooks-update-a73c0.firebaseio.com/users.json?orderBy="firstName"&equalTo="${firstNameFilterValue}"`)
                .then(res => res.json())
                .then(resData =>{
                  const loadedUser = [];
                  for(const key in resData){
                    loadedUser.push({
                      id:key,
                      firstName: resData[key].firstName,
                      age: resData[key].age
                    })
                  };
                  onLoadUsers(loadedUser)
                });}

            if(ageFilterValue){
              fetch(`https://react-hooks-update-a73c0.firebaseio.com/users.json?orderBy="age"&equalTo="${ageFilterValue}"`)
              .then(res => res.json())
              .then(resData =>{
                const loadedUser = [];
                for(const key in resData){
                  loadedUser.push({
                    id:key,
                    firstName: resData[key].firstName,
                    age: resData[key].age
                  })
                };
                onLoadUsers(loadedUser)
              });
          };}
          }, 500);
        return () => {
          clearTimeout(timer);
        };
      }, [onLoadUsers, firstNameFilterValue, ageFilterValue]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by First Name</label>
          <input type="text" 
            ref={firstNameInputRef}
            value={firstNameFilterValue}
            onChange={event => setFirstNameFilterValue(event.target.value)} />
        </div>
      </Card>
      <Card>
        <div className="search-input">
          <label>Filter by Age</label>
          <input type="number" 
            ref={ageInputRef}
            value={ageFilterValue}
            onChange={event => setAgeFilterValue(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
