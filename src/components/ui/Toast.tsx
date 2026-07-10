import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from "react";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

const DEFAULT_DURATION = 1500;
const MESSAGE_GAP = 8;

type ToastItem = {
  id: number;
  text: string;
  duration: number;
};

type ToastContextValue = {
  messages: ToastItem[];
  show: (text: string, duration?: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const show = useCallback((text: string, duration = DEFAULT_DURATION) => {
    idRef.current += 1;
    const id = idRef.current;
    setMessages((prev) => [...prev, { id, text, duration }]);
    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }, duration);
  }, []);

  const value = useMemo(() => ({ messages, show }), [messages, show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("error");
  }
  return ctx;
}

export default function Toast() {
  const { messages } = useToast();

  if (messages.length === 0) return null;

  return (
    <View style={styles.overlay} pointerEvents="none">
      <View style={styles.list}>
        {messages.map((item) => (
          <ThemedView key={item.id} type="surface" style={styles.item}>
            <ThemedText type="description">{item.text}</ThemedText>
          </ThemedView>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: "15%",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 9999,
    elevation: 9999,
  },
  list: {
    alignItems: "center",
    gap: MESSAGE_GAP,
  },
  item: {
    height: 34,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
