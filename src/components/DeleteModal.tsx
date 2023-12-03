import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

type deleteProp = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  removeEntry: () => void
}

const DeleteModal = ({ open, setOpen, removeEntry }: deleteProp) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogContentText
          sx={{
            fontFamily: "Nunito Sans",
            fontSize: '18px',
            fontWeight: '700',
          }}
        >
          Are you sure you want to delete this entry?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ fontFamily: 'Nunito Sans', fontSize: '14px', fontWeight: 600 }}
          onClick={() => setOpen(!open)}
        >
          Cancel
        </Button>
        <Button
          sx={{ fontFamily: 'Nunito Sans', fontSize: '14px', fontWeight: 600 }}
          onClick={() => removeEntry()}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteModal
