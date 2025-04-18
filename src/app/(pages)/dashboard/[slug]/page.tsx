'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { nanoScienceCourses } from '@/constants/courses/nano-sceience';
import { PDFViewer } from '@/components/dashboard/nano-science/PDFViewer';
import { VideoPlayer } from '@/components/dashboard/nano-science/VideoPlayer';
import { Book, FileText, Video } from 'lucide-react';
import { notFound } from 'next/navigation';

interface VideoItem {
  video_name: string;
  video_url: string;
}

interface PDFItem {
  pdf_name: string;
  pdf_url: string;
}

interface CourseData {
  course_name: string;
  slug: string;
  pdfs: PDFItem[];
  videos: VideoItem[];
}

// For now we only have one course, but this could be expanded
const courses: Record<string, CourseData> = {
  nanoscience: nanoScienceCourses,
};

export default function CoursePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const courseData = courses[slug];

  // If course not found, show 404 page
  if (!courseData) {
    notFound();
  }

  const [activeTab, setActiveTab] = useState<'videos' | 'pdfs'>('videos');
  const [activePDF, setActivePDF] = useState(courseData.pdfs[0]?.pdf_url || '');
  const [activeVideo, setActiveVideo] = useState(
    courseData.videos[0]?.video_url || ''
  );

  // Function to convert Google Drive link to embedded iframe URL
  const convertToEmbedURL = (url: string): string => {
    const fileIdMatch = url.match(/\/d\/([^/]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
    }
    return url;
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">{courseData.course_name}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area (Left) */}
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

        {/* Content Explorer (Right) */}
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
                    {courseData.videos.map(
                      (video: VideoItem, index: number) => (
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
                      )
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="pdfs" className="mt-0 space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Course Materials
                  </h3>
                  <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                    {courseData.pdfs.map((pdf: PDFItem, index: number) => (
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
}
