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

### **2. Status Bar 구현하기**

- 설치하기

  ```sh
  expo install expo-status-bar
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
  import { StatusBar } from "expo-status-bar";
  export default function MainPage() {
    //useState 사용법
    //[state,setState] 에서 state는 이 컴포넌트에서 관리될 상태 데이터를 담고 있는 변수
    //setState는 state를 변경시킬때 사용해야하는 함수

    //모두 다 useState가 선물해줌
    //useState()안에 전달되는 값은 state 초기값
    const [state, setState] = useState([]);
    const [cateState, setCateState] = useState([]);

    //하단의 return 문이 실행되어 화면이 그려진다음 실행되는 useEffect 함수
    //내부에서 data.json으로 부터 가져온 데이터를 state 상태에 담고 있음
    const [ready, setReady] = useState(true);

    useEffect(() => {
      //뒤의 1000 숫자는 1초를 뜻함
      //1초 뒤에 실행되는 코드들이 담겨 있는 함수
      setTimeout(() => {
        setState(data.tip);
        setCateState(data.tip);
        setReady(false);
      }, 1000);
    }, []);

    const category = (cate) => {
      if (cate == "전체보기") {
        //전체보기면 원래 꿀팁 데이터를 담고 있는 상태값으로 다시 초기화
        setCateState(state);
      } else {
        setCateState(
          state.filter((d) => {
            return d.category == cate;
          })
        );
      }
    };

    //data.json 데이터는 state에 담기므로 상태에서 꺼내옴
    // let tip = state.tip;
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
        <StatusBar style="light" />
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
          <TouchableOpacity
            style={styles.middleButtonAll}
            onPress={() => {
              category("전체보기");
            }}
          >
            <Text style={styles.middleButtonTextAll}>전체보기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.middleButton01}
            onPress={() => {
              category("생활");
            }}
          >
            <Text style={styles.middleButtonText}>생활</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.middleButton02}
            onPress={() => {
              category("재테크");
            }}
          >
            <Text style={styles.middleButtonText}>재테크</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.middleButton03}
            onPress={() => {
              category("반려견");
            }}
          >
            <Text style={styles.middleButtonText}>반려견</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.middleButton04}
            onPress={() => {
              category("꿀팁 찜");
            }}
          >
            <Text style={styles.middleButtonText}>꿀팁 찜</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.cardContainer}>
          {/* 하나의 카드 영역을 나타내는 View */}
          {cateState.map((content, i) => {
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
    middleButtonAll: {
      width: 100,
      height: 50,
      padding: 15,
      backgroundColor: "#20b2aa",
      borderColor: "deeppink",
      borderRadius: 15,
      margin: 7,
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
    middleButton04: {
      width: 100,
      height: 50,
      padding: 15,
      backgroundColor: "#f886a8",
      borderRadius: 15,
      margin: 7,
    },
    middleButtonText: {
      color: "#fff",
      fontWeight: "700",
      //텍스트의 현재 위치에서의 정렬
      textAlign: "center",
    },
    middleButtonTextAll: {
      color: "#fff",
      fontWeight: "700",
      //텍스트의 현재 위치에서의 정렬
      textAlign: "center",
    },
    cardContainer: {
      marginTop: 10,
      marginLeft: 10,
    },
  });
  ```

### **3. 스택 네비게이션 구현하기**

#### 1) 네비게이션

- 웹 사이트를 이용하듯, 앱에서 여러분들이 만든 컴포넌트들을 페이지화 시켜주고, 해당 페이지끼리 이동을 가능하게 해주는 라이브러리입니다.

- 설치하기

  ```sh
  yarn add @react-navigation/native
  ```

  ```sh
  expo install react-native-screens react-native-safe-area-context react-native-gesture-handler
  ```

#### 2) 스택 네비게이션

- 스택 네비게이션은 컴포넌트에 페이지 기능을 부여해주고
  컴포넌트에서 컴포넌트로 이동, 즉 페이지 이동을 가능하게 해줍니다.

- createStackNavigator

  ```sh
  yarn add @react-navigation/stack
  ```

- StackNavigator.js

  ```jsx
  import React from "react";
  //설치한 스택 네비게이션 라이브러리를 가져옵니다
  import { createStackNavigator } from "@react-navigation/stack";

  //페이지로 만든 컴포넌트들을 불러옵니다
  import DetailPage from "../pages/DetailPage";
  import MainPage from "../pages/MainPage";

  //스택 네비게이션 라이브러리가 제공해주는 여러 기능이 담겨있는 객체를 사용합니다
  //그래서 이렇게 항상 상단에 선언하고 시작하는게 규칙입니다!
  const Stack = createStackNavigator();

  const StackNavigator = () => {
    return (
      //컴포넌트들을 페이지처럼 여기게끔 해주는 기능을 하는 네비게이터 태그를 선언합니다.
      //위에서 선언한 const Stack = createStackNavigator(); Stack 변수에 들어있는 태그를 꺼내 사용합니다.
      //Stack.Navigator 태그 내부엔 페이지(화면)를 스타일링 할 수 있는 다양한 옵션들이 담겨 있습니다.
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "black",
            borderBottomColor: "black",
            shadowColor: "black",
            height: 100,
          },
          headerTintColor: "#FFFFFF",
          headerBackTitleVisible: false,
        }}
      >
        {/* 컴포넌트를 페이지로 만들어주는 엘리먼트에 끼워 넣습니다. 이 자체로 이제 페이지 기능을 합니다*/}
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="DetailPage" component={DetailPage} />
      </Stack.Navigator>
    );
  };

  export default StackNavigator;
  ```

### **4. Share 구현하기**

- DetailPage.js

  ```jsx
  import React, { useState, useEffect } from "react";
  import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
    Share,
  } from "react-native";

  export default function DetailPage({ navigation, route }) {
    const [tip, setTip] = useState({
      idx: 9,
      category: "재테크",
      title: "렌탈 서비스 금액 비교해보기",
      image:
        "https://storage.googleapis.com/sparta-image.appspot.com/lecture/money1.png",
      desc: "요즘은 정수기, 공기 청정기, 자동차나 장난감 등 다양한 대여서비스가 활발합니다. 사는 것보다 경제적이라고 생각해 렌탈 서비스를 이용하는 분들이 늘어나고 있는데요. 다만, 이런 렌탈 서비스 이용이 하나둘 늘어나다 보면 그 금액은 겉잡을 수 없이 불어나게 됩니다. 특히, 렌탈 서비스는 빌려주는 물건의 관리비용까지 포함된 것이기에 생각만큼 저렴하지 않습니다. 직접 관리하며 사용할 수 있는 물건이 있는지 살펴보고, 렌탈 서비스 항목에서 제외해보세요. 렌탈 비용과 구매 비용, 관리 비용을 여러모로 비교해보고 고민해보는 것이 좋습니다. ",
      date: "2020.09.09",
    });

    useEffect(() => {
      console.log(route);
      navigation.setOptions({
        title: route.params.title,
        headerStyle: {
          backgroundColor: "#000",
          shadowColor: "#000",
        },
        headerTintColor: "#fff",
      });
      setTip(route.params);
    }, []);

    const popup = () => {
      Alert.alert("팝업!!");
    };

    const share = () => {
      Share.share({
        message: `${tip.title} \n\n ${tip.desc} \n\n ${tip.image}`,
      });
    };
    return (
      // ScrollView에서의 flex 숫자는 의미가 없습니다. 정확히 보여지는 화면을 몇등분 하지 않고
      // 화면에 넣은 컨텐츠를 모두 보여주려 스크롤 기능이 존재하기 때문입니다.
      // 여기선 내부의 컨텐츠들 영역을 결정짓기 위해서 height 값과 margin,padding 값을 적절히 잘 이용해야 합니다.
      <ScrollView style={styles.container}>
        <Image style={styles.image} source={{ uri: tip.image }} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{tip.title}</Text>
          <Text style={styles.desc}>{tip.desc}</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.button} onPress={() => popup()}>
              <Text style={styles.buttonText}>팁 찜하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => share()}>
              <Text style={styles.buttonText}>팁 공유하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#000",
    },
    image: {
      height: 400,
      margin: 10,
      marginTop: 40,
      borderRadius: 20,
    },
    textContainer: {
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: "#eee",
    },
    desc: {
      marginTop: 10,
      color: "#eee",
    },
    buttonGroup: {
      flexDirection: "row",
    },
    button: {
      width: 100,
      marginTop: 20,
      marginRight: 10,
      marginLeft: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: "deeppink",
      borderRadius: 7,
    },
    buttonText: {
      color: "#fff",
      textAlign: "center",
    },
  });
  ```
