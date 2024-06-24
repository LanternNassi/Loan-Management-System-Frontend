import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';


export default function FeedBack({open , status , message , outlined}) {
  return (
    <Box sx={{ 
        width: '30%',
        position : 'sticky',
        top : '2vh',
        zIndex : 1,
        
        }}>
      <Collapse in={open}>
        <Alert
          variant= {outlined ? 'outlined' : 'filled'}
          severity= {status}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
            //   onClick={() => {
            //     setOpen(false);
            //   }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
      
    </Box>
  )
}

FeedBack.propTypes = {
    open: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    outlined: PropTypes.bool
};
