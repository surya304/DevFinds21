import { useState } from 'react'
import { Container } from '@/components/Container'
import { navigation } from '@/generic/data'


export function SecondaryFeatures() {

  
  return (
    <section
      id="secondary-features"
      aria-label="Features for simplifying everyday business tasks"
      className="pt-20 pb-14 sm:pb-20 sm:pt-12 lg:pb-16"
    >
      {navigation.map((base) => (
        <div key={base}>
          {base.live == true && (
            <Container className="mt-10">
              <div className=" mx-auto max-w-2xl md:text-center">
                <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
                  {base.title}
                </h2>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-4">
                {base.links.map((item) => (
                  <div
                    key={item.title}
                    className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-4 py-4 shadow-sm focus-within:ring-2 focus-within:ring-gray-500 focus-within:ring-offset-2 hover:border-gray-400"
                  >
                    <div className="min-w-0 flex-1">
                      <a
                        href={item.href}
                        className="focus:outline-none"
                      >
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="text-sm font-medium text-gray-900">
                          {item.title}
                        </p>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          )}
        </div>
      ))}
    </section>
  )
}
