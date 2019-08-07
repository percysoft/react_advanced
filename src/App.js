import React from 'react'
import { ListOfCategories } from './components/LisOfCategories'
import { GlobalStyle } from './styles/GlobalStyles';
import { ListOfPhotoCard } from './components/ListOfPhotoCard';
import { Logo } from './components/Logo';

export const App = () => (
  <React.Fragment>
    <GlobalStyle />
    <Logo />
    <ListOfCategories />
    <ListOfPhotoCard />
  </React.Fragment>
  
)