import * as React from 'react';
import {SafeAreaView, Text, View} from 'react-native';

const Sprint = () => {
  return (
    <SafeAreaView>
        <View style={{
            height: 150, width: '100%', justifyContent: 'center', alignItems: 'center',
            backgroundColor: '#45b1b1'

        }}>
            <Text style={{color: '#fff', fontSize: 40, textAlign: 'center'}}>
                Sprint List</Text>
        </View>
      <Text>Sprint Screen</Text>
    </SafeAreaView>
  );
};
export default Sprint;
