import React, { useEffect, useRef, useState } from 'react'
import * as Permissions from 'expo-permissions';
import CameraRoll from "@react-native-community/cameraroll";
import * as MediaLibrary from 'expo-media-library';
import { Button, Text } from 'react-native-paper';
// import { cam } from 'react-native';
import ViewShot, { captureRef } from 'react-native-view-shot';
import { View, PermissionsAndroid, Platform, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native';
import moment from 'moment'
import TEMPLATE from '../../assets/template_1.jpg'

const template = Image.resolveAssetSource(TEMPLATE).uri


export default function App({ route, navigation }) {
    const { data } = route.params;
    // console.log({ data });
    const {brideName, groomName, date, location} = data
    const [permission, askForPermission] = Permissions.usePermissions(Permissions.CAMERA_ROLL, { ask: true });
    const viewShotRef = useRef(null)
    const [formattedDate, setFormattedDate] = useState('')

    const capture = () => {
        captureRef(viewShotRef, {
            format: "jpg",
            quality: 1
        }).then(
            uri => {
                console.log("Image saved to", uri)
                MediaLibrary.saveToLibraryAsync(uri)
                    .then(() => {
                        alert('sukses')
                    }).catch(err => {
                        console.log(err);
                    })

            },
            error => console.error("Oops, snapshot failed", error)
        );
    }
    useState(()=>{ 
        let newDate = new Date(date) 
        newDate =   moment(newDate).format('dddd, Do of MMMM YYYY ')
        console.log(newDate);
        setFormattedDate(newDate)
    },[])
    if (!permission || permission.status !== 'granted') {
        return (
            <View>
                <Text>Permission is not granted</Text>
                <Button title="Grant permission" onPress={askForPermission}>Permission </Button>
            </View>
        );
    } else {
        console.log("Granted");
        return (
            <>
                <ViewShot ref={viewShotRef} style={{ width: '100%', height: 600, borderWidth: 1 }} options={{ format: "jpg", quality: 1 }}>
                    <ImageBackground source={{ uri: template }} imageStyle={{ resizeMode: 'contain' }} style={styles.card}>
                        <View style={{ flex: 1 }}>
                        </View>
                        <View style={{ flex: 1,alignItems:'center'}}>
                            <View style={{flex:1,flexDirection:'row'}}>
                                <Text style={{fontSize:35, color:'#b39491'}}>{groomName}  &  {brideName}</Text>  
                            </View> 
                            <View style={{flex:2,flexDirection:'column',justifyContent:'flex-start', alignItems:'center' }}>
                                <Text style={{fontSize:15,}}>{formattedDate}</Text>  
                                <Text style={{fontSize:15}}>at</Text>  
                                <Text style={{fontSize:15}}>{location}</Text>   
                            </View>
                        </View>
                    </ImageBackground>
                </ViewShot>

                <Button onPress={capture}>Save Image</Button>
            </>
        );
    }

}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        width: "100%",
        resizeMode: "contain",
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: 'grey'
    },

}) 