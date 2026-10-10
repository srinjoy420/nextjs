import React from 'react'

const ProductIdPage = async({params}:{params:Promise<{id:string}>}) => {
    const {id} = await params;
  return (
    <div>Product ID: {id}</div>
  )
}

export default ProductIdPage