import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import { applyOwner } from "../../features/owner/ownerSlice"; // redux thunk action

export default function ModalForm({ open, onClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [preview, setPreview] = useState(null);

  const onSubmit = (data) => {
    console.log("Owner form data:", data);
    toast.success("Owner form submitted successfully!");
    // dispatch API call here
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
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
        Become a Venue Owner
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="space-y-4">
          <TextField
            label="Venue Name"
            fullWidth
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Location"
            fullWidth
            {...register("location", { required: "Location is required" })}
            error={!!errors.location}
            helperText={errors.location?.message}
          />
          <TextField
            label="Sport"
            fullWidth
            {...register("sport", { required: "Sport is required" })}
            error={!!errors.sport}
            helperText={errors.sport?.message}
          />
          <TextField
            label="Price (per hour)"
            type="number"
            fullWidth
            {...register("price", { required: "Price is required" })}
            error={!!errors.price}
            helperText={errors.price?.message}
          />

          {/* Image Upload */}
          <div className="flex flex-col space-y-2">
            <label className="text-white font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              onChange={handleImageChange}
              className="text-white"
            />
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="mt-2 h-32 w-full object-cover rounded-xl border border-gray-300"
              />
            )}
            {errors.image && (
              <span className="text-red-400 text-sm">
                {errors.image.message}
              </span>
            )}
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
          <Button
            type="submit"
            variant="contained"
            className="!bg-[#00df9a] !text-black !rounded-xl"
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
