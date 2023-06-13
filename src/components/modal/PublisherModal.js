import React, { useState } from 'react';
import { Button, Modal, TextField } from '@mui/material';

const PublisherModal = ({ open, onClose, onAddPublisher, onUpdatePublisher, publisher }) => {
  const [name, setName] = useState('');
  const [acronym, setAcronym] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAcronymChange = (event) => {
    setAcronym(event.target.value);
  };

  const handleAddPublisher = () => {
    const newPublisher = {
      name,
      acronym,
    };

    if (publisher) {
      onUpdatePublisher(publisher.id, newPublisher);
    } else {
      onAddPublisher(newPublisher);
    }
    setName('');
    setAcronym('');
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '15px',
          outline: 'none',
          width: '40%',
        }}
      >
        <h2 style={{ color: '#000' }}>{publisher ? 'Alterar Editora' : 'Criar Editora'}</h2>
        <TextField label="Nome" value={name} onChange={handleNameChange} variant="outlined" fullWidth margin="normal" />
        <TextField
          label="Acrônimo"
          value={acronym}
          onChange={handleAcronymChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <div style={{ textAlign: 'right' }}>
          <Button variant="contained" onClick={handleAddPublisher}>
            {publisher ? 'Salvar Alterações' : 'Criar'}
          </Button>
          <Button variant="outlined" onClick={onClose} style={{ marginLeft: '10px' }}>
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PublisherModal;
