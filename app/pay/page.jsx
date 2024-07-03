'use client'

import { useState } from 'react';

export function Home() {
  const [formData, setFormData] = useState({
    BaseUrl: '',
    msisdn: '',
    amount: '',
    message: '',
    utilityref: '',
    operator: '',
    reference: '',
    transactionstatus: '',
    submerchantAcc: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/checkoutCallback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await res.json();
    console.log(result);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="BaseUrl" placeholder="Base URL" onChange={handleChange} />
        <input type="text" name="msisdn" placeholder="MSISDN" onChange={handleChange} />
        <input type="text" name="amount" placeholder="Amount" onChange={handleChange} />
        <input type="text" name="message" placeholder="Message" onChange={handleChange} />
        <input type="text" name="utilityref" placeholder="Utility Ref" onChange={handleChange} />
        <input type="text" name="operator" placeholder="Operator" onChange={handleChange} />
        <input type="text" name="reference" placeholder="Reference" onChange={handleChange} />
        <input type="text" name="transactionstatus" placeholder="Transaction Status" onChange={handleChange} />
        <input type="text" name="submerchantAcc" placeholder="Sub Merchant Acc" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Home;
