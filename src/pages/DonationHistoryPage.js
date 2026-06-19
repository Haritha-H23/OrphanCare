import React, { useEffect, useState } from 'react';
import './DonationHistoryPage.css';
import { motion } from 'framer-motion';
import HistoryIcon from '@mui/icons-material/History';
import PaymentsIcon from '@mui/icons-material/Payments';
import { getMyDonations } from '../services/dashboardService';
import LogoutButton from '../components/LogoutButton';
import BackButton from '../components/BackButton';

const DonationHistoryPage = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonations();
  }, []);

  useEffect(() => {
    const filtered = donations.filter((donation) =>
      donation.requirement?.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    setFilteredDonations(filtered);
  }, [searchTerm, donations]);

  const fetchDonations = async () => {
    try {
      const data = await getMyDonations();
      const donationList = Array.isArray(data) ? data : [];
      setDonations(donationList);
      setFilteredDonations(donationList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="history-loading">
        <h2>Loading donation history...</h2>
      </div>
    );
  }

  return (
    <div className="history-page">
      <BackButton />
      <LogoutButton />
      <section className="history-hero">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="history-badge">Donation Records</span>

          <h1>Your Donation Journey</h1>

          <p>
            Every contribution you've made has helped create
            brighter futures and lasting hope.
          </p>
        </motion.div>
      </section>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by requirement title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredDonations.length === 0 ? (
        <div className="empty-history">
          <HistoryIcon />
          <h2>No donations found</h2>
          <p>Your donation history will appear here.</p>
        </div>
      ) : (
        <div className="history-grid">
          {filteredDonations.map((donation, index) => (
            <motion.div
              key={donation.id}
              className="history-card"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
            >
              <div className="card-header">
                <PaymentsIcon />
                <span>Donation Record</span>
              </div>

              <h3>
                {donation.requirement?.title || 'General Donation'}
              </h3>

              <div className="history-info">
                <p>
                  <strong>Amount:</strong> ₹{donation.amount}
                </p>

                <p>
                  <strong>Reference:</strong>{' '}
                  {donation.paymentReference}
                </p>

                <p>
                  <strong>Date:</strong>{' '}
                  {new Date(donation.createdAt).toLocaleDateString()}
                </p>

                <p>
                  <strong>Status:</strong>{' '}
                  <span className="success-status">SUCCESS</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationHistoryPage;