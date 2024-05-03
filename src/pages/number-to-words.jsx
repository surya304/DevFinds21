import { Navigation } from '@/components/Navigation'
import { navigation } from '@/generic/data'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Head from 'next/head'
import { Fragment, useState } from 'react'
// import { CustomDropdown } from "@/components/CustomDropdown";
import { LinkIcon, CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SelectDropdown } from "@/components/SelectDropdown";
import { numbertoForeignwords, convertwordtoindianRupees } from "@/lib/number_to_words";


import { Listbox, Transition } from '@headlessui/react'



export default function NumbertoWords() {
  const notify = (label) => toast(label)

  const [resultStr, setResultStr] = useState('')
  const [textVal, setTextVal] = useState('')
  const [currentInput, setcurrentInput] = useState('')


  const [TextResult, setTextResult] = useState('')
  const [TextCommaResult, setTextCommaResult] = useState('')
  const [NumberFormat, setNumberFormat] = useState('')





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

  const convertoNumber = (val) => {

    setcurrentInput(val)

    var dataobj={
      val:val,
      format:dropObj.selected.format,

    }

    finalConversion(dataobj)

  }



  function finalConversion(dataobjdata){


    
    var finaldata = {

      data: dataobjdata.val,
      country_type: dataobjdata.format,

    }

    var formatnum = convert_number_format(finaldata);







    var finalstring = '';

    if (dataobjdata.format == 'en-IN') {

      finalstring = convertwordtoindianRupees(dataobjdata.val);

    } else {
      finalstring = numbertoForeignwords(dataobjdata.val);

    }
    setNumberFormat(formatnum);

    setResultStr(finalstring);

  }
  function convert_number_format(finaldata) {



    if (finaldata.country_type == 'en-IN') {

      return new Intl.NumberFormat('en-IN').format(finaldata.data);

    } else {

      //US dollar 
      // euro 
      // british pound 
      return new Intl.NumberFormat().format(finaldata.data);


    }

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

  const list = [
    {
      id: 1,
      name: "US Dollar",
      format: "Dollar"
    },
    {
      id: 2,
      name: "Indian Rupees ",
      format: "en-IN"

    },
    {
      id: 3,
      name: "British Pound ",
      format: "Pound"

    },
    {
      id: 4,
      name: "Euro",
      format: "Euro"

    },
  ]
  const [dropObj, setDropObj] = useState({
    label: {
      show: true,
      text: "Please Select Currency",
    },
    list: list,
    allowNew: {
      show: false,
      text: "Add Dude",
      icon: 'BarsArrowUpIcon',
    },
    selected: list[0],
    errorMessage: "Wornt work"
  });


  const addToDropdown = (val) => {

    console.log("addToDropdown>>>>>", val);
  };

  const dropdownChanged = (id) => {
    let index = list.findIndex((e) => e.id == id);

    setDropObj({
      ...dropObj, // Copy the old fields
      selected: list[index], // But override this one
    });


    setTimeout(() => {
      

    var dataobj={
      val:currentInput,
      format:list[index].format,

    }

    finalConversion(dataobj)
  }, 500);

  };


  function titleCase(str) {
    return str
        .split(' ')
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}
  function changeTextFormat(type){
var tempstr=resultStr;

    if(type == 'uppercase'){
      var finalstr =  tempstr.toUpperCase();
      setResultStr(finalstr)

    }else if(type == 'lowercase'){
      var finalstr =  tempstr.toLowerCase();
      setResultStr(finalstr)

    }else{
      var finalstr =  titleCase(tempstr);
      setResultStr(finalstr)
    }

  }

  function ClearData(){

    setcurrentInput('');
    setResultStr('');

  }

  return (
    <div>
      <Head>
        <title>Number to Words Online | DevFinds</title>
        <meta
          name="description"
          content="Number to Words"
        />
      </Head>
      <Header />

      {/* <CustomDropdown
      data={dropObj}
      dropdownChanged={dropdownChanged}
      addToDropdown={addToDropdown}
      /> */}






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
                    Number to Words
                  </h1>
                </div>

                <div className="space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4  sm:pt-5">
                    <label
                      htmlFor="first-name"
                      className="block text-base font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Enter the Number

                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                 
      <button
                          onClick={() => ClearData()}
      
        type="button"
        className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
    Clear
      </button>
                      <textarea
                        id="about"
                        name="about"
                        rows={5}
                        value={currentInput}
                        onChange={(e) => convertoNumber(e.target.value)}
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        spellCheck={false}
                      />
                      <p> Format : { NumberFormat }</p>
                      <br></br>
                      <div className='w-60'>
                      <SelectDropdown dropObj={dropObj}
        dropdownChanged={dropdownChanged}
        addToDropdown={addToDropdown} />
                      </div>
                  

                    </div>
                  </div>


                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
                    <label
                      htmlFor="about"
                      className="block text-base font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      The Converted Words

                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">

                      {/* <Dropdown
              data={dropObj}
              dropdownChanged={dropdownChanged}
              addToDropdown={addToDropdown}

            /> */}

           


<span className="isolate inline-flex rounded-md shadow-sm">
      <button
      onClick={() => changeTextFormat('uppercase')}

        type="button"
        className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
      Upper Case

      </button>
      <button
      onClick={() => changeTextFormat('lowercase')}
        type="button"
        className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
      Lower Case
      </button>
      <button
      onClick={() => changeTextFormat('titlecase')}
        type="button"
        className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
      Title Case
      </button>
    </span>

                   

<br></br>



                      
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
                    <div className="pt-3">
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
