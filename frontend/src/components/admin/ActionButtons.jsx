import React from 'react';
import { Box, Button } from '@mui/material';
import { Visibility, Check, Close, Edit, Delete } from '@mui/icons-material';

const ActionButtons = ({ 
  onView, 
  onAccept, 
  onReject, 
  onEdit, 
  onDelete, 
  showAcceptReject = false, 
  showEdit = false, 
  showDelete = false,
  showView = true,
  disabled = false,
  size = "small"
}) => {
  const buttonStyle = {
    borderRadius: 2,
    minWidth: 'auto',
    px: 1.5,
    py: 0.5,
    fontSize: '0.75rem',
    fontWeight: 500,
    textTransform: 'none'
  };

  return (
    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
      {showView && (
        <Button
          size={size}
          variant="outlined"
          startIcon={<Visibility fontSize="small" />}
          onClick={onView}
          disabled={disabled}
          sx={{
            ...buttonStyle,
            borderColor: '#3b82f6',
            color: '#3b82f6',
            '&:hover': {
              backgroundColor: '#3b82f615',
              borderColor: '#2563eb'
            }
          }}
        >
          View
        </Button>
      )}
      
      {showAcceptReject && (
        <>
          <Button
            size={size}
            variant="contained"
            startIcon={<Check fontSize="small" />}
            onClick={onAccept}
            disabled={disabled}
            sx={{
              ...buttonStyle,
              backgroundColor: '#10b981',
              '&:hover': {
                backgroundColor: '#059669'
              }
            }}
          >
            Accept
          </Button>
          <Button
            size={size}
            variant="contained"
            startIcon={<Close fontSize="small" />}
            onClick={onReject}
            disabled={disabled}
            sx={{
              ...buttonStyle,
              backgroundColor: '#ef4444',
              '&:hover': {
                backgroundColor: '#dc2626'
              }
            }}
          >
            Reject
          </Button>
        </>
      )}
      
      {showEdit && (
        <Button
          size={size}
          variant="outlined"
          startIcon={<Edit fontSize="small" />}
          onClick={onEdit}
          disabled={disabled}
          sx={{
            ...buttonStyle,
            borderColor: '#f59e0b',
            color: '#f59e0b',
            '&:hover': {
              backgroundColor: '#f59e0b15',
              borderColor: '#d97706'
            }
          }}
        >
          Edit
        </Button>
      )}
      
      {showDelete && (
        <Button
          size={size}
          variant="outlined"
          startIcon={<Delete fontSize="small" />}
          onClick={onDelete}
          disabled={disabled}
          sx={{
            ...buttonStyle,
            borderColor: '#ef4444',
            color: '#ef4444',
            '&:hover': {
              backgroundColor: '#ef444415',
              borderColor: '#dc2626'
            }
          }}
        >
          Delete
        </Button>
      )}
    </Box>
  );
};

export default ActionButtons;