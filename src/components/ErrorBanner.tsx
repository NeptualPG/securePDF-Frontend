interface ErrorBannerProps {
  message: string;
  code?: string;
  errorCodeLabel?: string;
}

export function ErrorBanner({ message, code, errorCodeLabel = 'Error code' }: ErrorBannerProps) {
  return (
    <div className="error-banner" role="alert">
      <strong>{message}</strong>
      {code && (
        <small>
          {errorCodeLabel}: {code}
        </small>
      )}
    </div>
  );
}
