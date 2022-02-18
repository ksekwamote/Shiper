
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    Animated,
    Image,
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

// constants
import appTheme from "./theme.js";

 const onboarding1 = require("../../../assets/images/home/ship2.png");
 const onboarding2 = require("../../../assets/images/home/chat.png");
 const onboarding3 = require("../../../assets/images/home/push.png");

// theme
const { COLORS, FONTS, SIZES } = appTheme;

const onBoardings = [
    {
        title: "All in one package tracking",
        description: "Track your all packages from anywhere in the world , under one roof.",
        img: onboarding1
    },
    {
        title: "Communicate with the Seller",
        description: "Establish a constant communication line with all your sellers",
        img: onboarding2
    },
    {
        title: "Instant Notifications",
        description: "Be instantly notified on the status of your package via Whatsapp or Push Notifications.",
        img: onboarding3
    }
];

const OnBoarding = () => {
    const [completed, setCompleted] = React.useState(false);

    const scrollX = new Animated.Value(0);

    const navigation = useNavigation()

    React.useEffect(() => {
        scrollX.addListener(({ value }) => {
            if (Math.floor(value / SIZES.width) === onBoardings.length - 1) {
                setCompleted(true);
            }
        });

        return () => scrollX.removeListener();
    }, []);

    // Render

    function renderContent() {
        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEnabled
                decelerationRate={0}
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: scrollX } } },
                ], { useNativeDriver: false })}
            >
                {onBoardings.map((item, index) => (
                    <View
                        //center
                        //bottom
                        key={`img-${index}`}
                        style={styles.imageAndTextContainer}
                    >
                        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={item.img}
                                resizeMode="cover"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        </View>
                        <View
                            style={{
                                position: 'absolute',
                                bottom: '10%',
                                left: 40,
                                right: 40
                            }}
                        >
                            <Text style={{
                                ...FONTS.h2,
                                color: COLORS.gray,
                                textAlign: 'center',
                                fontWeight:'bold'
                            }}
                            >
                                {item.title}
                            </Text>

                            <Text style={{
                                ...FONTS.body3,
                                textAlign: 'center',
                                marginTop: SIZES.base,
                                color: COLORS.gray,
                            }}
                            >
                                {item.description}
                            </Text>
                        </View>
                        {/* Button */}
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                right: 0,
                                bottom: 0,
                                width: 150,
                                height: 40,
                                paddingLeft: 20,
                                justifyContent: 'center',
                                borderTopLeftRadius: 30,
                                borderBottomLeftRadius: 30,
                                borderBottomRightRadius: 0,
                                borderTopRightRadius: 0,
                                backgroundColor: "black"
                            }}
                            onPress={() => navigation.navigate('signin') }
                        >
                            <Text style={{ ...FONTS.h3, color: COLORS.white }}>{completed ? "Let's Go   --> " : "Skip   -->"}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </Animated.ScrollView>
        );
    }

    function renderDots() {

        const dotPosition = Animated.divide(scrollX, SIZES.width);

        return (
            <View style={styles.dotsContainer}>
                {onBoardings.map((item, index) => {
                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: "clamp"
                    });

                    const dotSize = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [SIZES.base, 17, SIZES.base],
                        extrapolate: "clamp"
                    });

                    return (
                        <Animated.View
                            key={`dot-${index}`}
                            opacity={opacity}
                            style={[styles.dot, { width: dotSize, height: dotSize, }]}
                        />
                    );
                })}
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                {renderContent()}
            </View>
            <View style={styles.dotsRootContainer}>
                {renderDots()}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    imageAndTextContainer: {
        width: SIZES.width
    },
    dotsRootContainer: {
        position: 'absolute',
        bottom: SIZES.height > 700 ? '20%' : '16%',
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SIZES.padding / 2,
        marginBottom: SIZES.padding * 3,
        height: SIZES.padding,
    },
    dot: {
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.blue,
        marginHorizontal: SIZES.radius / 2
    }
});

export default OnBoarding;
