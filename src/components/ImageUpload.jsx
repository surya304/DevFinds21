import {useState} from "react"
import { TrashIcon } from '@heroicons/react/20/solid'

export function ImageUpload({ fileUpdated }) {
  const [image, setImage] = useState(undefined)

  const deleteImage = () => {
    setImage(undefined)
    fileUpdated(undefined)
  }

  function fileChanged(event) {
    console.log('Event', event)
    setImage(URL.createObjectURL(event.target.files[0]))
    //  convertToBase64(event.target.files[0])
    fileUpdated(event.target.files[0])
  }

  function dragover(event) {
    event.stopPropagation()
    event.preventDefault()

    // Add some visual fluff to show the user can drop its files
    if (!event.currentTarget.classList.contains('bg-indigo-600')) {
      event.currentTarget.classList.remove('bg-gray-800')
      event.currentTarget.classList.add('bg-indigo-600')
    }
  }

  function dragleave(event) {
    // Clean up
    console.log('dragleave>>>>>')
    event.currentTarget.classList.add('bg-gray-800')
    event.currentTarget.classList.remove('bg-indigo-600')
  }

  function drop(event) {
    console.log('drop>>>>>')

    event.preventDefault()
    setImage(URL.createObjectURL(event.dataTransfer.files[0]))
    fileUpdated(event.dataTransfer.files[0])

    event.currentTarget.classList.add('bg-gray-800')
    event.currentTarget.classList.remove('bg-indigo-600')
  }

  return (
    <div>
      {image == undefined && (
        <div className="mt-1 sm:col-span-2 sm:mt-0">
          <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  for="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload Image</span>
                  <input
                    id="file-upload"
                    onChange={(evt) => fileChanged(evt)}
                    type="file"
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, up to 1MB</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-1 sm:col-span-2 sm:mt-0">
        {image != undefined && (
          <div className="flex w-full items-center space-x-2">
            <img
              src={image}
              className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6"
            />
            <TrashIcon
              onClick={() => deleteImage()}
              className="h-5 w-5 cursor-pointer text-gray-600"
            />
          </div>
        )}
      </div>
    </div>
  )
}