export default function AboutUs() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          About Us
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Welcome to our SOC Management platform! Our mission is to help
          organizations identify and mitigate security vulnerabilities
          effectively. With our advanced ticketing system, users can submit
          their website information for scanning, allowing our professional
          testing team to uncover potential risks and ensure a safer web
          experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
              <span className="text-white text-3xl font-semibold">1</span>
            </div>
            <h3 className="text-xl font-semibold text-blue-700">
              Submit Your Ticket
            </h3>
            <p className="text-gray-600 mt-2">
              Provide the website URL and necessary details for our team to
              begin the scanning process.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
              <span className="text-white text-3xl font-semibold">2</span>
            </div>
            <h3 className="text-xl font-semibold text-blue-700">
              Advanced Scanning
            </h3>
            <p className="text-gray-600 mt-2">
              Our automated tools analyze the website to detect vulnerabilities
              and potential risks.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
              <span className="text-white text-3xl font-semibold">3</span>
            </div>
            <h3 className="text-xl font-semibold text-blue-700">
              Task Assignment
            </h3>
            <p className="text-gray-600 mt-2">
              Our team assigns tasks to testers for further manual and detailed
              testing.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
              <span className="text-white text-3xl font-semibold">4</span>
            </div>
            <h3 className="text-xl font-semibold text-blue-700">
              Detailed Reporting
            </h3>
            <p className="text-gray-600 mt-2">
              Receive comprehensive reports on identified vulnerabilities and
              recommended solutions.
            </p>
          </div>
        </div>
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold text-blue-600">Our Vision</h2>
          <p className="text-gray-600 mt-4">
            We aim to create a safer digital ecosystem by empowering
            organizations to proactively manage and mitigate security threats.
          </p>
          <div className="mt-6 flex items-center justify-center">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-0 w-16 h-16 bg-blue-500 rounded-full animate-ping"></div>
              <div className="absolute top-0 left-0 w-16 h-16 bg-blue-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
