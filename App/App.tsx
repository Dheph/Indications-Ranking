import React from 'react';
import Router from './src/routes';
import {StatusBar} from 'expo-status-bar'
import colors from './src/styles/colors';

export default function App(){
  
  return(
    <>
    <StatusBar backgroundColor={colors.lighText} />
    <Router />
    </>
  )
}