import { useCallback, useState } from "react";

import { useToast } from "@/components/ui/Toast";

interface UseRefreshOptions {
  duration?: number;
  toastText?: string;
  onComplete?: () => void;
}

/**
 * 下拉刷新hook
 */
export function useRefresh(options: UseRefreshOptions = {}) {
  const { duration = 1000, toastText = "已刷新", onComplete } = options;
  const [refreshing, setRefreshing] = useState(false);
  const { show } = useToast();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      onComplete?.();
      show(toastText);
    }, duration);
  }, [duration, toastText, onComplete, show]);

  return { refreshing, onRefresh };
}
