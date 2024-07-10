import { useCallback, useEffect } from "react";
import { useToast, useToastState } from "../../hooks/useToast";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import Icon from "@expo/vector-icons/AntDesign";
import { StyleSheet, View } from "react-native";
import { Color } from "../../estilos/colores";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Toast = () => {
  const toast = useToastState();
  const { hide } = useToast();
  const insets = useSafeAreaInsets();

  const handleOcultar = useCallback(() => {
    hide();
  }, [hide]);

  useEffect(() => {
    if (!toast);

    // eslint-disable-next-line no-undef
    setTimeout(handleOcultar, toast?.duration);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  if (!toast) {
    return <></>;
  }

  const dynamicStyles = StyleSheet.create({
    toast: {
      top: insets.top,
      left: insets.left,
      right: insets.right,
    },
  });

  return (
    <View style={[styles.toast, dynamicStyles.toast, styles[toast.variant]]}>
      {toast.variant === "success" && (
          <Icon
            color={Color.blanco}
            name="checkcircleo"
            size={16}
          />
      )}
      {toast.variant === "error" && (
        <Icon
          color={Color.blanco}
          style={styles.icono}
          name="closecircleo"
          size={16}
        />
      )}
      <Parrafo style={styles.texto} variante="blancoS">
        {toast.text}
      </Parrafo>
    </View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    backgroundColor: Color.primario,
    width: "100%",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 16,
  },
  success: {
    backgroundColor: Color.verde,
  },
  error: {
    backgroundColor: Color.error,
  },
  icono: {
    position: "absolute",
    left: 16,
  },
  texto: {
    flexShrink: 1,
    paddingLeft: 24,
  },
});
