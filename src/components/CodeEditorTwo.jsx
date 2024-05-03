import { Button } from '@/components/Button'
import AceEditor from 'react-ace'
import { render } from 'react-dom'
import { useRef } from 'react'

import 'ace-builds/src-min-noconflict/mode-javascript'
import 'ace-builds/src-min-noconflict/mode-html'
import 'ace-builds/src-min-noconflict/theme-tomorrow_night_eighties'
import 'ace-builds/src-min-noconflict/ext-language_tools'
import 'ace-builds/src-min-noconflict/ext-spellcheck'
import 'ace-builds/src-min-noconflict/snippets/javascript'
import 'ace-builds/src-min-noconflict/ext-searchbox'
// import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/mode-html'
// import "ace-builds/src-noconflict/worker-html";
// import "ace-builds/src-noconflict/worker-javascript";
import 'ace-builds/src-noconflict/snippets/html'
import 'ace-builds/src-noconflict/theme-monokai'

const ace = require('ace-builds/src-noconflict/ace')
ace.config.set(
  'basePath',
  'https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/'
)
ace.config.setModuleUrl(
  'ace/mode/javascript_worker',
  'https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/worker-javascript.js'
)

export default function CodeEditor({ type }) {
  const previewRef = useRef(null)
    const aceEditor = useRef(null)
    
    console.log("Type is>>>>", type);

  let codeDiv = ''
  let iframeDiv = ''


  function onChange(newValue) {
    console.log('change', newValue)
    previewRef.current.innerHTML = newValue
  }

  return (
    <div>
      <div className="">
        <h1 className="p-2 text-2xl font-bold text-gray-800">
          HTML, CSS & JS Editor
        </h1>
       
      </div>

      {/* <div className="my-5 ml-2 grid grid-cols-2 gap-4">
        <div className="flex text-right">
          <Button>Format Code</Button>
          <Button className="ml-2">Run</Button>
        </div>
        <div className="">
          <Button>Share Code</Button>
        </div>
      </div> */}
      <div className="grid grid-cols-2 gap-4 border border-t-2 border-sky-500">
        <div className="h-screen border border-l-0 border-t-0 border-b-0 border-r-2 border-sky-500">

          <AceEditor
            mode="json"
            theme="monokai"
            name="awesome-code"
            height={'100%'}
            width={'100%'}
            ref={aceEditor}
            onChange={onChange}
            fontSize={14}
            showPrintMargin={true}
            focus={true}
            editorProps={{ $blockScrolling: true }}
            wrapEnabled={true}
            highlightActiveLine={true}
            autoScrollEditorIntoView={true}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
              showGutter: true,
            }}
          />
        </div>
        <div className="h-screen">
          <div ref={previewRef}></div>
        </div>
      </div>
    </div>
  )
}
