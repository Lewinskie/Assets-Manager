import { useMutation } from "@apollo/client";
import {
  Modal,
  Backdrop,
  Unstable_TrapFocus as FocusTrap,
  Dialog,
  DialogTitle,
  DialogContent,
  FormLabel,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import { CREATE_ASSET } from "src/graphql/mutations";
import * as Yup from "yup";

export const CreateAssetModal = (props) => {
  const { isModalOpen, handleModalClose } = props;
  const [createAsset] = useMutation(CREATE_ASSET);

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    device: Yup.string().required("Device Name required"),
    description: Yup.string().required("Description required"),
    serialnumber: Yup.string().required("Serial Number required"),
    assignee: Yup.string().required("Assignee name required"),
    location: Yup.string().required("Location is required"),
  });
  const formik = useFormik({
    initialValues: {
      device: "",
      description: "",
      serialnumber: "",
      location: "",
      assignee: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await createAsset({
          variables: values,
        });
        isModalOpen(false);
        formik.resetForm();
      } catch (error) {}
    },
  });

  return (
    <Modal
      open={isModalOpen}
      onClose={handleModalClose}
      aria-labelledby="add-new-asset"
      aria-describedby="add a new asset"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <FocusTrap open={isModalOpen}>
        <Dialog open={isModalOpen} onClose={handleModalClose}>
          <DialogTitle id="form-dialog-title">Add New Asset</DialogTitle>
          <DialogContent>
            <FormLabel>Device Name</FormLabel>
            <TextField
              id="device"
              label="device"
              value={formik.values.device}
              name="device"
              variant="filled"
              onChange={formik.handleChange}
              error={formik.touched.device && Boolean(formik.errors.device)}
              helperText={formik.touched.device && formik.errors.device}
            />
            <br />
            <FormLabel>Description</FormLabel>
            <TextField
              id="description"
              label="description"
              value={formik.values.description}
              name="description"
              variant="filled"
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              multiline
              rows={4}
            />
            <br />
            <FormLabel>Serial Number</FormLabel>
            <TextField
              id="serialnumber"
              label="serial number"
              value={formik.values.serialnumber}
              name="serialnumber"
              variant="filled"
              onChange={formik.handleChange}
              error={formik.touched.serialnumber && Boolean(formik.errors.serialnumber)}
              helperText={formik.touched.serialnumber && formik.errors.serialnumber}
            />
            <br />
            <FormLabel>Assignee</FormLabel>
            <TextField
              id="assignee"
              label="assignee"
              value={formik.values.assignee}
              name="assignee"
              variant="filled"
              onChange={formik.handleChange}
              error={formik.touched.assignee && Boolean(formik.errors.assignee)}
              helperText={formik.touched.assignee && formik.errors.assignee}
            />
            <br />
            <FormLabel>Location</FormLabel>
            <TextField
              id="location"
              label="location"
              value={formik.values.location}
              name="location"
              variant="filled"
              onChange={formik.handleChange}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />
            <DialogActions>
              <Button onClick={handleModalClose} color="primary">
                Cancel
              </Button>
              <Button onClick={formik.handleSubmit} color="primary">
                Add Asset
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </FocusTrap>
    </Modal>
  );
};
