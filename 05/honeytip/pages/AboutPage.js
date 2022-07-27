import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function AboutPage({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      title: "소개 페이지",
      headerStyle: {
        backgroundColor: "#1F266A",
        shadowColor: "#1F266A",
      },
      headerTintColor: "#fff",
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          HI! 스파르타코딩 앱개발 반에 오신것을 환영합니다
        </Text>

        <View style={styles.centerContainer}>
          <Image
            style={styles.centerImage}
            source={{
              uri: "https://storage.googleapis.com/sparta-image.appspot.com/lecture/about.png",
            }}
            resizeMode={"cover"}
          />
          <Text style={styles.description01}>
            많은 내용을 간결하게 담아내려 노력했습니다!
          </Text>
          <Text style={styles.description02}>
            꼭 완주 하셔서 꼭 여러분것으로 만들어가시길 바랍니다
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>여러분의 인스타계정</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1F266A",
  },
  textContainer: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#fff",
  },
  centerContainer: {
    width: 300,
    height: 500,
    backgroundColor: "#fff",
    marginTop: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  centerImage: {
    width: 150,
    height: 150,
    borderRadius: 30,
  },
  description01: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    padding: 20,
  },
  description02: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "500",
    padding: 20,
  },
  button: {
    backgroundColor: "#fdb803",
    padding: 20,
    borderRadius: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
});
