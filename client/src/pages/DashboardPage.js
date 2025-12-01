import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import DeckGrid from '../components/deck/DeckGrid';
import DeckForm from '../components/deck/DeckForm';
import './DashboardPage.css';

function DashboardPage() {
  const { user } = useAuth();
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeckForm, setShowDeckForm] = useState(false);
  const [editingDeck, setEditingDeck] = useState(null);

  useEffect(() => {
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    try {
      const response = await fetch(`/flashcards/decks?userId=${user.email}`);
      if (response.ok) {
        const data = await response.json();
        setDecks(data);
      }
    } catch (error) {
      console.error('Error fetching decks:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleCreateDeck = async (deckData) => {
    try {
      const response = await fetch('/flashcards/decks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...deckData,
          userId: user.email,
        }),
      });

      if (response.ok) {
        const newDeck = await response.json();
        setDecks([...decks, newDeck]);
        setShowDeckForm(false);
      }
    } catch (error) {
      console.error('Error creating deck:', error);
    }
  };

  const handleUpdateDeck = async (deckData) => {
    try {
      const response = await fetch(`/flashcards/decks/${editingDeck._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deckData),
      });

      if (response.ok) {
        const updatedDeck = await response.json();
        setDecks(decks.map(d => d._id === updatedDeck._id ? updatedDeck : d));
        setEditingDeck(null);
        setShowDeckForm(false);
      }
    } catch (error) {
      console.error('Error updating deck:', error);
    }
  };

  const handleDeleteDeck = async (deckId) => {
    if (!window.confirm('Are you sure you want to delete this deck?')) return;

    try {
      const response = await fetch(`/flashcards/decks/${deckId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDecks(decks.filter(d => d._id !== deckId));
      }
    } catch (error) {
      console.error('Error deleting deck:', error);
    }
  };

  const openEditForm = (deck) => {
    setEditingDeck(deck);
    setShowDeckForm(true);
  };

  const closeForm = () => {
    setShowDeckForm(false);
    setEditingDeck(null);
  };

  return (
    <div className="dashboard">
      <Navbar />
      
      <main className="dashboard-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">My Decks</h1>
          <button 
            className="create-deck-button"
            onClick={() => setShowDeckForm(true)}
          >
            + Create Deck
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading decks...</div>
        ) : (
          <DeckGrid 
            decks={decks} 
            onEdit={openEditForm}
            onDelete={handleDeleteDeck}
          />
        )}

        {showDeckForm && (
          <DeckForm
            deck={editingDeck}
            onSubmit={editingDeck ? handleUpdateDeck : handleCreateDeck}
            onClose={closeForm}
          />
        )}
      </main>
    </div>
  );
}

export default DashboardPage;