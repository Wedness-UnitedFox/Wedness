import React, { useEffect, useRef, useState } from 'react'
import * as Permissions from 'expo-permissions';
// import CameraRoll from "@react-native-community/cameraroll";
import * as MediaLibrary from 'expo-media-library';
import { Button, Text } from 'react-native-paper';
import AwesomeAlert from 'react-native-awesome-alerts';
// import { cam } from 'react-native';
import ViewShot, { captureRef } from 'react-native-view-shot';
import { View, PermissionsAndroid, Platform, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native';
import moment from 'moment'
import TEMPLATE from '../../assets/template_1.jpg'
import { ScrollView } from 'react-native-gesture-handler';
import * as Sharing from 'expo-sharing'

const template = Image.resolveAssetSource(TEMPLATE).uri


export default function App({ route, navigation }) {
    const { data } = route.params;
    // console.log({ data });
    const { brideName, groomName, date, location } = data
    const [permission, askForPermission] = Permissions.usePermissions(Permissions.CAMERA_ROLL, { ask: true });
    const viewShotRef = useRef(null)
    const [formattedDate, setFormattedDate] = useState('')
    const [invitation, setInvitation] = useState(null)
    const [swal, showSwal] = useState(false)
    const [message, setMessage] = useState({ title: '', message: '' })

    const capture = () => {
        captureRef(viewShotRef, {
            format: "jpg",
            quality: 1
        })
            .then(uri => {
                setInvitation(uri)
                return MediaLibrary.saveToLibraryAsync(uri)
            })
            .then(() => {
                setMessage({ title: 'Success', message: 'The invitation card has been saved on your gallery' })
                showSwal(true)
            }).catch(err => {
                console.log(err);
            })
            .catch(error => console.error("Oops, snapshot failed", error))
    }

    const hideAlert = () => {
        showSwal(false)
    };

    const trigger = () => {
        captureRef(viewShotRef, {
            format: "jpg",
            quality: 1
        })
            .then(uri => {
                setInvitation(uri)
                console.log(uri, "<-- SAVED");
            })
    }

    useEffect(() => {
        let newDate = new Date(date)
        newDate = moment(newDate).format('dddd, Do of MMMM YYYY ')
        console.log(newDate);
        setFormattedDate(newDate)
        // trigger()
    }, [])

    const needSave = () =>{ 
        setMessage({ title: 'Failed', message: 'You need to save your invitation first!' })
        showSwal(true)
    }

    const openShareDialogAsync = async () => {
        console.log({ invitation });
        try {
            if (!invitation) {
                return needSave()
            }
            if (!(await Sharing.isAvailableAsync())) {
                alert(`Sharing is not available`);
                return;
            }
            await Sharing.shareAsync(invitation)
        } catch (error) {
            console.log({ error });
        }
    };


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
            <ScrollView>
                <AwesomeAlert
                    show={swal}
                    showProgress={true}
                    title={message.title}
                    message={message.message}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    // showCancelButton={message.title === "Failed" && false}
                    showConfirmButton={true}
                    cancelText="No"
                    confirmText="Ok"
                    confirmButtonColor={message.title==='Failed'?'red':'green'}
                    onCancelPressed={() => {
                        hideAlert();
                    }}
                    onConfirmPressed={() => {
                        hideAlert();
                    }}
                />
                <ViewShot ref={viewShotRef} style={{ width: '100%', height: 600, borderWidth: 1 }} options={{ format: "jpg", quality: 1 }}>
                    <ImageBackground source={{ uri: template }} imageStyle={{ resizeMode: 'contain' }} style={styles.card}>
                        <View style={{ flex: 1 }}>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={{ fontSize: 35, color: '#b39491' }}>{groomName}  &  {brideName}</Text>
                            </View>
                            <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Text style={{ fontSize: 15, }}>{formattedDate}</Text>
                                <Text style={{ fontSize: 15 }}>at</Text>
                                <Text style={{ fontSize: 15 }}>{location}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </ViewShot>
                <View style={{ flexDirection: "row", marginTop: 10, paddingHorizontal: 10 }}>
                    <Button color="#81A68A" onPress={capture} style={{ width: "50%", borderWidth: 1, borderColor: 'white', marginRight: 4 }}>Save Image</Button>
                    <Button color="#81A68A" onPress={openShareDialogAsync} style={[{ width: "50%", }, styles.button]}>Share Image</Button>
                </View>
            </ScrollView>
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
        // backgroundColor: 'grey'
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 5,
    },
}) 