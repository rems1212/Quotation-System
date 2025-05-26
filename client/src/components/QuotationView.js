// components/QuotationView.js
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const QuotationView = () => {
  const { id } = useParams();
  const [quotation, setQuotation] = useState(null);
  const printRef = useRef();

  // No need for local state for charges since they come from backend now

  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        const response = await api.get(`/api/quotations/${id}`);
        console.log('Fetched quotation:', response.data);  // Debug log
        setQuotation(response.data);
      } catch (error) {
        console.error('Error fetching quotation:', error);
      }
    };
    fetchQuotation();
  }, [id]);

  const handleDownloadPdf = () => {
    const input = printRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`quotation_${quotation._id}.pdf`);
    });
  };

  if (!quotation) return <div>Loading...</div>;

  return (
    <div>
      <div ref={printRef} style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Quotation Bill</h2>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h3>Customer Details</h3>
            <p><strong>Name:</strong> {quotation.customerName}</p>
            <p><strong>Mobile:</strong> {quotation.customerMobile}</p>
          </div>
          <div>
            <p><strong>Date:</strong> {(() => {
              const d = new Date(quotation.createdAt);
              const day = String(d.getDate()).padStart(2, '0');
              const month = String(d.getMonth() + 1).padStart(2, '0');
              const year = String(d.getFullYear()).slice(-2);
              return `${day}/${month}/${year}`;
            })()}</p>
            <p><strong>Quotation Number:</strong> {quotation.quotationNumber ? quotation.quotationNumber : 1}</p>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Product Details</h3>
          <p><strong>Product:</strong> {quotation.productName}</p>
          <p><strong>Brand:</strong> {quotation.brand}</p>
          <p><strong>Size:</strong> {quotation.size}</p>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Description</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Rate per Sq. Ft</td>
              <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'right' }}>₹{quotation.ratePerSqft.toFixed(2)}</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Total Sq. Ft</td>
              <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'right' }}>{quotation.totalSqft.toFixed(2)}</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Base Price</td>
              <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'right' }}>₹{quotation.price.toFixed(2)}</td>
            </tr>
            {quotation.withGST && (
              <tr>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>GST (18%)</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'right' }}>
                  ₹{(quotation.totalAmount - quotation.price).toFixed(2)}
                </td>
              </tr>
            )}
    <tr>
    <td style={{ padding: '10px', border: '1px solid #ddd' }}>Transportation Charge</td>
    <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'right' }}>
      ₹{quotation.transportationCharge !== undefined && quotation.transportationCharge !== null ? quotation.transportationCharge.toFixed(2) : '0.00'}
    </td>
  </tr>
  <tr>
    <td style={{ padding: '10px', border: '1px solid #ddd' }}>Labour Charge</td>
    <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'right' }}>
      ₹{quotation.labourCharge !== undefined && quotation.labourCharge !== null ? quotation.labourCharge.toFixed(2) : '0.00'}
    </td>
  </tr>

            <tr style={{ fontWeight: 'bold' }}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>Total Amount</td>
              <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'right' }}>
                ₹{quotation.totalAmount.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: '30px', textAlign: 'right' }}>
          <p>For Interior Designer</p>
          <p style={{ marginTop: '50px' }}>_________________________</p>
          <p>Authorized Signature</p>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button onClick={handleDownloadPdf} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Download PDF Bill
        </button>
      </div>
    </div>
  );
};

export default QuotationView;
