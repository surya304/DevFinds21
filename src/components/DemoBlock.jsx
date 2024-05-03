import { MDXProvider } from '@mdx-js/react'
import dynamic from 'next/dynamic'
import * as mdxComponents from '@/components/mdx'
import { Prose } from '@/components/Prose'

// const MyComponent = dynamic(() => import('../../docs/demo2.mdx'))

export function DemoBlock({ code, language }) {

  return (
    <div className="code-block rounded-lg">
      <div className="m-20">
        <Prose as="article">
          <MDXProvider components={mdxComponents}>
            {/* <MyComponent /> */}
          </MDXProvider>
        </Prose>
      </div>
    </div>
  )
}
