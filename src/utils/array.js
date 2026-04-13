import { images } from '../assets/images';
import CalendarIcon from '../assets/svg/applications/CalendarIcon';
import CalendarIcon2 from '../assets/svg/applications/CalendarIcon2';
import CashIcon from '../assets/svg/applications/CashIcon';
import CheckIcon from '../assets/svg/applications/CheckIcon';
import ClockOutlineIcon from '../assets/svg/applications/ClockOutlineIcon';
import EyeIcon from '../assets/svg/applications/EyeIcon';
import PinIcon from '../assets/svg/applications/PinIcon';
import PinIcon2 from '../assets/svg/applications/PinIcon2';
import SendIcon from '../assets/svg/applications/SendIcon';
import Icons from '../components/vectorIcons/Icons';

import { colors } from './colors';
import DotIcon from '../assets/svg/applications/DotIcon';
import CalendarCheckIcon from '../components/vectorIcons/CalendarCheckIcon';
import CheckCircleIcon from '../assets/svg/applications/CheckCircleIcon';
import CameraIcon from '../assets/svg/applications/CameraIcon';
import UserIcon from '../assets/svg/applications/UserIcon';
import DressIcon from '../assets/svg/applications/DressIcon';
import ClipBoardIcon from '../assets/svg/applications/ClipBoardIcon';
import MealIcon from '../assets/svg/applications/MealIcon';
import WalletIcon from '../components/vectorIcons/WalletIcon';
import { correctSize } from '.';
import FrontIdCard from '../assets/svg/kyc/FrontIdCard';
import BriefCaseIcon from '../assets/svg/Home/BriefCaseIcon';
import StarIcon from '../assets/svg/applications/StarIcon';
import BookIcon from '../assets/svg/kyc/BookIcon';
import ShieldIcon from '../assets/svg/applications/ShieldIcon';
import FileIcon from '../assets/svg/Home/FileIcon';
import LockIcon from '../assets/svg/applications/LockIcon';
export const skills = [
  {
    id: 1,
    heading: 'Performance & Acting',
    icon: (
      <Icons
        name="masks-theater"
        family="FontAwesome6"
        size={18}
        color={colors.black}
      />
    ),
    subItem: [
      {
        id: '1-1',
        title: 'Acting',
        icon: (
          <Icons
            name="clapperboard"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '1-2',
        title: 'Voice Over',
        icon: (
          <Icons
            name="microphone"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '1-3',
        title: 'Presenting',
        icon: (
          <Icons
            name="user-tie"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '1-4',
        title: 'Comedy',
        icon: (
          <Icons
            name="face-laugh"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '1-5',
        title: 'Improvisation',
        icon: (
          <Icons
            name="wand-magic-sparkles"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
    ],
  },
  {
    id: 2,
    heading: 'Modeling',
    icon: (
      <Icons
        name="camera"
        family="FontAwesome6"
        size={18}
        color={colors.black}
      />
    ),
    subItem: [
      {
        id: '2-1',
        title: 'Fashion Modeling',
        icon: (
          <Icons
            name="shirt"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '2-2',
        title: 'Commercial',
        icon: (
          <Icons
            name="bullhorn"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '2-3',
        title: 'Fitness Modeling',
        icon: (
          <Icons
            name="dumbbell"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '2-4',
        title: 'Runway',
        icon: (
          <Icons
            name="person-walking"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '2-5',
        title: 'Editorial',
        icon: (
          <Icons
            name="book-open"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
    ],
  },
  {
    id: 3,
    heading: 'Digital & Influencer',
    icon: (
      <Icons
        name="instagram"
        family="FontAwesome"
        size={18}
        color={colors.black}
      />
    ),
    subItem: [
      {
        id: '3-1',
        title: 'Influencer',
        icon: (
          <Icons
            name="star"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '3-2',
        title: 'Content Creator',
        icon: (
          <Icons
            name="video"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '3-3',
        title: 'UGC Creator',
        icon: (
          <Icons
            name="mobile-screen-button"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '3-4',
        title: 'Brand Ambassador',
        icon: (
          <Icons
            name="handshake"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
    ],
  },
  {
    id: 4,
    heading: 'Dance & Movement',
    icon: (
      <Icons
        name="music"
        family="FontAwesome6"
        size={18}
        color={colors.black}
      />
    ),
    subItem: [
      {
        id: '4-1',
        title: 'Contemporary',
        icon: (
          <Icons
            name="music"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '4-2',
        title: 'Hip Hop',
        icon: (
          <Icons
            name="compact-disc"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '4-3',
        title: 'Ballet',
        icon: (
          <Icons
            name="shoe-prints"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '4-4',
        title: 'Salsa',
        icon: (
          <Icons
            name="fire"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '4-5',
        title: 'Choreography',
        icon: (
          <Icons
            name="users"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
    ],
  },
  {
    id: 5,
    heading: 'Languages',
    icon: (
      <Icons
        name="language"
        family="FontAwesome6"
        size={18}
        color={colors.black}
      />
    ),
    subItem: [
      {
        id: '5-1',
        title: 'English',
        icon: (
          <Icons
            name="globe"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '5-2',
        title: 'Arabic',
        icon: (
          <Icons
            name="book"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '5-3',
        title: 'French',
        icon: (
          <Icons
            name="flag"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '5-4',
        title: 'Hindi',
        icon: (
          <Icons
            name="om"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '5-5',
        title: 'Urdu',
        icon: (
          <Icons
            name="moon"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '5-6',
        title: 'Tagalog',
        icon: (
          <Icons
            name="earth-asia"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '5-7',
        title: 'Spanish',
        icon: (
          <Icons
            name="guitar"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
    ],
  },
  {
    id: 6,
    heading: 'Special Skills',
    icon: (
      <Icons
        name="trophy"
        family="FontAwesome6"
        size={18}
        color={colors.black}
      />
    ),
    subItem: [
      {
        id: '6-1',
        title: 'Stunts',
        icon: (
          <Icons
            name="person-walking"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '6-2',
        title: 'Martial Arts',
        icon: (
          <Icons
            name="hand-fist"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '6-3',
        title: 'Singing',
        icon: (
          <Icons
            name="music"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '6-4',
        title: 'Horse Riding',
        icon: (
          <Icons
            name="horse"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '6-5',
        title: 'Swimming',
        icon: (
          <Icons
            name="person-swimming"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '6-6',
        title: 'Driving',
        icon: (
          <Icons
            name="car"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
      {
        id: '6-7',
        title: 'Musical Instruments',
        icon: (
          <Icons
            name="guitar"
            family="FontAwesome6"
            size={16}
            color={colors.black}
          />
        ),
      },
    ],
  },
];

export const SHIRT_SIZES = [
  { label: 'XS', value: 'XS' },
  { label: 'S', value: 'S' },
  { label: 'M', value: 'M' },
  { label: 'L', value: 'L' },
  { label: 'XL', value: 'XL' },
  { label: 'XXL', value: 'XXL' },
];

export const PANTS_SIZES = [
  { label: '28', value: '28' },
  { label: '30', value: '30' },
  { label: '32', value: '32' },
  { label: '34', value: '34' },
  { label: '36', value: '36' },
  { label: '38', value: '38' },
];

export const countries = [
  { label: 'Pakistan', value: 'pakistan' },
  { label: 'India', value: 'india' },
  { label: 'USA', value: 'usa' },
  { label: 'UK', value: 'uk' },
  { label: 'Canada', value: 'canada' },
  { label: 'Australia', value: 'australia' },
  { label: 'Saudi Arabia', value: 'saudi arabia' },
  { label: 'UAE', value: 'uae' },
];

export const BANK_LIST = [
  { label: 'Emirates NBD', value: 'Emirates NBD' },
  { label: 'ADCB', value: 'ADCB' },
  { label: 'Dubai Islamic Bank', value: 'Dubai Islamic Bank' },
  { label: 'Mashreq Bank', value: 'Mashreq Bank' },
  { label: 'Abu Dhabi Islamic Bank', value: 'Abu Dhabi Islamic Bank' },
  { label: 'RAKBANK', value: 'RAKBANK' },
  { label: 'HSBC UAE', value: 'HSBC UAE' },
  { label: 'Standard Chartered UAE', value: 'Standard Chartered UAE' },
];

export const stepLabels = [
  'Headshot',
  'Full Body',
  'Casual Photo',
  'Short Video',
];
export const stepDescriptions = [
  'Face clearly visible',
  'Head to toe visible',
  'Natural, everyday look',
  '30-60 seconds max',
];

export const guidelines = [
  {
    id: 1,
    guide: 'Use natural lighting or studio setup',
    iconName: 'checkmark',
  },
  {
    id: 2,
    guide: 'Keep background simple and clean',
    iconName: 'checkmark',
  },
  {
    id: 3,
    guide: 'Face clearly visible, no sunglasses',
    iconName: 'checkmark',
  },
  {
    id: 4,
    guide: 'Professional attire for headshot',
    iconName: 'checkmark',
  },
  {
    id: 5,
    guide: 'No filters, heavy editing, or group photos',
    iconName: 'close',
  },
  {
    id: 6,
    guide: 'Avoid blurry or low-quality images',
    iconName: 'close',
  },
];

export const measurementsList = [
  {
    id: 1,
    lable: 'Height',
    value: '175 cm',
  },
  {
    id: 2,
    lable: 'Weight',
    value: '58 kg',
  },
  {
    id: 3,
    lable: 'Age',
    value: '26',
  },
  {
    id: 4,
    lable: 'Hair Color',
    value: 'Dark Brown',
  },
  {
    id: 5,
    lable: 'Eye Color',
    value: '175 kg',
  },
];

export const photosList = [
  {
    id: 1,
    img: images.gallery,
  },
  {
    id: 2,
    img: images.gallery,
  },
  {
    id: 3,
    img: images.gallery,
  },
];

export const notifacationsFilterList = [
  {
    id: 1,
    label: 'All',
  },
  {
    id: 2,
    label: 'Jobs',
  },
  {
    id: 3,
    label: 'Bookings',
  },
  {
    id: 4,
    label: 'Payment',
  },
];

export const recomendedJobs = [
  { id: 1, label: 'All Jobs' },
  {
    id: 2,
    label: '⭐ Top Rated',
  },
  {
    id: 3,
    label: '⚡ Urgent',
  },
  {
    id: 4,
    label: '📍 Nearby',
  },
];

export const requirementsList = [
  { id: 1, label: 'Bring professional portfolio and comp card' },
  { id: 2, label: 'Arrive 30 minutes early for wardrobe fitting' },
  { id: 3, label: 'Emirates ID required for verification on-site' },
];
export const whatsRequired = [
  { id: 1, label: 'Attend 2-hour fitting session on March 14' },
  { id: 2, label: 'Bring Emirates ID for verification' },
  { id: 3, label: 'Professional hair and makeup provided' },
  { id: 4, label: 'Sign NDA and usage rights agreement' },
];

export const applicationsList = [
  {
    id: 1,
    image: images.application1,
    title: "Fashion Model — Winter Collection '25",
    user: {
      companyName: 'Nike Middle East',
    },
    facilities: ['Wardrobe Provided', 'Hair & Makeup', 'Catering', 'Catering'],
    requirements: {
      height: '175–185',
      clothingSize: 'S or M (EU 36–38)',
      shoeSize: 'EU 38–40',
      other: ['Well-maintained physique — athletic build preferred', 'Clear, healthy skin tone', 'Available for ALL 3 shoot days'],
      experience: ['Minimum 1 year professional modeling experience', 'Comfortable with both studio and outdoor shoots', 'Ability to take direction quickly and adapt poses', 'Professional portfolio or Castly profile (90%+ complete)'],
      documents: ['Valid UAE residency or visit visa', 'Valid Emirates ID or Passport', 'Signed NDA & usage rights form (provided by Nike)']
    },
    specifyLocation: 'Dubai Marina',
    date: 'Dec 20, 2024',
    fee: '2,500',
    days: '3',
    appyTime: '2',
    status: 'pending',
    daysLeft: 3,
    spots: '3',
    relatedTo: 'Sports & Lifestyle',
    rating: '4',
    jobPosted: '35',
    weblink: 'nike.com/me',
    instalink: '@nikemiddleeast',
    taken: '1',
    duration: '3',
    applicants: '47',
    deadline: 'Dec 20, 2026',
    location: 'Dubai Mall Fashion Studio',
    locationDetail: 'Level 2, Fashion Avenue, Dubai Mall',
    country: 'Dubai, UAE',
    paymentTerms: 'Within 14 business days after job completion',
    bonus: "AED 500 usage fee if images go live on global site",
    parking: 'Valet parking & metro access provided',
    aboutJob: `Nike Middle East is casting for its Winter Collection '25 campaign featuring our latest performance and lifestyle apparel line.  This is a multi-day paid shoot that will be used across Nike's regional digital channels, in-store displays, and selected global web placements. Models will work with our award-winning creative director and a team of international photographers.  We're looking for models who embody confidence, athletic energy, and an authentic Dubai lifestyle. No previous Nike experience required — we love fresh faces that represent our community.`,
    shootsDay: [{
      day: '1',
      startTime: '08:00',
      endTime: '08:00',
      shootType: 'Fitting & Test Shots',
      Date: 'Dec 18'
    },
    {
      day: '2',
      startTime: '08:00',
      endTime: '08:00',
      shootType: 'Main Campaign Shoot',
      Date: 'Dec 19'
    },
    {
      day: '3',
      startTime: '08:00',
      endTime: '08:00',
      shootType: 'Lifestyle & Alternate Looks',
      Date: 'Dec 20'
    }
    ]
  },
  {
    id: 2,
    image: images.application2,
    title: 'Brand Ambassador — New Year Gala Campaign',
    user: {
      companyName: 'Cartier ME',
    },
    facilities: ['Wardrobe Provided', 'Hair & Makeup', 'Catering', 'Catering'],
    specifyLocation: 'Business Bay',
    date: 'Dec 22, 2024',
    fee: '1,800',
    days: '3',
    appyTime: '3',
    status: 'pending',
    daysLeft: 3,
    spots: '2',
    relatedTo: 'Sports & Lifestyle',
    rating: '4',
    jobPosted: '35',
    weblink: 'nike.com/me',
    instalink: '@nikemiddleeast',
    taken: '1',
    duration: '3',
    applicants: '47',
    deadline: 'Dec 20, 2026',
    location: 'Dubai Mall Fashion Studio',
    locationDetail: 'Level 2, Fashion Avenue, Dubai Mall',
    country: 'Dubai, UAE',
    paymentTerms: 'Within 14 business days after job completion',
    bonus: "AED 500 usage fee if images go live on global site",
    parking: 'Valet parking & metro access provided',
    aboutJob: `Nike Middle East is casting for its Winter Collection '25 campaign featuring our latest performance and lifestyle apparel line.  This is a multi-day paid shoot that will be used across Nike's regional digital channels, in-store displays, and selected global web placements. Models will work with our award-winning creative director and a team of international photographers.  We're looking for models who embody confidence, athletic energy, and an authentic Dubai lifestyle. No previous Nike experience required — we love fresh faces that represent our community.`,
    shootsDay: [{
      day: '1',
      startTime: '08:00',
      endTime: '08:00',
      shootType: 'Fitting & Test Shots',
      Date: 'Dec 18'
    },
    {
      day: '2',
      startTime: '08:00',
      endTime: '08:00',
      shootType: 'Main Campaign Shoot',
      Date: 'Dec 19'
    },
    {
      day: '3',
      startTime: '08:00',
      endTime: '08:00',
      shootType: 'Lifestyle & Alternate Looks',
      Date: 'Dec 20'
    }
    ]
  },
  {
    id: 3,
    image: images.application1,
    title: 'Event Host',
    user: {
      companyName: 'Elite Events LLC',
    },
    facilities: ['Wardrobe Provided', 'Hair & Makeup', 'Catering', 'Catering'],
    specifyLocation: 'Abu Dhabi',
    date: 'Dec 25, 2024',
    fee: '2,200',
    days: '3',
    appyTime: '1',
    status: 'pending',
    daysLeft: 3,
    spots: '3',
    relatedTo: 'Sports & Lifestyle',
    rating: '4',
    jobPosted: '35',
    weblink: 'nike.com/me',
    instalink: '@nikemiddleeast',
    taken: '1',
    duration: '3',
    applicants: '47',
    deadline: 'Dec 20, 2026',
    location: 'Dubai Mall Fashion Studio',
    locationDetail: 'Level 2, Fashion Avenue, Dubai Mall',
    country: 'Dubai, UAE',
    paymentTerms: 'Within 14 business days after job completion',
    bonus: "AED 500 usage fee if images go live on global site",
    parking: 'Valet parking & metro access provided',
    aboutJob: `Nike Middle East is casting for its Winter Collection '25 campaign featuring our latest performance and lifestyle apparel line.  This is a multi-day paid shoot that will be used across Nike's regional digital channels, in-store displays, and selected global web placements. Models will work with our award-winning creative director and a team of international photographers.  We're looking for models who embody confidence, athletic energy, and an authentic Dubai lifestyle. No previous Nike experience required — we love fresh faces that represent our community.`,
    shootsDay: [{
      day: '1',
      startTime: '08:00',
      endTime: '08:00',
      shootType: 'Fitting & Test Shots',
      Date: 'Dec 18'
    },
    {
      day: '2',
      startTime: '08:00',
      endTime: '08:00',
      shootType: 'Main Campaign Shoot',
      Date: 'Dec 19'
    },
    {
      day: '3',
      startTime: '08:00',
      endTime: '08:00',
      shootType: 'Lifestyle & Alternate Looks',
      Date: 'Dec 20'
    }
    ]
  },
  {
    id: 4,
    image: images.application1,
    title: 'Promotional Model',
    user: {
      companyName: 'Tech Expo Group',
    },
    facilities: ['Wardrobe Provided', 'Hair & Makeup', 'Catering', 'Catering'],
    specifyLocation: 'Dubai World Trade Centre',
    date: 'Dec 28, 2024',
    fee: '1,500',
    days: '3',
    appyTime: '5',
    status: 'pending',
    daysLeft: 3,
    spots: '3',
    relatedTo: 'Sports & Lifestyle',
    rating: '4',
    jobPosted: '35',
    weblink: 'nike.com/me',
    instalink: '@nikemiddleeast',
    taken: '1',
    duration: '3',
    applicants: '47',
    deadline: 'Dec 20, 2026',
    location: 'Dubai Mall Fashion Studio',
    locationDetail: 'Level 2, Fashion Avenue, Dubai Mall',
    country: 'Dubai, UAE',
    paymentTerms: 'Within 14 business days after job completion',
    bonus: "AED 500 usage fee if images go live on global site",
    parking: 'Valet parking & metro access provided',
    aboutJob: `Nike Middle East is casting for its Winter Collection '25 campaign featuring our latest performance and lifestyle apparel line.  This is a multi-day paid shoot that will be used across Nike's regional digital channels, in-store displays, and selected global web placements. Models will work with our award-winning creative director and a team of international photographers.  We're looking for models who embody confidence, athletic energy, and an authentic Dubai lifestyle. No previous Nike experience required — we love fresh faces that represent our community.`,
    shootsDay: [{
      day: '1',
      startTime: '08:00',
      endTime: '08:00',
      shootType: 'Fitting & Test Shots',
      Date: 'Dec 18'
    },
    {
      day: '2',
      startTime: '08:00',
      endTime: '08:00',
      shootType: 'Main Campaign Shoot',
      Date: 'Dec 19'
    },
    {
      day: '3',
      startTime: '08:00',
      endTime: '08:00',
      shootType: 'Lifestyle & Alternate Looks',
      Date: 'Dec 20'
    }
    ]
  },
];

export const jobInfoList = [
  {
    id: 1,
    label: 'Shoot Date',
    value: 'March 25, 2024',
    icon: <CalendarIcon2 />,
  },
  { id: 2, label: 'Duration', value: '4 Hours', icon: <ClockOutlineIcon /> },
  { id: 3, label: 'Location', value: 'Dubai Marina', icon: <PinIcon2 /> },
  {
    id: 4,
    label: 'Payment',
    value: 'AED 2,500',
    icon: <CashIcon />,
    withGradient: true,
  },
];

export const timelineList = [
  {
    id: 1,
    title: 'Shortlisted by Brand',
    description: 'Your profile matched their requirements perfectly ',
    time: 'Today at 10:45 AM',
    icon: <CheckIcon />,
    isShortlisted: true,
  },
  {
    id: 2,
    title: 'Profile Reviewed',
    description: 'The brand viewed your portfolio',
    time: 'Mar 15 at 2:30 PM',
    icon: <EyeIcon />,
    isShortlisted: false,
  },
  {
    id: 3,
    title: 'Application Submitted',
    description: 'You applied for this role',
    time: 'Mar 15 at 2:30 PM',
    icon: <SendIcon />,
    isShortlisted: false,
  },
];

export const timelineRowList = [
  {
    id: 1,
    title: 'Applied',
    date: 'Mar 15',
    bgColor: colors.primary,
    icon: <CheckIcon width={12.25} height={14} color={colors.gray_1} />,
  },
  {
    id: 2,
    title: 'Shortlisted',
    date: 'Today',
    bgColor: colors.primary_3,
    icon: <DotIcon />,
  },
  {
    id: 3,
    title: 'Booked',
    date: 'Pending',
    bgColor: colors.gray,
    icon: (
      <CalendarCheckIcon width={12.25} height={14} fillColor={colors.gray_4} />
    ),
  },
  {
    id: 4,
    title: 'Completed',
    date: 'Pending',
    bgColor: colors.gray,
    icon: <CheckCircleIcon width={18} height={14} color={colors.gray_4} />,
  },
];

export const eventDetailList = [
  {
    id: 1,
    label: 'Event Dates',
    detail: 'March 15-17, 2024',
    time: '3 days • 6 hours per day',
  },
  {
    id: 2,
    label: 'Location',
    detail: 'Dubai Mall Fashion Arena',
    time: 'Downtown Dubai, UAE',
  },
  {
    id: 3,
    label: 'Payment',
    detail: 'AED 4,500',
    time: 'Paid via secure escrow • Released after completion',
  },
  {
    id: 4,
    label: 'Response Deadline',
    detail: 'Within 24 hours',
    time: 'Confirm by Feb 28, 2024 at 6:00 PM',
  },
];

export const stepsList = [
  {
    id: 1,
    title: 'Confirm Your Availability',
    description: "Let the brand know you're available for all event dates",
  },
  {
    id: 2,
    title: 'Brand Confirms Booking',
    description: "They'll finalize and send you booking details",
  },
  {
    id: 3,
    title: 'Payment Secured in Escrow',
    description: 'Full amount held safely until job completion',
  },
  {
    id: 4,
    title: 'Complete Job & Get Paid',
    description: 'Funds released to your account after confirmation',
  },
];

export const verificationsInfoList = [
  {
    id: 1,
    title: 'GPS Verification',
    description: "We'll verify you're at the correct location",
    icon: <CheckIcon color={colors.green} width={12.25} height={14} />,
    iconBg: colors.lightGreen_1,
  },
  {
    id: 2,
    title: 'Photo Confirmation',
    description: 'Take a quick selfie to confirm attendance',
    icon: <CameraIcon />,
    iconBg: colors.lightBlue_8,
  },
];

export const eventInfoList = [
  {
    id: 1,
    title: 'Dress Code',
    description: 'Casual Chic - Bring 3 outfit options',
    icon: <DressIcon />,
    iconBg: colors.lightBlue_4,
  },
  {
    id: 2,
    title: 'Contact Person',
    description: 'Sarah Ahmed - Event Coordinator',
    icon: <UserIcon color={colors.pink} />,
    iconBg: colors.light_red1,
  },
  {
    id: 3,
    title: 'Requirements',
    description: 'Emirates ID, Portfolio, Comfortable shoes',
    icon: <ClipBoardIcon />,
    iconBg: colors.lightBlue_7,
  },
  {
    id: 4,
    title: 'Refreshments',
    description: 'Lunch & beverages provided',
    icon: <MealIcon />,
    iconBg: colors.green_1,
  },
];

export const timeList = [
  { id: 1, label: '1', unit: 'Hours' },
  { id: 2, label: '24', unit: 'Minutes' },
  { id: 3, label: '36', unit: 'Seconds' },
];

export const whatToBringList = [
  { id: 1, label: 'Emirates ID for verification' },
  { id: 2, label: 'Casual summer outfits (3-4 options)' },
  { id: 3, label: 'Natural makeup & styling products' },
];
export const quickTagsList = [
  { id: 1, label: 'Professional' },
  { id: 2, label: 'On Time' },
  { id: 3, label: 'Great Communication' },
  { id: 4, label: 'Easy Payment' },
  { id: 5, label: 'Would Work Again' },
];

export const applyRequirementList = [
  { id: 1, label: `Height: 5'8" or above` },
  { id: 2, label: `Previous modeling experience required` },
  { id: 3, label: `Professional portfolio mandatory` },
  { id: 4, label: `Must be available for all 3 days` },
];
export const applicationTipsList = [
  { id: 1, label: `Highlight relevant modeling experience` },
  { id: 2, label: `Include high-quality portfolio photos` },
  { id: 3, label: `Be flexible with your availability` },
];

export const LevelsList = [
  { id: 1, label: 'Beginner', value: 'BEGINNER' },
  { id: 2, label: 'Intermediate', value: 'INTERMEDIATE' },
  { id: 3, label: 'Expert', value: 'EXPERT' },
];

export const portfolioTips = [
  { id: 1, label: 'Use high-resolution images (min 1080px)' },
  { id: 2, label: 'Show variety: headshots, full body, action shots' },
  { id: 3, label: 'Keep videos under 2 minutes and well-lit' },
];

export const optionsList = [
  { id: 1, label: 'Share contact details' },
  { id: 2, label: 'Available for travel' },
  { id: 3, label: 'Flexible with timing' },
];

export const CHAT_DATA = [
  {
    id: '1',
    type: 'received',
    message:
      "Hi! We reviewed your profile and think you'd be perfect for our upcoming fashion campaign.",
    timestamp: '10:23 AM',
    avatar:
      'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',
    createdAt: '2026-01-27T10:23:00Z',
  },
  {
    id: '2',
    type: 'received',
    message: 'The shoot is scheduled for next Saturday. Are you available?',
    timestamp: '10:24 AM',
    avatar:
      'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',
    createdAt: '2026-01-27T10:23:00Z',
  },
  {
    id: '3',
    type: 'sent',
    message: "Thank you so much! Yes, I'm available next Saturday.",
    timestamp: '10:26 AM',
    status: 'read', // 'sent', 'delivered', 'read'
    createdAt: '2026-01-27T10:23:00Z',
  },
  {
    id: '4',
    type: 'sent',
    message: 'Could you share more details about the campaign and location?',
    timestamp: '10:27 AM',
    status: 'read',
    createdAt: '2026-01-27T10:23:00Z',
  },
  {
    id: '5',
    type: 'received',
    message:
      "Of course! It's a luxury fashion shoot for our Spring/Summer collection. Location is Dubai Marina.",
    timestamp: '10:29 AM',
    avatar:
      'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',
    createdAt: '2026-01-27T10:23:00Z',
  },
  {
    id: '6',
    type: 'received',
    file: {
      name: 'Campaign_Brief.pdf',
      size: '2.4',
      icon: '📄',
    },
    message: "Here's the full brief with all the details and mood board.",
    timestamp: '10:30 AM',
    avatar:
      'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',
    createdAt: '2026-01-27T10:23:00Z',
  },
  {
    id: '7',
    type: 'sent',
    message: "Perfect! I'll review the brief and get back to you shortly.",
    timestamp: '10:32 AM',
    status: 'read',
    createdAt: '2026-01-27T10:23:00Z',
  },
  {
    id: '8',
    type: 'received',
    avatar:
      'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',
    isTyping: true,
  },
];

export const dummyTransactions = [
  {
    id: 1,
    title: 'Payment Received',
    detail: 'Fashion Show Event',
    date: 'Dec 8, 2024',
    status: 'completed',
    amount: '+AED 2,500',
  },
  {
    id: 2,
    title: 'In Escrow',
    detail: 'Brand Campaign Shoot',
    date: 'Dec 6, 2024',
    status: 'pending',
    amount: 'AED 3,200',
  },
  {
    id: 3,
    title: 'Withdrawal',
    detail: 'To Emirates NBD ****4829',
    date: 'Dec 5, 2024',
    status: 'processed',
    amount: '-AED 5,000',
  },
  {
    id: 4,
    title: 'Payment Received',
    detail: 'Product Photography',
    date: 'Dec 3, 2024',
    status: 'completed',
    amount: '+AED 1,800',
  },
];

export const paymentTimelineList = [
  { id: 1, title: 'Payment Released', time: 'Dec 8, 2024 at 2:45 PM' },
  { id: 2, title: 'Job Completed', time: 'Dec 8, 2024 at 10:30 AM' },
  { id: 3, title: 'Payment in Escrow', time: 'Dec 5, 2024 at 9:15 AM' },
  { id: 4, title: 'Booking Confirmed', time: 'Dec 3, 2024 at 4:20 PM' },
];

export const kycRequirementList = [
  { id: 1, label: 'Clear, well-lit photo of your Emirates ID' },
  { id: 2, label: 'All details must be readable' },
  { id: 3, label: 'ID must be valid and not expired' },
];
export const kycGuidelineList = [
  { id: 1, label: 'Hold your Emirates ID next to your face' },
  { id: 2, label: 'Face should be clearly visible and well-lit' },
  { id: 3, label: 'No filters, hats, or sunglasses' },
  { id: 4, label: 'Photo must match your ID picture' },
];

export const popularTopicsList = [
  {
    id: 1,
    title: 'Payments & Escrow',
    description: 'How payments work',
    icon: <WalletIcon width={correctSize(18)} height={correctSize(18)} fillColor={colors.purple} />,
    iconBg: colors.lightBlue_2
  },
  {
    id: 2,
    title: 'Profile & Verification',
    description: 'KYC and profile setup',
    icon: <FrontIdCard width={20.25} height={18} color={colors.purple_5} />,
    iconBg: colors.lightBlue_4
  },
  {
    id: 3,
    title: 'Finding Jobs',
    description: 'How to apply and get hired',
    icon: <BriefCaseIcon width={18} height={18} color={colors.red_4} />,
    iconBg: colors.light_red1
  },
  {
    id: 4,
    title: 'Ratings & Reviews',
    description: 'How reviews work',
    icon: <StarIcon width={20.25} height={18} color={colors.green} />,
    iconBg: colors.green_1
  },

];

export const helpResourcesList = [
  { id: 1, title: "User Guide", icon: <BookIcon /> },
  { id: 2, title: "Safety Guidelines", icon: <ShieldIcon width={18} height={18} color={colors.purple} /> },
  { id: 3, title: "Terms of Service", icon: <FileIcon width={13.5} height={18} color={colors.purple} /> },
  { id: 4, title: "Privacy Policy", icon: <LockIcon width={15.75} height={18} color={colors.purple} /> }
]

export const dummyAvailability=[
  "Day 1 confirmed ✓",
  "Day 2 confirmed ✓",
  "Day 3 confirmed ✓",
]
export const dummyPortfolio=[
  "Nike AW24 TVC — Commercial",
  "Vogue Arabia — Oct '24 — Editorial",
]
export const dummyMessage=[
  "No message added",
]