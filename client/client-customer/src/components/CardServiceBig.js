import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, YellowBox, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';import { Entypo } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, Animated, ImageBackground } from 'react-native'
import { Button } from 'react-native-paper'

export default function CardService(props) {
    const { vendor } = props

    const navigation = useNavigation()
    const goToDetail = () => {
        navigation.navigate('Detail', { id: vendor.id, data: vendor })
    }
    const handleChat = () => { 
    navigation.navigate('ChatRoom', { vendorEmail:vendor.User.email, name:vendor.User.email })
    }

    return (
        <View style={styles.cardContainer}>
            <View style={{ width: '100%', height: '100%', backgroundColor: 'white', flexDirection: 'column' }}>
                <TouchableOpacity style={{ flex: 1, width: "100%", }} onPress={goToDetail}>
                    <ImageBackground source={{ uri: vendor.avatar }} style={styles.card}>
                        <View style={{
                            flex: 1,
                            padding: 10,
                            justifyContent: 'space-between',
                        }}>
                            <View style={{ flexDirection: "row", alignSelf: 'center' }}>
                                <Text style={{ fontSize: 20, textAlign: "center", color: 'white', backgroundColor: 'rgba(52, 52, 52, 0.6)', padding: 5 }}>{vendor?.name}</Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                {vendor.service_type !== 'venue' ? null:

                                <Text style={{ fontSize: 15, textAlign: "center", color: 'white', backgroundColor: 'rgba(52, 52, 52, 0.6)', padding: 5 }}>{vendor?.type}</Text>
                                }
                                <Text style={{alignSelf:'flex-end', fontSize: 15, textAlign: "center", color: 'white', backgroundColor: 'rgba(52, 52, 52, 0.6)', padding: 5 }}>Rp. {vendor?.price.toLocaleString("id")}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", padding: 5, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: "row", }}>
                        <Image
                            style={{ width: 50, height: 50, borderRadius: 50 }}
                            source={{
                                uri: `${vendor.avatar}`,
                            }}
                        />
                        <View style={{ flexWrap:'wrap', maxWidth:215}}>
                            <Text style={{flex:1, marginLeft: 10, fontSize: 15, color: 'black', textAlignVertical: "center" }}>{vendor.name}</Text>
                            <Text style={{flex:1, marginLeft: 10, fontSize: 12, color: 'black', textAlignVertical: "center" }}>{vendor.phone_number} </Text>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'center', marginHorizontal: 10, }}>
                        <Button mode='outline' color="#81A68A" onPress={()=>handleChat()} >
                            <Ionicons name="md-chatboxes" size={30} color="#81A68A" />
                            {/* <Entypo name="chat" size={24} color="black" /> */}
                        </Button>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        flexDirection: "column"
    },
    cardContainer: {
        flex: 1,
        padding: 10,
        paddingHorizontal: 15,
        minHeight: 280,
        // backgroundColor: 'grey'
    },
    card: {
        flex: 1,
        width: "100%",
        resizeMode: "cover",
        justifyContent: "center",
        alignSelf: "center",
    },

})