import { isAxiosError } from 'axios';

export type AppErrorKind = 'connection' | 'server' | 'location' | 'general';

export interface AppErrorDetails {
  message: string;
  kind: AppErrorKind;
}

export function getErrorDetails(error: unknown, fallbackMessage: string): AppErrorDetails {
  if (isAxiosError(error)) {
    if (!error.response) {
      return {
        kind: 'connection',
        message:
          'Unable to reach the WeatherNow server. Check your internet connection and ensure the backend is running.',
      };
    }

    const serverMessage = (error.response.data as { message?: string } | undefined)?.message;
    return {
      kind: 'server',
      message: serverMessage ?? 'The server returned an unexpected error. Please try again.',
    };
  }

  if (error instanceof Error && error.message) {
    return { kind: 'general', message: error.message };
  }

  return { kind: 'general', message: fallbackMessage };
}

export function toRejectPayload(
  error: unknown,
  fallbackMessage: string,
  kindOverride?: AppErrorKind,
): { message: string; kind: AppErrorKind } {
  const details = getErrorDetails(error, fallbackMessage);
  return {
    message: details.message,
    kind: kindOverride ?? details.kind,
  };
}
