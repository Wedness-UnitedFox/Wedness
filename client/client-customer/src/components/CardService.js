import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Card, Divider } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

export default function CardService(props) {
    const { vendor, type } = props
    const navigation = useNavigation()
    const goToDetail = () => {
        navigation.navigate('Detail', { id: vendor.id, data: vendor })
    }

    return (
        <>
        {/* <TouchableOpacity > */}
            <Card onPress={() => goToDetail()} style={{ justifyContent: 'center', alignContent: 'center' , padding:10, marginHorizontal:1, shadowColor:'gray'}}>
                <View
                    style={{
                        flex: 1, 
                        width: '100%',
                        minWidth: 220,
                        alignSelf:'center'
                    }}
                >
                    <Image
                        style={{ width: "100%", height: "100%", resizeMode: 'cover' }}
                        source={{
                            uri: `${vendor.avatar}`,
                        }}
                    />
                </View>
                <View style={{flexWrap:'wrap', alignSelf:'center'}}> 
                    <Text style={{ fontSize: 15, textAlign: 'center', color:"#81A68A", fontWeight: "bold"}}>{vendor.name}</Text>
                    <Text style={{ fontSize: 13, textAlign: 'center' }}>
                        Rp.{vendor.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        { 
                        vendor.service_type === "venue" ? <> | <AntDesign name="team" size={12} color="black"/> {vendor.capacity}</>
                        : null
                        }
                    </Text>
                </View> 
            </Card>
        {/* </TouchableOpacity>  */}
        {/* <Divider style={{ width: 1, height: '100%', marginHorizontal:10 }} /> */}
        </>
    )
}