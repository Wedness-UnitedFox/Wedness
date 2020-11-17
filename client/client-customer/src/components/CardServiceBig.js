import React, { useCallback, useEffect, YellowBox, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, Animated, ImageBackground } from 'react-native'
import { Button } from 'react-native-paper'

export default function CardService(props) {
    const { vendor } = props
    return (
        <View style={styles.cardContainer}>
            <View style={{ width: '100%', height: '100%', backgroundColor: 'white', flexDirection: 'column' }}>
                <ImageBackground source={{ uri: vendor.avatar }} style={styles.card}>
                    <View style={{
                        flex: 1,
                        padding: 10,
                        justifyContent: 'space-between',
                    }}>
                        <View style={{ flexDirection: "row", alignSelf: 'center' }}>
                            <Text style={{ fontSize: 20, textAlign: "center", color: 'white', backgroundColor: 'rgba(52, 52, 52, 0.6)', padding: 5 }}>Balai Makarti Muktitama</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 15, textAlign: "center", color: 'white', backgroundColor: 'rgba(52, 52, 52, 0.6)', padding: 5 }}>Outdoor</Text>
                            <Text style={{ fontSize: 15, textAlign: "center", color: 'white', backgroundColor: 'rgba(52, 52, 52, 0.6)', padding: 5 }}>Rp. 10.000.000</Text>
                        </View>
                    </View>
                </ImageBackground>
                <View style={{ flexDirection: "row", padding: 5, justifyContent:'space-between' }}>
                    <View style={{ flexDirection: "row", }}>
                        <Image
                            style={{ width: 50, height: 50, borderRadius: 50 }}
                            source={{
                                uri: `${vendor.avatar}`,
                            }}
                        />
                        <View> 
                            <Text style={{ marginLeft: 10, fontSize: 15, color: 'black', textAlignVertical: "center" }}>{vendor.name}</Text>
                            <Text style={{ marginLeft: 10, fontSize: 12, color: 'black', textAlignVertical: "center" }}>{vendor.phone_number} </Text>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'center', marginHorizontal: 10, }}>
                        <Button mode='contained'>
                            Chat Now
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