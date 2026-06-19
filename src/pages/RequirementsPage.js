import React, { useEffect, useState } from 'react';
import './RequirementsPage.css';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllRequirements } from '../services/RequirementService';
import { donate } from '../services/DonationService';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PaymentsIcon from '@mui/icons-material/Payments';
import CloseIcon from '@mui/icons-material/Close';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import BackButton from '../components/BackButton';

const RequirementsPage = () => {
  const [requirements, setRequirements] = useState([]);
  const [selectedRequirement, setSelectedRequirement] = useState(null);
  const [amount, setAmount] = useState('');
  const [paymentReference, setPaymentReference] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequirements();
  }, []);

  const navigate = useNavigate();
  const fetchRequirements = async () => {
    try {
      const data = await getAllRequirements();
      setRequirements(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

  const handleDonate = async () => {
  if (!amount) {
    alert('Enter donation amount');
    return;
  }

  try {
    const loaded = await loadRazorpayScript();

    if (!loaded) {
      alert('Razorpay SDK failed to load');
      return;
    }

    const token = localStorage.getItem('token');

    const orderResponse = await api.post(
      '/payment/create-order',
      {
        amount: Number(amount)
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const order = orderResponse.data;

    const options = {
      key: order.key,
      amount: order.amount,
      currency: order.currency,
      name: 'Orphan Care Platform',
      description: 'Donation Payment',
      order_id: order.orderId,

      handler: async function (response) {
        try {
          await donate({
            requirementId: selectedRequirement.id,
            amount: Number(amount),
            paymentReference: response.razorpay_payment_id
          });

          setSuccessMessage('Donation successful ❤️');
          setSelectedRequirement(null);
          setAmount('');
          fetchRequirements();

          setTimeout(() => {
            setSuccessMessage('');
          }, 3000);

          navigate('/donation-history');

        } catch (error) {
          console.error(error);
          alert('Donation save failed');
        }
      },

      prefill: {
        email: localStorage.getItem('email')
      },

      theme: {
        color: '#191970'
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

  } catch (error) {
    console.error(error);
    alert('Payment failed');
  }
};

  return (
    <div className="requirements-page">
      <BackButton />
      <LogoutButton />
      <section className="requirements-hero">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="hero-badge">Active Donation Campaigns</span>

          <h1>Support Real Needs. Change Real Lives.</h1>

          <p>
            Every contribution helps provide education,
            healthcare, nutrition, and a safer future
            for children who need our care.
          </p>
        </motion.div>
      </section>

      <AnimatePresence>
        {successMessage && (
          <motion.div
            className="success-banner"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="requirements-grid">
        {requirements.map((req, index) => {
          const progress = Math.min(
            (req.amountCollected / req.amountNeeded) * 100,
            100
          );

          return (
            <motion.div
              key={req.id}
              className="requirement-card"
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="card-top">
                <span className="status-pill">{req.status}</span>
              </div>

              <h3>{req.title}</h3>

              <p>{req.description}</p>

              <div className="amount-section">
                <div>
                  <small>Raised</small>
                  <h4>₹{req.amountCollected}</h4>
                </div>

                <div>
                  <small>Goal</small>
                  <h4>₹{req.amountNeeded}</h4>
                </div>
              </div>

              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1 }}
                />
              </div>

              <div className="progress-text">
                {progress.toFixed(0)}% funded
              </div>

              <button
                className="donate-btn"
                onClick={() => setSelectedRequirement(req)}
              >
                <VolunteerActivismIcon />
                Donate Now
              </button>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedRequirement && (
          <div className="modal-overlay">
            <motion.div
              className="donation-modal"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
            >
              <div className="modal-header">
                <h2>{selectedRequirement.title}</h2>

                <button
                  className="close-btn"
                  onClick={() => setSelectedRequirement(null)}
                >
                  <CloseIcon />
                </button>
              </div>

              <p className="modal-sub">
                Your support can make a meaningful difference.
              </p>

              <div className="input-group">
                <PaymentsIcon />
                <input
                  type="number"
                  placeholder="Enter donation amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <button
                className="confirm-btn"
                onClick={handleDonate}
              >
                Confirm Donation
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RequirementsPage;