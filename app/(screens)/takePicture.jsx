import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image, Pressable } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import * as FileSystem from 'expo-file-system';


const takePicture = () => {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const [photo, setPhoto] = useState(null);
    const [usePhotoTaken, SetUsePhotoTaken] = useState(false)

    useEffect(() => {
        console.log('ejecutando use photo taken')
        if (photo === null){
            return
        }
        if (!usePhotoTaken){
            return
        }
        
        router.replace({pathname:'pictureMenu', params:{
            photoUri: photo
        }})

    }, [usePhotoTaken])

    

    //fetch por probar
    // const sendPictures = async () => {
    //     try{
    //         const response = await fetch('https://equihua.org/api/ocr/recognize_imgs', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Accept: 'application/json',
    //               },
    //             body: 
    //             JSON.stringify(photo)

    //         })
    //         const data = await response.json()
    //         console.log(data)
    //     } catch(error){
    //         console.error(error)
    //     }
    // }

    const useThisPicture = () =>{
        console.log(photo)
        if(!photo){
            alert("No hay una foto válida para usar")
            return
        }
        
        // const newPhoto = {
        //     id:`img_id_${sendingPhotos.length}`,
        //     data: photo.base64
        // }
        console.log(photo)
        SetUsePhotoTaken(true)
    }


    useEffect(() => {
        SetUsePhotoTaken(false)
    }, [])

    if(!permission){
        return(
            <View>
                <Text>Permisos cargando..</Text>
            </View>
        )
    }

    if(!permission.granted){
        return(
            <View style={styles.container}>
                <Text>Necesitamos permiso para usar la cámara</Text>
                <Pressable onPress={requestPermission}>
                    <View>
                        <Text style={styles.text} >Otorgar permiso</Text>
                    </View>
                </Pressable>
            </View>
        )
    }

    const takePictureFunction = async () => {
    if (cameraRef.current) {
        try {
            const photo = await cameraRef.current.takePictureAsync();
            console.log('Foto tomada: ' + photo.uri);

            const fileName = photo.uri.split('/').pop();
            const newUri = FileSystem.documentDirectory + fileName;

            await FileSystem.moveAsync({
                from: photo.uri,
                to: newUri,
            });

            setPhoto( newUri )
        } catch (error) {
            console.log("Error al tomar o mover la foto");
            alert(error);
            }
        }
    }

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'))
    }

    return (
    <View style={styles.container} >
        {photo ? (
            <View style={styles.previewContainer}>
                <Image source={{uri: photo}}  style={styles.previewImage}/>
                <View style={{flexDirection:'row'}}>
                <Pressable  style={({ pressed }) => [
                    styles.button,
                    pressed && styles.buttonActive, {marginHorizontal:10}]} 
                    onPress={() => {setPhoto(null) 
                    SetUsePhotoTaken(false)}}>
                        <View style={[styles.captureButton, {backgroundColor:'black'}]}>
                            <Text style={{fontWeight:'500', textAlign:'center', color:'white'}} >Volver a la cámara</Text>
                        </View>
                </Pressable>

                {!usePhotoTaken && (
                    <Pressable style={({ pressed }) => [
                    styles.button, {backgroundColor: '#ADD8E6'},
                    pressed && styles.buttonActive,{marginHorizontal:'10'}]} 
                    onPress={() => {useThisPicture()}}>
                        <View style={styles.captureButton}>
                            <Text style={{fontWeight:'500', textAlign:'center', color:'white'}} >Usar esta foto</Text>
                        </View>
                    </Pressable>
                )}
                </View>
            </View>
        ): (<View style={styles.container}>
            <CameraView 
                style={StyleSheet.absoluteFillObject} 
                facing={facing} 
                ref={cameraRef} 
            />
        
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.captureButton, { backgroundColor: 'black' }]} 
                    onPress={toggleCameraFacing}
                >
                    <Text style={[styles.text, { color: 'white' }]}>Cambiar cámara</Text>
                </TouchableOpacity>
        
                <TouchableOpacity 
                    style={[styles.captureButton]} 
                    onPress={takePictureFunction}
                >
                    <Text style={styles.text}>Tomar foto</Text>
                </TouchableOpacity>
            </View>
        </View>)}
    </View>
  )
}

export default takePicture

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center'
    },
    text:{
        fontSize:16,
        color:'black',
        textAlign:'center'
    },
    previewContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    previewImage:{
        width: '90%',
        height: '70%',
        resizeMode: 'contain',
        marginBottom: 20,
    },
    buttonTranslated:{
        backgroundColor: '#000', 
        paddingHorizontal: 20,       
        paddingVertical: 8,         
        borderRadius: 8,            
        marginHorizontal: 8
    },
    buttonActive:{
        opacity:0.7
    },
    camera:{
        flex:1,
        width:'100%'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        marginBottom: 20,
      },
      captureButton: {
        padding: 15,
        backgroundColor: '#0597F2',
        borderRadius: 10,
      },
})