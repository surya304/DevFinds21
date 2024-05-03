import { Navigation } from '@/components/Navigation'
import { navigation } from '@/generic/data'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Head from 'next/head'
import { CloudArrowDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import FileSaver from 'file-saver'

export default function HMAC() {


  const [imgSrc, setImgSrc] = useState("")
  
  const createImage = (base64String) => {
    setImgSrc(base64String)
  }

  function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1])

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length)

    // create a view into the buffer
    var ia = new Uint8Array(ab)

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], { type: mimeString })
    return blob
  }

  const saveFile = () => {
    const blob = dataURItoBlob(imgSrc)
    FileSaver.saveAs(blob, "download-image")
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
        <title>Base64 String to Image Converter Online | DevFinds</title>
        <meta
          name="description"
          content="Create & Download Image from your Base64 String using this tool"
        />
      </Head>
      <Header />
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
                    Base64 to Image Generator
                  </h1>
                </div>

                <div className="space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                    <label
                      htmlFor="about"
                      className="block text-base font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Paste your base64 string
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <textarea
                        id="about"
                        name="about"
                        rows={5}
                        onChange={(e) => createImage(e.target.value)}
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        defaultValue={''}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
              <label
                htmlFor="about"
                className="block text-base font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Image Preview 👉
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                {imgSrc.length > 0 && (
                  <div>
                    <div className="flex w-full items-center space-x-2">
                      <img
                        src={imgSrc}
                        className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6"
                      />
                    </div>

                    <div className="pt-5">
                      <div className="flex justify-center">
                        <button
                          onClick={() => saveFile()}
                          type="button"
                          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <CloudArrowDownIcon
                            className="-ml-1 mr-3 h-5 w-5"
                            aria-hidden="true"
                          />
                          Download Image
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}
