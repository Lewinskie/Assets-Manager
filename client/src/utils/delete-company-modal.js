import {
  Modal,
  Unstable_TrapFocus as FocusTrap,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

export const DeleteCompanyModal = (props) => {
  const { isOpen, onCancel, onConfirm, companyName } = props;

  return (
    <Modal
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="delete-asset-modal"
      aria-describedby="confirm deletion of an asset"
      closeAfterTransition
    >
      <FocusTrap open={isOpen}>
        <Dialog open={isOpen} onClose={onCancel}>
          <DialogTitle id="form-dialog-title" sx={{ marginTop: "2rem" }}>
            Are you sure you want to delete {companyName} with all its assets?
          </DialogTitle>
          <DialogContent>
            <DialogActions sx={{ marginTop: "1rem" }}>
              <Button onClick={onCancel} color="secondary">
                Cancel
              </Button>
              <Button onClick={onConfirm} color="primary">
                Delete
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </FocusTrap>
    </Modal>
  );
};
