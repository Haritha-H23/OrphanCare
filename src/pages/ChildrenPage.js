import React, { useEffect, useState } from 'react';
import { getAllChildren } from '../services/ChildService';
import './ChildrenPage.css';
import { motion } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SchoolIcon from '@mui/icons-material/School';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LogoutButton from '../components/LogoutButton';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const ChildrenPage = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChildren();
  }, []);

  const navigate = useNavigate();
  const fetchChildren = async () => {
    try {
      const data = await getAllChildren();
      setChildren(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="children-loading">
        <h2>Loading children...</h2>
      </div>
    );
  }

  return (
    <div className="children-page">
      <BackButton />
      <LogoutButton /> 
      <section className="children-hero">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="hero-badge">Orphan Care Platform</span>
          <h1>Every Child Deserves a Brighter Tomorrow</h1>
          <p>
            Every child carries dreams, hopes, and endless potential.
Your kindness can help provide education, healthcare,
nutrition, and the love they deserve.
          </p>
        </motion.div>
      </section>

      {children.length === 0 ? (
        <div className="empty-state">
          <h2>No children profiles available currently</h2>
          <p>New stories of hope will appear here soon.</p>
        </div>
      ) : (
        <div className="children-grid">
          {children.map((child, index) => (
            <motion.div
              key={child.id}
              className="child-card"
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="child-image-wrapper">
                <img
                  src={
   child.imageUrl
    ? `http://localhost:8080${child.imageUrl}`
    : 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800'
}
                  alt={child.name}
                />

                <div className="image-overlay" />

                <div className="floating-badges">
                  <span>{child.age} yrs</span>
                  <span>{child.gender}</span>
                </div>
              </div>

              <div className="child-content">
                <h3>{child.name}</h3>

                <p className="description">
                  {child.description}
                </p>

                <div className="info-row">
                  <SchoolIcon />
                  <span>{child.education}</span>
                </div>

                <div className="info-row">
                  <HealthAndSafetyIcon />
                  <span>{child.healthStatus}</span>
                </div>

                <button
  className="support-btn"
  onClick={() => navigate('/requirements')}
>
                  <FavoriteIcon />
                  Support This Child
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChildrenPage;