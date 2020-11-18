import React, { useCallback, useEffect, useRef, useState } from 'react'
import Carousel from 'react-native-snap-carousel';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider } from 'react-native-paper'
import CardService from '../components/CardService'
import { fetchPlans, deletePlan, checkout } from '../store/actions/wednessAction'
import AwesomeAlert from 'react-native-awesome-alerts';


export default function PlanScreen({ navigation }) {
  const data = useSelector(state => state.Reducer)
  const [swal, showSwal] = useState(false)
  const [message, setMessage] = useState({type:'',title:'',message:''})
  const { plans } = data
  const [dataPlan, setDataPlan] = useState([])
  const [id, setId] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("FETCHING");
      dispatch(fetchPlans())
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setDataPlan(plans)
    // console.log(plans,"<<<<<");
  }, [plans])


  const showConfirm = (type, id) => { 
    if(type==='delete'){ 
      setMessage({type:'delete',message:"Are you sure?",title:"Deleting Plan"})
    }else{
      setMessage({type:'payment',message:"Proceed to Booking?",title:"Checkout Booking"})
    }
    setId(id)
    showSwal(true)
  };

  const hideAlert = () => {
    showSwal(false)
  };

  const checkoutHandler = (type) => {
    // console.log({type})
    let tmp = dataPlan.find(data => data.isApproved === false)
    if (tmp){  
      setMessage({type:'error',message:"Try to chat with the vendor",title:"You still have unapproved service from vendor"})
      showSwal(true)
      console.log('You still have Unapproved service in your plan')
    }
    else {
      console.log('processing payment');
      dispatch(checkout())
    }
  }

  const handleDelete = () => {
    console.log("DELETING");
    dispatch(deletePlan(id))
    hideAlert();
  }

  const handleChat = (data) => {
    // console.log(data);
    console.log(data.Vendor, "<><><><><><><><><"); 
    navigation.navigate('ChatRoom', { vendorEmail:data.Vendor.User.email, name:data.Vendor.User.email })
  }
  return (
    <View style={styles.container}> 
      <AwesomeAlert
        show={swal}
        showProgress={true}
        title={message.title}
        message={message.message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={message.type ==='error'?false:true}
        showConfirmButton={true}
        cancelText="No, cancel" 
        confirmText={message.type ==='error'?"Okay": message.type==='delete'?"Yes, delete it":'Yes, proceed checkout'}
        confirmButtonColor={message.type==='delete'?"#DD6B55":'green'}
        onCancelPressed={() => {
          hideAlert();
        }}
        onConfirmPressed={() => {
          if(message.type==='delete'){
            handleDelete()
          }else if(message.type==='error'){
            hideAlert()
          }else{
            hideAlert()
            checkoutHandler()
          }
        }}
      />
      <View style={styles.vendorContainer}>
        <Text style={{ fontSize: 25, textAlign: "center", fontWeight:"bold",color:"white", paddingTop:20, paddingBottom:10,backgroundColor:"#81A68A"}}>Your Plan</Text>
        <Divider style={styles.divider} />
        {
          dataPlan.length === 0 ?
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
              <Image style={{ height: 150, width: 150 }} source={{ uri: 'https://cdn4.iconfinder.com/data/icons/user-interface-131/32/sad_store-512.png' }} />
              <Text>Book Something to see your Plan Here!</Text>
            </View>

            :
            <ScrollView style={{ flex: 1, padding: 10 }} contentContainerStyle={{}}>
              {dataPlan.map((plan, i) => (
                <View key={i}>
                  <View style={{ flex: 1, flexDirection: 'row', minHeight: 200 }}>
                    <View style={{ flex: 2 }}>
                      <Image
                        style={{ width: "100%", height: "100%", resizeMode: 'cover'  }}
                        source={{
                          uri: `${plan.Vendor?.avatar}`,
                        }}
                      />
                    </View>
                    <View style={{ flex: 4, padding: 10 }}>
                      <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 17, fontWeight: '600', textAlign: 'center', fontWeight:"bold" }}>{plan.Vendor?.service_type.toUpperCase()}</Text>
                        <Text style={{ fontSize: 14, fontWeight: '600', textAlign: 'center' }}>{plan.Vendor?.name.toUpperCase()}</Text>
                        {/* <Text style={{fontSize:15, fontWeight:'600'}}>{plan.Vendor?.avatar}</Text> */}
                      </View>

                      <Button color={plan.isApproved ? 'green' : 'red'}>{plan.isApproved ? 'Approved' : 'Waiting for approval'}</Button>
                      <Button mode="outlined" onPress={() => handleChat(plan)} style={styles.buttonChat} color="#81A68A">Chat</Button>
                      <Button mode="outlined" onPress={() => showConfirm('delete', plan.id)} style={styles.button} color="#e6a6b7">Cancel</Button>
                    </View>
                  </View>
                  <Divider style={{ marginVertical: 8 }} />
                </View>
              ))}
              <Button  style={{ width: '80%', alignSelf: 'center', marginVertical: 20 }} color="#81A68A" mode="outlined" onPress={() => showConfirm('checkout')} >Checkout</Button>
            </ScrollView>
        }
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
    marginVertical: 5
  },
  button: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#e6a6b7',
    fontSize: 42,
    width: "80%",
  },
  buttonChat: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#81A68A',
    fontSize: 42,
    width: "80%",
    marginBottom:5
  }
})