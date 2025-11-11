import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Image, ImageBackground, StyleSheet, View, } from 'react-native'
import BottomAppSafeArea from '../../../components/AppSafeArea/BottomAppSafeArea'
import TopAppSafeArea from '../../../components/AppSafeArea/TopAppSafeArea'
import { AppImages, ScreenProps } from '../../../utilis/AppConstant'
import { AppStyle } from '../../../utilis/AppStyle'
import { VehicleModel } from '../../../Model/VehicleModel'
import { GiftedChat } from 'react-native-gifted-chat';
import TopBar from "../../../components/TopBar/TopBar"
import ChatInputView from './Components/ChatInputView'
const SparkyScreen = (props : ScreenProps) => {
     const carObj : VehicleModel = props.route?.params?.carObj
     const [messages, setMessages] = useState([]);
     const [text,setText] = useState("")
     const ws = new WebSocket("wss://c655dadc2911.ngrok-free.app/cable")
     // WebSocket('ws://localhost:8000/ws/chat');
  useEffect(() => {
    ws.onopen = () => {
      console.log('Connected to WebSocket');
      // ws.send(JSON.stringify("hello"));
    };
    ws.onmessage = (event) => {
      console.log("socket response ",event.data)
      // const newMessage : any = {
      //   _id: Math.random().toString(),
      //   text: event.data,
      //   createdAt: new Date(),
      //   user: { _id: 'agent', name: 'CarAgent' }
      // };
      // setMessages(previous => GiftedChat.append(previous, newMessage));
    };

    ws.onclose = () => console.log('WebSocket closed');

    ws.onerror = (err) => console.error('WebSocket error', err);

    return () => {
        if (ws){
            console.log("closing socket")
            ws.close();
        }
    }
  }, []);

const onSend = useCallback((message : string) => {
          const newMessage : any = {
        _id: Math.random().toString(),
        text: message,
        createdAt: new Date(),
        user: { _id: 'user', name: 'CarAgent' }
      };
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessage),
    )
    ws.send(JSON.stringify(message));
  }, [])


  return (
    <ImageBackground
    source={AppImages.Home.background}
    style = {{
        ...style.mainView
    }}
    >
       <TopAppSafeArea/> 
       <TopBar
       onBack={()=>{
        props.navigation.goBack()
       }}
       title='Sparky'
       />
       <View
       style = {{
        ...style.paddingView
       }}
       >
            <GiftedChat
            messagesContainerStyle = {{
                paddingBottom : 10
            }}
            text={text}
            renderSend={()=>{
                return(
                    <View
                    style = {{
                        height : 50,
                        width : 50,
                        justifyContent : "center",
                        alignItems : "center"
                    }}
                    >
                        <Image
                        style = {{
                            height : 40,
                            width : 40
                        }}
                        source={AppImages.Common.send}
                        />
                    </View>
                )
            }}
      messages={messages}
        renderInputToolbar={()=><ChatInputView
        onSend={()=>{
            setText("")
            onSend(text)
        }}
        txt={text}
        setTxt={(txt)=>setText(txt)}
        />}
      user={{ _id: 'user' }}
    />
       </View>
       <BottomAppSafeArea/>
    </ImageBackground>
  )
}
const style = StyleSheet.create({
    mainView : {
        ...AppStyle.mainView
    },
    paddingView : {
      flex :1,
    }
})

export default SparkyScreen
