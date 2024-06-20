import React from 'react'
import './Modal.css';
export default function Modal({ show, onClose, onConfirm, field }) {
    if (!show) {
        return null;
      }
    
      return (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>Confirm Change</h2>
            <p>Are you sure you want to change your {field}?</p>
            <div className="modal-buttons">
              <button onClick={onConfirm}>Yes</button>
              <button onClick={onClose}>No</button>
            </div>
          </div>
        </div>
      );
}
