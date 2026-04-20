import React, { useState, useEffect } from 'react';
import { createPackage, updatePackage } from '../services/api';

function PackageModal({ package: pkg, onClose, onSave }) {
  const [formData, setFormData] = useState({
    trackingId: '',
    status: 'Pending',
    description: '',
    receiverAddress: '',
    expectedDeliveryDate: '',
    sender: { id: '' }
  });

  useEffect(() => {
    if (pkg) {
      setFormData({
        trackingId: pkg.trackingId || '',
        status: pkg.status || 'Pending',
        description: pkg.description || '',
        receiverAddress: pkg.receiverAddress || '',
        expectedDeliveryDate: pkg.expectedDeliveryDate || '',
        sender: pkg.sender || { id: '' }
      });
    }
  }, [pkg]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'senderId') {
      setFormData({
        ...formData,
        sender: { id: value ? parseInt(value) : null }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (pkg) {
        await updatePackage(pkg.id, formData);
      } else {
        await createPackage(formData);
      }
      onSave();
    } catch (error) {
      alert('Error saving package: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{pkg ? 'Edit Package' : 'Create New Package'}</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tracking ID *</label>
            <input
              type="text"
              name="trackingId"
              value={formData.trackingId}
              onChange={handleChange}
              required
              disabled={!!pkg}
            />
          </div>

          <div className="form-group">
            <label>Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="Pending">Pending</option>
              <option value="In Transit">In Transit</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Receiver Address *</label>
            <input
              type="text"
              name="receiverAddress"
              value={formData.receiverAddress}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Expected Delivery Date</label>
            <input
              type="date"
              name="expectedDeliveryDate"
              value={formData.expectedDeliveryDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Sender ID (Optional)</label>
            <input
              type="number"
              name="senderId"
              value={formData.sender?.id || ''}
              onChange={handleChange}
              placeholder="Leave empty if not assigned"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={{ flex: 1 }}>
              {pkg ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PackageModal;

