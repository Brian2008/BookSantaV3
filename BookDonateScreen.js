import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class BookDonateScreen extends React.Component{
  constructor(){
    super()
    this.state={
      requestedBookList:[], 
    }
    this.requestRef=null
  }
  render(){
    return(
     <View>
         <Text>Book Donate Screen</Text>
  
     </View>
    )
  }
}
