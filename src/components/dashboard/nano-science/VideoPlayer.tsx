'use client';

import React from 'react';

interface VideoPlayerProps {
  url: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  return (
    <div className="w-full h-full aspect-video relative">
      <iframe
        src={url}
        className="absolute inset-0 w-full h-full"
        title="Video Player"
        frameBorder="0"
        allowFullScreen
        // The following attributes help prevent downloads
        sandbox="allow-scripts allow-same-origin"
        style={{ pointerEvents: 'auto' }}
      />
    </div>
  );
};
