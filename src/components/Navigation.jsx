import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useEffect, useRef, useState } from 'react'


export function Navigation({ navigation, className, openDropdown }) {
  let router = useRouter()
  const ref = useRef()

  const [firstTime, setFirstTime] = useState(false)

  const handleDropdown = (parent, child) => {
    
    openDropdown(parent, child)

  }


  useEffect(() => {

    
    let index = -1 
    for (const iterator of navigation) {

      index = index + 1
      for (const iterator2 of iterator.links) {

        const list = document.getElementById('list')
        const child = Array.from(list.children)[index]

        if (iterator2.href == router.asPath) {
          console.log('Matched Section')

          if (firstTime != true)
          {
            child.scrollIntoView({ behavior: 'smooth' })
            setFirstTime(true)
          }
          
          
        }

        if (iterator2.hasOwnProperty('open_dropdown')) {
          for (const iterator3 of iterator2.links) {
            if (iterator3.href == router.asPath) {
              console.log('Matched Dropdown')
              if (firstTime != true) { 
                child.scrollIntoView({ behavior: 'smooth' })
                setFirstTime(true)
              }
              
            }
          }
        }
      }
    }
  }, [navigation])


  return (
    <nav className={clsx('text-base lg:text-sm', className)}>
      <ul role="list" id="list" className="space-y-9" ref={ref}>
        {navigation.map((section) => (
          <div>
            {section.live == true && (
              <li key={section}>
                <h2 className="font-display font-medium text-slate-900 dark:text-white">
                  {section.title}
                </h2>
                <ul
                  role="list"
                  className="space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200"
                >
                  {section.links.map((link) => (
                    <li key={link.href} className="relative">
                      {link.links && (
                        <div>
                          <span
                            onClick={() => {
                              handleDropdown(section, link)
                            }}
                            className={clsx(
                              'flex w-full cursor-pointer pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full',
                              link.href === router.pathname
                                ? 'font-semibold text-sky-500 before:bg-sky-500'
                                : 'text-slate-700 before:hidden before:bg-slate-300 hover:text-slate-800 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300'
                            )}
                          >
                            {link.open_dropdown == true && (
                              <ChevronDownIcon className="h-4 w-4" />
                            )}
                            {link.open_dropdown == false && (
                              <ChevronRightIcon className="h-4 w-4" />
                            )}
                            {link.title}
                          </span>

                          {link.open_dropdown == true &&
                            link.links.map((linkChild) => (
                              <li
                                key={linkChild.href}
                                className="relative ml-5 mt-1"
                              >
                                <Link
                                  href={linkChild.href}
                                  className={clsx(
                                    'block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full',
                                    linkChild.href === router.pathname
                                      ? 'font-semibold text-sky-500 before:bg-sky-500'
                                      : 'text-slate-700 before:hidden before:bg-slate-300 hover:text-slate-800 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300'
                                  )}
                                >
                                  {linkChild.title}
                                </Link>
                              </li>
                            ))}
                        </div>
                      )}

                      {!link.links && (
                        <Link
                          href={link.href}
                          className={clsx(
                            'text-sm block w-full cursor-pointer pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full',
                            link.href === router.pathname
                              ? 'font-semibold text-sky-500 before:bg-sky-500'
                              : 'text-slate-700 before:hidden before:bg-slate-300 hover:text-slate-800 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300'
                          )}
                        >
                          {link.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </div>
        ))}
      </ul>
    </nav>
  )
}
