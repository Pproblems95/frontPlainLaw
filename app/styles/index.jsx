import { StyleSheet, Dimensions } from "react-native";
const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height
const styles = StyleSheet.create({
    logo : {
        marginTop: 30,
        height: 200,
        width: 300
    },
    input: {
        height: 40,
        alignSelf: "center",
        width: "70%",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal:screenWidth*0.10,
        marginBottom: 10,
      },
    button:{
        backgroundColor: "#000",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 15,
        width: "80%",
        alignSelf: "center",
        alignItems: "center",
        marginBottom: 10

    },
    homeText: {
        marginLeft: "10%", 
        marginRight: "10%",
        marginBottom: "10%",
        fontWeight:'bold', 
        fontSize:24,
        alignSelf: "center"
    },
    container: {
        position: 'relative',
        marginVertical: 10,
        marginHorizontal: screenWidth * 0.15,
    },
    ButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
})

export default styles;