import React from 'react';
import Parser from 'html-react-parser';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';



class Test extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editorState: EditorState.createEmpty(),
		}


	}
	onEditorStateChange: Function = (editorState) => {
		this.setState({
			editorState,
		});
	};


	render() {

const {editorState} = this.state
		const text = (draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))

		return (
			<div>
				<Editor
					editorState={editorState}
					wrapperClassName="wrapper"
					editorClassName="editor"
					onEditorStateChange={this.onEditorStateChange}
				/>
				<div className="content">{Parser(text)}</div>
				{/*<textarea*/}
					{/*disabled*/}
					{/*value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}*/}
				{/*/>*/}
			</div>
		);
	}
}


export default Test;




// import React from 'react';
// import {Editor} from 'react-draft-wysiwyg';
// import './theme/react-draft-wysiwyg.css';
//
// class Test extends React.Component {
// 	constructor(props) {
// 		super(props);
//
//
// 	}
//
//
// 	render() {
// 		const EditorI18n = () => (
// 			<Editor
// 				wrapperClassName="demo-wrapper"
// 				editorClassName="demo-editor"
// 				localization={{
// 					locale: 'ko',
// 				}}
// 			/>
// 		);
//
//
// 		return (
// 			<EditorI18n/>);
// 	}
// }
//
//
// export default Test;


