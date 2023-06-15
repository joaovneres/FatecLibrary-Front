import React, { useEffect, useState } from 'react';
import { Button, Modal, TextField } from '@mui/material';

const PublisherModal = ({ open, onClose, onAddPublisher, onUpdatePublisher, publisher }) => {
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [acronym, setAcronym] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (publisher.id) {
      setId(publisher.id);
      setName(publisher.name);
      setAcronym(publisher.acronym);
      setEditing(true);
    } else {
      setId(0);
      setName('');
      setAcronym('');
      setEditing(false);
    }
  }, [publisher]);

  // pegar valores do input
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAcronymChange = (event) => {
    setAcronym(event.target.value);
  };
  // pegar valores do input

  const handleAddPublisher = () => {
    const newPublisher = {
      id,
      name,
      acronym,
    };
    if (editing) {
      onUpdatePublisher(newPublisher);
    } else {
      onAddPublisher(newPublisher);
    }
    setId(0);
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
      BackdropProps={{
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
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
        <h2 style={{ color: '#000' }}>{publisher.id ? 'Alterar Editora' : 'Criar Editora'}</h2>
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
          <Button variant="outlined" onClick={onClose} style={{ marginRight: '10px' }}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleAddPublisher}>
            {publisher.id ? 'Salvar Alterações' : 'Criar'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PublisherModal;
