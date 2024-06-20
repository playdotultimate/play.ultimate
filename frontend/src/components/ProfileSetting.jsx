import React, { useState } from 'react';
import './ProfileSetting.css';
import Modal from './Modal.jsx';
import { Link } from 'react-router-dom'

export default function ProfileSetting() {
  const [PlayerId, setPlayerId] = useState('0123456789');
  const [showPasswordSign, setShowPasswordSign] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentField, setCurrentField] = useState('');

  const togglePasswordVisibilitySign = () => {
    setShowPasswordSign(!showPasswordSign);
  };


//this is initial profile nothing to do with it set here user initial details
  const initialProfile = {
    firstName: 'Ritchie',
    lastName: 'Dennis',
    email: 'ritchiedennis@gmail.com',
    Password: 'abc@123',
    phoneNumber: '1235456789',
    address: 'anything',
    pinCode: '110236',
  };

  //changes will be made from it beacause it is updating the profile
  const [profile, setProfile] = useState(initialProfile);

//it is changing always on onchange property and whennuser click on save its values copied to profile
  const [editingProfile, setEditingProfile] = useState(initialProfile);


  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    email: false,
    Password: false,
    phoneNumber: false,
    address: false,
    pinCode: false,
  });

  const handleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleSave = (field) => {
    if (field === 'email' || field === 'Password') {
      setCurrentField(field);
      setShowModal(true);
    } else {
      setProfile({ ...profile, [field]: editingProfile[field] });
      setIsEditing({ ...isEditing, [field]: false });
    }
  };

  const handleCancel = (field) => {
    setEditingProfile({ ...editingProfile, [field]: profile[field] });
    setIsEditing({ ...isEditing, [field]: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProfile({ ...editingProfile, [name]: value });
  };

  const confirmChange = () => {
    setProfile({ ...profile, [currentField]: editingProfile[currentField] });
    setIsEditing({ ...isEditing, [currentField]: false });
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProfile({ ...editingProfile, [currentField]: profile[currentField] });
    setIsEditing({ ...isEditing, [currentField]: false });
  };

  return (
    <>
    <nav className="nav-bar">
  <div className="left-content">
    <Link to="/home">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
        <path fill="currentColor" d="m14.8 16.382-4.205-4.205a.25.25 0 0 1 0-.354L14.8 7.618a.75.75 0 0 0-1.06-1.06l-4.206 4.204a1.75 1.75 0 0 0 0 2.475l4.206 4.205a.75.75 0 0 0 1.06-1.06"></path>
      </svg>
    </Link>

  </div>
  <div className="center-content">
    <span>Your account</span>
  </div>
  <div className="right-content"></div>
</nav>
      
      <div className="profile-settings">
              
              <div className="profile-photo-section">
                  <div className="profile-photo">{profile.firstName.charAt(0).toUpperCase()}</div>
                  <div>
                      <h3>{profile.firstName} {profile.lastName}</h3>
                      <p>Player ID ~ {PlayerId}</p>
                  </div>
              </div>
              <br />
              <br />
              {Object.keys(profile).map((field) => (
                  <div key={field} className="profile-field">
                      <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                      {isEditing[field] ? (
                          <div className="field-input" style={{ position: 'relative' }}>
                              <input
                                  type={field === 'Password' && !showPasswordSign ? 'password' : 'text'}
                                  name={field}
                                  value={editingProfile[field]}
                                  onChange={handleChange} />
                              {field === 'Password' && (
                                  <i
                                      id="showpass"
                                      className={showPasswordSign ? 'fa-solid fa-eye-slash' : 'eye-icon fas fa-eye'}
                                      onClick={togglePasswordVisibilitySign}
                                  ></i>
                              )}
                              <div className="field-buttons">
                                  <button onClick={() => handleSave(field)}>Save</button>
                                  <button onClick={() => handleCancel(field)}>Cancel</button>
                              </div>
                          </div>
                      ) : (
                          <div className="field-display">
                              <span>{field === 'Password' ? '********' : profile[field]}</span>
                              <button onClick={() => handleEdit(field)}>Edit</button>
                          </div>
                      )}
                      <hr />
                  </div>
              ))}
              <Modal
                  show={showModal}
                  onClose={closeModal}
                  onConfirm={confirmChange}
                  field={currentField === 'email' ? 'email' : 'password'} />
          </div></>
  );
}
