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
class SingleCanvasDialog extends Component {
  /** */
  constructor(props) {
    super(props);

    this.confirm = this.confirm.bind(this);
  }

  /** */
  confirm() {
    const {
      handleClose,
      switchToSingleCanvasView,
    } = this.props;

    switchToSingleCanvasView();
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
        aria-labelledby="single-canvas-dialog-title"
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        open={open}
      >
        <DialogTitle
          disableTypography
          id="single-canvas-dialog-title"
        >
          <Typography variant="h2">
            {t('dialog_singleCanvas_title')}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            color="inherit"
            variant="body1"
          >
            {t('dialog_singleCanvas_content')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {t('dialog_singleCanvasBtn_cancel')}
          </Button>
          <Button
            color="primary"
            onClick={this.confirm}
            variant="contained"
          >
            {t('dialog_singleCanvasBtn_submit')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

SingleCanvasDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  switchToSingleCanvasView: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

SingleCanvasDialog.defaultProps = {
  open: false,
  t: key => key,
};

export default SingleCanvasDialog;
