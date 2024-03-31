import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Layout from './app/screens/RootLayout';
import AuthProvider from './app/utils/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
import EStyleSheet from 'react-native-extended-stylesheet';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

import * as Linking from 'expo-linking';

const prefix = Linking.createURL('');

EStyleSheet.build({

})

const queryClient = new QueryClient();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // token = (await Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig?.extra!.eas.projectId, })).data;
    token = (await Notifications.getDevicePushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export default function App() {

  const [expoPushToken, setExpoPushToken] = useState<any>('');
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token!));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current!);
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  const linking = {
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
    }
  }
  console.log(prefix)

  return (
    <SafeAreaView style={{
      flex: 1
    }}>
      <NavigationContainer linking={linking} >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <AutocompleteDropdownContextProvider>
          <Layout />
          </AutocompleteDropdownContextProvider>
        </AuthProvider>
      </QueryClientProvider>
    </NavigationContainer>
    </SafeAreaView>
  );
}


