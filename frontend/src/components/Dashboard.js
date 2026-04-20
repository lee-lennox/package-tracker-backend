import React, { useState, useEffect } from 'react';
import { getAllPackages } from '../services/api';
import PackageList from './PackageList';
import PackageModal from './PackageModal';

function Dashboard({ user }) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await getAllPackages();
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePackage = () => {
    setSelectedPackage(null);
    setShowModal(true);
  };

  const handleEditPackage = (pkg) => {
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPackage(null);
  };

  const handlePackageSaved = () => {
    fetchPackages();
    handleCloseModal();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>
          {user.role === 'ADMIN' && 'All Packages'}
          {user.role === 'AGENT' && 'Package Management'}
          {user.role === 'CUSTOMER' && 'My Packages'}
        </h2>
        {(user.role === 'ADMIN' || user.role === 'AGENT') && (
          <button className="btn-secondary" onClick={handleCreatePackage}>
            Create New Package
          </button>
        )}
      </div>

      {loading ? (
        <div className="loading">Loading packages...</div>
      ) : (
        <PackageList
          packages={packages}
          onEdit={handleEditPackage}
          onRefresh={fetchPackages}
          userRole={user.role}
        />
      )}

      {showModal && (
        <PackageModal
          package={selectedPackage}
          onClose={handleCloseModal}
          onSave={handlePackageSaved}
        />
      )}
    </div>
  );
}

export default Dashboard;

