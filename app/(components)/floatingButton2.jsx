import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Animated, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { router } from "expo-router";

const { height, width } = Dimensions.get("window");

// funciones auxiliares para convertir porcentaje a valor absoluto
const percentHeight = (percent) => (percent / 100) * height;
const percentWidth = (percent) => (percent / 100) * width;

const FloatingButton2 = () => {
  const [icon_1_bottom] = useState(new Animated.Value(percentHeight(-74.8)));
  const [icon_2_bottom] = useState(new Animated.Value(percentHeight(-74.8)));
  const [icon_2_right] = useState(new Animated.Value(percentWidth(7)));

  const [pop, setPop] = useState(false);

  const popIn = () => {
    setPop(true);
    Animated.timing(icon_1_bottom, {
      toValue: percentHeight(-65), // se eleva al 35% de altura
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2_bottom, {
      toValue: percentHeight(-70),
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2_right, {
      toValue: percentWidth(25), // se mueve hacia la izquierda
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1_bottom, {
      toValue: percentHeight(-74.8),
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2_bottom, {
      toValue: percentHeight(-74.8),
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2_right, {
      toValue: percentWidth(7),
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.navigate("imageDocument")}>
        <Animated.View style={[styles.circle, { bottom: icon_1_bottom }]}>
          <Icon name="upload" size={30} color="#FFFF" />
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("lobby")}>
        <Animated.View
          style={[styles.circle, { bottom: icon_2_bottom, right: icon_2_right }]}
        >
          <Icon name="copy" size={30} color="#FFFF" />
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.circleMain}
        onPress={() => {
          pop ? popOut() : popIn();
        }}
      >
        <Icon name="plus" size={30} color="#FFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingButton2;

const styles = StyleSheet.create({
  circle: {
    backgroundColor: "#000",
    width: 60,
    height: 60,
    position: "absolute",
    borderWidth: 1,
    borderColor: "gray",
    right: "8%",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999
  },
  circleMain: {
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "gray",
    width: 60,
    height: 60,
    position: "absolute",
    bottom: "5%",
    right: "8%",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 998
  },
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    zIndex: 999,
    pointerEvents: 'box-none', // <- esto es clave para que los botones no bloqueen el FlatList
  },
  
});
