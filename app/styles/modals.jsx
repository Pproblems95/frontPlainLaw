import { StyleSheet } from "react-native";
const modal = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center'
      },
      modalContent: {
        backgroundColor: '#fff',
        padding: 25,
        borderRadius: 20,
        width: '80%',
        alignItems: 'center'
      },
      modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
      },
      modalMessage: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20
      },
      modalButton: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 15
      },
      modalButtonText: {
        color: 'white',
        fontSize: 18
      }
})

export default modal