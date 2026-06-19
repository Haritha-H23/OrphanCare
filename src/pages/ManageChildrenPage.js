import React, { useEffect, useState } from 'react';
import './ManageChildrenPage.css';
import { motion, AnimatePresence } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import {
  getChildren,
  addChild,
  updateChild,
  deleteChild
} from '../services/adminChildrenService';
import LogoutButton from '../components/LogoutButton';
import BackButton from '../components/BackButton';

const initialForm = {
  name: '',
  age: '',
  gender: '',
  education: '',
  healthStatus: '',
  imageUrl: '',
  description: ''
};

const ManageChildrenPage = () => {
  const [children, setChildren] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingChild, setEditingChild] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      const data = await getChildren();
      setChildren(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const openAddModal = () => {
    setEditingChild(null);
    setFormData(initialForm);
    setShowModal(true);
  };

  const openEditModal = (child) => {
    setEditingChild(child);
    setFormData(child);
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
      if (editingChild) {
        await updateChild(editingChild.id, formData);
      } else {
        const payload = new FormData();

payload.append('name', formData.name);
payload.append('age', formData.age);
payload.append('gender', formData.gender);
payload.append('education', formData.education);
payload.append('healthStatus', formData.healthStatus);
payload.append('description', formData.description);
payload.append('image', formData.image);

await addChild(payload);
      }

      setShowModal(false);
      fetchChildren();

    } catch (error) {
      console.error(error);
      alert('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this child?')) return;

    try {
      await deleteChild(id);
      fetchChildren();
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
          <h1>Manage Children</h1>
          <p>
            Add, edit, and manage children profiles.
          </p>
        </div>

        <button className="add-btn" onClick={openAddModal}>
          <AddIcon />
          Add Child
        </button>
      </div>

      <div className="children-grid">
        {children.map((child, index) => (
          <motion.div
            key={child.id}
            className="admin-child-card"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
          >
            <img
  src={
   child.imageUrl
    ? `http://localhost:8080${child.imageUrl}`
    : 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800'
}
  alt={child.name}
/>

            <div className="card-content">
              <h3>{child.name}</h3>

              <p><strong>Age:</strong> {child.age}</p>
              <p><strong>Gender:</strong> {child.gender}</p>
              <p><strong>Education:</strong> {child.education}</p>
              <p><strong>Health:</strong> {child.healthStatus}</p>

              <div className="admin-actions">
                <button
                  className="edit-btn"
                  onClick={() => openEditModal(child)}
                >
                  <EditIcon />
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(child.id)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="modal-overlay">
            <motion.div
              className="child-modal"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
            >
              <div className="modal-top">
                <h2>
                  {editingChild ? 'Edit Child' : 'Add Child'}
                </h2>

                <button
                  className="close-btn"
                  onClick={() => setShowModal(false)}
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="form-grid">
                <input
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                />

                <input
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                />

                <input
                  name="gender"
                  placeholder="Gender"
                  value={formData.gender}
                  onChange={handleChange}
                />

                <input
                  name="education"
                  placeholder="Education"
                  value={formData.education}
                  onChange={handleChange}
                />

                <input
                  name="healthStatus"
                  placeholder="Health Status"
                  value={formData.healthStatus}
                  onChange={handleChange}
                />

                <input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setFormData({
      ...formData,
      image: e.target.files[0]
    })
  }
/>
              </div>

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />

              <button
                className="save-btn"
                onClick={handleSubmit}
              >
                {editingChild ? 'Update Child' : 'Save Child'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageChildrenPage;