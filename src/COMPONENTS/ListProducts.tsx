import React, { useEffect, useState } from 'react'

const ListProducts = ({category}: {category: string}) => {

  const [product, setProducts] = useState<String[]>([]);

  useEffect(() => {
    console.log('fetching the produst in', category);
    setProducts(['cloting', 'entaitainment'])
    
  },[category])
  return (
    <div>ListProducts</div>
  )
}

export default ListProducts