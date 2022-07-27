import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Application from "expo-application";

import LikeCard from "../components/LikeCard";
import { firebase_db } from "../firebaseConfig";

export default function LikePage({ navigation }) {
  const [likeTip, setLikeTip] = useState([]);
  const [ready, setReady] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: "꿀팁 찜",
      headerStyle: {
        backgroundColor: "#fff",
        shadowColor: "#fff",
      },
      headerTintColor: "black",
    });
    getLikeTip();
  }, []);

  const getLikeTip = async () => {
    let userId;
    if (Platform.OS === "ios") {
      userId = await Application.getIosIdForVendorAsync();
    } else {
      userId = Application.androidId;
    }
    console.log("###################", userId);

    firebase_db
      .ref(`/like/${userId}`)
      .once("value")
      .then((snapshot) => {
        let tip = snapshot.val();
        if (tip && tip.length > 0) {
          setLikeTip(tip);
          setReady(false);
        }
      });
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.cardContainer}>
        {/* 하나의 카드 영역을 나타내는 View */}
        {likeTip.map((content, i) => {
          return (
            <LikeCard
              content={content}
              navigation={navigation}
              likeTip={likeTip}
              setLikeTip={setLikeTip}
              key={i}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    //앱의 배경 색
    backgroundColor: "#fff",
  },
  cardContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
});
