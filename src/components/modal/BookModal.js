import React, { useState } from 'react';
import { Button, Modal, TextField, InputAdornment } from '@mui/material';
import { Add } from '@mui/icons-material';

const BookModal = ({ open, onClose, onAddBook, onUpdateBook, book }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState();
  const [publicationYear, setPublicationYear] = useState();
  const [edition, setEdition] = useState();
  const [imageURL, setImageURL] = useState('');
  const [publishingId, setPublishingId] = useState('');

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

  const handleAddBook = () => {
    const newBook = {
      title,
      price,
      publicationYear,
      edition,
      imageURL,
      publishingId,
    };

    if (book) {
      onUpdateBook(book.id, newBook);
    } else {
      onAddBook(newBook);
    }
    setTitle('');
    setPrice(0);
    setPublicationYear(0);
    setEdition(0);
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
        <h2 style={{ color: '#000' }}>{book ? 'Alterar Livro' : 'Criar Livro'}</h2>
        <TextField
          label="Título"
          value={title}
          onChange={handleTitleChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
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
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  size="small"
                  onClick={() => (price ? setPrice(price + 1) : setPrice(1))} // Incrementa o valor ao clicar na seta de aumento
                >
                  <Add />
                </Button>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Ano de publicação"
          value={publicationYear}
          onChange={handlePublicationYearChange}
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Edição"
          value={edition}
          onChange={handleEditionChange}
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="URL da Imagem"
          value={imageURL}
          onChange={handleImageURLChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <div style={{ textAlign: 'right' }}>
          <Button variant="contained" onClick={handleAddBook}>
            {book ? 'Salvar Alterações' : 'Criar'}
          </Button>
          <Button variant="outlined" onClick={onClose} style={{ marginLeft: '10px' }}>
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BookModal;
