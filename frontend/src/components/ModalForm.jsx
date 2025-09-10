import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ModalForm({ open, onClose }) {
  const navigate = useNavigate();

  const handleCoachRedirect = () => {
    onClose();
    navigate('/coach-landing');
  };

  const handleOwnerRedirect = () => {
    onClose();
    navigate('/owner-landing');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        className:
          "!rounded-2xl !bg-white/30 !backdrop-blur-md border border-white/20 shadow-lg",
      }}
    >
      <DialogTitle className="!text-xl !font-bold text-center text-white">
        Join Our Platform
      </DialogTitle>

      <DialogContent className="space-y-6 py-8">
        <div className="text-center text-white mb-6">
          <p className="text-lg">Choose how you'd like to join our community:</p>
        </div>

        {/* Coach Option */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">🏃‍♂️</div>
            <h3 className="text-xl font-bold text-white mb-2">Become a Coach</h3>
            <p className="text-gray-200 text-sm">
              Share your expertise and grow your coaching business
            </p>
          </div>
          <Button
            onClick={handleCoachRedirect}
            variant="contained"
            fullWidth
            className="!bg-blue-600 !text-white !rounded-xl !py-3 hover:!bg-blue-700"
          >
            Join as Coach
          </Button>
        </div>

        {/* Owner Option */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">🏟️</div>
            <h3 className="text-xl font-bold text-white mb-2">List Your Venue</h3>
            <p className="text-gray-200 text-sm">
              Maximize your venue bookings and revenue
            </p>
          </div>
          <Button
            onClick={handleOwnerRedirect}
            variant="contained"
            fullWidth
            className="!bg-green-600 !text-white !rounded-xl !py-3 hover:!bg-green-700"
          >
            List Your Ground
          </Button>
        </div>
      </DialogContent>

      <DialogActions className="!justify-center pb-4">
        <Button
          onClick={onClose}
          color="error"
          variant="outlined"
          className="!rounded-xl"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
