import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import { NotificationResolver, navigationRef } from "../resolvers/NotificationResolver";


export const useNotificationListener = () => {
  const responseListener = useRef({});

  useEffect(() => {

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(async (response) => {
        const { data } = response.notification.request.content;

        if (!data || !data.tipo) return;

        const resolver = NotificationResolver[data.tipo];

        await resolver(data, navigationRef);
      });

    return () => {
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
};
