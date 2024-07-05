import { redirectSimpleResolver, redirectSimpleResolverParam } from "./redirectSimpleResolver";
import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export const NotificationResolver = {
  aceptarResenia: redirectSimpleResolverParam,
  rechazarResenia: redirectSimpleResolverParam,
  nuevaSolicitudAmistad: redirectSimpleResolver,
  aceptarAmistad: redirectSimpleResolverParam,
  rechazarAmistad: redirectSimpleResolverParam,
};
