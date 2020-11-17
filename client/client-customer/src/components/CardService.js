import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function CardService(props) {
    const { vendor, type } = props
    const navigation = useNavigation()
    const goToDetail = () => {
        navigation.navigate('Detail', { id: vendor.id, data: vendor })
    }

    return (
        <TouchableOpacity onPress={() => goToDetail()} style={{ justifyContent: 'center', alignContent: 'center' }}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: "floralwhite",
                    width: 200,
                    marginLeft: 15,
                    marginRight: 15,
                }}
            >
                <Image
                    style={{ width: "100%", height: "100%", resizeMode: 'cover' }}
                    source={{
                        uri: `${vendor.avatar}`,
                    }}
                />
            </View>
            <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>{vendor.name}</Text>
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                Rp.{vendor.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                { 
                vendor.service_type === "venue" ? ` | Capacity: ${vendor.capacity}`
                : null
                }
            </Text>

        </TouchableOpacity>
    )
}