import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import api from '../api/axios';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDonors: 0,
    totalChildren: 0,
    totalRequirements: 0,
    totalDonationAmount: 0
  });

  const [recentDonations, setRecentDonations] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');

      const statsResponse = await api.get('/admin/stats', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const donationsResponse = await api.get('/donations', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setStats(statsResponse.data);
      setRecentDonations(
        Array.isArray(donationsResponse.data)
          ? donationsResponse.data
          : []
      );

    } catch (error) {
      console.error(error);
    }
  };

  const barData = [
    { name: 'Users', value: stats.totalUsers },
    { name: 'Donors', value: stats.totalDonors },
    { name: 'Children', value: stats.totalChildren },
    { name: 'Campaigns', value: stats.totalRequirements }
  ];

  const pieData = [
    { name: 'Children', value: stats.totalChildren },
    { name: 'Donors', value: stats.totalDonors },
    { name: 'Campaigns', value: stats.totalRequirements }
  ];

  const COLORS = ['#87CEEB', '#191970', '#5DADE2'];

  return (
    <div className="admin-dashboard-page">

<LogoutButton />
      <motion.section
        className="admin-hero"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="admin-badge">Administrator Dashboard</span>
        <h1>Analytics Control Center</h1>
        <p>
          Monitor platform growth, donations,
          campaigns, and operational performance.
        </p>
      </motion.section>

      <div className="summary-grid">
        <div className="summary-card">
          <h3>₹{stats.totalDonationAmount}</h3>
          <p>Total Donations</p>
        </div>

        <div className="summary-card">
          <h3>{recentDonations.length}</h3>
          <p>Total Transactions</p>
        </div>
      </div>

      <div className="charts-grid">
        <motion.div
          className="chart-card"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2>Platform Overview</h2>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="chart-card"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2>Distribution Analysis</h2>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={110}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="admin-actions-panel">
  <h2>Quick Admin Actions</h2>

  <div className="actions-grid">
    <motion.div
      className="action-card"
      whileHover={{ y: -8 }}
    >
      <h3>Manage Children</h3>
      <p>
        Add, update, or remove child profiles
        from the platform.
      </p>

      <button
        className="dashboard-btn"
        onClick={() => navigate('/admin/children')}
      >
        Go to Children Management
      </button>
    </motion.div>

    <motion.div
      className="action-card"
      whileHover={{ y: -8 }}
    >
      <h3>Manage Requirements</h3>
      <p>
        Create, update, and monitor
        fundraising campaigns.
      </p>

      <button
        className="dashboard-btn"
        onClick={() => navigate('/admin/requirements')}
      >
        Go to Requirements Management
      </button>
    </motion.div>
  </div>
</div>

      <div className="recent-panel">
        <h2>Recent Donations</h2>

        {recentDonations.slice(0, 6).map((donation) => (
          <div key={donation.id} className="donation-row">
            <span>{donation.donor?.fullName || 'Donor'}</span>
            <span>₹{donation.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;