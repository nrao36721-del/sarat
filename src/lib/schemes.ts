import type { Scheme } from "../types";

export const SCHEMES: Scheme[] = [
  {
    id: "indira-gandhi-nidp",
    name: {
      en: "Indira Gandhi National Widow Pension Scheme (IGNDPS)",
      hi: "इंदिरा गांधी राष्ट्रीय विधवा पेंशन योजना",
      te: "ఇందిరా గాంధీ జాతీయ వితంతు పెన్షన్ పథకం",
    },
    benefit: {
      en: "₹500 per month",
      hi: "₹500 प्रति माह",
      te: "నెలకు ₹500",
    },
    eligibility: {
      minAge: 40,
      maxAge: 79,
      maritalStatus: ["widow"],
      bplRequired: true,
    },
    documentsRequired: [
      {
        name: { en: "Aadhaar Card", hi: "आधार कार्ड", te: "ఆధార్ కార్డ్" },
        source: { en: "Aadhaar Enrollment Center", hi: "आधार नामांकन केंद्र", te: "ఆధార్ ఎన్రోల్‌మెంట్ సెంటర్" },
      },
      {
        name: { en: "Husband's Death Certificate", hi: "पति का मृत्यु प्रमाण पत्र", te: "భర్త మరణ ధృవీకరణ పత్రం" },
        source: { en: "Municipal Office / Gram Panchayat", hi: "नगरपालिका कार्यालय / ग्राम पंचायत", te: "మునిసిపల్ కార్యాలయం / గ్రామ పంచాయతీ" },
      },
      {
        name: { en: "Bank Passbook", hi: "बैंक पासबुक", te: "బ్యాంక్ పాస్‌బుక్" },
        source: { en: "Bank Branch", hi: "बैंक शाखा", te: "బ్యాంక్ శాఖ" },
      },
      {
        name: { en: "BPL Certificate", hi: "बीपीएल प्रमाण पत्र", te: "బిపిఎల్ ధృవీకరణ పత్రం" },
        source: { en: "Tehsildar Office", hi: "तहसीलदार कार्यालय", te: "తహసీల్దార్ కార్యాలయం" },
      },
      {
        name: { en: "Passport Photo", hi: "पासपोर्ट फोटो", te: "పాస్‌పోర్ట్ ఫోటో" },
        source: { en: "Photo Studio", hi: "फोटो स्टूडियो", te: "ఫోటో స్టూడియో" },
      },
    ],
    whereToApply: {
      en: "Block Development Office or CSC",
      hi: "ब्लॉक विकास कार्यालय या सीएससी",
      te: "బ్లాక్ డెవలప్‌మెంట్ కార్యాలయం లేదా సిఎస్సి",
    },
    category: "pension",
  },
  {
    id: "nps-unorganized",
    name: {
      en: "National Pension Scheme for Unorganised Workers",
      hi: "असंगठित क्षेत्र के श्रमिकों के लिए राष्ट्रीय पेंशन योजना",
      te: "అసంఘటిత రంగ కార్మికుల కోసం జాతీయ పెన్షన్ పథకం",
    },
    benefit: {
      en: "₹3,000 per month after age 60",
      hi: "60 वर्ष के बाद ₹3,000 प्रति माह",
      te: "60 సంవత్సరాల తర్వాత నెలకు ₹3,000",
    },
    eligibility: {
      minAge: 18,
      maxAge: 40,
      maritalStatus: ["widow"],
      bplRequired: true,
    },
    documentsRequired: [
      {
        name: { en: "Aadhaar Card", hi: "आधार कार्ड", te: "ఆధార్ కార్డ్" },
        source: { en: "Aadhaar Enrollment Center", hi: "आधार नामांकन केंद्र", te: "ఆధార్ ఎన్రోల్‌మెంట్ సెంటర్" },
      },
      {
        name: { en: "Bank Passbook", hi: "बैंक पासबुक", te: "బ్యాంక్ పాస్‌బుక్" },
        source: { en: "Bank Branch", hi: "बैंक शाखा", te: "బ్యాంక్ శాఖ" },
      },
      {
        name: { en: "BPL Certificate", hi: "बीपीएल प्रमाण पत्र", te: "బిపిఎల్ ధృవీకరణ పత్రం" },
        source: { en: "Tehsildar Office", hi: "तहसीलदार कार्यालय", te: "తహసీల్దార్ కార్యాలయం" },
      },
    ],
    whereToApply: {
      en: "CSC or Bank Branch",
      hi: "सीएससी या बैंक शाखा",
      te: "సిఎస్సి లేదా బ్యాంక్ శాఖ",
    },
    category: "pension",
  },
  {
    id: "pm-jay",
    name: {
      en: "Ayushman Bharat (PM-JAY) Health Card",
      hi: "आयुष्मान भारत (पीएम-जय) स्वास्थ्य कार्ड",
      te: "ఆయుష్మాన్ భారత్ (పిఎం-జే) ఆరోగ్య కార్డ్",
    },
    benefit: {
      en: "₹5,00,000 health insurance per year",
      hi: "₹5,00,000 वार्षिक स्वास्थ्य बीमा",
      te: "సంవత్సరానికి ₹5,00,000 ఆరోగ్య బీమా",
    },
    eligibility: {
      minAge: 18,
      maxAge: 100,
      maritalStatus: ["widow", "divorced", "separated"],
      bplRequired: true,
    },
    documentsRequired: [
      {
        name: { en: "Aadhaar Card", hi: "आधार कार्ड", te: "ఆధార్ కార్డ్" },
        source: { en: "Aadhaar Enrollment Center", hi: "आधार नामांकन केंद्र", te: "ఆధార్ ఎన్రోల్‌మెంట్ సెంటర్" },
      },
      {
        name: { en: "BPL Certificate / SECC Data", hi: "बीपीएल प्रमाण पत्र / सेक्क डेटा", te: "బిపిఎల్ ధృవీకరణ పత్రం / సెక్క్ డేటా" },
        source: { en: "Tehsildar Office", hi: "तहसीलदार कार्यालय", te: "తహసీల్దార్ కార్యాలయం" },
      },
      {
        name: { en: "Mobile Number", hi: "मोबाइल नंबर", te: "మొబైల్ నంబర్" },
        source: { en: "Any telecom provider", hi: "कोई भी टेलीकॉम प्रदाता", te: "ఏ టెలికాం ప్రొవైడర్" },
      },
    ],
    whereToApply: {
      en: "CSC or nearest government hospital",
      hi: "सीएससी या निकटतम सरकारी अस्पताल",
      te: "సిఎస్సి లేదా సమీప ప్రభుత్వ ఆసుపత్రి",
    },
    category: "health",
  },
  {
    id: "annapurna",
    name: {
      en: "Annapurna Scheme (Free Food Grains)",
      hi: "अन्नपूर्णा योजना (मुफ्त खाद्यान्न)",
      te: "అన్నపూర్ణ పథకం (ఉచిత ఆహార ధాన్యాలు)",
    },
    benefit: {
      en: "10 kg free rice/wheat per month",
      hi: "10 किग्रा मुफ्त चावल/गेहूं प्रति माह",
      te: "నెలకు 10 కేజీల ఉచిత బియ్యం/గోధుమ",
    },
    eligibility: {
      minAge: 18,
      maxAge: 100,
      maritalStatus: ["widow"],
      bplRequired: true,
    },
    documentsRequired: [
      {
        name: { en: "Aadhaar Card", hi: "आधार कार्ड", te: "ఆధార్ కార్డ్" },
        source: { en: "Aadhaar Enrollment Center", hi: "आधार नामांकन केंद्र", te: "ఆధార్ ఎన్రోల్‌మెంట్ సెంటర్" },
      },
      {
        name: { en: "BPL / Antyodaya Ration Card", hi: "बीपीएल / अंत्योदय राशन कार्ड", te: "బిపిఎల్ / అంత్యోదయ రేషన్ కార్డ్" },
        source: { en: "Rationing Office / PDS Shop", hi: "राशन कार्यालय / पीडीएस दुकान", te: "రేషన్ కార్యాలయం / పిడిఎస్ దుకాణం" },
      },
      {
        name: { en: "Husband's Death Certificate", hi: "पति का मृत्यु प्रमाण पत्र", te: "భర్త మరణ ధృవీకరణ పత్రం" },
        source: { en: "Municipal Office / Gram Panchayat", hi: "नगरपालिका कार्यालय / ग्राम पंचायत", te: "మునిసిపల్ కార్యాలయం / గ్రామ పంచాయతీ" },
      },
    ],
    whereToApply: {
      en: "Rationing Office or PDS Shop",
      hi: "राशन कार्यालय या पीडीएस दुकान",
      te: "రేషన్ కార్యాలయం లేదా పిడిఎస్ దుకాణం",
    },
    category: "food",
  },
  {
    id: "pmay-gramin",
    name: {
      en: "Pradhan Mantri Awas Yojana – Gramin (PMAY-G)",
      hi: "प्रधानमंत्री आवास योजना – ग्रामीण",
      te: "ప్రధాన మంత్రి ఆవాస్ యోజన – గ్రామీణ",
    },
    benefit: {
      en: "₹1,20,000 for house construction",
      hi: "₹1,20,000 घर निर्माण के लिए",
      te: "ఇల్లు నిర్మాణానికి ₹1,20,000",
    },
    eligibility: {
      minAge: 18,
      maxAge: 100,
      maritalStatus: ["widow", "divorced", "separated"],
      bplRequired: true,
    },
    documentsRequired: [
      {
        name: { en: "Aadhaar Card", hi: "आधार कार्ड", te: "ఆధార్ కార్డ్" },
        source: { en: "Aadhaar Enrollment Center", hi: "आधार नामांकन केंद्र", te: "ఆధార్ ఎన్రోల్‌మెంట్ సెంటర్" },
      },
      {
        name: { en: "BPL Certificate", hi: "बीपीएल प्रमाण पत्र", te: "బిపిఎల్ ధృవీకరణ పత్రం" },
        source: { en: "Tehsildar Office", hi: "तहसीलदार कार्यालय", te: "తహసీల్దార్ కార్యాలయం" },
      },
      {
        name: { en: "Bank Passbook", hi: "बैंक पासबुक", te: "బ్యాంక్ పాస్‌బుక్" },
        source: { en: "Bank Branch", hi: "बैंक शाखा", te: "బ్యాంక్ శాఖ" },
      },
      {
        name: { en: "Land Document / Khatiyan", hi: "भूमि दस्तावेज़ / खतौनी", te: "భూమి పత్రం / ఖతియాన్" },
        source: { en: "Revenue Office / Patwari", hi: "राजस्व कार्यालय / पटवारी", te: "రెవెన్యూ కార్యాలయం / పట్వారీ" },
      },
      {
        name: { en: "Passport Photo", hi: "पासपोर्ट फोटो", te: "పాస్‌పోర్ట్ ఫోటో" },
        source: { en: "Photo Studio", hi: "फोटो स्टूडियो", te: "ఫోటో స్టూడియో" },
      },
    ],
    whereToApply: {
      en: "Gram Panchayat or Block Office",
      hi: "ग्राम पंचायत या ब्लॉक कार्यालय",
      te: "గ్రామ పంచాయతీ లేదా బ్లాక్ కార్యాలయం",
    },
    category: "housing",
  },
  {
    id: "up-widow-pension",
    name: {
      en: "Uttar Pradesh Widow Pension Scheme",
      hi: "उत्तर प्रदेश विधवा पेंशन योजना",
      te: "ఉత్తర ప్రదేశ్ వితంతు పెన్షన్ పథకం",
    },
    benefit: {
      en: "₹500 per month",
      hi: "₹500 प्रति माह",
      te: "నెలకు ₹500",
    },
    eligibility: {
      minAge: 18,
      maxAge: 100,
      maritalStatus: ["widow"],
      bplRequired: false,
    },
    documentsRequired: [
      {
        name: { en: "Aadhaar Card", hi: "आधार कार्ड", te: "ఆధార్ కార్డ్" },
        source: { en: "Aadhaar Enrollment Center", hi: "आधार नामांकन केंद्र", te: "ఆధార్ ఎన్రోల్‌మెంట్ సెంటర్" },
      },
      {
        name: { en: "Husband's Death Certificate", hi: "पति का मृत्यु प्रमाण पत्र", te: "భర్త మరణ ధృవీకరణ పత్రం" },
        source: { en: "Municipal Office / Gram Panchayat", hi: "नगरपालिका कार्यालय / ग्राम पंचायत", te: "మునిసిపల్ కార్యాలయం / గ్రామ పంచాయతీ" },
      },
      {
        name: { en: "Bank Passbook", hi: "बैंक पासबुक", te: "బ్యాంక్ పాస్‌బుక్" },
        source: { en: "Bank Branch", hi: "बैंक शाखा", te: "బ్యాంక్ శాఖ" },
      },
      {
        name: { en: "Domicile Certificate", hi: "निवास प्रमाण पत्र", te: "నివాస ధృవీకరణ పత్రం" },
        source: { en: "Tehsildar Office", hi: "तहसीलदार कार्यालय", te: "తహసీల్దార్ కార్యాలయం" },
      },
      {
        name: { en: "Passport Photo", hi: "पासपोर्ट फोटो", te: "పాస్‌పోర్ట్ ఫోటో" },
        source: { en: "Photo Studio", hi: "फोटो स्टूडियो", te: "ఫోటో స్టూడియో" },
      },
    ],
    whereToApply: {
      en: "Block Development Office or Online (upsspp.gov.in)",
      hi: "ब्लॉक विकास कार्यालय या ऑनलाइन (upsspp.gov.in)",
      te: "బ్లాక్ డెవలప్‌మెంట్ కార్యాలయం లేదా ఆన్‌లైన్ (upsspp.gov.in)",
    },
    category: "pension",
  },
  {
    id: "telangana-widow-pension",
    name: {
      en: "Telangana Widow / Single Women Pension Scheme",
      hi: "तेलंगाना विधवा / एकल महिला पेंशन योजना",
      te: "తెలంగాణ వితంతు / ఒంటరి మహిళా పెన్షన్ పథకం",
    },
    benefit: {
      en: "₹2,016 per month",
      hi: "₹2,016 प्रति माह",
      te: "నెలకు ₹2,016",
    },
    eligibility: {
      minAge: 18,
      maxAge: 100,
      maritalStatus: ["widow", "divorced", "separated"],
      bplRequired: false,
    },
    documentsRequired: [
      {
        name: { en: "Aadhaar Card", hi: "आधार कार्ड", te: "ఆధార్ కార్డ్" },
        source: { en: "Aadhaar Enrollment Center", hi: "आधार नामांकन केंद्र", te: "ఆధార్ ఎన్రోల్‌మెంట్ సెంటర్" },
      },
      {
        name: { en: "Husband's Death Certificate", hi: "पति का मृत्यु प्रमाण पत्र", te: "భర్త మరణ ధృవీకరణ పత్రం" },
        source: { en: "Municipal Office / Gram Panchayat", hi: "नगरपालिका कार्यालय / ग्राम पंचायत", te: "మునిసిపల్ కార్యాలయం / గ్రామ పంచాయతీ" },
      },
      {
        name: { en: "Bank Passbook", hi: "बैंक पासबुक", te: "బ్యాంక్ పాస్‌బుక్" },
        source: { en: "Bank Branch", hi: "बैंक शाखा", te: "బ్యాంక్ శాఖ" },
      },
      {
        name: { en: "White Ration Card", hi: "सफेद राशन कार्ड", te: "తెల్ల రేషన్ కార్డ్" },
        source: { en: "Civil Supplies Office", hi: "सिविल सप्लाईज कार्यालय", te: "సివిల్ సప్లైస్ కార్యాలయం" },
      },
      {
        name: { en: "Passport Photo", hi: "पासपोर्ट फोटो", te: "పాస్‌పోర్ట్ ఫోటో" },
        source: { en: "Photo Studio", hi: "फोटो स्टूडियो", te: "ఫోటో స్టూడియో" },
      },
    ],
    whereToApply: {
      en: "MeeSeva Center or Gram Panchayat",
      hi: "मीसेवा केंद्र या ग्राम पंचायत",
      te: "మీసేవా సెంటర్ లేదా గ్రామ పంచాయతీ",
    },
    category: "pension",
  },
  {
    id: "ap-widow-pension",
    name: {
      en: "Andhra Pradesh YSR Pension Kanuka (Widow)",
      hi: "आंध्र प्रदेश वाईएसआर पेंशन कनुका (विधवा)",
      te: "ఆంధ్ర ప్రదేశ్ వైఎస్ఆర్ పెన్షన్ కనుక (వితంతు)",
    },
    benefit: {
      en: "₹3,000 per month",
      hi: "₹3,000 प्रति माह",
      te: "నెలకు ₹3,000",
    },
    eligibility: {
      minAge: 18,
      maxAge: 100,
      maritalStatus: ["widow", "divorced", "separated"],
      bplRequired: false,
    },
    documentsRequired: [
      {
        name: { en: "Aadhaar Card", hi: "आधार कार्ड", te: "ఆధార్ కార్డ్" },
        source: { en: "Aadhaar Enrollment Center", hi: "आधार नामांकन केंद्र", te: "ఆధార్ ఎన్రోల్‌మెంట్ సెంటర్" },
      },
      {
        name: { en: "Husband's Death Certificate", hi: "पति का मृत्यु प्रमाण पत्र", te: "భర్త మరణ ధృవీకరణ పత్రం" },
        source: { en: "Municipal Office / Gram Panchayat", hi: "नगरपालिका कार्यालय / ग्राम पंचायत", te: "మునిసిపల్ కార్యాలయం / గ్రామ పంచాయతీ" },
      },
      {
        name: { en: "Bank Passbook", hi: "बैंक पासबुक", te: "బ్యాంక్ పాస్‌బుక్" },
        source: { en: "Bank Branch", hi: "बैंक शाखा", te: "బ్యాంక్ శాఖ" },
      },
      {
        name: { en: "Passport Photo", hi: "पासपोर्ट फोटो", te: "పాస్‌పోర్ట్ ఫోటో" },
        source: { en: "Photo Studio", hi: "फोटो स्टूडियो", te: "ఫోటో స్టూడియో" },
      },
    ],
    whereToApply: {
      en: "Village Secretariat or Gram Sachivalayam",
      hi: "ग्राम सचिवालय या विलेज सेक्रेटेरियट",
      te: "గ్రామ సచివాలయం లేదా విలేజ్ సెక్రెటేరియట్",
    },
    category: "pension",
  },
  {
    id: "maternity-benefit",
    name: {
      en: "Maternity Benefit (Janani Suraksha Yojana)",
      hi: "मातृत्व लाभ (जननी सुरक्षा योजना)",
      te: "మాతృత్వ ప్రయోజనం (జనని సురక్ష పథకం)",
    },
    benefit: {
      en: "₹1,400 for institutional delivery (rural)",
      hi: "संस्थागत प्रसव के लिए ₹1,400 (ग्रामीण)",
      te: "సంస్థాగత ప్రసవానికి ₹1,400 (గ్రామీణ)",
    },
    eligibility: {
      minAge: 19,
      maxAge: 45,
      maritalStatus: ["widow", "divorced", "separated"],
      bplRequired: true,
    },
    documentsRequired: [
      {
        name: { en: "Aadhaar Card", hi: "आधार कार्ड", te: "ఆధార్ కార్డ్" },
        source: { en: "Aadhaar Enrollment Center", hi: "आधार नामांकन केंद्र", te: "ఆధార్ ఎన్రోల్‌మెంట్ సెంటర్" },
      },
      {
        name: { en: "BPL Card", hi: "बीपीएल कार्ड", te: "బిపిఎల్ కార్డ్" },
        source: { en: "Tehsildar Office", hi: "तहसीलदार कार्यालय", te: "తహసీల్దార్ కార్యాలయం" },
      },
      {
        name: { en: "MCP Card / Hospital Record", hi: "एमसीपी कार्ड / अस्पताल रिकॉर्ड", te: "ఎంసీపీ కార్డ్ / ఆసుపత్రి రికార్డ్" },
        source: { en: "Government Hospital", hi: "सरकारी अस्पताल", te: "ప్రభుత్వ ఆసుపత్రి" },
      },
    ],
    whereToApply: {
      en: "Government Hospital or PHC",
      hi: "सरकारी अस्पताल या पीएचसी",
      te: "ప్రభుత్వ ఆసుపత్రి లేదా పిహెచ్‌సి",
    },
    category: "health",
  },
  {
    id: "ap-ysr-asara",
    name: {
      en: "AP YSR Asara (Financial Assistance)",
      hi: "एपी वाईएसआर आसरा (वित्तीय सहायता)",
      te: "ఏపీ వైఎస్ఆర్ ఆసర (ఆర్థిక సహాయం)",
    },
    benefit: {
      en: "₹15,000 one-time financial assistance",
      hi: "₹15,000 एकमुश्त वित्तीय सहायता",
      te: "₹15,000 ఒకేసారి ఆర్థిక సహాయం",
    },
    eligibility: {
      minAge: 18,
      maxAge: 100,
      maritalStatus: ["widow"],
      bplRequired: false,
    },
    documentsRequired: [
      {
        name: { en: "Aadhaar Card", hi: "आधार कार्ड", te: "ఆధార్ కార్డ్" },
        source: { en: "Aadhaar Enrollment Center", hi: "आधार नामांकन केंद्र", te: "ఆధార్ ఎన్రోల్‌మెంట్ సెంటర్" },
      },
      {
        name: { en: "Husband's Death Certificate", hi: "पति का मृत्यु प्रमाण पत्र", te: "భర్త మరణ ధృవీకరణ పత్రం" },
        source: { en: "Municipal Office / Gram Panchayat", hi: "नगरपालिका कार्यालय / ग्राम पंचायत", te: "మునిసిపల్ కార్యాలయం / గ్రామ పంచాయతీ" },
      },
      {
        name: { en: "Bank Passbook", hi: "बैंक पासबुक", te: "బ్యాంక్ పాస్‌బుక్" },
        source: { en: "Bank Branch", hi: "बैंक शाखा", te: "బ్యాంక్ శాఖ" },
      },
    ],
    whereToApply: {
      en: "Village Secretariat / Sachivalayam",
      hi: "ग्राम सचिवालय",
      te: "గ్రామ సచివాలయం",
    },
    category: "other",
  },
  {
    id: "telangana-asara",
    name: {
      en: "Telangana Aasara Pension",
      hi: "तेलंगाना आसरा पेंशन",
      te: "తెలంగాణ ఆసర పెన్షన్",
    },
    benefit: {
      en: "₹2,016 per month",
      hi: "₹2,016 प्रति माह",
      te: "నెలకు ₹2,016",
    },
    eligibility: {
      minAge: 18,
      maxAge: 100,
      maritalStatus: ["widow", "divorced", "separated"],
      bplRequired: false,
    },
    documentsRequired: [
      {
        name: { en: "Aadhaar Card", hi: "आधार कार्ड", te: "ఆధార్ కార్డ్" },
        source: { en: "Aadhaar Enrollment Center", hi: "आधार नामांकन केंद्र", te: "ఆధార్ ఎన్రోల్‌మెంట్ సెంటర్" },
      },
      {
        name: { en: "Husband's Death Certificate", hi: "पति का मृत्यु प्रमाण पत्र", te: "భర్త మరణ ధృవీకరణ పత్రం" },
        source: { en: "Municipal Office / Gram Panchayat", hi: "नगरपालिका कार्यालय / ग्राम पंचायत", te: "మునిసిపల్ కార్యాలయం / గ్రామ పంచాయతీ" },
      },
      {
        name: { en: "Bank Passbook", hi: "बैंक पासबुक", te: "బ్యాంక్ పాస్‌బుక్" },
        source: { en: "Bank Branch", hi: "बैंक शाखा", te: "బ్యాంక్ శాఖ" },
      },
      {
        name: { en: "Passport Photo", hi: "पासपोर्ट फोटो", te: "పాస్‌పోర్ట్ ఫోటో" },
        source: { en: "Photo Studio", hi: "फोटो स्टूडियो", te: "ఫోటో స్టూడియో" },
      },
    ],
    whereToApply: {
      en: "MeeSeva Center",
      hi: "मीसेवा केंद्र",
      te: "మీసేవా సెంటర్",
    },
    category: "pension",
  },
  {
    id: "up-mukhyamantri-widow",
    name: {
      en: "UP Mukhyamantri Widow / Destitute Women Pension",
      hi: "यूपी मुख्यमंत्री विधवा / निराश्रित महिला पेंशन",
      te: "యూపీ ముఖ్యమంత్రి వితంతు / నిరాశ్రయ మహిళా పెన్షన్",
    },
    benefit: {
      en: "₹500 per month",
      hi: "₹500 प्रति माह",
      te: "నెలకు ₹500",
    },
    eligibility: {
      minAge: 18,
      maxAge: 100,
      maritalStatus: ["widow"],
      bplRequired: false,
    },
    documentsRequired: [
      {
        name: { en: "Aadhaar Card", hi: "आधार कार्ड", te: "ఆధార్ కార్డ్" },
        source: { en: "Aadhaar Enrollment Center", hi: "आधार नामांकन केंद्र", te: "ఆధార్ ఎన్రోల్‌మెంట్ సెంటర్" },
      },
      {
        name: { en: "Husband's Death Certificate", hi: "पति का मृत्यु प्रमाण पत्र", te: "భర్త మరణ ధృవీకరణ పత్రం" },
        source: { en: "Municipal Office / Gram Panchayat", hi: "नगरपालिका कार्यालय / ग्राम पंचायत", te: "మునిసిపల్ కార్యాలయం / గ్రామ పంచాయతీ" },
      },
      {
        name: { en: "Bank Passbook", hi: "बैंक पासबुक", te: "బ్యాంక్ పాస్‌బుక్" },
        source: { en: "Bank Branch", hi: "बैंक शाखा", te: "బ్యాంక్ శాఖ" },
      },
      {
        name: { en: "Income Certificate", hi: "आय प्रमाण पत्र", te: "ఆదాయ ధృవీకరణ పత్రం" },
        source: { en: "Tehsildar Office", hi: "तहसीलदार कार्यालय", te: "తహసీల్దార్ కార్యాలయం" },
      },
    ],
    whereToApply: {
      en: "Block Development Office",
      hi: "ब्लॉक विकास कार्यालय",
      te: "బ్లాక్ డెవలప్‌మెంట్ కార్యాలయం",
    },
    category: "pension",
  },
  {
    id: "swadhar-greh",
    name: {
      en: "Swadhar Greh (Shelter for Widows)",
      hi: "स्वधार गृह (विधवाओं के लिए आश्रय)",
      te: "స్వధార్ గృహ్ (వితంతువుల కోసం ఆశ్రయం)",
    },
    benefit: {
      en: "Free shelter, food, and vocational training",
      hi: "मुफ्त आश्रय, भोजन, और व्यावसायिक प्रशिक्षण",
      te: "ఉచిత ఆశ్రయం, ఆహారం, మరియు వృత్తి శిక్షణ",
    },
    eligibility: {
      minAge: 18,
      maxAge: 100,
      maritalStatus: ["widow", "divorced", "separated"],
      bplRequired: false,
    },
    documentsRequired: [
      {
        name: { en: "Aadhaar Card", hi: "आधार कार्ड", te: "ఆధార్ కార్డ్" },
        source: { en: "Aadhaar Enrollment Center", hi: "आधार नामांकन केंद्र", te: "ఆధార్ ఎన్రోల్‌మెంట్ సెంటర్" },
      },
      {
        name: { en: "Husband's Death Certificate", hi: "पति का मृत्यु प्रमाण पत्र", te: "భర్త మరణ ధృవీకరణ పత్రం" },
        source: { en: "Municipal Office / Gram Panchayat", hi: "नगरपालिका कार्यालय / ग्राम पंचायत", te: "మునిసిపల్ కార్యాలయం / గ్రామ పంచాయతీ" },
      },
    ],
    whereToApply: {
      en: "Department of Women & Child Development / NGO",
      hi: "महिला एवं बाल विकास विभाग / एनजीओ",
      te: "మహిళా & శిశు సంక్షేమ శాఖ / ఎన్జీఓ",
    },
    category: "other",
  },
];
