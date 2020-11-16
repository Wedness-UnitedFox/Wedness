import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function CardService(props) {
    const { venue } = props   
    const navigation = useNavigation()
    const goToDetail = ()=>{
        navigation.navigate('Detail', {name:venue.name, id:venue.id, type:'venue', data:venue})
    }
    return (
        <TouchableOpacity onPress={()=>goToDetail()} style={{ justifyContent: 'center', alignContent: 'center' }}>
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
                        uri: `${venue.avatar}`,
                    }}
                />
            </View>
            <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>{venue.name}</Text>
            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Type: {venue.type} | Capacity: {venue.capacity}</Text>
        </TouchableOpacity>
    )
}