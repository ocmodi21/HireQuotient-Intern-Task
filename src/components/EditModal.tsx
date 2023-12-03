import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material'

type editProp = {
  editOpen: boolean,
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>,
  editEntry: () => void,
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  email: string,
  setEmail: React.Dispatch<React.SetStateAction<string>>
}

const EditModal = ({ editOpen, setEditOpen, editEntry, name, setName, email, setEmail }: editProp) => {
  return (
    <Dialog open={editOpen}>
      <DialogTitle sx={{ fontFamily: 'Nunito Sans', fontSize: '18px', fontWeight: 800 }}>
        <span>Edit user details</span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            fontFamily: "Nunito Sans",
            fontSize: '18px',
            fontWeight: '700',
          }}
        >
          <div className="mt-[5px] mb-[15px]">
            <TextField
              sx={{
                input: {
                  fontFamily: "Nunito Sans",
                  color: '#021E45',
                  fontWeight: '700',
                },
                '& fieldset': {
                  borderColor: '#9D9D9D',
                  borderWidth: '1.5px',
                },
                label: {
                  fontFamily: "Nunito Sans",
                  fontWeight: '700',
                }
              }}
              size='small'
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-[5px]">
            <TextField
              sx={{
                input: {
                  fontFamily: "Nunito Sans",
                  color: '#021E45',
                  fontWeight: '700',
                },
                '& fieldset': {
                  borderColor: '#9D9D9D',
                  borderWidth: '1.5px',
                },
                label: {
                  fontFamily: "Nunito Sans",
                  fontWeight: '700',
                }
              }}
              size='small'
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ fontFamily: 'Nunito Sans', fontSize: '14px', fontWeight: 600 }}
          onClick={() => setEditOpen(!editOpen)}
        >
          Cancel
        </Button>
        <Button
          sx={{ fontFamily: 'Nunito Sans', fontSize: '14px', fontWeight: 600 }}
          onClick={editEntry}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditModal
