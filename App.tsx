import 'react-native-gesture-handler';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import Layout from './app/screens/RootLayout';
import AuthProvider from './app/utils/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import EStyleSheet from 'react-native-extended-stylesheet';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { useEffect, useRef, useState } from 'react';
import { Platform, PermissionsAndroid, Alert, Linking as LinkingRN } from 'react-native';
import * as Linking from 'expo-linking';
import messaging from '@react-native-firebase/messaging';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

const prefix = Linking.createURL('');

EStyleSheet.build({

})

const queryClient = new QueryClient();


messaging().setBackgroundMessageHandler(async remoteMessage => {
  //logic
  if (remoteMessage?.data?.link) {
    Linking.openURL(remoteMessage.data.link as string)
  }

})


export default function App() {
  useEffect(() => {
    messaging().getToken().then((token) => {
      console.log(token);
    })

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message', JSON.stringify(remoteMessage));
    });



    return () => {
      unsubscribe()
    };

  }, []);

  const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [prefix],
    config: {
      screens: {
        student: {
          screens: {
            Profile: 'student/Profile',
            Drive: 'student/drive/:drive_id'
          }
        }
      }
    },
    getInitialURL: async () => {
      const url = await Linking.getInitialURL();
      if (url != null) {
        return url;
      }
      const message = await messaging().getInitialNotification();
      // const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
      console.log(message);
      if (message?.data?.link) {
        return message.data.link as string;
      }
    },
    subscribe(listener) {
      const onReceiveURL = ({ url }: { url: string }) => listener(url);
      const eventListenerSubscription = Linking.addEventListener('url', onReceiveURL);

      const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
        // const url = buildDeepLinkFromNotificationData(remoteMessage.data)
        const url = remoteMessage?.data?.link;
        if (typeof url === 'string') {
          listener(url)
        }
      });
      return () => {
        eventListenerSubscription.remove();
        unsubscribe();
      }
    },
  }
  return (
    <SafeAreaView style={{
      flex: 1
    }}>
      <NavigationContainer linking={linking}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>

          <Layout />

        </AuthProvider>
      </QueryClientProvider>
    </NavigationContainer>
    </SafeAreaView>
  );
}


