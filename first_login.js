import React, { useState } from 'react';

const AddCustomer = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!name || !phoneNumber) {
      setErrorMessage('Name and phone number are required.');
      return;
    }

    try {
      // Send API request to add customer
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone_number: phoneNumber,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        // Reset form fields
        setName('');
        setPhoneNumber('');
        setErrorMessage('');
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Add Customer</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} />
        </div>
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
};

export default AddCustomer;
