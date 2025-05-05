import { Card, CardContent } from "@/components/ui/card";

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "ML Engineer",
    avatar: (
      <svg
        className="w-full h-full text-gray-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    name: "Sarah Chen",
    role: "Software Developer",
    avatar: (
      <svg
        className="w-full h-full text-gray-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    name: "Michael Patel",
    role: "UI/UX Designer",
    avatar: (
      <svg
        className="w-full h-full text-gray-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    name: "Jessica Kim",
    role: "Data Scientist",
    avatar: (
      <svg
        className="w-full h-full text-gray-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

const About = () => {
  return (
    <section className="relative bg-gray-50 min-h-screen py-8">
      <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-4">
            About EyeCheck
          </h2>
          <p className="text-neutral-700 max-w-2xl mx-auto text-lg leading-relaxed">
            Learn about our project, team, and mission to detect diabetic
            retinopathy early using AI.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto mb-10 bg-white/90 shadow-md rounded-xl">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-neutral-800 mb-4">
              Project Overview
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-neutral-700 mb-4">
                  EyeCheck is an AI-powered tool designed to detect diabetic
                  retinopathy from fundus images. Our machine learning model
                  analyzes retinal images to identify signs of diabetic
                  retinopathy, a leading cause of blindness in diabetic
                  patients.
                </p>
                <p className="text-neutral-700 mb-4">
                  Early detection is crucial for preventing vision loss. Our
                  goal is to make screening more accessible, especially in areas
                  with limited access to specialist care.
                </p>
                <div className="bg-neutral-100 p-4 rounded-md">
                  <h4 className="font-medium mb-2 text-neutral-800">
                    Key Features
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-neutral-700">
                    <li>Accurate detection of diabetic retinopathy</li>
                    <li>Rapid analysis of fundus images</li>
                    <li>Detailed reports with findings and recommendations</li>
                    <li>User feedback for continuous improvement</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <svg
                  className="w-full h-64 text-primary/20"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <circle cx="50" cy="50" r="30" />
                  <circle cx="50" cy="50" r="15" fill="white" />
                  <circle cx="50" cy="50" r="5" />
                  <path
                    d="M10,50 C10,27.91 27.91,10 50,10 C72.09,10 90,27.91 90,50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M90,50 C90,72.09 72.09,90 50,90 C27.91,90 10,72.09 10,50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium mb-3 text-neutral-800">
                About Diabetic Retinopathy
              </h4>
              <p className="text-neutral-700 mb-3">
                Diabetic retinopathy is a diabetes complication that affects the
                eyes. It's caused by damage to the blood vessels in the retina,
                the light-sensitive tissue at the back of the eye.
              </p>
              <p className="text-neutral-700">
                If left undetected and untreated, diabetic retinopathy can
                eventually lead to blindness. Early detection and treatment can
                significantly reduce the risk of vision loss.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-primary p-4 rounded-md">
              <p className="text-neutral-800 font-medium">
                Note: EyeCheck is an educational demo and is not intended for
                clinical use. Always consult with healthcare professionals for
                medical advice and diagnosis.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="max-w-4xl mx-auto mb-10 bg-white/90 shadow-md rounded-xl">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-center text-neutral-800 mb-6">
              Our Team
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 bg-neutral-200">
                    {member.avatar}
                  </div>
                  <h4 className="font-medium text-neutral-800">
                    {member.name}
                  </h4>
                  <p className="text-neutral-500 text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default About;
