import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

const myDocs = () => {
    const data = [
        { "id": 1, "nombre": "Red Social 1", "fecha": "2024-10-01" },
        { "id": 2, "nombre": "Red Social 2", "fecha": "2024-10-02" },
        { "id": 3, "nombre": "Red Social 3", "fecha": "2024-10-03" },
        { "id": 4, "nombre": "Red Social 4", "fecha": "2024-10-04" },
        { "id": 5, "nombre": "Red Social 5", "fecha": "2024-10-05" },
        { "id": 6, "nombre": "Red Social 6", "fecha": "2024-10-06" },
        { "id": 7, "nombre": "Red Social 7", "fecha": "2024-10-07" },
        { "id": 8, "nombre": "Red Social 8", "fecha": "2024-10-08" },
        { "id": 9, "nombre": "Red Social 9", "fecha": "2024-10-09" },
        { "id": 10, "nombre": "Red Social 10", "fecha": "2024-10-10" }
    ];
    
  return (
    <ScrollView>
        {data.map((item) => (
    <Pressable 
        key={item.id} 
        onPress={() => {console.log("Presionaste el elemento "+ item.id)}}
        style={{}}
    >
        <View style={{backgroundColor:'black', margin:10, borderRadius:10}}>
            <Text style={{fontSize:30, textAlign:'center', color:'white'}}>{item.nombre}</Text>
            <Text style={{fontSize:20, textAlign:'center', color:'white'}} >Firmado el </Text>
            <Text style={{fontSize:20, textAlign:'center', color:'white'}} >{item.fecha}</Text>
        </View>
    </Pressable>
))}
    </ScrollView>
  )
}

export default myDocs

const styles = StyleSheet.create({})