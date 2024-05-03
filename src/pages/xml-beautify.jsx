import { Navigation } from '@/components/Navigation'
import { navigation } from '@/generic/data'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import { LinkIcon } from '@heroicons/react/20/solid'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import dynamic from 'next/dynamic'
import vkBeautify from 'vkbeautify'
import X2JS from 'x2js';
import json2csv from 'json2csv'
import FileSaver from 'file-saver'


const CodeEditor = dynamic(() => import('../components/CodeEditor'), {
  ssr: false,
}) 

export default function XMLBeautify() { 

  const inputRef = useRef()
  const [result, setResult] = useState(`<root><node attr="value">Text content</node></root>`)
  const [resultStr, setResultStr] = useState(`<root><node attr="value">Text content</node></root>`)
  const [mode, setMode] = useState({
    "slug": "xml",
    "name": "format-xml" 
  })


   const xmlString =
     '<?xml version="1.0"?><colors><color name="red"><r>255</r><g>0</g><b>0</b></color><color name="green"><r>0</r><g>255</g><b>0</b></color><color name="blue"><r>0</r><g>0</g><b>255</b></color></colors>'
// const xmlString = '<root><node attr="value">Text content</node></root>';
  
  const formatDoc = (str) => {
    const formattedXmlString = vkBeautify.xml(str)
    console.log('Formatted String>>>>', formattedXmlString)
    setResult(formattedXmlString)
  }

  const minifyXML = (str) => {

    var t = vkBeautify.xmlmin(vkBeautify.xml(str))
    setResult(t)
  }

  const xmltoJSON = (str) => {
  
    const x2js = new X2JS()
    const jsonObject = x2js.xml2js(str)
    setResult(vkBeautify.json(JSON.stringify(jsonObject)), 1)
  }

  const exportCSV = (str) => {
    const x2js = new X2JS()
    const jsonObject = x2js.xml2js(str)
    const csv = json2csv.parse(jsonObject)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    FileSaver.saveAs(blob, 'data.csv')
  }

  const downloadXML = (str) => {
    const formattedXmlString = vkBeautify.xml(str)
    const blob = new Blob([formattedXmlString], { type: 'text/xml;charset=utf-8' })
    FileSaver.saveAs(blob, 'data.xml')
  }
 

  const valueChanged = (id, newVal) => {

    console.log("Id>>>>", id );
    try {

      setResultStr(newVal)
     
    } catch (error) {
      console.log('Error>>>', error)
    }
  } 

  const openDropdown = (parent, child) => {
    const updateArray = navigation.map((section) => {
      if (section.title != parent.title) {
        // No change
        return section
      } else {
        // Return a new value
        let childIndex = section.links.findIndex((e) => e.title == child.title)
        let newArray = section
        newArray.links[childIndex].open_dropdown =
          !newArray.links[childIndex].open_dropdown

        return {
          ...section,
          newArray,
        }
      }
    })

    setNavigation(updateArray)
  }

  return (
    <div>
      <Head>
        <title>DevFinds - JSON Beautify Online</title>
        <meta
          name="description"
          content="DevFinds - JSON to Base64 Generator"
        />
      </Head>
      <Header />
      <ToastContainer autoClose={3000} />
      <div className="max-w-8xl relative mx-auto flex justify-center sm:px-2 lg:px-8 xl:px-12">
        <div className="hidden lg:relative lg:block lg:flex-none">
          <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
          <div className="absolute top-16 bottom-0 right-0 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
          <div className="absolute top-28 bottom-0 right-0 hidden w-px bg-slate-800 dark:block" />

          <div className="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden py-8 pl-0.5">
            <Navigation
              navigation={navigation}
              openDropdown={openDropdown}
              className="w-64 pr-8"
            />
          </div>
        </div>
        <div className="min-w-0 max-w-2xl flex-auto px-4 py-4 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
          <div className="">
            <h1 className="my-5 text-3xl font-bold leading-6 text-sky-500">
              JSON Beautify & Formatter
            </h1>
          </div>

          <ul>
            <li>
              {' '}
              <button onClick={() => formatDoc(resultStr)}>
                Format and Indent XML
              </button>
            </li>
            <li>
              <button onClick={() => minifyXML(resultStr)}>Minify XML</button>
            </li>
            <li>
              {' '}
              <button onClick={() => xmltoJSON(resultStr)}>XML to JSON</button>
            </li>
            <li>
              <button onClick={() => exportCSV(resultStr)}>Export CSV</button>
            </li>
            <li>
              <button onClick={() => downloadXML(resultStr)}>Download</button>
            </li>
          </ul>

          <div className="grid grid-cols-2 gap-4 border border-t-2 border-sky-500">
            <div className="h-screen border border-l-0 border-t-0 border-b-0 border-r-2 border-sky-500">
              <CodeEditor
                ref={inputRef}
                className="h-96"
                type={'xml'}
                format={'none'}
                valueChanged={valueChanged}
                id={'from'}
                result={undefined}
              />
            </div>
            <div className="h-screen">
              <CodeEditor
                className="h-96"
                type={mode.slug}
                format={'xml'}
                id={'to'}
                result={result}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
