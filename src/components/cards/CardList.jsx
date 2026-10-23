import React from 'react';
import { CardCard } from './CardCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCards } from '../api/apiClient';

export const CardList = () => {
  const { data, isLoading, isError } = useSelector(state => state.cards);
  
  if (isLoading) return <div>Cargando cartas...</div>;
  if (isError) return <div>Error al cargar cartas</div>;
  if (!data || data.length === 0) return <div>No hay cartas disponibles</div>;
  
  return (
    <div className="card-grid">
      {data.map(card => (
        <CardCard key={card.id} card={card} />
      ))}
    </div>
  );
};