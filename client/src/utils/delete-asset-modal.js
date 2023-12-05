import { useMutation } from "@apollo/client";
import {
  Modal,
  Unstable_TrapFocus as FocusTrap,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

export const DeleteAssetModal = (props) => {
  const { isModalOpen, handleModalClose, handleDelete } = props;

  return (
    <Modal
      open={isModalOpen}
      onClose={handleModalClose}
      aria-labelledby="delete-asset-modal"
      aria-describedby="confirm deletion of an asset"
      closeAfterTransition
    >
      <FocusTrap open={isModalOpen}>
        <Dialog open={isModalOpen} onClose={handleModalClose}>
          <DialogTitle id="form-dialog-title" sx={{ marginTop: "2rem" }}>
            Are you sure you want to delete this asset?
          </DialogTitle>
          <DialogContent>
            <DialogActions sx={{ marginTop: "1rem" }}>
              <Button onClick={handleModalClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleDelete} color="primary">
                Delete
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </FocusTrap>
    </Modal>
  );
};
