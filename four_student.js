// 4.Create a new object which have all the properties of object person and student

import React from 'react';

const person = {
  id: 2,
  gender: 'mail',
};

const student = {
  name: "ravi",
  email: "ravi11@yopmail.com",
};

const combinedObject = {
  ...person,
  ...student,
};

function App() {
  return (
    <div>
      <h1>Combined Object</h1>
      <p>ID: {combinedObject.id}</p>
      <p>Gender: {combinedObject.gender}</p>
      <p>Name: {combinedObject.name}</p>
      <p>Email: {combinedObject.email}</p>
    </div>
  );
}

export default App;
