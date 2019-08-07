import React, { useState, useEffect } from 'react';
import { Category } from '../Category';
import { List, Item } from './styles';
// import { categories as mockCategories } from '../../../api/db.json';

const useCategoriesData = () => {
  const [categories, setCategories ] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true)
    window.fetch('https://petgram-api-percy.now.sh/categories')
    .then(res => res.json())
    .then(response => {
      setCategories(response)
      setLoading(false)
    })
  },[])
  return { categories, loading }
}

export const ListOfCategories = () => {
  const { categories, loading} = useCategoriesData()
  const [showFixed, setShowFixed ] = useState(false);

  useEffect(() => {
    const onScroll = e => {
      const newShowFixed = window.scrollY > 200
      showFixed !== newShowFixed &&
      setShowFixed(!showFixed)
    }
    document.addEventListener('scroll', onScroll)

    return () =>document.removeEventListener('scroll', onScroll)
  },[showFixed])

  const renderList = (fixed) => (
    <List fixed={fixed}>
      {
        loading ? 
        <Item key="loading">
           <Category />
        </Item>
        :
       categories.map( (category,index) => 
        <Item key={category.id}>
          <Category 
            {...category}
          />
        </Item>)
      }
    </List>
  )

  return(
    <React.Fragment>
      {renderList()}
      {showFixed && renderList(true)}
    </React.Fragment>
    
  )
}