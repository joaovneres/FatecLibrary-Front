import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export default function DeletePublishingModal({ open, onClose, onDeletePublisher, publisher }) {
  if (!publisher) {
    return null;
  }
  const handleDelete = () => {
    onDeletePublisher(publisher);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar exclusão</DialogTitle>
      <DialogContent>
        <Typography variant="body1">Tem certeza de que deseja excluir a editora "{publisher.name}"?</Typography>
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
