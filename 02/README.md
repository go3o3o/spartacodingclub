# [스파르타코딩클럽] 앱개발 종합반 - 2주차

## **[수업 목표]**

1. 앱 개발 준비 - 리액트 네이티브(기술) & Expo(도구) 소개 및 설치
2. 앱 화면 만들기
3. 앱에서 자주 사용되는 자바스크립트 연습하기

---

<br />

### **1. 리액트 네이티브 = 리액트(React) + 네이티브(Native)**

- 리액트 네이티브는 자바스크립트 언어 하나로 AOS 와 IOS 두 가지 OS 의 앱을 모두 만들어주는 라이브러리입니다.

<br />

### **2. Expo**

- 링크: https://expo.dev/signup
- 리액트 네이티브로 앱을 개발할 때, AOS & IOS 코드를 건드려야 하는 대부분의 상황을 건드리지 않아도 되게끔 도와주는 툴입니다.
- 개발 중인 앱 테스트를 위한 Expo 클라이언트 앱을 제공해 줍니다.
- cli 설치: `sudo npm install -g expo-cli`
- 로그인: `expo login`
- 앱 생성: `expo init sparta-myhoneytip-yonikim`
- 앱 실행: `expo start`

<br />

### **3. JSX**

#### 1) 모든 태그는 리액트 네이티브에서 제공해주는, 이미 존재하는 태그 문법을 가져와서 사용해야 합니다.

- 공식 사용 설명서: https://reactnative.dev/docs/view?redirected

```jsx
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
```

<br />

#### 2) 태그는 항상 닫는 태그와 자체적으로 닫는 태그를 구분해서 사용해야 합니다.

```jsx
export default function App() {
  return (
    //<View>는 결국 두번째 줄 밑에 </View>로 닫히면서 본인 영역을 갖습니다
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      //statusBar는 본인 스스로 닫는 태그이므로 다음과 같이 사용이 가능합니다.
      <StatusBar style="auto" />
    </View>
  );
}
```

<br />

#### 3) 모든 엘리먼트(`<>`)는 감싸는 최상위 엘리먼트가 있어야 합니다.

```jsx
// App.js가 렌더링 하고 엘리먼트는 결국
// Text와 StatusBar엘리먼트를 감싸고 잇는 View입니다.
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
```

- 다음과 같이 최상위 엘리먼트가 없으면 오류가 발생합니다.

```jsx
// View 엘리먼트 밖에 StatusBar가 나와 있으므로
// 엘리먼트 전체를 감싸는 엘리먼트가 없어서 오류가 납니다.
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
		<StatusBar style="auto" />
  );
}
```

- 추후 디자인적인 측면을 위해 최상위 엘리먼트 없이 진행해야 한다면, '프래그먼트' 라는 의미없는 엘리먼트로 감싸서 렌더링 할 수도 있습니다. 하지만 이 방법은 지양해야 하는 방식입니다.

```jsx
export default function App() {
  return (
    <>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
      <StatusBar style="auto" />
    </>
  );
}
```

<br />

#### 4) `return` 에 의해 렌더링 될 땐 항상 소괄호로 감싸져야 합니다.

<br />

#### 5) JSX 문법 밖에서의 주석과 안에서의 주석은 다릅니다.

```jsx
//JSX밖에서의 주석
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
//JSX밖에서의 주석
export default function App() {
  //JSX밖에서의 주석
  return (
    //JSX 밖에서의 주석
    <View style={styles.container}>
      {/*
				JSX 문법 안에서의 주석
			*/}
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

//JSX밖에서의 주석
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
```

<br />

### 4. 화면을 구성하는 엘리먼트

#### 1) `<View>`

```jsx
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.subContainerOne}></View>
      <View style={styles.subContainerTwo}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  subContainerOne: {
    flex: 1,
    backgroundColor: "yellow",
  },
  subContainerTwo: {
    flex: 1,
    backgroundColor: "green",
  },
});
```

<br />

#### 2) `<Text>`

```jsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>문자는 Text 태그 사이에 작성!!</Text>
      <Text>문자는 Text 태그 사이에 작성!!</Text>
      <Text>문자는 Text 태그 사이에 작성!!</Text>
      <Text>문자는 Text 태그 사이에 작성!!</Text>
      <Text>문자는 Text 태그 사이에 작성!!</Text>
      <Text>문자는 Text 태그 사이에 작성!!</Text>
      <Text>문자는 Text 태그 사이에 작성!!</Text>
      <Text>문자는 Text 태그 사이에 작성!!</Text>
      <Text>문자는 Text 태그 사이에 작성!!</Text>
      <Text>문자는 Text 태그 사이에 작성!!</Text>
      <Text>문자는 Text 태그 사이에 작성!!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
```

<br />

#### 3) `<ScrollView>`

```jsx
import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>영역을 충분히 갖는 텍스트 입니다!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textContainer: {
    height: 100,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
  },
  textStyle: {
    textAlign: "center",
  },
});
```

<br />

#### 4) `<Button>`

```jsx
import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";

export default function App() {
  //화살표 함수 형식으로 함수를 정의하고
  //jSX문법 안에서 사용할 수 있습니다
  const customAlert = () => {
    Alert.alert("JSX 밖에서 함수 구현 가능!");
  };
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>아래 버튼을 눌러주세요</Text>
        {/* onPress에 밖에서 구현한 함수 이름을 고대로 넣을 수도 있고*/}
        <Button
          style={styles.buttonStyle}
          title="버튼입니다 "
          color="#f194ff"
          onPress={customAlert}
        />
        {/* onPress를 누르면 속성에 바로 구현해 놓은 함수 안에 customALert함수를 두고 실행할 수 있게도 가능합니다 */}
        <Button
          style={styles.buttonStyle}
          title="버튼입니다 "
          color="#FF0000"
          onPress={() => {
            customAlert();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textContainer: {
    height: 100,
    margin: 10,
  },
  textStyle: {
    textAlign: "center",
  },
});
```

<br />

#### 5) `<TouchableOpacity>`

```jsx
import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";

export default function App() {
  //화살표 함수 형식으로 함수를 정의하고
  //jSX문법 안에서 사용할 수 있습니다
  const customAlert = () => {
    Alert.alert("JSX 밖에서 함수 구현 가능!");
  };
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>아래 버튼을 눌러주세요</Text>
        {/* onPress에 밖에서 구현한 함수 이름을 고대로 넣을 수도 있고*/}
        <Button
          style={styles.buttonStyle}
          title="버튼입니다 "
          color="#f194ff"
          onPress={customAlert}
        />
        {/* onPress를 누르면 속성에 바로 구현해 놓은 함수 안에 customALert함수를 두고 실행할 수 있게도 가능합니다 */}
        <Button
          style={styles.buttonStyle}
          title="버튼입니다 "
          color="#FF0000"
          onPress={() => {
            customAlert();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textContainer: {
    height: 100,
    margin: 10,
  },
  textStyle: {
    textAlign: "center",
  },
});
```

<br />

#### 6) `<Image>`

```jsx
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
//이렇게 상단에 가져와 사용할 이미지를 불러옵니다
import favicon from "./assets/favicon.png";

export default function App() {
  return (
    <View style={styles.container}>
      {/*이미지 태그 soruce 부분에 가져온 미지 이름을 넣습니다 */}
      <Image
        source={favicon}
        // 사용설명서에 나와 있는 resizeMode 속성 값을 그대로 넣어 적용합니다
        resizeMode={"repeat"}
        style={styles.imageStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //혹시 미리 궁금하신 분들을 위해 언급하자면,
    //justifyContent와 alignContent는 영역 안에 있는 콘텐츠들을 정렬합니다
    justifyContent: "center",
    alignContent: "center",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
```

<br />

### 5. StyleSheet

```jsx
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>스파르타 코딩클럽!!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //영역을 잡는 속성입니다. 따로 자세히 다룹니다.
    //flex: 1은 전체 화면을 가져간다는 뜻입니다
    flex: 1,
    //영역의 배경 색을 결정합니다
    backgroundColor: "#fff",
    //아래 두 속성은 영역 안의 컨텐츠들의 배치를 결정합니다.
    //flex를 자세히 다룰때 같이 자세히 다룹니다
    justifyContent: "center",
    alignContent: "center",
  },
  textContainer: {
    //영역의 바깥 공간 이격을 뜻합니다(하단 이미지 참조)
    margin: 10,
    //영역 안의 컨텐츠 이격 공간을 뜻합니다(하단 이미지 참조)
    padding: 10,
    //테두리의 구부러짐을 결정합니다. 지금 보면 조금 둥글죠?
    borderRadius: 10,
    //테두리의 두께를 결정합니다
    borderWidth: 2,
    //테두리 색을 결정합니다
    borderColor: "#000",
    //테구리 스타일을 결정합니다. 실선은 solid 입니다
    borderStyle: "dotted",
  },
  textStyle: {
    //글자 색을 결정합니다. rgb, 값 이름, 색상코드 모두 가능합니다
    color: "red",
    //글자의 크기를 결정합니다
    fontSize: 20,
    //글자의 두께를 결정합니다
    fontWeight: "700",
    //가로기준으로 글자의 위치를 결정합니다
    textAlign: "center",
  },
});
```

<br />

### 6. Flex

#### 1) flex

- 영역을 차지하는 속성으로 상대적입니다.

```jsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.containerOne}></View>
      <View style={styles.containerTwo}>
        <View style={styles.innerOne}></View>
        <View style={styles.innerTwo}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerOne: {
    flex: 1,
    backgroundColor: "red",
  },
  containerTwo: {
    flex: 2,
    backgroundColor: "yellow",
  },
  innerOne: {
    flex: 1,
    backgroundColor: "blue",
  },
  innerTwo: {
    flex: 4,
    backgroundColor: "orange",
  },
});
```

<br />

#### 2) flexDirection

- 자리 잡은 영역의 방향입니다.

```jsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.containerOne}></View>
      <View style={styles.containerTwo}>
        <View style={styles.innerOne}></View>
        <View style={styles.innerTwo}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerOne: {
    flex: 1,
    backgroundColor: "red",
  },
  containerTwo: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "yellow",
  },
  innerOne: {
    flex: 1,
    backgroundColor: "blue",
  },
  innerTwo: {
    flex: 4,
    backgroundColor: "orange",
  },
});
```

<br />

#### 3) justifyContent

```jsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.containerOne}></View>
      <View style={styles.containerTwo}>
        <View style={styles.innerOne}></View>
        <View style={styles.innerTwo}>
          <Text>!!컨텐츠!!</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerOne: {
    flex: 1,
    backgroundColor: "red",
  },
  containerTwo: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "yellow",
  },
  innerOne: {
    flex: 1,
    backgroundColor: "blue",
  },
  innerTwo: {
    flex: 4,
    justifyContent: "flex-start",
    backgroundColor: "orange",
  },
});
```

<br />

#### 4) alignItems

```jsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.containerOne}></View>
      <View style={styles.containerTwo}>
        <View style={styles.innerOne}></View>
        <View style={styles.innerTwo}>
          <View style={styles.content}></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerOne: {
    flex: 1,
    backgroundColor: "red",
  },
  containerTwo: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "yellow",
  },
  innerOne: {
    flex: 1,
    backgroundColor: "blue",
  },
  innerTwo: {
    flex: 4,
    backgroundColor: "orange",
    alignItems: "flex-end",
  },
  content: {
    width: 50,
    height: 50,
    backgroundColor: "#000",
  },
});
```
