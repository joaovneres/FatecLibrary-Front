import React, { useEffect, useState } from 'react';
import { Button, Modal, TextField, InputAdornment, Grid, MenuItem } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const BookModal = ({ open, onClose, onAddBook, onUpdateBook, book, publishers }) => {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState();
  const [publicationYear, setPublicationYear] = useState();
  const [edition, setEdition] = useState();
  const [imageURL, setImageURL] = useState('');
  const [publishingId, setPublishingId] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (book.id) {
      setId(book.id);
      setTitle(book.title);
      setPrice(book.price);
      setPublicationYear(book.publicationYear);
      setEdition(book.edition);
      setImageURL(book.imageURL);
      setPublishingId(book.publishingId);
      setEditing(true);
    } else {
      setId(0);
      setTitle('');
      setPrice();
      setPublicationYear();
      setEdition();
      setImageURL('');
      setPublishingId('');
      setEditing(false);
    }
  }, [book]);

  // Pegar valores do input
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handlePublicationYearChange = (event) => {
    setPublicationYear(event.target.value);
  };

  const handleEditionChange = (event) => {
    setEdition(event.target.value);
  };
  const handleImageURLChange = (event) => {
    setImageURL(event.target.value);
  };

  const handlePublishingIdChange = (event) => {
    setPublishingId(event.target.value);
  };

  const handleDecrement = (event) => {
    if (event.target.value > 0) {
      return event.target.value - 1;
    }
  };

  const handleIncrement = (event) => {
    return event.target.value + 1;
  };
  // Pegar valores do input

  const handleAddBook = () => {
    const newBook = {
      id,
      title,
      price,
      publicationYear,
      edition,
      imageURL,
      publishingId,
    };
    if (editing) {
      onUpdateBook(newBook);
    } else {
      onAddBook(newBook);
    }
    setId(0);
    setTitle('');
    setPrice();
    setPublicationYear();
    setEdition();
    setImageURL('');
    setPublishingId('');
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
        <h2 style={{ color: '#000' }}>{book.id ? 'Alterar Livro' : 'Criar Livro'}</h2>
        <TextField
          label="Título"
          value={title}
          onChange={handleTitleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Preço"
              value={price}
              onChange={handlePriceChange}
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              InputProps={{
                inputProps: { min: 0 },
              }}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Ano de publicação"
              value={publicationYear}
              onChange={handlePublicationYearChange}
              variant="outlined"
              fullWidth
              required
              margin="normal"
              type="number"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Edição"
              value={edition}
              onChange={handleEditionChange}
              variant="outlined"
              fullWidth
              required
              margin="normal"
              type="number"
            />
          </Grid>
        </Grid>

        <TextField
          label="URL da Imagem"
          value={imageURL}
          onChange={handleImageURLChange}
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Editora"
          select
          value={publishingId}
          onChange={(event) => setPublishingId(event.target.value)}
          variant="outlined"
          fullWidth
          required
          margin="normal"
        >
          {publishers.map((publisher) => (
            <MenuItem key={publisher.id} value={publisher.id}>
              {publisher.name}
            </MenuItem>
          ))}
        </TextField>
        <div style={{ textAlign: 'right' }}>
          <Button variant="outlined" onClick={onClose} style={{ marginRight: '10px' }}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleAddBook}>
            {book.id ? 'Salvar Alterações' : 'Criar'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BookModal;
