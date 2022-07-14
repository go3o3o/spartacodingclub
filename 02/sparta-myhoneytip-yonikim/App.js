import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import data from "./data.json";

export default function App() {
  let tip = data.tip;
  let todayWeather = 10 + 17;
  let todayCondition = "흐림";
  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.titleStyle}>나만의 꿀팁</Text>
        <Text style={styles.weatherStyle}>
          오늘의 날씨: {todayWeather + "°C " + todayCondition}{" "}
        </Text>
        <Image
          source={{
            uri: "https://storage.googleapis.com/sparta-image.appspot.com/lecture/main.png",
          }}
          resizeMode={"cover"}
          style={styles.mainImageStyle}
        />
      </View>

      <ScrollView
        style={styles.buttonContainer}
        horizontal
        indicatorStyle="white"
      >
        <TouchableOpacity style={styles.button01Style}>
          <Text style={styles.buttonTextStyle}>미용</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button02Style}>
          <Text style={styles.buttonTextStyle}>재테크</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button03Style}>
          <Text style={styles.buttonTextStyle}>할인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button04Style}>
          <Text style={styles.buttonTextStyle}>꿀팁 찜</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.cardContainer}>
        {tip.map((content, i) => {
          return (
            <View style={styles.cardStyle} key={i}>
              <Image
                style={styles.cardImageStyle}
                source={{ uri: content.image }}
              />
              <View style={styles.cardTextStyle}>
                <Text style={styles.cardTitleStyle} numberOfLines={1}>
                  {content.title}
                </Text>
                <Text style={styles.cardDescStyle} numberOfLines={3}>
                  {content.desc}
                </Text>
                <Text style={styles.cardDateStyle}>{content.date}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  mainContainer: {
    flex: 2,
  },
  titleStyle: {
    fontSize: 20,
    marginTop: 50,
    marginLeft: 20,
  },
  mainImageStyle: {
    width: "90%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: "center",
  },
  weatherStyle: {
    alignSelf: "flex-end",
    paddingRight: 20,
  },
  buttonContainer: {
    flex: 2,
    marginTop: 20,
    marginLeft: 10,
  },
  buttonTextStyle: {
    color: "#fff",
    textAlign: "center",
  },
  button01Style: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#fdc453",
    borderColor: "deeppink",
    borderRadius: 15,
    margin: 7,
  },
  button02Style: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#fe8d6f",
    borderColor: "deeppink",
    borderRadius: 15,
    margin: 7,
  },
  button03Style: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#9adbc5",
    borderColor: "deeppink",
    borderRadius: 15,
    margin: 7,
  },
  button04Style: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#f886a8",
    borderColor: "deeppink",
    borderRadius: 15,
    margin: 7,
  },
  cardContainer: {
    flex: 2,
    marginTop: 10,
    marginLeft: 10,
  },
  cardStyle: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  cardImageStyle: {
    flex: 1,
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  cardTextStyle: {
    flex: 2,
    flexDirection: "column",
    marginLeft: 10,
  },
  cardTitleStyle: {
    fontSize: 20,
    fontWeight: "700",
  },
  cardDescStyle: {
    fontSize: 15,
  },
  cardDateStyle: {
    fontSize: 10,
    color: "#A6A6A6",
  },
});
