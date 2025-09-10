import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Grid,
  IconButton,
  Chip,
  Avatar,
  Stack,
  Alert,
  LinearProgress,
  Divider
} from '@mui/material';
import {
  Close as CloseIcon,
  CloudUpload as UploadIcon,
  Description as CertIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Add as AddIcon,
  EmojiEvents as TrophyIcon
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

const CertificationUploadModal = ({ open, onClose, userId }) => {
  const { user } = useSelector((state) => state.auth);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newCert, setNewCert] = useState({
    title: '',
    issuer: '',
    date: '',
    description: '',
    file: null
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Mock certifications data - replace with actual API call
  const mockCertifications = [
    {
      id: 'CERT001',
      title: 'Certified Football Coach Level 1',
      issuer: 'All India Football Federation',
      date: '2023-06-15',
      description: 'Basic coaching certification for football',
      fileUrl: 'https://example.com/cert1.pdf',
      uploadDate: '2023-06-20'
    },
    {
      id: 'CERT002',
      title: 'Sports Nutrition Certificate',
      issuer: 'Sports Authority of India',
      date: '2023-08-10',
      description: 'Certification in sports nutrition and dietary planning',
      fileUrl: 'https://example.com/cert2.pdf',
      uploadDate: '2023-08-15'
    }
  ];

  useEffect(() => {
    if (open) {
      fetchCertifications();
    }
  }, [open, userId]);

  const fetchCertifications = async () => {
    setLoading(true);
    try {
      // Replace with actual API call
      // const response = await fetch(`/api/users/${userId}/certifications`);
      // const data = await response.json();
      
      // Using mock data for now
      setTimeout(() => {
        setCertifications(mockCertifications);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching certifications:', error);
      setError('Failed to load certifications');
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setError('Please upload only PDF, JPG, or PNG files');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        return;
      }

      setNewCert({ ...newCert, file });
      setError('');
    }
  };

  const uploadCertification = async (file, certificationData) => {
    const formData = new FormData();
    formData.append('certification', file);
    formData.append('title', certificationData.title);
    formData.append('issuer', certificationData.issuer);
    formData.append('date', certificationData.date);
    formData.append('description', certificationData.description);

    try {
      const response = await fetch('/api/certifications/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Certification upload error:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!newCert.title || !newCert.issuer || !newCert.date || !newCert.file) {
      setError('Please fill all required fields and select a file');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setError('');

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Upload certification with file
      const certificationData = {
        title: newCert.title,
        issuer: newCert.issuer,
        date: newCert.date,
        description: newCert.description
      };

      const result = await uploadCertification(newCert.file, certificationData);
      
      setUploadProgress(100);
      const newCertification = {
        id: result.id || `CERT${Date.now()}`,
        ...certificationData,
        fileUrl: result.fileUrl,
        uploadDate: new Date().toISOString().split('T')[0]
      };
      
      setCertifications([newCertification, ...certifications]);
      setNewCert({ title: '', issuer: '', date: '', description: '', file: null });
      setSuccess('Certification uploaded successfully!');
      setUploading(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);

    } catch (error) {
      console.error('Error uploading certification:', error);
      setError('Failed to upload certification. Please try again.');
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (certId) => {
    try {
      // Replace with actual API call
      // await fetch(`/api/certifications/${certId}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Authorization': `Bearer ${user.token}`
      //   }
      // });

      setCertifications(certifications.filter(cert => cert.id !== certId));
      setSuccess('Certification deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error deleting certification:', error);
      setError('Failed to delete certification');
    }
  };

  const handleViewCertificate = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, maxHeight: '90vh' }
      }}
    >
      <DialogTitle sx={{
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        pb: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TrophyIcon sx={{ color: '#f59e0b' }} />
          My Certifications
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 0 }}>
        {/* Upload New Certification */}
        <Card sx={{ mb: 3, bgcolor: 'grey.50' }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <AddIcon />
              Upload New Certification
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Certification Title"
                  value={newCert.title}
                  onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                  fullWidth
                  size="small"
                  required
                  placeholder="e.g., Certified Football Coach Level 1"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Issuing Organization"
                  value={newCert.issuer}
                  onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                  fullWidth
                  size="small"
                  required
                  placeholder="e.g., All India Football Federation"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Issue Date"
                  type="date"
                  value={newCert.date}
                  onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
                  fullWidth
                  size="small"
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  accept=".pdf,.jpg,.jpeg,.png"
                  style={{ display: 'none' }}
                  id="certification-file-upload"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="certification-file-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<UploadIcon />}
                    fullWidth
                    sx={{ height: '40px', textTransform: 'none' }}
                  >
                    {newCert.file ? newCert.file.name : 'Choose File'}
                  </Button>
                </label>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description (Optional)"
                  value={newCert.description}
                  onChange={(e) => setNewCert({ ...newCert, description: e.target.value })}
                  fullWidth
                  size="small"
                  multiline
                  rows={2}
                  placeholder="Brief description of the certification"
                />
              </Grid>
            </Grid>

            {uploading && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Uploading... {uploadProgress}%
                </Typography>
                <LinearProgress variant="determinate" value={uploadProgress} />
              </Box>
            )}

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={uploading}
                sx={{
                  bgcolor: '#22c55e',
                  '&:hover': { bgcolor: '#16a34a' },
                  textTransform: 'none',
                  fontWeight: 'bold'
                }}
              >
                {uploading ? 'Uploading...' : 'Upload Certification'}
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Divider sx={{ mb: 3 }} />

        {/* Existing Certifications */}
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Your Certifications ({certifications.length})
        </Typography>

        <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
          {loading ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography>Loading certifications...</Typography>
            </Box>
          ) : certifications.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <TrophyIcon sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
              <Typography variant="body1" color="text.secondary">
                No certifications uploaded yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upload your first certification to showcase your expertise
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2}>
              {certifications.map((cert) => (
                <Card key={cert.id} variant="outlined" sx={{ borderRadius: 2 }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Avatar sx={{ 
                        bgcolor: '#f59e0b',
                        width: 40,
                        height: 40
                      }}>
                        <CertIcon />
                      </Avatar>
                      
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5 }}>
                          {cert.title}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          Issued by: {cert.issuer}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          Issue Date: {new Date(cert.date).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </Typography>

                        {cert.description && (
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {cert.description}
                          </Typography>
                        )}

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Chip
                            label="Verified"
                            size="small"
                            color="success"
                            sx={{ textTransform: 'capitalize' }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            Uploaded: {new Date(cert.uploadDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleViewCertificate(cert.fileUrl)}
                          sx={{ color: '#3b82f6' }}
                        >
                          <ViewIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(cert.id)}
                          sx={{ color: '#ef4444' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button onClick={onClose} variant="outlined" sx={{ textTransform: 'none' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CertificationUploadModal;