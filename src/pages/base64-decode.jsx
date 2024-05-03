import { Navigation } from '@/components/Navigation'
import { navigation } from '@/generic/data'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Head from 'next/head'
import { useState } from 'react'
import { LinkIcon } from '@heroicons/react/20/solid'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Base64Decode() {
  const notify = (label) => toast(label)

  const [resultStr, setResultStr] = useState('')
  const [textVal, setTextVal] = useState('')

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

  const decodeResult = (val) => {
    const jsonString = Buffer.from(val, 'base64').toString()
    setResultStr(jsonString)
  }

  const copyToClipboard = () => {
    const textField = document.createElement('textarea')
    textField.innerText = resultStr
    document.body.appendChild(textField)

    // Select the text field
    textField.select()

    // Copy the text inside the text field
    document.execCommand('copy')

    // Remove the text field
    textField.remove()
    notify('Copied to Clipboard')
  }

  return (
    <div>
      <Head>
        <title>Decode Base64 String Online | DevFinds</title>
        <meta
          name="description"
          content="Decode your Base64 String instantly using this tool"
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
        <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
          <form className="space-y-8">
            <div className="space-y-8  sm:space-y-5">
              <div className="space-y-6 sm:space-y-5">
                <div>
                  <h1 className="text-3xl font-bold leading-6 text-gray-900">
                    Base64 Decoder
                  </h1>
                </div>

                <div className="space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4  sm:pt-5">
                    <label
                      htmlFor="first-name"
                      className="block text-base font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Base64 String
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <textarea
                        id="about"
                        name="about"
                        rows={5}
                        onChange={(e) => decodeResult(e.target.value)}
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        spellCheck={false}
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                    <label
                      htmlFor="about"
                      className="block text-base font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Decoded String
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <textarea
                        id="about"
                        name="about"
                        rows={5}
                        value={resultStr}
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        spellCheck={false}
                      />
                    </div>
                  </div>

                  {resultStr.length > 0 && (
                    <div className="pt-5">
                      <div className="flex justify-center">
                        <button
                          onClick={() => copyToClipboard()}
                          type="button"
                          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <LinkIcon
                            className="-ml-1 mr-3 h-5 w-5"
                            aria-hidden="true"
                          />
                          Copy Result
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}
