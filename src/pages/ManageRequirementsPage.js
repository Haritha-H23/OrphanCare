import React, { useEffect, useState } from 'react';
import './ManageRequirementsPage.css';
import { motion, AnimatePresence } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import {
  getRequirements,
  addRequirement,
  updateRequirement,
  deleteRequirement
} from '../services/adminRequirementService';
import LogoutButton from '../components/LogoutButton';
import BackButton from '../components/BackButton';

const initialForm = {
  title: '',
  description: '',
  amountNeeded: '',
  amountCollected: 0,
  status: 'ACTIVE'
};

const ManageRequirementsPage = () => {
  const [requirements, setRequirements] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingRequirement, setEditingRequirement] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchRequirements();
  }, []);

  const fetchRequirements = async () => {
    try {
      const data = await getRequirements();
      setRequirements(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const openAddModal = () => {
    setEditingRequirement(null);
    setFormData(initialForm);
    setShowModal(true);
  };

  const openEditModal = (req) => {
    setEditingRequirement(req);
    setFormData(req);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      if (editingRequirement) {
        await updateRequirement(editingRequirement.id, formData);
      } else {
        await addRequirement(formData);
      }

      setShowModal(false);
      fetchRequirements();

    } catch (error) {
      console.error(error);
      alert('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this requirement?')) return;

    try {
      await deleteRequirement(id);
      fetchRequirements();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="manage-page">

        <BackButton />
      <LogoutButton />
      <div className="manage-header">
        <div>
          <span className="admin-badge">Admin Panel</span>
          <h1>Manage Requirements</h1>
          <p>Create and manage donation campaigns.</p>
        </div>

        <button className="add-btn" onClick={openAddModal}>
          <AddIcon />
          Add Requirement
        </button>
      </div>

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
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
            >
              <div className="status-row">
                <span className="status-pill">{req.status}</span>
              </div>

              <h3>{req.title}</h3>

              <p>{req.description}</p>

              <div className="amount-row">
                <span>Raised: ₹{req.amountCollected}</span>
                <span>Goal: ₹{req.amountNeeded}</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="admin-actions">
                <button
                  className="edit-btn"
                  onClick={() => openEditModal(req)}
                >
                  <EditIcon />
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(req.id)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="modal-overlay">
            <motion.div
              className="requirement-modal"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
            >
              <div className="modal-top">
                <h2>
                  {editingRequirement
                    ? 'Edit Requirement'
                    : 'Add Requirement'}
                </h2>

                <button
                  className="close-btn"
                  onClick={() => setShowModal(false)}
                >
                  <CloseIcon />
                </button>
              </div>

              <input
                name="title"
                placeholder="Requirement Title"
                value={formData.title}
                onChange={handleChange}
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />

              <input
                name="amountNeeded"
                type="number"
                placeholder="Goal Amount"
                value={formData.amountNeeded}
                onChange={handleChange}
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>

              <button
                className="save-btn"
                onClick={handleSubmit}
              >
                {editingRequirement
                  ? 'Update Requirement'
                  : 'Save Requirement'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageRequirementsPage;