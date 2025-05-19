import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Modal, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { router } from "expo-router";

const FloatingButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleNavigate = (route) => {
    setModalVisible(false);
    router.push(route);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.circleMain}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="plus" size={30} color="#FFFF" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.text}>Elige una opción</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleNavigate("pictureMenu")}
              >
                <Icon name="camera" size={25} />
                <Text style={styles.optionText}>Cámara</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleNavigate("imageDocument")}
              >
                <Icon name="upload" size={25} />
                <Text style={styles.optionText}>Subir</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleNavigate("lobby")}
              >
                <Icon name="copy" size={25} />
                <Text style={styles.optionText}>Texto</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: '5%',
    right: '8%',
    zIndex: 999,
  },
  circleMain: {
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "gray",
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '90%',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  optionButton: {
    width: 80,
    height: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 8,
    elevation: 4,
  },
  optionText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
});
