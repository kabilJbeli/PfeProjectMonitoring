import * as React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {_retrieveData, _storeData} from "../utils";
import {useState} from "react";


const Home = (props: any) => {
    const location = useNavigation();
    const { navigation } = props;
    const route = useRoute();
    const isFocused = useIsFocused();


  return (
    <SafeAreaView>
      <Text>Home Screen  </Text>
    </SafeAreaView>
  );
};
export default Home;
