import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, RichUtils } from 'draft-js';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import BoldIcon from '@material-ui/icons/FormatBold';
import ItalicIcon from '@material-ui/icons/FormatItalic';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

class AnnotationTextEditorItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createWithContent(stateFromHTML(props.value ? props.value : '')),
    };

    this.handleFocus = this.handleFocus.bind(this);
    this.handleFormating = this.handleFormating.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.onChange = this.onChange.bind(this);
    this.editorRef = React.createRef();
  }

  componentDidMount() {
    this.editorRef.current.focus();
  }

  handleFocus() {
    if (this.editorRef.current) this.editorRef.current.focus();
  }

  handleFormating(e, newFormat) {
    const { editorState } = this.state;

    this.onChange(RichUtils.toggleInlineStyle(editorState, newFormat));
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  onChange(editorState) {
    const { updateValue } = this.props;

    this.setState({ editorState });
    if (updateValue) {
      const options = {
        inlineStyles: {
          BOLD: { element: 'b' },
          ITALIC: { element: 'i' },
        },
      };
      updateValue(stateToHTML(editorState.getCurrentContent(), options).toString());
    }
  }

  render() {
    const { classes } = this.props;
    const { editorState } = this.state;
    const currentStyle = editorState.getCurrentInlineStyle();

    return (
      <div>
        <ToggleButtonGroup
          size="small"
          value={currentStyle.toArray()}
        >
          <ToggleButton
            onClick={this.handleFormating}
            value="BOLD"
          >
            <BoldIcon />
          </ToggleButton>
          <ToggleButton
            onClick={this.handleFormating}
            value="ITALIC"
          >
            <ItalicIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <div className={classes.editorRoot}>
          <Editor
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            ref={this.editorRef}
          />
        </div>
      </div>
    )
  }
}

AnnotationTextEditorItem.propTypes = {
  classes: PropTypes.shape({
    editorRoot: PropTypes.string
  }).isRequired,
  updateValue: PropTypes.func.isRequired,
  value: PropTypes.string,
}

AnnotationTextEditorItem.defaultProps = {
  value: '',
};

export default AnnotationTextEditorItem;
