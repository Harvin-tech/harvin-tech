'use client';

import React from 'react';

interface PDFViewerProps {
  url: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ url }) => {
  return (
    <div className="w-full h-full">
      <iframe
        src={url}
        className="w-full h-full"
        title="PDF Document"
        frameBorder="0"
        allowFullScreen
        // The following attributes help prevent downloads
        sandbox="allow-scripts allow-same-origin"
        style={{ pointerEvents: 'auto' }}
      />
    </div>
  );
};
