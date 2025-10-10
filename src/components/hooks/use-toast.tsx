"use client"

import * as React from "react"
import { type ToastProps } from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
}



const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let toastCount = 0
function genId() {
  toastCount = (toastCount + 1) % Number.MAX_SAFE_INTEGER
  return toastCount.toString()
}

type ActionType = typeof actionTypes
type Action =
  | { type: ActionType["ADD_TOAST"]; toast: ToasterToast }
  | { type: ActionType["UPDATE_TOAST"]; toast: Partial<ToasterToast> }
  | { type: ActionType["DISMISS_TOAST"]; toastId?: ToasterToast["id"] }
  | { type: ActionType["REMOVE_TOAST"]; toastId?: ToasterToast["id"] }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

function addToRemoveQueue(toastId: string) {
  if (toastTimeouts.has(toastId)) return

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({ type: "REMOVE_TOAST", toastId })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

let listeners: React.Dispatch<Action>[] = []
let state: State = { toasts: [] }

function dispatch(action: Action) {
  state = reducer(state, action)
  listeners.forEach((listener) => listener(action))
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST":
      const { toastId } = action
      if (toastId) addToRemoveQueue(toastId)
      else state.toasts.forEach((t) => addToRemoveQueue(t.id))
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined ? { ...t, open: false } : t
        ),
      }

    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }

    default:
      return state
  }
}

function useToast() {
  const [localState, setLocalState] = React.useState<State>(state)

  React.useEffect(() => {
    const listener = (action: Action) => setLocalState({ ...state })
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }, [])

  const createToast = React.useCallback(
    (props: Omit<ToasterToast, "id">) => {
      const toastId = genId()

      const update = (updatedProps: Partial<ToasterToast>) =>
        dispatch({
          type: "UPDATE_TOAST",
          toast: { id: toastId, ...updatedProps },
        })

      const dismiss = () =>
        dispatch({ type: "DISMISS_TOAST", toastId: toastId })

      dispatch({
        type: "ADD_TOAST",
        toast: {
          ...props,
          id: toastId,
          open: true,
          onOpenChange: (open) => {
            if (!open) dismiss()
          },
        },
      })

      return { id: toastId, dismiss, update }
    },
    []
  )

  return {
    ...localState,
    toast: createToast,
    dismiss: (toastId?: string) =>
      dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast }
