import type { StaffMember } from './types';

export const initialStaff: StaffMember[] = [
  {
    id: '1',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.j@example.com',
    avatar: 'https://placehold.co/100x100/E8D5C4/464646.png',
    department: 'Engineering',
    role: 'Frontend Developer',
    location: 'New York',
    bio: 'Alice is a skilled frontend developer with 5 years of experience building responsive and user-friendly web applications.'
  },
  {
    id: '2',
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob.s@example.com',
    avatar: 'https://placehold.co/100x100/A2C579/464646.png',
    department: 'Engineering',
    role: 'Backend Developer',
    location: 'San Francisco',
    bio: 'Bob specializes in building robust and scalable backend systems. He is proficient in Node.js, Python, and cloud infrastructure.'
  },
  {
    id: '3',
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie.b@example.com',
    avatar: 'https://placehold.co/100x100/F4B183/464646.png',
    department: 'Product',
    role: 'Product Manager',
    location: 'New York',
    bio: 'Charlie has a keen eye for user needs and market trends, guiding product development from conception to launch.'
  },
  {
    id: '4',
    firstName: 'Diana',
    lastName: 'Prince',
    email: 'diana.p@example.com',
    avatar: 'https://placehold.co/100x100/C5DFF8/464646.png',
    department: 'Design',
    role: 'UI/UX Designer',
    location: 'Austin',
    bio: 'Diana creates intuitive and beautiful user interfaces. Her passion is to bridge the gap between user needs and business goals through design.'
  },
  {
    id: '5',
    firstName: 'Ethan',
    lastName: 'Hunt',
    email: 'ethan.h@example.com',
    avatar: 'https://placehold.co/100x100/D0A2C5/464646.png',
    department: 'Marketing',
    role: 'Content Strategist',
    location: 'San Francisco',
    bio: 'Ethan develops compelling content that engages audiences and drives brand growth. He excels at storytelling and SEO.'
  },
  {
    id: '6',
    firstName: 'Fiona',
    lastName: 'Glenanne',
    email: 'fiona.g@example.com',
    avatar: 'https://placehold.co/100x100/84A59D/464646.png',
    department: 'Sales',
    role: 'Account Executive',
    location: 'Chicago',
    bio: 'Fiona is a results-driven sales professional with a talent for building strong client relationships and exceeding sales targets.'
  },
  {
    id: '7',
    firstName: 'George',
    lastName: 'Costanza',
    email: 'george.c@example.com',
    avatar: 'https://placehold.co/100x100/F5D491/464646.png',
    department: 'Engineering',
    role: 'QA Engineer',
    location: 'New York',
    bio: 'George ensures the quality and reliability of our software through meticulous testing and attention to detail.'
  },
  {
    id: '8',
    firstName: 'Hannah',
    lastName: 'Montana',
    email: 'hannah.m@example.com',
    avatar: 'https://placehold.co/100x100/F28482/464646.png',
    department: 'Design',
    role: 'Graphic Designer',
    location: 'Austin',
    bio: 'Hannah brings brands to life with her creative and impactful visual designs, from logos to marketing materials.'
  },
  {
    id: '9',
    firstName: 'Ian',
    lastName: 'Malcolm',
    email: 'ian.m@example.com',
    avatar: 'https://placehold.co/100x100/BDE0FE/464646.png',
    department: 'Product',
    role: 'Data Scientist',
    location: 'San Francisco',
    bio: 'Ian leverages data to uncover insights that drive strategic decisions and product innovation. Life, uh, finds a way.'
  },
    {
    id: '10',
    firstName: 'Jane',
    lastName: 'Lane',
    email: 'jane.l@example.com',
    avatar: 'https://placehold.co/100x100/A2D2FF/464646.png',
    department: 'Engineering',
    role: 'DevOps Engineer',
    location: 'Chicago',
    bio: 'Jane streamlines development and operations, ensuring our infrastructure is reliable, scalable, and secure.'
  },
  {
    id: '11',
    firstName: 'Kevin',
    lastName: 'McCallister',
    email: 'kevin.m@example.com',
    avatar: 'https://placehold.co/100x100/CDB4DB/464646.png',
    department: 'Marketing',
    role: 'Social Media Manager',
    location: 'New York',
    bio: 'Kevin manages our online presence, creating engaging campaigns and fostering a strong community across social media platforms.'
  },
  {
    id: '12',
    firstName: 'Laura',
    lastName: 'Croft',
    email: 'laura.c@example.com',
    avatar: 'https://placehold.co/100x100/FFC8DD/464646.png',
    department: 'Sales',
    role: 'Sales Development Representative',
    location: 'Austin',
    bio: 'Laura is at the forefront of our sales efforts, identifying new opportunities and initiating conversations with potential clients.'
  },
];

export const departments = [...new Set(initialStaff.map(e => e.department))].sort();
export const roles = [...new Set(initialStaff.map(e => e.role))].sort();
