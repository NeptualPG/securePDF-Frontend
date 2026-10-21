interface DownloadButtonProps {
  url: string | null;
  fileName?: string;
}

export function DownloadButton({ url, fileName = 'converted.pdf' }: DownloadButtonProps) {
  if (!url) return null;
  return (
    <a className="download-button" href={url} download={fileName}>
      Download converted file <span aria-hidden="true">↓</span>
    </a>
  );
}
