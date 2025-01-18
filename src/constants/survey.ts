// Base questions that remain same for all programs
export const baseQuestions = {
  programs: {
    title: 'Which Programs get you excited? 🔥',
    subtitle: "Share your interests and let's explore together!",
    options: [
      'Marketing',
      'Design',
      'Product',
      'Data',
      'Business',
      'Growth',
      'Gen AI',
    ],
  },
};

// Program-specific questions
export const programQuestions = {
  Marketing: {
    goals: {
      title: 'Choose your Marketing career path 🚀',
      subtitle: "What's your primary goal?",
      options: [
        'Become a Marketing Manager',
        'Master Digital Marketing',
        'Specialize in Content Marketing',
        'Lead Generation Expert',
        'Social Media Marketing',
      ],
    },
    track: {
      title: 'Select your preferred Marketing track 🎯',
      subtitle: 'Where would you like to focus?',
      options: [
        'B2B Marketing',
        'D2C Marketing',
        'Performance Marketing',
        'Brand Marketing',
      ],
    },
  },
  Design: {
    goals: {
      title: 'Choose your Design career path 🎨',
      subtitle: "What's your primary goal?",
      options: [
        'UI/UX Designer',
        'Product Designer',
        'Brand Designer',
        'Motion Designer',
        'Design Lead',
      ],
    },
    track: {
      title: 'Select your preferred Design track 🖌️',
      subtitle: 'Where would you like to focus?',
      options: [
        'Product Design',
        'Brand Design',
        'Design Systems',
        'Visual Design',
      ],
    },
  },
  Product: {
    goals: {
      title: 'Choose your Product career path 🛠️',
      subtitle: "What's your primary goal?",
      options: [
        'Become a Product Manager',
        'Specialize in Product Strategy',
        'Master Agile Product Development',
        'Focus on Product Analytics',
        'Launch Your Own Product',
      ],
    },
    track: {
      title: 'Select your preferred Product track 🌟',
      subtitle: 'Where would you like to focus?',
      options: [
        'Consumer Products',
        'SaaS Products',
        'Mobile Apps',
        'Platform Products',
      ],
    },
  },
  Data: {
    goals: {
      title: 'Choose your Data career path 📊',
      subtitle: "What's your primary goal?",
      options: [
        'Become a Data Scientist',
        'Master Data Engineering',
        'Specialize in Machine Learning',
        'Focus on Data Analytics',
        'Advance as a Data Architect',
      ],
    },
    track: {
      title: 'Select your preferred Data track 📈',
      subtitle: 'Where would you like to focus?',
      options: [
        'Big Data',
        'AI & ML',
        'Data Visualization',
        'Business Intelligence',
      ],
    },
  },
  Business: {
    goals: {
      title: 'Choose your Business career path 💼',
      subtitle: "What's your primary goal?",
      options: [
        'Become a Business Analyst',
        'Master Operations Management',
        'Specialize in Business Strategy',
        'Focus on Finance & Accounting',
        'Scale Your Own Startup',
      ],
    },
    track: {
      title: 'Select your preferred Business track 🏢',
      subtitle: 'Where would you like to focus?',
      options: [
        'Corporate Strategy',
        'Finance & Accounting',
        'Business Development',
        'Operations Management',
      ],
    },
  },
  Growth: {
    goals: {
      title: 'Choose your Growth career path 🚀',
      subtitle: "What's your primary goal?",
      options: [
        'Become a Growth Marketer',
        'Master Growth Hacking',
        'Specialize in Customer Retention',
        'Focus on Experimentation Frameworks',
        'Scale User Acquisition Strategies',
      ],
    },
    track: {
      title: 'Select your preferred Growth track 📈',
      subtitle: 'Where would you like to focus?',
      options: [
        'Acquisition Strategies',
        'Retention Strategies',
        'Viral Growth',
        'Experimentation & A/B Testing',
      ],
    },
  },
  GenAI: {
    goals: {
      title: 'Choose your Gen AI career path 🤖',
      subtitle: "What's your primary goal?",
      options: [
        'Become an AI Engineer',
        'Master Generative AI Tools',
        'Specialize in Prompt Engineering',
        'Build AI-Powered Applications',
        'Advance AI Ethics & Policy',
      ],
    },
    track: {
      title: 'Select your preferred Gen AI track 🌐',
      subtitle: 'Where would you like to focus?',
      options: [
        'Natural Language Processing (NLP)',
        'Computer Vision',
        'AI for Creative Applications',
        'AI in Business Automation',
      ],
    },
  },
};

// Mock constant data (replace with API response)
export const mockSuveryData = [
  // Existing users with different programs and goals
  {
    name: 'John Doe',
    email: 'john@example.com',
    mobile: 1234567890,
    selectedProgram: 'Marketing',
    goal: 'Master Digital Marketing',
    track: 'B2B Marketing',
    exsistingUser: true,
    status: 1,
    createdAt: '2025-01-15T10:00:00Z',
  },
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    mobile: 5647382910,
    selectedProgram: 'Product',
    goal: 'Become a Product Manager',
    track: 'Agile Product Management',
    exsistingUser: true,
    status: 1,
    createdAt: '2025-01-13T20:00:00Z',
  },
  {
    name: 'Robert Brown',
    email: 'robert@example.com',
    mobile: 5432178901,
    selectedProgram: 'Design',
    goal: 'Learn Graphic Design',
    track: 'Brand Identity Design',
    exsistingUser: true,
    status: 1,
    createdAt: '2025-01-10T09:30:00Z',
  },

  // New users with various programs and tracks
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    mobile: 9876543210,
    selectedProgram: 'Design',
    goal: 'UI/UX Designer',
    track: 'Product Design',
    exsistingUser: false,
    status: 1,
    createdAt: '2025-01-14T15:00:00Z',
  },
  {
    name: 'Chris Taylor',
    email: 'chris@example.com',
    mobile: 8765432109,
    selectedProgram: 'Data Science',
    goal: 'Learn Machine Learning',
    track: 'Applied AI',
    exsistingUser: false,
    status: 0,
    createdAt: '2025-01-12T18:45:00Z',
  },
  {
    name: 'Emma Wilson',
    email: 'emma@example.com',
    mobile: 7654321098,
    selectedProgram: 'Finance',
    goal: 'Master Investment Strategies',
    track: 'Wealth Management',
    exsistingUser: false,
    status: 1,
    createdAt: '2025-01-09T12:15:00Z',
  },

  // Users with no goal or track selected yet
  {
    name: 'Liam Davis',
    email: 'liam@example.com',
    mobile: 6543210987,
    selectedProgram: 'Marketing',
    goal: '',
    track: '',
    exsistingUser: true,
    status: 0,
    createdAt: '2025-01-08T14:25:00Z',
  },
  {
    name: 'Sophia Martinez',
    email: 'sophia@example.com',
    mobile: 5432109876,
    selectedProgram: '',
    goal: '',
    track: '',
    exsistingUser: false,
    status: 0,
    createdAt: '2025-01-07T10:00:00Z',
  },

  // Users with different statuses (active/inactive)
  {
    name: 'Ethan Moore',
    email: 'ethan@example.com',
    mobile: 4321098765,
    selectedProgram: 'Data Science',
    goal: 'Become a Data Analyst',
    track: 'Big Data Analytics',
    exsistingUser: true,
    status: 0, // Inactive
    createdAt: '2025-01-06T16:30:00Z',
  },
  {
    name: 'Olivia Thomas',
    email: 'olivia@example.com',
    mobile: 3210987654,
    selectedProgram: 'Finance',
    goal: 'Learn Financial Modeling',
    track: 'Corporate Finance',
    exsistingUser: false,
    status: 1, // Active
    createdAt: '2025-01-05T11:00:00Z',
  },

  // Users with anonymous entries
  {
    name: 'Anonymous',
    email: '',
    mobile: null,
    selectedProgram: 'Marketing',
    goal: 'Learn Social Media Strategies',
    track: 'Digital Advertising',
    exsistingUser: false,
    status: 1,
    createdAt: '2025-01-04T13:00:00Z',
  },
  {
    name: 'Anonymous',
    email: '',
    mobile: null,
    selectedProgram: 'Product',
    goal: 'Learn Agile Practices',
    track: 'Scrum Product Ownership',
    exsistingUser: false,
    status: 0,
    createdAt: '2025-01-03T17:00:00Z',
  },
];
