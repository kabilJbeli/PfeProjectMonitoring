import * as React from 'react';
import {SafeAreaView} from 'react-native';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';


const Home = (props: any) => {
    const location = useNavigation();
    const { navigation } = props;
    const route = useRoute();
    const isFocused = useIsFocused();


  return (
    <SafeAreaView>

    </SafeAreaView>
  );
};
export default Home;
