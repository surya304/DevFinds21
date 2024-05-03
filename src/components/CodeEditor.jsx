import AceEditor from 'react-ace'
import { useRef, useState, useEffect } from 'react'

import 'ace-builds/src-min-noconflict/mode-javascript'
import 'ace-builds/src-min-noconflict/mode-html'
import 'ace-builds/src-min-noconflict/theme-tomorrow_night_eighties'
import 'ace-builds/src-min-noconflict/ext-language_tools'
import 'ace-builds/src-min-noconflict/ext-spellcheck'
import 'ace-builds/src-min-noconflict/snippets/javascript'
import 'ace-builds/src-min-noconflict/ext-searchbox'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/snippets/html'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-beautify'

const ace = require('ace-builds/src-noconflict/ace')

ace.config.set(
  'basePath',
  'https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/'
)
ace.config.setModuleUrl(
  'ace/mode/javascript_worker',
  'https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/worker-javascript.js'
)

export default function CodeEditor({ type, format, valueChanged, id, result }) {
  const aceEditor = useRef()
  
  const [editorOptions, setEditorOptions] = useState({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    showLineNumbers: true,
    tabSize: 2,
    showGutter: true,
    readOnly: false,
    foldStyle: 'markbegin',
    showFoldWidgets: true,
    foldGutter: true,
    enableSearch: true,
    enableModelist: true,
  })
    
  // console.log("Type is>>>>", type);

  useEffect(() => {
    if (id) {
      if (id != 'from') {
        console.log("Read only");
        setEditorOptions({
          ...editorOptions, // Copy the old fields
          readOnly: true, // But override this one
        })
      }
    }

    if (result != undefined) {
      if (aceEditor.current) {
        aceEditor.current.editor.setValue(result)
      }
    }
  }, [id, result])


  function onChange(newValue) {
    
    if (newValue)
    {
      if (id == "from")
      {
          valueChanged(id, newValue)
      }
      
    } 
    
  }

  return (
    <div>
      <div className="">
        <div className="h-96 border border-l-0 border-t-0 border-b-0 border-r-2 border-sky-500">
          <AceEditor
            mode={type}
            theme="monokai"
            height={'100%'}
            width={'100%'}
            ref={aceEditor} 
            onChange={onChange}
            fontSize={14}
            showPrintMargin={true}
            focus={true}
            showGutter={true}
            editorProps={{ $blockScrolling: true }}
            setOptions={editorOptions}
            wrapEnabled={true}
            highlightActiveLine={true}
            autoScrollEditorIntoView={true}
            highlightActiveLine={true}
          />
        </div>
       
      </div>
    </div>
  )
}
