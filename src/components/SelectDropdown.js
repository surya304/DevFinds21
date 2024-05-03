import { Fragment, useState } from "react";
import { Listbox, Transition } from '@headlessui/react'

import {
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
0

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function SelectDropdown({ dropObj, dropdownChanged, addToDropdown }) {

    console.log(dropObj,"dropObj")
    const [inputVal, setInputVal] = useState("")

    const checkAddition = () => {
       
        if (inputVal.trim().length > 1) {
            addToDropdown(inputVal);
        }
      
  }
    
  return (


    <div>


    <Listbox value={dropObj.selected} onChange={(e) => dropdownChanged(e.id)}>
      {({ open }) => (
        <>
          {dropObj.label.show == true && (
            <Listbox.Label className="block text-sm font-medium text-gray-700">
              {dropObj.label.text}
            </Listbox.Label>
          )}
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="block truncate">{dropObj.selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {dropObj.allowNew.show == true && (
                  <div>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <div className="relative flex flex-grow items-stretch focus-within:z-10">
                        <input
                          type="text"
                          value={inputVal}
                          onChange={(e) => setInputVal(e.target.value)}
                          className="block w-full rounded-none rounded-l-md border-gray-300 pl-5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="John Smith"
                        />
                      </div>
                      <button
                        onClick={() => checkAddition()}
                        type="button"
                        className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        <dropObj.allowNew.icon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span>{dropObj.allowNew.text}</span>
                      </button>
                    </div>
                    {dropObj.errorMessage.length > 0 && (
                      <span className="text-red-500">{dropObj.errorMessage}</span>
                    )}
                  </div>
                )}

                {dropObj.list.map((item) => (
                  <Listbox.Option
                    key={item}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-8 pr-4"
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {item.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 left-0 flex items-center pl-1.5"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  </div>

  );

}
