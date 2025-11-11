import {AppImages} from './AppConstant';
import {font, FontWeight} from './AppStyle';
export const AppStrings = {
  Network: {
    internetError: 'Please check your internet connection and try again',
    somethingWrong: 'Something went wrong',
    requestTimeoutError: 'Request Timed out',
    errorTitle: 'Alert',
    tokenExpired: 'Unauthenticated.',
  },
  AuthManager: {
    fields: 'Please fill all the required fields',
    loginField: 'Please enter Email',
    emailValidation: 'Please enter a valid email',
    passwordField: 'Please enter password',
    updatePasswordField: 'Please enter confirm password',
    email: 'Please enter email',
    samePassword: 'Password and confirm password must be same',
    passwordLength: 'Password must be greater than or equal to 7 characters',
    confirmPasswordLength:
      'Confirm Password must be greater than or equal to 8 characters',
    phoneNo: 'Please enter valid phone number',
    countryError: 'Please select country.',
    portError: 'Please select port.',
    termsError: 'Please accept our terms and condition.',
  },
};
export enum LocalStorageKeys {
  journey = 'Journey',
  user = 'User',
  token = 'Token',
  appleUsersData = 'AppleUserData',
}

export const QuickFilterList = [
  {
    title: 'Make',
    key: 'make',
  },
  {
    title: 'Model',
    key: 'model',
  },
  {
    title: 'Body Type',
    key: 'bodyType',
  },
  {
    title: 'Budget',
    key: 'budget',
  },
];
export enum mainSearchFilterTypes {
  make = 'make',
  model = 'model',
  year = 'year',
  price = 'price',
  bodyType = 'bodyType',
  mileage = 'mileage',
  steering = 'steering',
  transmission = 'transmission',
  engineSize = 'engineSize',
  fuelType = 'fuelType',
  color = 'color',
  seats = 'seats',
  driveTrain = 'driveTrain',
  sort = 'sort',
}
export const mainSearchFilterList = [
  {
    title: 'Make',
    value: mainSearchFilterTypes.make,
  },
  {
    title: 'Model',
    value: mainSearchFilterTypes.model,
  },
  {
    title: 'Year',
    value: mainSearchFilterTypes.year,
  },
  {
    title: 'Price',
    value: mainSearchFilterTypes.price,
  },
  {
    title: 'Body Type',
    value: mainSearchFilterTypes.bodyType,
  },
  {
    title: 'Mileage',
    value: mainSearchFilterTypes.mileage,
  },
  {
    title: 'Steering',
    value: mainSearchFilterTypes.steering,
  },
  {
    title: 'Transmission',
    value: mainSearchFilterTypes.transmission,
  },
  {
    title: 'Engine Size',
    value: mainSearchFilterTypes.engineSize,
  },
  {
    title: 'Fuel',
    value: mainSearchFilterTypes.fuelType,
  },
  {
    title: 'Color',
    value: mainSearchFilterTypes.color,
  },
  {
    title: 'Seats',
    value: mainSearchFilterTypes.seats,
  },
  {
    title: 'Drivetrain',
    value: mainSearchFilterTypes.driveTrain,
  },
];
export const journeyCards = [
  {
    title: 'Select\nCar',
    icon: AppImages.Journey.steering,
  },
  {
    title: 'Select\nBudget',
    icon: AppImages.Journey.dollarBudget,
  },
  {
    title: 'Select\nYear',
    icon: AppImages.Journey.calendar,
  },
];
export const bottomBarList = [
  {
    name: 'Home',
    icon: AppImages.BottomBar.homeIcon,
    selectedIcon: AppImages.BottomBar.homeSelectedIcon,
  },
  {
    name: 'AR/VR',
    icon: AppImages.BottomBar.ArIcon,
    selectedIcon: AppImages.BottomBar.ArIconSelected,
  },
  {
    name: 'Agentic',
    icon: AppImages.BottomBar.agenticIcon,
    selectedIcon: AppImages.BottomBar.agenticIconSelected,
  },
  {
    name: 'Favourite',
    icon: AppImages.BottomBar.favIcon,
    selectedIcon: AppImages.BottomBar.favSelectedIcon,
  },
  {
    name: 'Menu',
    icon: AppImages.BottomBar.menuIcon,
    selectedIcon: AppImages.BottomBar.menuSelectedIcon,
  },
];
export const steeringList = [
  {
    id: 0,
    name: 'Right',
  },
  {
    id: 1,
    name: 'Left',
  },
  {
    id: 3,
    name: 'Not Set',
  },
];
export const transmissionList = [
  {
    id: 0,
    name: 'FAT',
  },
  {
    id: 1,
    name: 'CVT',
  },
  {
    id: 2,
    name: 'DCT',
  },
  {
    id: 3,
    name: 'MT',
  },
  {
    id: 4,
    name: 'Semi Automatic',
  },
  {
    id: 5,
    name: 'Sport AT',
  },
  {
    id: 6,
    name: 'Unspecified',
  },
];
export const engineSizeList = [
  '660 cc',
  '1000 cc',
  '1300 cc',
  '1500 cc',
  '2000 cc',
  '2500 cc',
  '3000 cc',
  '4000 cc',
  '5600 cc',
];
export const driveTrainList = [
  {
    id: 0,
    name: '2WD',
  },
  {
    id: 1,
    name: '4WD',
  },
  {
    id: 2,
    name: '5WD',
  },
  {
    id: 3,
    name: '7WD',
  },
];
export const priceList = ['Dollar ($)', 'YPY (¥)'];
export enum sortingTypes {
  price = 'price',
  mileage = 'mileage',
  modelYear = 'modelYear',
  date = 'date',
}
export const sortPriceList = [
  {
    title: 'Low to High',
  },
  {
    title: 'High to Low',
  },
];
export const sortMileageList = [
  {
    title: 'Low to High',
  },
  {
    title: 'High to Low',
  },
];
export const sortModelYearList = [
  {
    title: 'Oldest First',
  },
  {
    title: 'Newest First',
  },
];
export const sortDateList = [
  {
    title: 'Recent First',
  },
  {
    title: 'Oldest First',
  },
];
export const refineItems = [
  {type: 'makeModel'},
  {type: 'divider'},
  {type: 'year'},
  {type: 'divider'},
  {type: 'range'},
  {type: 'divider'},
  {type: 'bodyType'},
  {type: 'divider'},
  {type: 'mileage'},
  {type: 'divider'},
  {type: 'steering'},
  {type: 'divider'},
  {type: 'transmission'},
  {type: 'divider'},
  {type: 'engineSize'},
  {type: 'divider'},
  {type: 'color'},
  {type: 'divider'},
  {type: 'fuel'},
  {type: 'divider'},
  {type: 'seats'},
  {type: 'divider'},
  {type: 'drivetrain'},
];
export const dummyReview = `This vehicle has a low base price and a long remaining MOT period, making it a great bargain. It also comes fully equipped with a coating, dashcam, ETC, etc., so you can keep costs down after purchase. We hope you will take this opportunity to consider purchasing it.`;
export const autoFillList = [
  'Negotiate the best price ',
  'Shipping Schedule ',
  'Condition of the Car ',
];
export const loginAnimList = [
  {
    title: 'Explore a Wide Range',
    animation: require('../assets/lottie/loginAnim1.json'),
  },
  {
    title: 'Trusted & Verified',
    animation: require('../assets/lottie/loginAnim2.json'),
  },
  {
    title: 'Hassle-Free Delivery',
    animation: require('../assets/lottie/loginAnim3.json'),
  },
];
export const privacyTxt = {
  header: `Otoz.Ai recognizes the importance of social responsibility that it truthfully work to meet the needs of its customers and to contribute to the society. The Personal Information obtained from its customers in the course of business activities are an important asset of the customers and of Otoz.Ai as it leads to creation of new value. Otoz.Ai protects Personal Information from information security threats with the following Basic Policy and meets its customers expectations on its reliability As a company, Otoz.Ai is committed to the responsible handling of Personal Information.`,
  dataList: [
    {
      header: 'Personal Information Protection Policy',
      dataList: [
        'Otoz.Ai observes the Act on the Protection of Personal Information, Act on the Use of Social Security and Tax Number System in the Administrative Procedure and other relevant laws, rules, and guidelines established by the government and other regulations.',
        'Otoz.Ai has established a management framework to protect Personal Information, and assigned a person to “Personal Information Protection Administrator” position and implemented the appropriate protection of it.',
        'Otoz.Ai utilizes Personal Information within the scope of the intended use that is clearly communicated to customers, and takes measures not to be used beyond the scope. Otoz.Ai does not disclose or provide Personal Information provided by customers to third parties except with the consent of the customer from whom the Personal Information was obtained or when there is a legitimate reason.',
        'Otoz.Ai strives to prevent unauthorized access to Personal Information or the leakage, loss, or damage of Personal Information and continually enhances, re-mediates and manages information security.',
        'Otoz.Ai responds to inquiries concerning Personal Information or requests from customers for disclosure of their Personal Information sincerely and without delay.',
      ],
      titleList: ['1. ', '2. ', '3. ', '4. '],
    },
    {
      header: '1. Personal Information',
      dataList: [
        'Personal Information means information concerning a User as an individual, which can identify the User based on the name, address, telephone number, e-mail address, educational institution, or other descriptions, etc. constituting such information. In addition, any information which cannot identify the User solely by itself but can easily be collated with other information and, as a result thereof, can identify the User, is also included in the scope of Personal Information. Personal Information is described in this Privacy Policy exclude Specific Personal Information, etc.',
      ],
      titleList: [''],
    },
    {
      header: '2. Purpose of Use of Personal Information',
      dataList: [
        'Otoz.Ai will use Personal Information within the scope of the purposes provided in the Purpose of Use. The Purpose of Use is specifically defined and made clear to our customers, and is announced on our website as shown below. Otoz.Ai will make an effort to limit the Purpose of Use according to the situation in which the information is obtained.',
        'Achieving the Purpose of Use of our service and business.',
        'Notices of service, etc. to its customers.',
        'Giving notice to shareholders, provision of various types of information and shareholder management.',
        'Exercise of rights or performance of obligations based on Act of Japan and other relevant laws and ordinances.',
        'Responding to inquiries, requests, etc. from its customers.',
        'Carrying out operations incidental to (1) through (5) above and operations to properly and smoothly manage the business of Otoz.Ai. When handling Personal Information beyond the scope necessary for achieving the Purpose of Use, Otoz.Ai will seek customer’s consent except for cases prescribed under items in Paragraph 3 of Article 16 of the Privacy Act.',
      ],
      titleList: ['', '1. ', '2. ', '3. ', '4. ', '5. ', '6. '],
    },
    {
      header: '3. Provision of Personal Data to Third Parties',
      dataList: [
        'Otoz.Ai will not provide Personal Information to a third party without the customer’s consent, unless where any of the following applies:',
        'Required under laws or ordinances.',
        'Required to protect human life, body, or asset (including that of legal entities) and difficult to obtain the approval by the customer him/herself.',
        'Made to a consignee within the scope necessary for carrying out our business.',
        'To use Personal Information jointly with a group company or a business partner of Otoz.Ai within the scope of the intended use.',
        'To provide, in an unrecoverable format, Personal Information in a format that does not allow easy identification or recognition of the corresponding individual.',
        'When handling Personal Information beyond the scope necessary for achieving the Purpose of Use, Otoz.Ai will seek customer’s consent except for cases prescribed under items in Paragraph 3 of Article 16 of the Privacy Act.',
      ],
      titleList: ['', '1. ', '2. ', '3. ', '4. ', '5. ', '6. '],
    },
    {
      header:
        '4. Disclaimer concerning the provision of Personal Information to third parties',
      dataList: [
        'Otoz.Ai will not be responsible for the acquisition of Personal Information by a third party where any of the following applies:',
        'A User indicates his/her own Personal Information to a specific company, using any function under the Services or by other means (as for the handling of Personal Information in the Service Using Companies, etc., please directly make inquiries to each of the Service Using Companies, etc.).',
        'A User is unexpectedly identified by information entered by the User under the Services.',
        'A User provides Personal Information to, and the User’s Personal Information is used at, an external site linked by the Services.',
        'Anyone other than a User obtains the User’s information (ID, password, etc.) which can identify the User as an individual.',
        'Additionally to the above, Personal Information is leaked by computer viruses or similar causes.',
        '',
      ],
      titleList: ['', '1. ', '2. ', '3. ', '4. ', '5. '],
    },
    {
      header: '5. Supervision of contractors',
      dataList: [
        'Otoz.Ai may consign all or part of our customer’s Personal Information handling operation. In such a case, Otoz.Ai elects a contractor who is expected to properly handle Personal Information, appropriately specify matters concerning handling of Personal Information such as Security Management Measures, confidentiality, terms and conditions of reconsignment, return of Personal Information upon expiration or termination of contract agreement, and performs necessary and appropriate supervision.',
      ],
      titleList: [''],
    },
    {
      header: '6. Handling of Sensitive Information',
      dataList: [
        'Otoz.Ai will not collect, use, or provide to a third party Sensitive Information, including but not limited to information regarding your healthcare or case history, except for cases provided by the Privacy Act, other relevant laws, ordinances and guidelines.',
      ],
      titleList: [''],
    },
    {
      header: '7. Handling of Specific Personal Information, etc.',
      dataList: [
        'The Purpose of Use of Specific Personal Information, etc. is limited under the “My Number” Act, and Otoz.Ai will not collect or use Specific Personal Information, etc. beyond the prescribed Purpose of Use. We will not provide Specific Personal Information, etc. to a third party except in cases permitted under the “My Number” Act.',
      ],
      titleList: [''],
    },
    {
      header:
        '8. Notice of Matters, Disclosure, Amendment, or Suspension of Use of Personal Information and Specific Personal Information, etc.',
      dataList: [
        'Customer requests for any notice of matters, disclosure, amendment, or suspension of use of Personal Information and Specific Personal Information, etc. held by Otoz.Ai under the Privacy Act shall be directed to the Contact Office indicated in Clause 11 below. After confirming the customer as the requesting party, the customer is requested to complete a form designated by us. Otoz.Ai will then follow the procedures and, in principle, provide a written response in a proper, timely manner. Otoz.Ai will charge the prescribed fees for responding to a request for any disclosure.',
      ],
      titleList: [''],
    },
    {
      header: '9. Use of Cookies, etc.',
      dataList: [
        'Otoz.Ai uses cookies, etc. to provide better services on its websites.',
      ],
      titleList: [''],
    },
    {
      header:
        '10. Management of Personal Data and Specific Personal Information, etc.',
      dataList: [
        'Otoz.Ai will take rational security measures to manage Personal Information and Specific Personal Information, etc. securely and to prevent divulgence, loss, or damage to Personal Information and Specific Personal Information, etc. handled by Otoz.Ai, and will ensure the accuracy and prompt updating of Personal Information and Specific Personal Information, etc. which are necessary to achieve the Purpose of Use.',
      ],
      titleList: [''],
    },
  ],
};
export enum GeneralEnum {
  FAQs = 'FAQ’s',
  Contact = 'Contact us',
  Privacy = 'Privacy Policy',
  Terms = 'Terms and Conditions',
  Work = 'How it works',
  Currency = 'Currency',
  Ledger = 'Ledger Account',
  AboutUs = 'About us',
  HowIt = "How it works"
}
export const accountSectionList = [
  {
    title: '',
    list: [
      {
        title: 'Ledger Account',
        img: AppImages.Account.accountLedger,
        isLogin: true,
      },
      {
        title: 'Smart Matching',
        img: AppImages.Account.accountSmartMatching,
        isLogin: false,
      },
      {
        title: 'Smart Auction',
        img: AppImages.Account.accountSmartAuction,
        isLogin: false,
      },
      {
        title: 'Third Party Auction',
        img: AppImages.Account.accountThirdPartyAuction,
        isLogin: false,
      },
    ],
  },
  {
    title: 'Other',
    list: [
      {
        title: 'Currency',
        img: AppImages.Account.accountCurrency,
        isLogin: false,
      },
    ],
  },
  {
    title: 'Help and Support',
    list: [
      {
        title: 'Contact us',
        img: AppImages.Account.accountContactUs,
        isLogin: false,
      },
      {
        title: 'How it works',
        img: AppImages.Account.accountHowItWork,
        isLogin: false,
      },
      {
        title: 'FAQ’s',
        img: AppImages.Account.accountFaqs,
        isLogin: false,
      },
    ],
  },
  {
    title: 'About Otoz.ai',
    list: [
      {
        title: 'About us',
        img: AppImages.Account.accountAboutUs,
        isLogin: false,
      },
      {
        title: 'Privacy Policy',
        img: AppImages.Account.accountPrivacyPolicy,
        isLogin: false,
      },
      {
        title: 'Terms and Conditions',
        img: AppImages.Account.accountTerms,
        isLogin: false,
      },
    ],
  },
];
export const accountBtnList = [
  {
    img: AppImages.Account.accountInquiry,
    title: 'My Inquiries',
  },
  {
    img: AppImages.Account.accountOrder,
    title: 'Track Order',
  },
  {
    img: AppImages.Account.accountHistory,
    title: 'Purchase History',
  },
];
export const genderList = [
  {
    title: 'Male',
    img: AppImages.Common.male,
  },
  {
    title: 'Female',
    img: AppImages.Common.female,
  },
  {
    title: 'Other',
    img: AppImages.Common.other,
  },
];
export const orderStatusList = [
  {
    name: 'Inquiry',
    status: 1,
  },
  {
    name: 'Advance',
    status: 0,
  },
  {
    name: 'Consignee',
    status: 0,
  },
  {
    name: 'Balance',
    status: 0,
  },
  {
    name: 'Documents',
    status: 0,
  },
  {
    name: 'Received',
    status: 0,
  },
];
export const inquiryNxtTxt =
  'After finalizing the deal, please transfer the advance payment to our bank account. Details are provided in the second tab.';
export const confirmConsigneeTxt =
  'Please review your consignee details. If everything looks correct, click Submit. To make changes, click Cancel, update the details, and then submit again.';
export const confirmDeleteTxt = "Are you sure you want to permanently delete your account? This action cannot be undone, and all your data, preferences, and saved information will be permanently lost.  Please confirm if you wish to proceed with deleting your account."
export const faqItemList = [
  {
    title: 'What do I have to do to buy a car?',
    content:
      'Registration is required. After registration is completed, you can buy any car that you want.',
  },
  {
    title: 'Do you have any criteria to become a registered member of Otoz.Ai?',
    content:
      "Anyone who is an automobile dealer or an individual buyer can apply for membership. However, as an individual car buyer, we encourage you to check your country's regulations before making a purchase. We are not familiar with the laws in your country and cannot offer advice or introduce you to any car importer or customs clearing agent.",
  },
  {
    title:
      'How many used cars are normally available in your inventory and in auction?',
    content:
      'Usually, we have more than a thousand cars in our regular inventory. In addition, you can access about 150,000 cars a week available at different online auctions we cover.',
  },
  {
    title: 'What payment methods can be accepted by Otoz.Ai?',
    content:
      "Because of the high frequency of credit card fraud, we don't accept payment by credit card. We only accept payment by telegraphic transfer to our designated bank account from your bank.",
  },
  {
    title: 'How long does it take me to receive my car?',
    content:
      'We cannot tell you the exact time for your car to be delivered to you as it completely depends on the shipping schedule. However, your car will be shipped on the earliest available vessel. Usually, it takes 4 to 8 weeks.',
  },
  {
    title: 'Is there any membership fee?',
    content:
      "No. No fees or hidden charges are required. So don't hesitate and sign up now.",
  },
  {
    title:
      'If I purchase a vehicle for $2,000, how much will I have to pay in extra charges?',
    content:
      'If the price is FOB, you will have to pay freight charges, clearance fees, import duty, registration fees, compliance fees, and any other fees that may occur according to the import regulations of your country. If the price is C&F, you can omit the freight charge from the above charges.',
  },
  {
    title: 'Can I purchase LHD cars from Otoz.Ai?',
    content:
      'LHD cars are very rare in Japan. LHD cars are usually imported from countries like the US, Europe, and Korea. However, you can search for an LHD car in a fair amount of Korean and American inventory.',
  },
  {
    title: 'Can I cancel my purchase order?',
    content:
      'When you cancel an order, we may need to resell the car through an auction or by other means. Therefore, if you cancel the order, you will be responsible for paying any remaining balance as well as any associated costs.',
  },
  {
    title: 'Do you inspect the cars before shipping?',
    content:
      'All the cars are thoroughly inspected to confirm that there is no difference between the actual specifications and those on the specification sheet.',
  },
  {
    title: 'When can I use online auction service?',
    content: 'You can use it every day.',
  },
  {
    title: 'Do your staff inspect the cars before bidding?',
    content:
      'We have highly skilled professionals who carefully inspect the cars. Before the professionals decide to bid on a car, they confirm that the actual specifications and condition of the car match the information provided by the auction house.',
  },
];

export const contactUsList = [
  {
    title: 'Get in touch via WhatsApp',
    desc: 'Chat with us instantly on WhatsApp',
    img: AppImages.Account.contactWhatsapp,
  },
  {
    title: 'Call us directly',
    desc: 'We’re just a call away to assist you.',
    img: AppImages.Account.contactPhone,
  },
  {
    title: 'Email',
    desc: 'We’ll respond to your email quickly.',
    img: AppImages.Account.contactEmail,
  },
];

export const AboutUsData = [
  {
    text: 'Otoz.ai is building the ',
    font: font(14, FontWeight.Light),
  },
  {
    text: 'world’s first AI-powered cross-border automobile marketplace, ',
    font: font(14, FontWeight.SemiBold),
  },
  {
    text: 'connecting trusted sellers in developed markets with eager buyers across emerging economies. ',
    font: font(14, FontWeight.Light),
  },
  {
    text: '',
  },
  {
    text: 'With over ',
    font: font(14, FontWeight.Light),
  },
  {
    text: '17 years ',
    font: font(14, FontWeight.SemiBold),
  },
  {
    text: 'of hands-on experience in Japanese car exports to more than ',
    font: font(14, FontWeight.Light),
  },
  {
    text: '20 countries ',
    font: font(14, FontWeight.SemiBold),
  },
  {
    text: 'our team has seen every inefficiency in the industry. Traditional methods demand 18 hours of manual work per car and inflate costs by ',
    font: font(14, FontWeight.Light),
  },
  {
    text: '40% through middlemen. ',
    font: font(14, FontWeight.SemiBold),
  },
  {
    text: 'We created Otoz.ai to change that. ',
    font: font(14, FontWeight.Light),
  },
  {
    text: '',
  },
  {
    text: 'By combining AI, smart auctions, and real-time data, we reduce admin work to ',
    font: font(14, FontWeight.Light),
  },
  {
    text: '30 minutes ',
    font: font(14, FontWeight.SemiBold),
  },
  {
    text: 'empower buyers with transparent insights, and help sellers expand globally at lower cost. In just our first 90 days, we processed  ',
    font: font(14, FontWeight.Light),
  },
  {
    text: '$2.9M GMV with 9,000+ units listed ',
    font: font(14, FontWeight.SemiBold),
  },
  {
    text: 'proving both demand and scalability in one of the world’s toughest markets, Japan. ',
    font: font(14, FontWeight.Light),
  },
  {
    text: '',
  },
  {
    text: 'Our purpose is simple: to become the operating system for global used-car trade , unlocking fair prices, faster deals, and sustainable growth for millions of buyers and sellers worldwide.',
    font: font(14, FontWeight.Light),
  },
];
export const AboutUsBottomList = [
  {
    title: '100+',
    desc: 'Countries',
    anim: require('../assets/lottie/countriesAnim.json'),
  },
  {
    title: '10K+',
    desc: 'Inventory',
    anim: require('../assets/lottie/InventoryAnim.json'),
  },
  {
    title: '500+',
    desc: 'Inquiries',
    anim: require('../assets/lottie/inquiryAnim.json'),
  },
];
export const howItWorkList = [
  {
    image: require('../assets/newImages/Account/how/rideHow.png'),
    title: 'Explore Your Ride',
    desc: 'Find your perfect match',
    detail:
      'Browse our extensive car inventory and discover vehicles that suit your lifestyle. Compare, filter, and explore from trusted sources all in one place.',
  },
  {
    image: require('../assets/newImages/Account/how/sparkyHow.png'),
    title: 'Sparky',
    desc: 'Smart price negotiation',
    detail:
      'Let Sparky, your intelligent agent, handle price negotiations on your behalf. Get the best deal without the hassle and save both time and effort.',
  },
  {
    image: require('../assets/newImages/Account/how/inspectorHow.png'),
    title: 'Inspector',
    desc: 'Quality you can trust',
    detail:
      'Our expert inspector carefully checks every detail from engine performance to interior condition ensuring the car meets Otoz.ai’s quality standards.',
  },
  {
    image: require('../assets/newImages/Account/how/pennyHow.png'),
    title: 'Penny',
    desc: 'Smooth & secure payment',
    detail:
      'Penny, your financial assistant, makes transactions seamless. Choose a payment plan that fits your budget and enjoy flexible, secure payment options.',
  },
  {
    image: require('../assets/newImages/Account/how/captainHow.png'),
    title: 'Captain',
    desc: 'Handled with care',
    detail:
      'Captain ensures your car’s journey is smooth from port to your doorstep. Every shipment is tracked and managed with precision for safe delivery.',
  },
  {
    image: require('../assets/newImages/Account/how/deliveryHow.png'),
    title: 'Delivery',
    desc: 'Drive with confidence',
    detail:
      'Your journey begins here. Receive your car in pristine condition and hit the road with confidence backed by Otoz.ai’s trusted service and support.',
  },
];
