import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { motion } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CampaignIcon from '@mui/icons-material/Campaign';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HistoryIcon from '@mui/icons-material/History';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useNavigate } from 'react-router-dom';

import {
  getMyDonations,
  getRequirements,
  getProfile
} from '../services/dashboardService';

import LogoutButton from '../components/LogoutButton';

const Home = () => {
  const navigate = useNavigate();

  const [donations, setDonations] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [profile, setProfile] = useState(null);
  const [totalDonated, setTotalDonated] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const donationData = await getMyDonations();
      const requirementData = await getRequirements();
      const profileData = await getProfile();

      const donationList = Array.isArray(donationData)
        ? donationData
        : [];

      const requirementList = Array.isArray(requirementData)
        ? requirementData
        : [];

      setDonations(donationList);
      setRequirements(requirementList);
      setProfile(profileData);

      const total = donationList.reduce(
        (sum, donation) => sum + donation.amount,
        0
      );

      setTotalDonated(total);

    } catch (error) {
      console.error(error);
    }
  };

  const livesImpacted = Math.max(
    1,
    Math.floor(totalDonated / 500)
  );

  return (
    <div className="dashboard-page">
      <LogoutButton />

      <motion.section
        className="profile-hero"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="profile-left">
          <div className="avatar-circle">
            <AccountCircleIcon />
          </div>

          <div>
            <span className="dashboard-badge">
              💙 Donor Dashboard
            </span>

            <h1>
              Welcome back, {profile?.fullName || 'Supporter'}
            </h1>

            <p>
              Your generosity creates brighter futures for
              children through education, healthcare,
              nutrition, and hope.
            </p>
          </div>
        </div>

        <div className="profile-right">
          <p>
            <strong>Email:</strong> {profile?.email}
          </p>

          <p>
            <strong>Role:</strong> {profile?.role}
          </p>

          <p>
            <strong>Joined:</strong>{' '}
            {profile?.createdAt
              ? new Date(profile.createdAt).toLocaleDateString()
              : '-'}
          </p>
        </div>
      </motion.section>

      <div className="stats-grid">
        <motion.div
          className="stat-card"
          whileHover={{ y: -8 }}
        >
          <FavoriteIcon />
          <h3>₹{totalDonated}</h3>
          <p>Total Contributions</p>
        </motion.div>

        <motion.div
          className="stat-card"
          whileHover={{ y: -8 }}
        >
          <VolunteerActivismIcon />
          <h3>{donations.length}</h3>
          <p>Acts of Kindness</p>
        </motion.div>

        <motion.div
          className="stat-card"
          whileHover={{ y: -8 }}
        >
          <PeopleAltIcon />
          <h3>{livesImpacted}</h3>
          <p>Lives Impacted</p>
        </motion.div>

        <motion.div
          className="stat-card"
          whileHover={{ y: -8 }}
        >
          <CampaignIcon />
          <h3>{requirements.length}</h3>
          <p>Active Campaigns</p>
        </motion.div>
      </div>

      <motion.section
        className="featured-child"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="featured-image">
          <img
            src="https://images.unsplash.com/photo-1509099836639-18ba1795216d"
            alt="Featured Child"
          />
        </div>

        <div className="featured-content">
          <span className="featured-tag">
            Featured Child Story
          </span>

          <h2>Meet Priya, Age 8</h2>

          <p>
            Priya dreams of becoming a doctor someday.
            She currently needs educational support,
            healthcare assistance, and nutritious meals.
          </p>

          <button onClick={() => navigate('/children')}>
            Support a Child
          </button>
        </div>
      </motion.section>

      <div className="actions-grid">
        <motion.div
          className="action-card"
          whileHover={{ y: -8 }}
          onClick={() => navigate('/children')}
        >
          <ChildCareIcon />
          <h3>Browse Children</h3>
          <p>
            Discover children who need care, support,
            and a brighter tomorrow.
          </p>
        </motion.div>

        <motion.div
          className="action-card"
          whileHover={{ y: -8 }}
          onClick={() => navigate('/requirements')}
        >
          <VolunteerActivismIcon />
          <h3>Support Campaigns</h3>
          <p>
            Help fund education, healthcare,
            nutrition, and emergency support.
          </p>
        </motion.div>

        <motion.div
          className="action-card"
          whileHover={{ y: -8 }}
          onClick={() => navigate('/donation-history')}
        >
          <HistoryIcon />
          <h3>Impact Journey</h3>
          <p>
            View your donation timeline and
            the lives you've touched.
          </p>
        </motion.div>
      </div>

      <div className="dashboard-bottom">
        <div className="recent-panel">
          <h2>Your Recent Contributions</h2>

          {donations.length > 0 ? (
            donations.slice(0, 4).map((donation) => (
              <div
                key={donation.id}
                className="donation-row"
              >
                <span>
                  {donation.requirement?.title ||
                    'Donation'}
                </span>

                <span>₹{donation.amount}</span>
              </div>
            ))
          ) : (
            <p className="empty-text">
              No donations yet. Start making an impact ❤️
            </p>
          )}
        </div>

        <div className="recent-panel">
          <h2>Live Campaign Progress</h2>

          {requirements.length > 0 ? (
            requirements.slice(0, 4).map((req) => (
              <div
                key={req.id}
                className="campaign-row"
              >
                <span>{req.title}</span>

                <span>
                  {Math.round(
                    (req.amountCollected /
                      req.amountNeeded) * 100
                  ) || 0}%
                </span>
              </div>
            ))
          ) : (
            <p className="empty-text">
              No campaigns available currently.
            </p>
          )}
        </div>
      </div>

      <motion.div
        className="impact-banner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <AutoAwesomeIcon />

        <span>
          Every contribution writes a new story of hope,
          healing, and opportunity for a child in need.
        </span>
      </motion.div>
    </div>
  );
};

export default Home;