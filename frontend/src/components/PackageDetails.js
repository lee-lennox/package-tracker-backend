import React, { useState, useEffect } from 'react';
import { getPackageById, getTrackingEvents, createTrackingEvent } from '../services/api';

function PackageDetails({ packageId, onBack, userRole }) {
  const [pkg, setPkg] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventForm, setEventForm] = useState({
    status: '',
    location: '',
    description: ''
  });

  useEffect(() => {
    fetchPackageDetails();
    fetchEvents();
  }, [packageId]);

  const fetchPackageDetails = async () => {
    try {
      const response = await getPackageById(packageId);
      setPkg(response.data);
    } catch (error) {
      console.error('Error fetching package details:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await getTrackingEvents(packageId);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTrackingEvent(packageId, eventForm);
      setEventForm({ status: '', location: '', description: '' });
      setShowEventForm(false);
      fetchEvents();
      fetchPackageDetails();
    } catch (error) {
      alert('Error creating event: ' + (error.response?.data?.message || error.message));
    }
  };

  const getStatusClass = (status) => {
    const statusLower = status.toLowerCase().replace(/\s+/g, '-');
    return `status-badge status-${statusLower}`;
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString();
  };

  if (!pkg) {
    return <div className="loading">Loading package details...</div>;
  }

  return (
    <div>
      <button className="btn-secondary" onClick={onBack} style={{ marginBottom: '1rem' }}>
        ← Back to List
      </button>

      <div className="package-details">
        <h3>Package Details</h3>
        <div className="detail-row">
          <span className="detail-label">Tracking ID:</span>
          <span className="detail-value">{pkg.trackingId}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Status:</span>
          <span className="detail-value">
            <span className={getStatusClass(pkg.status)}>{pkg.status}</span>
          </span>
        </div>
        {pkg.description && (
          <div className="detail-row">
            <span className="detail-label">Description:</span>
            <span className="detail-value">{pkg.description}</span>
          </div>
        )}
        <div className="detail-row">
          <span className="detail-label">Receiver Address:</span>
          <span className="detail-value">{pkg.receiverAddress}</span>
        </div>
        {pkg.expectedDeliveryDate && (
          <div className="detail-row">
            <span className="detail-label">Expected Delivery:</span>
            <span className="detail-value">{pkg.expectedDeliveryDate}</span>
          </div>
        )}
        {pkg.sender && (
          <div className="detail-row">
            <span className="detail-label">Sender:</span>
            <span className="detail-value">
              {pkg.sender.firstName} {pkg.sender.lastName} ({pkg.sender.email})
            </span>
          </div>
        )}
        <div className="detail-row">
          <span className="detail-label">Created At:</span>
          <span className="detail-value">{formatDateTime(pkg.createdAt)}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Last Updated:</span>
          <span className="detail-value">{formatDateTime(pkg.updatedAt)}</span>
        </div>
      </div>

      <div className="tracking-events">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3>Tracking History</h3>
          {(userRole === 'ADMIN' || userRole === 'AGENT') && (
            <button className="btn-secondary" onClick={() => setShowEventForm(!showEventForm)}>
              {showEventForm ? 'Cancel' : 'Add Event'}
            </button>
          )}
        </div>

        {showEventForm && (
          <form onSubmit={handleEventSubmit} style={{ marginBottom: '2rem', background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px' }}>
            <div className="form-group">
              <label>Status</label>
              <select
                value={eventForm.status}
                onChange={(e) => setEventForm({ ...eventForm, status: e.target.value })}
                required
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="In Transit">In Transit</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={eventForm.location}
                onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                placeholder="e.g., Distribution Center, City"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                placeholder="Additional details about this event"
                rows="3"
              />
            </div>
            <button type="submit" className="btn-primary">Add Tracking Event</button>
          </form>
        )}

        {loading ? (
          <div className="loading">Loading tracking events...</div>
        ) : events.length === 0 ? (
          <div className="empty-state">
            <p>No tracking events yet</p>
          </div>
        ) : (
          <div className="timeline">
            {events.map((event) => (
              <div key={event.id} className="timeline-item">
                <div className="timeline-content">
                  <div className="timeline-date">{formatDateTime(event.timestamp)}</div>
                  <div className="timeline-status">{event.status}</div>
                  {event.location && <div className="timeline-location">📍 {event.location}</div>}
                  {event.description && <div className="timeline-location">{event.description}</div>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PackageDetails;

