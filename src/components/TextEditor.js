import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, RichUtils } from 'draft-js';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import BoldIcon from '@material-ui/icons/FormatBold';
import ItalicIcon from '@material-ui/icons/FormatItalic';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

/** */
class TextEditor extends Component {
  /** */
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(stateFromHTML(props.annoHtml)),
    };

    this.onChange = this.onChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleFormating = this.handleFormating.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.editorRef = React.createRef();
  }

  /**
   * This is a kinda silly hack (but apparently recommended approach) to
   * making sure the whole visible editor area is clickable, not just the first line.
   */
  handleFocus() {
    if (this.editorRef.current) this.editorRef.current.focus();
  }

  /** */
  handleFormating(e, newFormat) {
    const { editorState } = this.state;

    this.onChange(RichUtils.toggleInlineStyle(editorState, newFormat));
  }

  /** */
  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  /** */
  onChange(editorState) {
    const { updateAnnotationBody } = this.props;

    this.setState({ editorState });
    if (updateAnnotationBody) {
      const options = {
        inlineStyles: {
          BOLD: { element: 'b' },
          ITALIC: { element: 'i' },
        },
      };
      updateAnnotationBody(stateToHTML(editorState.getCurrentContent(), options).toString());
    }
  }

  /** */
  render() {
    const { classes, t } = this.props;
    const { editorState } = this.state;
    const currentStyle = editorState.getCurrentInlineStyle();

    return (
      <div>
        <ToggleButtonGroup
          size="small"
          value={currentStyle.toArray()}
          aria-label={t('textEditor_format_selection')}
        >
          <ToggleButton
            onClick={this.handleFormating}
            value="BOLD"
            aria-label={t('textEditor_format_bold')}
          >
            <BoldIcon />
          </ToggleButton>
          <ToggleButton
            onClick={this.handleFormating}
            value="ITALIC"
            aria-label={t('textEditor_format_italic')}
          >
            <ItalicIcon />
          </ToggleButton>
        </ToggleButtonGroup>

        <div className={classes.editorRoot} onClick={this.handleFocus}>
          <Editor
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            ref={this.editorRef}
          />
        </div>
      </div>
    );
  }
}

TextEditor.propTypes = {
  annoHtml: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string),
  t: PropTypes.func.isRequired,
  updateAnnotationBody: PropTypes.func.isRequired,
}

TextEditor.defaultProps = {
  annoHtml: '',
  classes: {},
};

export default TextEditor;
