import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Create the context
const CollectionsContext = createContext();

// Create a provider component
const CollectionsProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://127.0.0.1:8000/api';

  // Function to fetch collections
  const fetchCollections = async () => {
    const token = localStorage.getItem('access_token');
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/collections/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCollections(response.data);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch collections');
      toast.error('Failed to fetch collections');
    } finally {
      setLoading(false);
    }
  };

  // Function to create a collection
  const createCollection = async (formData) => {
    const token = localStorage.getItem('access_token');
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/create_collection/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setCollections((prevCollections) => [...prevCollections, response.data]);
      toast.success('Collection created successfully!');
    } catch (error) {
      setError('Failed to create collection');
      toast.error('Failed to create collection');
    } finally {
      setLoading(false);
    }
  };
  
  // Function to create a collection
  const editCollection = async (collectionId) => {
    const token = localStorage.getItem('access_token');
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/collection/${collectionId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCollections((prevCollections) => [...prevCollections, response.data]);
      toast.success('Collection edited successfully!');
    } catch (error) {
      setError('Failed to create collection');
      toast.error('Failed to create collection');
    } finally {
      setLoading(false);
    }
  };

  // Function for delete collection 
  const deleteCollection = async (collectionId) => {
    const token = localStorage.getItem('access_token');
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(`${API_BASE_URL}/collection/delete/${collectionId}/`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCollections((prevCollections) => [...prevCollections, response.data]);
      toast.success('Collection deleted successfully!');
      fetchCollections();
    } catch (error) {
      setError('Failed to create collection');
      toast.error('Failed to create collection');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        createCollection,
        fetchCollections,
        deleteCollection,
        loading,
        error,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};

export { CollectionsContext, CollectionsProvider };
