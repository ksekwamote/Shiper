import React from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const {width, height} = Dimensions.get('window');

const COLORS = {primary: '#282534', white: '#fff'};

const slides = [
  {
    id: '1',
    image: require('../../../assets/images/home/ship2.png'),
    title: 'All in one package tracking',
    subtitle: 'Track your all packages from anywhere in the world , under one roof.',
  },
  {
    id: '2',
    image: require('../../../assets/images/home/tax.png'),
    title: 'Import duty calculator',
    subtitle: 'Calculate the entire landed cost for your goods.',
  },
  {
    id: '3',
    image: require('../../../assets/images/home/chat.png'),
    title: 'Communicate with the Seller',
    subtitle: 'Establish a constant communication with seller or merchant',
  },
  {
    id: '4',
    image: require('../../../assets/images/home/push.png'),
    title: 'Instant Notifications',
    subtitle: 'Be instantly notified via Whatsapp or Push Notifications.',
  },
];

const Slide = ({item}) => {
  return (
    <View style={{display: 'flex' , justifyContent:'center' , alignItems: 'center' }}>
      <Image
        source={item?.image}
        style={{height: '75%', width, resizeMode: 'contain'}}
      />
      <View>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const Home = () => {
  const navigation = useNavigation()
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);

    if (currentIndex != slides.length) {
      let offset = (currentIndex * width);
      if (currentIndex==0) {
         offset = (currentIndex * width);
      }
      if (currentIndex==1) {
         offset = (currentIndex * width)+40;
      }
      if (currentIndex==2) {
        offset = (currentIndex * width)+25+20;
      }
      if (currentIndex==3) {
        offset = (currentIndex * width)+25+30+30;
      }
      
     // alert("Width: "+width + " Offset: "+offset)
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentIndex);
    }

    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      let offset = (nextSlideIndex * width);
      if (nextSlideIndex==0) {
         offset = (nextSlideIndex * width);
      }
      if (nextSlideIndex==1) {
         offset = (nextSlideIndex * width)+40;
      }
      if (nextSlideIndex==2) {
        offset = (nextSlideIndex * width)+25+20;
      }
      if(nextSlideIndex==3){
        offset = (nextSlideIndex*width)+25+30+30
      }
      
     // alert("Width: "+width + " Offset: "+offset)
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex);
    }

    setCurrentSlideIndex(nextSlideIndex)
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = (lastSlideIndex * width)+25+30;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.white,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{marginBottom: 35}}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{height: 50}}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate('signin')}>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor: COLORS.white,
                    borderWidth: 1,
                    backgroundColor: 'transparent',
                  },
                ]}
                onPress={skip}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: COLORS.white,
                  }}>
                  SKIP
                </Text>
              </TouchableOpacity>
              <View style={{width: 15}} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.btn}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.primary}}>
      <StatusBar backgroundColor={COLORS.primary} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: height * 0.75}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.white,
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%'
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home
