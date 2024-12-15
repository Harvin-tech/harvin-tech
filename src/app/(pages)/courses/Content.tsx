import { appContent } from '@/constants/variants';
import IoTCard from './component/IoTCard';

export default function Courses() {
  return (
    <div
      className={appContent({
        className: ' min-h-screen mt-[83px]',
      })}
    >
      
      {/* Header */}
      <section className="p-4 md:p-8 max-w-lg ">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="flex gap-2">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-xs">
              Courses
            </span>
            <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs">
              Skills
            </span>
          </div>
          <h1 className="font-semibold text-2xl xl:text-3xl tracking-tight">
            Fundamentals Programs html,css,java
          </h1>
          <p className="text-muted-foreground text-sm tracking-wide ">
            (Fundamentals Programs) is a rapidly evolving field and has changed
            from an unimaginable sci-fi dream to a very realistic future. This
            course will teach you the basics of IoT and help you to keep up with
            the latest developments in the IoT field.
          </p>
          <p className="text-muted-foreground text-xs tracking-wide ">
            ~by University of California, Irvine
          </p>
        </div>
      </section>

      {/* Hero Section */}
      <section className="p-4">
        <div className="max-w-4xl mx-auto">
          <img
            src="/iot-hero.png"
            alt="FREE IoT Course"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
          <IoTCard imageSrc="/iot-graph.png" title="IoT Graphs" />
          <IoTCard imageSrc="/iot-internet.png" title="Internet of Things" />
          <IoTCard imageSrc="/iot-device.png" title="Devices" />
          <IoTCard imageSrc="/iot-network.png" title="Network" />
          <IoTCard imageSrc="/lorawan.png" title="LoRaWAN" />
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-card-foreground">
            Advance your subject-matter expertise
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Learn in-demand skills from university and industry experts</li>
            <li>Master a subject or tool with hands-on projects</li>
            <li>Develop a deep understanding of key concepts</li>
            <li>
              Earn a career certificate from University of California, Irvine
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
