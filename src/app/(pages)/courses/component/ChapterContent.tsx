import { getCourseChapter } from "@/api";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
 // Use icons for better visuals

interface CollapsibleChapterProps {
  chapter: {
    title: string;
    lessons: {
      title: string;
      type: string;
    }[];
  };
}


const ChapterContent = ({ chapter }: any) => {
  console.log(chapter, "chapter");
  const [courseChapter, setCourseChapter] = useState([]);
  console.log(courseChapter, "courseChapter");

  const handleChapterClick = async (chapterId: string) => {
    try {
      const fetchedChapter = await getCourseChapter(chapterId);
      setCourseChapter(fetchedChapter.data.lessons);
      console.log(fetchedChapter.data, "Course Chapter Data");
    } catch (error) {
      console.error("Error fetching course chapter:", error);
    } finally {
      console.log("Finished fetching course chapter");
    }
  };
  useEffect(() => {
    const chapterId = chapter.chapterId;
    async function fetchChaptersData() {
      try{
      const fetchedChapter = await getCourseChapter(chapterId);
        setCourseChapter(fetchedChapter.data.lessons);
        console.log(fetchedChapter.data, "Course Chapter Data");
      
    } catch (error) {
      console.error("Error fetching course chapter:", error);
    }
  }
  fetchChaptersData();
    
  },[chapter.chapterId])
  return (
    <Collapsible  className="w-full border border-gray-300 rounded-md overflow-hidden shadow-sm">
      <CollapsibleTrigger className="w-full flex justify-between items-center px-4 py-3 bg-white hover:bg-gray-100 transition-colors cursor-pointer">
        <div className="flex items-center gap-2">
          <ChevronRightIcon className="h-5 w-5 text-gray-600 transition-transform transform" />
          <span className="text-lg font-medium text-gray-800">{chapter.title}</span>
        </div>
        <span className="text-sm text-gray-500">
          {courseChapter.length} {chapter.length > 1 ? "Lessons" : "Lesson"}
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className="bg-gray-50 px-4 py-3">
        <ul className="space-y-3">
          {courseChapter.map((lesson:any, index:any) => (
            <li
              key={index}
              className="flex items-center justify-between p-2 bg-white rounded-md shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary text-white flex justify-center items-center rounded-full font-semibold text-sm">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{lesson.title}</p>
                  <p className="text-sm text-gray-500 capitalize">{lesson.type}</p>
                </div>
              </div>
              <button className="text-primary font-medium hover:underline">
                Start
              </button>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ChapterContent;
