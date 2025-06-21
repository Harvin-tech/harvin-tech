'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PDFViewer } from '@/components/dashboard/nano-science/PDFViewer';
import { VideoPlayer } from '@/components/dashboard/nano-science/VideoPlayer';
import { FileText, Video } from 'lucide-react';

interface VideoItem {
  video_name: string;
  video_url: string;
}

interface PDFItem {
  pdf_name: string;
  pdf_url: string;
}

interface CourseViewerProps {
  course_name: string;
  pdfs: PDFItem[];
  videos: VideoItem[];
}

export const CourseViewer: React.FC<CourseViewerProps> = ({
  course_name,
  pdfs,
  videos,
}) => {
  const [activeTab, setActiveTab] = useState<'videos' | 'pdfs'>('videos');
  const [activePDF, setActivePDF] = useState(pdfs[0]?.pdf_url || '');
  const [activeVideo, setActiveVideo] = useState(videos[0]?.video_url || '');

  const convertToEmbedURL = (url: string): string => {
    const fileIdMatch = url.match(/\/d\/([^/]+)/);
    return fileIdMatch ? `https://drive.google.com/file/d/${fileIdMatch[1]}/preview` : url;
  };

  return (
    <div className="container py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">{course_name}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Viewer */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <div className="rounded-lg overflow-hidden border shadow-sm">
            {activeTab === 'videos' ? (
              <div className="aspect-video bg-black">
                <VideoPlayer url={convertToEmbedURL(activeVideo)} />
              </div>
            ) : (
              <div className="h-[70vh]">
                <PDFViewer url={convertToEmbedURL(activePDF)} />
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Explorer */}
        <div className="order-1 lg:order-2">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as 'videos' | 'pdfs')}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="pdfs" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                PDFs
              </TabsTrigger>
            </TabsList>

            <Card>
              <CardContent className="p-4">
                <TabsContent value="videos" className="mt-0 space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Video className="h-4 w-4 text-primary" />
                    Course Videos
                  </h3>
                  <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                    {videos.map((video, index) => (
                      <div
                        key={index}
                        onClick={() => setActiveVideo(video.video_url)}
                        className={`p-3 rounded-md cursor-pointer flex items-center gap-3 hover:bg-muted transition-colors ${
                          activeVideo === video.video_url ? 'bg-muted' : ''
                        }`}
                      >
                        <div className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{video.video_name}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="pdfs" className="mt-0 space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Course Materials
                  </h3>
                  <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                    {pdfs.map((pdf, index) => (
                      <div
                        key={index}
                        onClick={() => setActivePDF(pdf.pdf_url)}
                        className={`p-3 rounded-md cursor-pointer flex items-center gap-3 hover:bg-muted transition-colors ${
                          activePDF === pdf.pdf_url ? 'bg-muted' : ''
                        }`}
                      >
                        <div className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{pdf.pdf_name}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
