import { useMutation } from "@apollo/client";
import {
  Modal,
  Unstable_TrapFocus as FocusTrap,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import { CREATE_ASSET } from "src/graphql/mutations";
import * as Yup from "yup";

export const CreateAssetModal = (props) => {
  const { isModalOpen, handleModalClose, companyId, refetch } = props;
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
      companyId: companyId, // ID from my company route
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await createAsset({
          variables: values,
        });
      
        formik.resetForm();
        handleModalClose();
        // Refetch the data
        refetch();
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
    >
      <FocusTrap open={isModalOpen}>
        <Dialog open={isModalOpen} onClose={handleModalClose}>
          <DialogTitle id="form-dialog-title" sx={{ marginTop: "2rem" }}>
            Add New Asset
          </DialogTitle>
          <DialogContent>
            <TextField
              id="device"
              label="Enter Name"
              value={formik.values.device}
              fullWidth
              name="device"
              variant="filled"
              onChange={formik.handleChange}
              error={formik.touched.device && Boolean(formik.errors.device)}
              helperText={formik.touched.device && formik.errors.device}
              sx={{ marginTop: "1rem" }}
            />

            <TextField
              id="description"
              label="description"
              value={formik.values.description}
              name="description"
              variant="filled"
              fullWidth
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              multiline
              rows={4}
              sx={{ marginTop: "1rem" }}
            />

            <TextField
              id="serialnumber"
              label="serial number"
              value={formik.values.serialnumber}
              name="serialnumber"
              fullWidth
              variant="filled"
              onChange={formik.handleChange}
              error={formik.touched.serialnumber && Boolean(formik.errors.serialnumber)}
              helperText={formik.touched.serialnumber && formik.errors.serialnumber}
              sx={{ marginTop: "1rem" }}
            />

            <TextField
              id="assignee"
              label="assignee"
              value={formik.values.assignee}
              name="assignee"
              variant="filled"
              fullWidth
              onChange={formik.handleChange}
              error={formik.touched.assignee && Boolean(formik.errors.assignee)}
              helperText={formik.touched.assignee && formik.errors.assignee}
              sx={{ marginTop: "1rem" }}
            />

            <TextField
              id="location"
              label="location"
              value={formik.values.location}
              name="location"
              variant="filled"
              fullWidth
              onChange={formik.handleChange}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
              sx={{ marginTop: "1rem" }}
            />
            <DialogActions sx={{ marginTop: "1rem" }}>
              <Button onClick={handleModalClose} color="secondary">
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
