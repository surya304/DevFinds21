import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'

import { MDXProvider } from '@mdx-js/react'
import dynamic from 'next/dynamic'
import * as mdxComponents from '@/components/mdx'
import { Prose } from '@/components/Prose'

const componentLookup = {
  'rem-px': import('../../docs/rem-px.mdx'),
  'rem-percent': import('../../docs/rem-percent.mdx'),
  'rem-point': import('../../docs/rem-point.mdx'),
  'em-px': import('../../docs/em-px.mdx'),
  'em-percent': import('../../docs/em-percent.mdx'),
  'em-point': import('../../docs/em-point.mdx'),
  'percent-em': import('../../docs/percent-em.mdx'),
  'percent-point': import('../../docs/percent-point.mdx'),
  'percent-px': import('../../docs/percent-px.mdx'),
  'percent-rem': import('../../docs/percent-rem.mdx'),
  'point-em': import('../../docs/point-em.mdx'),
  'point-rem': import('../../docs/point-rem.mdx'),
  'point-percent': import('../../docs/point-percent.mdx'),
  'point-px': import('../../docs/point-px.mdx'),
  'px-em': import('../../docs/px-em.mdx'),
  'px-rem': import('../../docs/px-rem.mdx'),
  'px-percent': import('../../docs/px-percent.mdx'),
  'px-point': import('../../docs/px-point.mdx'),
}

export function StyleConverter({ type }) {
  console.log('type>>>>>', type)

  const items = Array.from({ length: 48 }, (value, index) => index + 1)

  const [h1, setH1] = useState('')


  const DynamicComponent = dynamic(() => componentLookup[type], { ssr: false })
    
  

  const [orderList, setOrderList] = useState([
    {
      name: 'em',
      label: 'EM',
      order: 1,
      value: 1,
      slug: 'em',
    },
    {
      name: 'rem',
      label: 'REM',
      order: 2,
      value: 1,
      slug: 'rem',
    },
    {
      name: 'point',
      label: 'Point',
      order: 3,
      value: 12,
      slug: 'pt',
    },
    {
      name: 'pixel',
      label: 'Pixel',
      order: 4,
      value: 16,
      slug: 'px',
    },
    {
      name: 'percent',
      label: 'Percent',
      order: 5,
      value: 100,
      slug: '%',
    },
  ])


  useEffect(() => {

    
    if (type == 'rem-px') {
      setH1('REM to Pixel')
      setOrderList(
        orderList.map((item) => {
          if (item.name == 'em') {
            return { ...item, order: 3 }
          } else if (item.name == 'rem') {
            return { ...item, order: 1 }
          } else if (item.name == 'pixel') {
            return { ...item, order: 2 }
          } else if (item.name == 'percent') {
            return { ...item, order: 4 }
          } else if (item.name == 'point') {
            return { ...item, order: 5 }
          }
        })
      )
    } else if (type == 'rem-percent') {
      setH1('REM to Percentage')
      setOrderList(
        orderList.map((item) => {
          if (item.name == 'em') {
            return { ...item, order: 4 }
          } else if (item.name == 'rem') {
            return { ...item, order: 1 }
          } else if (item.name == 'pixel') {
            return { ...item, order: 3 }
          } else if (item.name == 'percent') {
            return { ...item, order: 2 }
          } else if (item.name == 'point') {
            return { ...item, order: 5 }
          }
        })
      )
    } else if (type == 'rem-point') {
      setH1('REM to Point')
      setOrderList(
        orderList.map((item) => {
          if (item.name == 'em') {
            return { ...item, order: 5 }
          } else if (item.name == 'rem') {
            return { ...item, order: 1 }
          } else if (item.name == 'pixel') {
            return { ...item, order: 4 }
          } else if (item.name == 'percent') {
            return { ...item, order: 3 }
          } else if (item.name == 'point') {
            return { ...item, order: 2 }
          }
        })
      )
    } else if (type == 'em-px') {
      setH1('EM to Pixel')
      setOrderList(
        orderList.map((item) => {
          if (item.name == 'rem') {
            return { ...item, order: 3 }
          } else if (item.name == 'em') {
            return { ...item, order: 1 }
          } else if (item.name == 'pixel') {
            return { ...item, order: 2 }
          } else if (item.name == 'percent') {
            return { ...item, order: 4 }
          } else if (item.name == 'point') {
            return { ...item, order: 5 }
          }
        })
      )
    } else if (type == 'em-percent') {
      setH1('EM to Percentage')
      setOrderList(
        orderList.map((item) => {
          if (item.name == 'rem') {
            return { ...item, order: 4 }
          } else if (item.name == 'em') {
            return { ...item, order: 1 }
          } else if (item.name == 'pixel') {
            return { ...item, order: 3 }
          } else if (item.name == 'percent') {
            return { ...item, order: 2 }
          } else if (item.name == 'point') {
            return { ...item, order: 5 }
          }
        })
      )
    } else if (type == 'em-point') {
      setH1('EM to Point')
      setOrderList(
        orderList.map((item) => {
          if (item.name == 'rem') {
            return { ...item, order: 5 }
          } else if (item.name == 'em') {
            return { ...item, order: 1 }
          } else if (item.name == 'pixel') {
            return { ...item, order: 4 }
          } else if (item.name == 'percent') {
            return { ...item, order: 3 }
          } else if (item.name == 'point') {
            return { ...item, order: 2 }
          }
        })
      )
    } else if (type == 'px-point') {
      setH1('Pixel to Point')
      setOrderList(
        orderList.map((item) => {
          if (item.name == 'em') {
            return { ...item, order: 3 }
          } else if (item.name == 'rem') {
            return { ...item, order: 4 }
          } else if (item.name == 'pixel') {
            return { ...item, order: 1 }
          } else if (item.name == 'percent') {
            return { ...item, order: 5 }
          } else if (item.name == 'point') {
            return { ...item, order: 2 }
          }
        })
      )
    } else if (type == 'px-rem') {
      setH1('Pixel to REM')
      setOrderList(
        orderList.map((item) => {
          if (item.name == 'em') {
            return { ...item, order: 3 }
          } else if (item.name == 'rem') {
            return { ...item, order: 2 }
          } else if (item.name == 'pixel') {
            return { ...item, order: 1 }
          } else if (item.name == 'percent') {
            return { ...item, order: 5 }
          } else if (item.name == 'point') {
            return { ...item, order: 4 }
          }
        })
      )
    } else if (type == 'px-em') {
      setH1('Pixel to EM')
      setOrderList(
        orderList.map((item) => {
          if (item.name == 'em') {
            return { ...item, order: 2 }
          } else if (item.name == 'rem') {
            return { ...item, order: 3 }
          } else if (item.name == 'pixel') {
            return { ...item, order: 1 }
          } else if (item.name == 'percent') {
            return { ...item, order: 5 }
          } else if (item.name == 'point') {
            return { ...item, order: 4 }
          }
        })
      )
    } else if (type == 'px-percent') {
      setH1('Pixel to Percentage')
      setOrderList(
        orderList.map((item) => {
          if (item.name == 'em') {
            return { ...item, order: 3 }
          } else if (item.name == 'rem') {
            return { ...item, order: 5 }
          } else if (item.name == 'pixel') {
            return { ...item, order: 1 }
          } else if (item.name == 'percent') {
            return { ...item, order: 2 }
          } else if (item.name == 'point') {
            return { ...item, order: 4 }
          }
        })
      )
    } else if (type == 'percent-point') {
      setH1('Percentage to Point')
      setOrderList(
        orderList.map((item) => {
          if (item.name == 'em') {
            return { ...item, order: 3 }
          } else if (item.name == 'rem') {
            return { ...item, order: 4 }
          } else if (item.name == 'pixel') {
            return { ...item, order: 5 }
          } else if (item.name == 'percent') {
            return { ...item, order: 1 }
          } else if (item.name == 'point') {
            return { ...item, order: 2 }
          }
        })
      )
    } else if (type == 'percent-px') {
      setH1('Percentage to Pixel')
      setOrderList(
        orderList.map((item) => {
          if (item.name == 'em') {
            return { ...item, order: 3 }
          } else if (item.name == 'rem') {
            return { ...item, order: 4 }
          } else if (item.name == 'pixel') {
            return { ...item, order: 2 }
          } else if (item.name == 'percent') {
            return { ...item, order: 1 }
          } else if (item.name == 'point') {
            return { ...item, order: 5 }
          }
        })
      )
    } else if (type == 'percent-em') {
      setH1('Percentage to EM')
      setOrderList(
        orderList.map((item) => {
          if (item.name == 'em') {
            return { ...item, order: 2 }
          } else if (item.name == 'rem') {
            return { ...item, order: 4 }
          } else if (item.name == 'pixel') {
            return { ...item, order: 5 }
          } else if (item.name == 'percent') {
            return { ...item, order: 1 }
          } else if (item.name == 'point') {
            return { ...item, order: 3 }
          }
        })
      )
    } else if (type == 'percent-rem') {
      setH1('Percentage to REM')
      setOrderList(
        orderList.map((item) => {
          if (item.name == 'em') {
            return { ...item, order: 3 }
          } else if (item.name == 'rem') {
            return { ...item, order: 2 }
          } else if (item.name == 'pixel') {
            return { ...item, order: 5 }
          } else if (item.name == 'percent') {
            return { ...item, order: 1 }
          } else if (item.name == 'point') {
            return { ...item, order: 4 }
          }
        })
      )
    } else if (type == 'point-em') {
      setH1('Point to EM')
      setOrderList(
        orderList.map((item) => {
          if (item.name == 'em') {
            return { ...item, order: 2 }
          } else if (item.name == 'rem') {
            return { ...item, order: 3 }
          } else if (item.name == 'pixel') {
            return { ...item, order: 4 }
          } else if (item.name == 'percent') {
            return { ...item, order: 5 }
          } else if (item.name == 'point') {
            return { ...item, order: 1 }
          }
        })
      )
    } else if (type == 'point-rem') {
      setH1('Point to REM')
      setOrderList(
        orderList.map((item) => {
          if (item.name == 'em') {
            return { ...item, order: 3 }
          } else if (item.name == 'rem') {
            return { ...item, order: 2 }
          } else if (item.name == 'pixel') {
            return { ...item, order: 4 }
          } else if (item.name == 'percent') {
            return { ...item, order: 5 }
          } else if (item.name == 'point') {
            return { ...item, order: 1 }
          }
        })
      )
    } else if (type == 'point-px') {
      setH1('Point to Pixel')
      setOrderList(
        orderList.map((item) => {
          if (item.name == 'em') {
            return { ...item, order: 3 }
          } else if (item.name == 'rem') {
            return { ...item, order: 4 }
          } else if (item.name == 'pixel') {
            return { ...item, order: 2 }
          } else if (item.name == 'percent') {
            return { ...item, order: 5 }
          } else if (item.name == 'point') {
            return { ...item, order: 1 }
          }
        })
      )
    } else if (type == 'point-percent') {
      setH1('Point to Percentage')
      setOrderList(
        orderList.map((item) => {
          if (item.name == 'em') {
            return { ...item, order: 3 }
          } else if (item.name == 'rem') {
            return { ...item, order: 4 }
          } else if (item.name == 'pixel') {
            return { ...item, order: 5 }
          } else if (item.name == 'percent') {
            return { ...item, order: 2 }
          } else if (item.name == 'point') {
            return { ...item, order: 1 }
          }
        })
      )
    }
  }, [type])

  const numAscending = [...orderList].sort((a, b) => a.order - b.order)

  const calculateValues = (name, value) => {
    console.log('name>>>>', name)

    let em = 1
    let rem = 1
    let pixel = 16
    let point = 12
    let percent = 100

    if (name == 'em' || name == 'rem') {
      em = value
      rem = value * 1
      pixel = value * 16
      percent = value * 100
      point = value * 12
    } else if (name == 'pixel') {
      rem = value / 16
      em = value / 16
      pixel = value
      percent = em * 100
      point = em * 12
    } else if (name == 'point') {
      rem = value / 12
      em = value / 12
      pixel = em * 16
      percent = em * 100
      point = value
    } else if (name == 'percent') {
      rem = value / 100
      em = value / 100
      pixel = em * 16
      percent = value
      point = em * 12
    }

    setOrderList(
      orderList.map((item) => {
        // console.log("item>>>", item);
        if (item.name == 'em') {
          return { ...item, value: em }
        } else if (item.name == 'rem') {
          return { ...item, value: rem }
        } else if (item.name == 'pixel') {
          return { ...item, value: pixel }
        } else if (item.name == 'percent') {
          return { ...item, value: percent }
        } else if (item.name == 'point') {
          return { ...item, value: point }
        } else {
          // No changes
          return item
        }
      })
    )
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Table",
              "name": "My Table",
              "rowCount": ${items.length},
              "columnCount": 2,
              "url": "https://www.example.com/table",
              "description": "${h1} Conversions Table",
              "mainEntityOfPage": "True",
              "head": [
                {
                  "@type": "TableRow",
                  "itemListElement": [
                    {
                      "@type": "TableHeader",
                      "name": "${numAscending.slice(0, -3)[0].label}"
                    },
                    {
                      "@type": "TableHeader",
                      "name": "${numAscending.slice(0, -3)[1].label}"
                    }
                  ]
                }
              ],
              "row": [
                ${numAscending
                  .slice(2)
                  .map(
                    (item, index) => `
                  {
                    "@type": "TableRow",
                    "itemListElement": [
                      {
                        "@type": "TableCell",
                        "name": "${item[0]}"
                      },
                      {
                        "@type": "TableCell",
                        "name": "${item[1]}"
                      }
                    ]
                  }
                `
                  )
                  .join(',')}
              ]
            }
          `}
        </script>
      </Helmet>
      <form className="space-y-8 sm:mx-16 lg:mx-24">
        <div className="space-y-8  sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">
            <div>
              <h1 className="mt-5 text-3xl font-bold leading-6 text-sky-500">
                {h1} Converter
              </h1>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              {numAscending.slice(0, -3).map((item, index) => (
                <div className="sm:col-span-1">
                  <div>
                    <label
                      htmlFor="account-number"
                      className="block text-lg font-bold text-gray-700"
                    >
                      {item.label}
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <input
                        onChange={(e) =>
                          calculateValues(item.name, e.target.value)
                        }
                        type="number"
                        value={item.value}
                        className="block w-full rounded-md border-gray-300 pr-10 text-4xl focus:border-sky-500 focus:ring-sky-500"
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-base text-gray-500">
                          {item.slug}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h1 className="mt-10 text-2xl font-bold leading-6 text-sky-500">
                Other Converters
              </h1>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
              {numAscending.slice(2).map((item) => (
                <div className="sm:col-span-1">
                  <div>
                    <label
                      htmlFor="account-number"
                      className="block text-lg font-bold text-gray-700"
                    >
                      {item.label}
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <input
                        onChange={(e) =>
                          calculateValues(item.name, e.target.value)
                        }
                        type="number"
                        value={item.value}
                        className="block w-full rounded-md border-gray-300 pr-10 text-2xl focus:border-sky-500 focus:ring-sky-500"
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-base text-gray-500">
                          {item.slug}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          
          

          <div className="mt-5 rounded-lg ">
            
              <Prose as="article">
                <MDXProvider components={mdxComponents}>
                  <DynamicComponent/>
                </MDXProvider>
              </Prose>
            
          </div>
         
        </div>

        <div>
          <h2 className="mt-5 text-2xl font-bold leading-6 text-gray-900">
            {h1} Conversions Table
          </h2>

          <div className="">
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                          {numAscending.slice(0, -3).map((item, index) => (
                        <tr>

                            <th
                              scope="col"
                              className="py-3 pl-4 pr-3 text-left text-base font-bold uppercase tracking-wide text-gray-500 sm:pl-6"
                            >
                              {item.name} 
                            </th>
                        </tr>
                          ))}

                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {items.map((item) => (
                          <tr key={item}>
                            {numAscending.slice(0, -3).map((item2) => (
                              <td
                                key={item2.slug}
                                className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6"
                              >
                                {item2.name == 'em' && <span>{item / 16}</span>}
                                {item2.name == 'rem' && (
                                  <span>{item / 16}</span>
                                )}
                                {item2.name == 'pixel' && <span>{item}</span>}
                                {item2.name == 'percent' && (
                                  <span>{item * 6.25}</span>
                                )}
                                {item2.name == 'point' && (
                                  <span>{item * 0.75}</span>
                                )}
                                {item2.slug}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
