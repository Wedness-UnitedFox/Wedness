import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-paper';

export default function CardService(props) {
    const { vendor, type } = props
    const navigation = useNavigation()
    const goToDetail = () => {
        navigation.navigate('Detail', { id: vendor.id, data: vendor })
    }

    return (
        <>
        <TouchableOpacity onPress={() => goToDetail()} style={{ justifyContent: 'center', alignContent: 'center' , paddingHorizontal:5}}>
            <View
                style={{
                    flex: 1, 
                    width: 200,
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
                <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>{vendor.name}</Text>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    Rp.{vendor.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    { 
                    vendor.service_type === "venue" ? ` | Capacity: ${vendor.capacity}`
                    : null
                    }
                </Text>
            </View> 
        </TouchableOpacity>

        <Divider style={{ width: 1, height: '100%', marginHorizontal:5 }} />
        </>
    )
}