import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

/**
 * Dialog to enforce single view for annotation creation / editing
 */
class AnnotationSubmitDialog extends Component {
  /** */
  constructor(props) {
    super(props);

    this.confirm = this.confirm.bind(this);
  }

  /** */
  confirm() {
    const {
      handleClose,
      handleSubmit,
    } = this.props;

    handleSubmit();
    handleClose();
  }

  /** */
  render() {
    const {
      handleClose,
      open,
      t,
    } = this.props;

    return (
      <Dialog
        aria-labelledby="annotation-submit-dialog-title"
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        open={open}
      >
        <DialogTitle
          disableTypography
          id="annotation-submit-dialog-title"
        >
          <Typography variant="h2">
            {t('dialog_annotationSubmit_title')}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            variant="body1"
            color="inherit"
          >
            {t('dialog_annotationSubmit_content')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {t('dialog_annotationSubmitBtn_cancel')}
          </Button>
          <Button
            color="primary"
            onClick={this.confirm}
            variant="contained"
          >
            {t('dialog_annotationSubmitBtn_submit')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AnnotationSubmitDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

AnnotationSubmitDialog.defaultProps = {
  open: false,
};

export default AnnotationSubmitDialog;
