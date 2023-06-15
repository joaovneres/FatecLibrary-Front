import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export default function DeleteBookModal({ open, onClose, onDeleteBook, book }) {
  if (!book) {
    return null;
  }
  const handleDelete = () => {
    onDeleteBook(book);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar exclusão</DialogTitle>
      <DialogContent>
        <Typography variant="body1">Tem certeza de que deseja excluir o livro "{book.title}"?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleDelete} color="error" autoFocus>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
}
