import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import {ListItem,Icon} from 'react-native-elements'
import db from '../config.js'
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'
export default class NotificationScreen extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            userId:firebase.auth().currentUser.email,
            allNotifications:[]
        }
        this.notificationRef=null
    }
    getNotifications=()=>{
        var requestRef = db.collection("all_notifications")
        .where("notification_status", "==", "unread")
        .where("targeted_user_id","==",this.state.userId)
        .onSnapshot((snapshot)=>{
            var allNotifications=[]
                snapshot.docs.map((doc)=>{
                    var notification=doc.data()
                    notification["doc_id"]=doc.id
                    allNotifications.push(notification)
                })
                this.setState({
                    allNotifications:allNotifications
                })
        })
    }
    componentDidMount(){
        this.getNotifications();

      }
   
      componentWillUnmount(){
        this.notificationRef();
      }
    keyExtractor = (item, index) => index.toString()

    renderItem=({item,index})=>{
        return(
            <ListItem
            key = {index}
            leftElement = {<Icon name="book" type="font-awesome" color="black"/>}
            title={item.book_name}
            titleStyle={{color:"black",fontWeight:"bold"}}
            subtitle={item.message}
            bottomDivider

            />
        )
    }
    render(){
        return(
            <View>
                <Text>
                NotificationScreen
                </Text>
            </View>
        )
    }
}