import React, { useState } from 'react';
import { deletePackage } from '../services/api';
import PackageDetails from './PackageDetails';

function PackageList({ packages, onEdit, onRefresh, userRole }) {
  const [selectedPackageId, setSelectedPackageId] = useState(null);

  const getStatusClass = (status) => {
    const statusLower = status.toLowerCase().replace(/\s+/g, '-');
    return `status-badge status-${statusLower}`;
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await deletePackage(id);
        onRefresh();
      } catch (error) {
        alert('Error deleting package: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const handlePackageClick = (id) => {
    setSelectedPackageId(id);
  };

  const handleBackToList = () => {
    setSelectedPackageId(null);
    onRefresh();
  };

  if (selectedPackageId) {
    return (
      <PackageDetails
        packageId={selectedPackageId}
        onBack={handleBackToList}
        userRole={userRole}
      />
    );
  }

  if (packages.length === 0) {
    return (
      <div className="empty-state">
        <h3>No packages found</h3>
        <p>There are no packages to display at the moment.</p>
      </div>
    );
  }

  return (
    <div className="package-grid">
      {packages.map((pkg) => (
        <div key={pkg.id} className="package-card" onClick={() => handlePackageClick(pkg.id)}>
          <div className="package-card-header">
            <div>
              <h3>{pkg.trackingId}</h3>
            </div>
            <span className={getStatusClass(pkg.status)}>{pkg.status}</span>
          </div>
          <div className="package-info">
            {pkg.description && <p><strong>Description:</strong> {pkg.description}</p>}
            <p><strong>Receiver:</strong> {pkg.receiverAddress}</p>
            {pkg.expectedDeliveryDate && (
              <p><strong>Expected Delivery:</strong> {pkg.expectedDeliveryDate}</p>
            )}
            {pkg.sender && (
              <p><strong>Sender:</strong> {pkg.sender.firstName} {pkg.sender.lastName}</p>
            )}
          </div>
          {userRole === 'ADMIN' && (
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button
                className="btn-small btn-view"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(pkg);
                }}
              >
                Edit
              </button>
              <button
                className="btn-small btn-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(pkg.id);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PackageList;

