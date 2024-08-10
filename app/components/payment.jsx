'use client'

import { useState } from 'react';

export default function PaymentPage() {
  const [formData, setFormData] = useState({
    accountNumber: '',
    amount: '',
    currency: 'TZS',
    externalId: '',
    provider: 'Airtel',
    additionalProperties: undefined
  });
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/azampay/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    setResponse(data);
  };

  return (
    <div>
      <h1>Payment</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Account Number:
          <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required />
        </label>
        <label>
          Amount:
          <input type="text" name="amount" value={formData.amount} onChange={handleChange} required />
        </label>
        <label>
          Currency:
          <input type="text" name="currency" value={formData.currency} readOnly />
        </label>
        <label>
          External ID:
          <input type="text" name="externalId" value={formData.externalId} onChange={handleChange} required />
        </label>
        <label>
          Provider:
          <select name="provider" value={formData.provider} onChange={handleChange}>
            <option value="Airtel">Airtel</option>
            <option value="Tigo">Tigo</option>
            <option value="Halopesa">Halopesa</option>
            <option value="Azampesa">Azampesa</option>
            <option value="Mpesa">Mpesa</option>
          </select>
        </label>
        <label>
          Additional Properties:
          <input type="text" name="additionalProperties" value={formData.additionalProperties} onChange={handleChange} />
        </label>
        <button type="submit">Submit Payment</button>
      </form>
      {response && (
        <div>
          <h2>Response</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
