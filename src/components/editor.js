import React from 'react';
import MonacoEditor from 'react-monaco-editor';

class Editor extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.id !== this.props.id;
  }

  constructor(props) {
    super(props);
  }

  editorDidMount(editor) {
    editor.focus();
  }

  render() {
    const options = {
      selectOnLineNumbers: true
    };
    return (
      <MonacoEditor
        height="600"
        language="javascript"
        theme="vs-dark"
        value={this.props.code}
        options={options}
        onChange={this.props.onCodeChange}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}

export default Editor;
