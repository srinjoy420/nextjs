import React from 'react'

const Page = async({params}:{params:Promise<{slug:string[]}>}) => {
    const {slug}=await params
  return (
    <div>
        <h1>Documentation</h1>
        <p>Path segments : {slug}</p>
    </div>
    
  )
}

export default Page