# [스파르타코딩클럽] 앱개발 종합반 - 3주차

## **[수업 목표]**

1. 앱 개발을 위한 필수 리액트 기초 공부
2. 앱 다운 앱을 위한 기능 적용
3. 앱 상의 페이지 구성

---

<br />

### **1. 리액트**

- 컴포넌트(Component): 정해진 엘리먼트들(요소)을 사용하여 만든 화면의 일부분
  - `Component` 는 App.js 의 App 함수처럼 코드 전체를 감싸고 있는 함수를 뜻하기도 합니다.
  - 버튼 하나가 컴포넌트가 될 수 있고, 버튼을 모아둔 영역이 컴포넌트가 될 수 있습니다.
- 상태(State): 컴포넌트에서 데이터를 유지하고 관리하기 위한 유일한 방법 === 사용할 데이터
  - 컴포넌트마다 데이터를 보유하고 관리할 수 있습니다. 리액트에서는 이를 `상태(State)` 라고 부릅니다.
  - `State` 는 리액트 라이브러리에서 제공해주는 `useState` 로 생성하고 `setState` 함수로 정/변경 할 수 있습니다.
- 속성(Props): 상위 컴포넌트에서 하위 컴포넌트로 데이터를 전달하는 방식
  - 컴포넌트에 데이터를 전달 하는 것인데, 그 전달 모습은 key, value 의 형태입니다.
  - `<Text>` 태그에는 말줄임표 효과를 주는 `numberOfLines` 란 속성이 있습니다.
  - `<Image>` 태그에는 이미지가 영역을 차지하는 방식을 나타내는 `resizeMode` 란 속성이 있습니다.
- useEffect: 화면에 컴포넌트가 그려지면 처음 실행해야 하는 함수들을 모아두는 곳
  ```jsx
  useEffect(() => {
    // 이 안에서 화면이 그려진다음 실행시키고 싶은 함수를 작성하면 가장 먼저 실행이 됩니다.
  }, []);
  ```
- 로딩화면 구현하기

  - Loading.js

    ```jsx
    import React from "react";
    import { View, Text, StyleSheet } from "react-native";

    export default function Loading() {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>준비중입니다...</Text>
        </View>
      );
    }

    const styles = StyleSheet.create({
      container: {
        //앱의 배경 색
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fdc453",
      },
      title: {
        fontSize: 20,
        fontWeight: "700",
      },
    });
    ```

  - MainPage.js

    ```jsx
    import React, { useState, useEffect } from "react";
    import {
      StyleSheet,
      Text,
      View,
      Image,
      TouchableOpacity,
      ScrollView,
    } from "react-native";

    const main =
      "https://storage.googleapis.com/sparta-image.appspot.com/lecture/main.png";
    import data from "../data.json";
    import Card from "../components/Card";
    import Loading from "../components/Loading";
    export default function MainPage() {
      //useState 사용법
      //[state,setState] 에서 state는 이 컴포넌트에서 관리될 상태 데이터를 담고 있는 변수
      //setState는 state를 변경시킬때 사용해야하는 함수

      //모두 다 useState가 선물해줌
      //useState()안에 전달되는 값은 state 초기값
      const [state, setState] = useState([]);

      //하단의 return 문이 실행되어 화면이 그려진다음 실행되는 useEffect 함수
      //내부에서 data.json으로 부터 가져온 데이터를 state 상태에 담고 있음
      const [ready, setReady] = useState(true);

      useEffect(() => {
        //뒤의 1000 숫자는 1초를 뜻함
        //1초 뒤에 실행되는 코드들이 담겨 있는 함수
        setTimeout(() => {
          setState(data);
          setReady(false);
        }, 1000);
      }, []);

      //data.json 데이터는 state에 담기므로 상태에서 꺼내옴
      let tip = state.tip;
      let todayWeather = 10 + 17;
      let todayCondition = "흐림";
      //return 구문 밖에서는 슬래시 두개 방식으로 주석
      return ready ? (
        <Loading />
      ) : (
        /*
        return 구문 안에서는 {슬래시 + * 방식으로 주석
        */
        <ScrollView style={styles.container}>
          <Text style={styles.title}>나만의 꿀팁</Text>
          <Text style={styles.weather}>
            오늘의 날씨: {todayWeather + "°C " + todayCondition}{" "}
          </Text>
          <Image style={styles.mainImage} source={{ uri: main }} />
          <ScrollView
            style={styles.middleContainer}
            horizontal
            indicatorStyle={"white"}
          >
            <TouchableOpacity style={styles.middleButton01}>
              <Text style={styles.middleButtonText}>생활</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.middleButton02}>
              <Text style={styles.middleButtonText}>재테크</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.middleButton03}>
              <Text style={styles.middleButtonText}>반려견</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.middleButton04}>
              <Text style={styles.middleButtonText}>꿀팁 찜</Text>
            </TouchableOpacity>
          </ScrollView>
          <View style={styles.cardContainer}>
            {/* 하나의 카드 영역을 나타내는 View */}
            {tip.map((content, i) => {
              return <Card content={content} key={i} />;
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
      title: {
        //폰트 사이즈
        fontSize: 20,
        //폰트 두께
        fontWeight: "700",
        //위 공간으로 부터 이격
        marginTop: 50,
        //왼쪽 공간으로 부터 이격
        marginLeft: 20,
      },
      weather: {
        alignSelf: "flex-end",
        paddingRight: 20,
      },
      mainImage: {
        //컨텐츠의 넓이 값
        width: "90%",
        //컨텐츠의 높이 값
        height: 200,
        //컨텐츠의 모서리 구부리기
        borderRadius: 10,
        marginTop: 20,
        //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
        //각 속성의 값들은 공식문서에 고대로~ 나와 있음
        alignSelf: "center",
      },
      middleContainer: {
        marginTop: 20,
        marginLeft: 10,
        height: 60,
      },
      middleButton01: {
        width: 100,
        height: 50,
        padding: 15,
        backgroundColor: "#fdc453",
        borderColor: "deeppink",
        borderRadius: 15,
        margin: 7,
      },
      middleButton02: {
        width: 100,
        height: 50,
        padding: 15,
        backgroundColor: "#fe8d6f",
        borderRadius: 15,
        margin: 7,
      },
      middleButton03: {
        width: 100,
        height: 50,
        padding: 15,
        backgroundColor: "#9adbc5",
        borderRadius: 15,
        margin: 7,
      },
      middleButtonText: {
        color: "#fff",
        fontWeight: "700",
        //텍스트의 현재 위치에서의 정렬
        textAlign: "center",
      },
      middleButton04: {
        width: 100,
        height: 50,
        padding: 15,
        backgroundColor: "#f886a8",
        borderRadius: 15,
        margin: 7,
      },
      cardContainer: {
        marginTop: 10,
        marginLeft: 10,
      },
      card: {
        flex: 1,
        //컨텐츠들을 가로로 나열
        //세로로 나열은 column <- 디폴트 값임
        flexDirection: "row",
        margin: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "#eee",
        paddingBottom: 10,
      },
      cardImage: {
        flex: 1,
        width: 100,
        height: 100,
        borderRadius: 10,
      },
      cardText: {
        flex: 2,
        flexDirection: "column",
        marginLeft: 10,
      },
      cardTitle: {
        fontSize: 20,
        fontWeight: "700",
      },
      cardDesc: {
        fontSize: 15,
      },
      cardDate: {
        fontSize: 10,
        color: "#A6A6A6",
      },
    });
    ```

    <br />
