import React, { useState, useEffect } from 'react'

const XmlNode = ({ node }) => {

  const [isExpanded, setIsExpanded] = useState(true)
  const toggleExpansion = () => setIsExpanded(!isExpanded)

  return (
    <div className="xml-node">
      <div className="xml-node-header">
        <button onClick={toggleExpansion}>{isExpanded ? '-' : '+'}</button>
        <span className="xml-node-tag">{node.tagName}</span>
        <span className="xml-node-attributes">
          {[...node.attributes].map((attr) => (
            <span key={attr.name}>
              {attr.name}="{attr.value}"
            </span>
          ))}
        </span>
      </div>
      {isExpanded && (
        <div className="xml-node-children">
          {node.childNodes.forEach((childNode) =>
            childNode.nodeType === 1 ? (
              <XmlNode key={childNode.tagName} node={childNode} />
            ) : (
              <div key={childNode.textContent}>{childNode.textContent}</div>
            )
          )}
        </div>
      )}
    </div>
  )
}

const XmlViewer = ({ xmlString }) => {

  const [xmlDoc, setxmlDoc] = useState(undefined)

  console.log('xmlString', xmlString)

  let x = undefined

  useEffect(() => {
    
    if (xmlString)
    {
      x = new DOMParser().parseFromString(xmlString, 'text/xml')
      const htmlSections = x.childNodes[0]
      console.log('X>>>>>>>', x)
      console.log('type>>>>>>>', typeof x)
      console.log('htmlSections>>>>>>>', htmlSections)
      
      setxmlDoc(htmlSections)
    
    }

   }, [xmlString])
  
  return (
  <>
      { xmlDoc && <XmlNode node={xmlDoc} />
        
      }
  </>
  ) 
  
  
}

export default XmlViewer
