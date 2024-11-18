import React from "react";
import {Dimensions, FlatList, SafeAreaView, StatusBar, View, Image, Text,TouchableOpacity} from "react-native";
import styles from "../styles/OnBoardingStyles";
import Wrapper from "../components/Wrapper";
import Illustration1 from "../assets/images/OnBoardingIllustration1.svg";
import Illustration2 from "../assets/images/OnBoardingIllustration2.svg";
import Illustration3 from "../assets/images/OnBoardingIllustration3.svg";

const { width, height } = Dimensions.get("window");
const COLORS = { primary: "#4dd76a", white: "#fff" };

const slides = [
  {
    id: "1",
    component: Illustration1,
    title: "Welcome to uTrace",
    description:
      "Your personal guide to navigating the campus with ease. Let's help you get where you need to go!",
  },
  {
    id: "2",
    component: Illustration2,
    title: "Enable Location Access",
    description:
      "We need your location to provide accurate directions to guide you across the campus.",
  },
  {
    id: "3",
    component: Illustration3,
    title: "You're Ready To Explore!",
    description:
      "Start navigating the campus with our real-time interactive map.",
  },
];

const Slide = ({ item }) => {
  const Illustration = item.component;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', width: width * 1, height: height * 0.4 }}>
        <Illustration 
          width="100%" 
          height="100%" 
          preserveAspectRatio="xMidYMid meet"
          style={{ flex: 1 }}
        />
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default function OnBoardingScreens({ navigation }) {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef(null);

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.primary,
                },
              ]}
            />
          ))}
        </View>
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <TouchableOpacity style={styles.button} onPress={goNextSlide}>
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>
                {currentSlideIndex == slides.length - 1
                  ? "Let's Go"
                  : currentSlideIndex == slides.length - 2
                  ? "Continue"
                  : "Get Started"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    } else {
      navigation.replace("InteractiveMap");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor={COLORS.white} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        pagingEnabled
        data={slides}
        contentContainerStyle={{ height: height * 0.75 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};
