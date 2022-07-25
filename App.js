import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,
  TextInput,
  ScrollView,
  Alert
} from 'react-native';
import { theme } from './color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fontisto } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 

// firebase import...
// import {initializeApp} from "firebase/app";
// import {getFireStore} from "firebase/firestore";
const STORAGE_KEY="@toDos";


export default function App() {
  const [working, setWorking] = useState(true);
  const [complete, setComplete]= useState(false);
  const [text, setText] =useState("");
  const [toDos, setToDos] = useState({});
  const travel = () =>{setWorking(false)};
  const work = () =>{setWorking(true)};

  // firebase...
  // const app = initializeApp(firebaseConfig);
  // const db = getFireStore(app);
  const onChangeText = (payload)=>{setText(payload);}
  
  // recode last clicked title...
  // const saveTitle = async(Save)=>{
  //   await AsyncStorage.setItem("@working",JSON.stringify(Save))
  // }
  const loadTitle = async()=>{
    try{
      const w = await AsyncStorage.getItem("@working");
    setWorking(JSON.parse(w));
    }catch(error){

    }
  }
  const MyTabs = ()=>{
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    )
  }
  const Tab = createBottomTabNavigator();
  
  const SettingsScreen=()=>{
    return (
      <View style={{flex:1, justifyContent: "center", alignItems:"center"}}>
        <Text>Settings!</Text>
      </View>
    )
  }
  const HomeScreen =()=>{
    
    return (
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <Text>Settings!</Text>
      </View>
    )
  }
  const saveToDos = async(toSave)=>{
    
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
    
    
  }
 
  const loadToDos = async()=>{
    try{
    
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    setToDos(JSON.parse(s));
    
    
    }catch(e){

    }
  }
  
  useEffect(()=>{
    loadToDos();
    loadTitle();
  },[]);
  const addTodo = async() =>{
    if(text===""){
      returnp
    }
    const newToDos = {...toDos, 
      [Date.now()]: {text, working},
    }
    
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
    
  }
  const addComplete=()=>{
    
    const adad={complete:true, [Date.now()]:{text, working}}
    setComplete(adad);
    saveToDos(adad);
    console.log(adad);
    
  }
  const deleteToDo = async(key)=>{
    Alert.alert("Delete To Do?", "Are you sure?", [
      {text:"Cancle"},
      {text:"I'm Sure", style: "destructive",
      onPress: ()=>{
        const newToDos = {...toDos}
    delete newToDos[key]
    setToDos(newToDos);
    saveToDos(newToDos);
      }},
    ]);
    return;
    
  }
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{...styles.btnText, color: working ? "white" : theme.grey}}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{...styles.btnText, color: !working ? "white" : theme.grey} }>Travel</Text>
        </TouchableOpacity>
        
      </View>
      
      <View>
        
      <TextInput
      onSubmitEditing={addTodo}  
      style={styles.input} 
      value={text}
      placeholder={working ? "Add a To do" : "where want to go?"}
      onChangeText={onChangeText}
      returnKeyType="done"
      />
      <ScrollView>
        {Object.keys(toDos).map((key) => (
          toDos[key].working === working ? (
        <View style={styles.toDo} key={key}>
          
          
          {toDos[key].complete===complete ? <Text style={styles.toDoText}>{toDos[key].text}</Text> :
          <Text style={styles.toDoText}>{toDos[key].text}</Text>}
          <TouchableOpacity style={{flexDirection:"row"}} onPress={()=> deleteToDo(key)}>
          <Fontisto name="trash" size={18} color={theme.grey} />
          </TouchableOpacity>
        
        </View>
          ) : null
        ))}
        
      </ScrollView>
      
      </View>
      <View style={styles.footVar}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
      </View>
    </View>
    
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal:20,
  },
  header:{
    justifyContent:"space-between",
    flexDirection:"row",
    marginTop:100,
  },
  
  btnText:{
    
    fontWeight:"600",
    fontSize:38
  },
  input:{
    backgroundColor:"white",
    borderRadius:30,
    paddingVertical:15,
    paddingHorizontal:20,
    marginTop:20,
    fontSize:20,
    marginBottom:10,
  },
  toDo:{
    backgroundColor: theme.toDoBg,
    marginBottom:10,
    paddingVertical:20,
    paddingHorizontal:20,
    borderRadius:15,
    flexDirection:"row",
    alignItems:'center',
    justifyContent:"space-between",
  },
  toDoText:{
    color:"white",
    fontSize:16,
    fontWeight:"500",
  },
  complete:{
    color:"red",
    
  },
  textline:{
    textDecorationLine:'line-through',
    color:"grey",
  },
  footVar:{
    position:"absolute",
    left:0,
    right:0,
    bottom:0,
  }
});
