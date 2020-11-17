import React, { useCallback, useEffect, useRef, useState } from 'react'
import Carousel from 'react-native-snap-carousel';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import {Button, Divider} from 'react-native-paper'
import CardService from '../components/CardService'
import {fetchPlans, deletePlan} from '../store/actions/wednessAction'
 

export default function PlanScreen() { 
  const data = useSelector(state => state.Reducer)
  const {plans} = data
  const [dataPlan, setDataPlan] = useState([])
  const dispatch = useDispatch()
 
  useEffect(() => {
    dispatch(fetchPlans()) 
  }, [])

  useEffect(() => {  
    console.log(plans,"<<<<<");
  }, [plans])
 

  const goToDetail = (type) =>{
    console.log({type})
  }

  const handleDelete = (id) =>{
      console.log("DELETING");
      dispatch(deletePlan(id))
  }
  return (
    <View style={styles.container}>
      <View style={styles.vendorContainer}>
        <Text style={{ fontSize: 25, fontWeight: 'bold',textAlign:"center" }}>Your Plan</Text> 
        <Divider style={styles.divider}/>
        <ScrollView style={{ flex: 1, padding:10}}>
          {
            plans.length===0 ? null:
            plans.map((plan, i)=>( 
                <View key={i}>
                    <View  style={{flex:1, flexDirection:'row', minHeight:200}}> 
                        <View style={{flex:2}}>   
                            <Image
                                style={{ width: "100%", height: "100%", resizeMode: 'cover' }}
                                source={{
                                    uri: `${plan.Vendor?.avatar}`,
                                }}
                            />
                        </View>
                        <View style={{flex:4, padding:10}}> 
                            <View style={{flex:1}}>
                                <Text style={{fontSize:17, fontWeight:'600', textAlign:'center'}}>{plan.Vendor?.name}</Text>
                                {/* <Text style={{fontSize:15, fontWeight:'600'}}>{plan.Vendor?.avatar}</Text> */}
                            </View>

                            <Button color={plan.isApproved ? 'green':'red'}>{plan.isApproved? 'Approved':'Waiting for approval' }</Button>
                            <Button mode="outlined" onPress={()=>handleDelete(plan.id)} style={styles.button} color="red">Delete</Button>
                        </View>
                    </View>
                    <Divider style={{marginVertical:8}}/>
                </View>
            ))
          } 
        </ScrollView>
        {/* <Button style={{width:'80%', alignSelf:'center'}} color="blue" mode="outlined" onPress={()=>goToDetail('vendor')} >See All Venues</Button> */}
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    // alignItems: 'center',
    marginTop: '15%',
    flexDirection: "column"
  },

  vendorContainer: {
    flex: 1,  
  },
  divider: {
      marginVertical:5
  },
  button: {
      alignSelf:'center', 
      borderWidth:1,
      borderColor:'red',
      fontSize: 42, 
      width:"80%",
  }
})