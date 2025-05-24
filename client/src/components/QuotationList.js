// components/QuotationList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const QuotationList = () => {
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const response = await api.get('/quotations');
        setQuotations(response.data);
      } catch (error) {
        console.error('Error fetching quotations:', error);
      }
    };
    fetchQuotations();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this quotation?')) {
      try {
        await api.delete(`/quotations/${id}`);
        setQuotations(quotations.filter(quotation => quotation._id !== id));
      } catch (error) {
        console.error('Error deleting quotation:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Quotation List</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Index No.</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Customer Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Mobile</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Product</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Total Amount</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quotations.map((quotation, index) => (
            <tr key={quotation._id} style={{ border: '1px solid #ddd' }}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{index + 1}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{quotation.customerName}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{quotation.customerMobile}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{formatDate(quotation.createdAt)}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{quotation.productName}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>₹{quotation.totalAmount.toFixed(2)}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <Link to={`/quotation-view/${quotation._id}`} style={{ marginRight: '10px', textDecoration: 'none' }}>
                  View
                </Link>
                <Link to={`/quotation-edit/${quotation._id}`} style={{ marginRight: '10px', textDecoration: 'none' }}>
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(quotation._id)}
                  style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuotationList;
