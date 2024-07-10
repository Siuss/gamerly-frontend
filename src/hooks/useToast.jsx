import { useContext } from "react";
import {ToastContext, ToastActionsContext} from '../providers/toast-provider/ToastProvider'

export function useToastState() {
  return useContext(ToastContext);
}

export function useToast() {
    return useContext(ToastActionsContext);
  }
  