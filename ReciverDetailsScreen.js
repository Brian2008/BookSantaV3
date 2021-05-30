import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import db from '../config'
import firebase from 'firebase'
import {Header, Card, Icon, ThemeProvider} from 'react-native-elements'

export default class RecieverDetailsScreen extends Component{
constructor(){
    super()
    this.state={
        userId:firebase.auth().currentUser.email,
        recieverId:this.props.navigation.getParam('details')["user_Id"],
        requestId:this.props.navigation.getParam('details')["request_Id"],
        bookName:this.props.navigation.getParam('details')["book_name"],
        reason_for_requesting:this.props.navigation.getParam('details')["reason_to_request"],
        recieverName:'',
        recieverContact:'',
        recieverAddress:'',
        recieverRequestDocId:'',

    }
    }
getRecieverDetails(){
    db.collection('users').where('email_id' , '==' , this.state.recieverId).get()
    .then(snapshot=>{
        snapshot.forEach(doc=>{
            this.setState({
                recieverName:doc.data().first_name,
                recieverContact:doc.data().contact,
                recieverAddress:doc.data().address
            })
        })
    })
    db.collection('requested_books').where('request_id', '==', this.state.requestId).get()
    .then(snapshot=>{
        snapshot.forEach(doc=>{
            this.setState({
                recieverRequestDocId:doc.id,
            })
        })
    })
}
updateBookStatus=()=>{
 db.collection('all_donations').add({
     book_name:this.state.bookName,
     request_id:this.state.requestId,
     donor_id:this.state.userId,
     requested_by:this.state.recieverName,
     request_status:"Donor Interested"
 })   
}
addNotification=()=>{
    var message = this.state.username+"has shown intrest in donating the book"
    db.collection("all_notifications").add({
        targeted_user_id:this.state.recieverId,
        donor_id:this.state.userId,
        request_id:this.state.requestId,
        book_name:this.state.bookName,
        date:firebase.firestore.FieldValue.serverTimestamp(),
        notification_status:"unread",
        message:message
    })
}
componentDidMount(){
    this.getRecieverDetails()
}
render(){
    return(
        <View style = {styles.container}>
            <View style = {{flex:0.1}}>
             <Header 
             leftComponent={<Icon name='arrow-left'
             type='feather' color='peach' onPress={()=>this.props.navigation.goBack()}/>}
             centerComponents = {{text:"Donate Books",style:{color:'lightblue', fontSize:20,fontWeight:'bold'}}
            }backgroundColor="red"
             />
            </View>
            <View style = {{flex:0.3}}>
                <Card title = {'bookInformation'}
                titleStyle={{fontSize:20}}>
                    <Card>
                        <Text style = {{fontWeight:'bold'}}>Name-{this.state.bookName}</Text>
                    </Card>

                    <Card>
                    <Text style = {{fontWeight:'bold'}}>Reason-{this.state.reason_for_requesting}</Text>
                    </Card>
                </Card>
            </View>

            <View style = {{flex:0.3}}>
                <Card title = {'reciverInformation'}
                titleStyle={{fontSize:20}}>
                    <Card>
                        <Text style = {{fontWeight:'bold'}}>Name-{this.state.recieverName}</Text>
                    </Card>

                    <Card>
                    <Text style = {{fontWeight:'bold'}}>Contact-{this.state.recieverContact}</Text>
                    </Card>

                    <Card>
                    <Text style = {{fontWeight:'bold'}}>Address-{this.state.recieverAddress}</Text>
                    </Card>
                </Card>
            </View>
            <View styles = {styles.buttonContaiener}>
                {
                    this.state.recieverId!== this.state.userId?(
                        <TouchableOpacity
                        style = {styles.button}
                        onPress={()=>{
                            this.updateBookStatus()
                            this.addNotification()
                            this.props.navigation.navigate('MyDonations')
                        }}><Text>I Want To Donate</Text></TouchableOpacity>
                    ):null
                }
            </View>
        </View>
    )
}
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        
      },
      buttonContainer:{
        flex:0.3,
        alignItems: 'center',
        justifyContent: 'center'
      },
      button:{
        width:200,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:'orange',
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        elevation: 16,
      },
})