import { useRef, useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function CodeBlock({ code, language }) {

  const notify = (label) => toast(label)
  const codeBlockRef = useRef(null)

    useEffect(() => {
        Prism.highlightAll()
    }, [])

  function copyToClipboard() {
    
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(codeBlockRef.current)
    selection.removeAllRanges()
    selection.addRange(range)

    document.execCommand('copy')

    selection.removeAllRanges()
    notify("Copied to Clipboard")
  }

  return (
    <div className="code-block rounded-lg">
      <ToastContainer autoClose={3000} />
      <pre ref={codeBlockRef}>
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <div className="copy-button-container">
        <button type="button" onClick={() => copyToClipboard()}>
          Copy
        </button>
      </div>
    </div>
  )
}
