export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  listingId: string;
  listingTitle: string;
  listingImage: string;
  listingPrice: string;
  participants: {
    id: string;
    name: string;
    avatar: string;
    online: boolean;
  }[];
  messages: Message[];
  lastActivity: string;
}

export const currentUserId = "user1";

export const conversations: Conversation[] = [
  {
    id: "conv1",
    listingId: "1",
    listingTitle: "2 bd · 70 m² · Ismoili Somoni",
    listingImage: "/images/apt1.jpg",
    listingPrice: "$400/mo",
    participants: [
      {
        id: "user1",
        name: "You",
        avatar: "/images/avatar2.jpg",
        online: true,
      },
      {
        id: "seller1",
        name: "Farkhod Rahimov",
        avatar: "/images/avatar1.jpg",
        online: true,
      },
    ],
    messages: [
      {
        id: "m1",
        senderId: "user1",
        text: "Hi! Is this apartment still available?",
        timestamp: "2025-05-02T10:30:00",
        read: true,
      },
      {
        id: "m2",
        senderId: "seller1",
        text: "Hello! Yes, it is available. Would you like to schedule a viewing?",
        timestamp: "2025-05-02T10:32:00",
        read: true,
      },
      {
        id: "m3",
        senderId: "user1",
        text: "That would be great. Is tomorrow afternoon okay?",
        timestamp: "2025-05-02T10:35:00",
        read: true,
      },
      {
        id: "m4",
        senderId: "seller1",
        text: "Tomorrow at 3 PM works perfectly. I'll meet you at the building entrance. The address is 15 Ismoili Somoni Street.",
        timestamp: "2025-05-02T10:37:00",
        read: true,
      },
      {
        id: "m5",
        senderId: "user1",
        text: "Perfect, see you then! Can I bring my wife?",
        timestamp: "2025-05-02T10:40:00",
        read: true,
      },
      {
        id: "m6",
        senderId: "seller1",
        text: "Of course! Feel free to bring anyone. The apartment looks best in daylight anyway.",
        timestamp: "2025-05-02T10:42:00",
        read: false,
      },
    ],
    lastActivity: "10 min ago",
  },
  {
    id: "conv2",
    listingId: "4",
    listingTitle: "4 bd · 180 m² · House · Firdavsi",
    listingImage: "/images/house1.jpg",
    listingPrice: "$120,000",
    participants: [
      {
        id: "user1",
        name: "You",
        avatar: "/images/avatar2.jpg",
        online: true,
      },
      {
        id: "seller2",
        name: "Madina Karimova",
        avatar: "/images/avatar2.jpg",
        online: false,
      },
    ],
    messages: [
      {
        id: "m7",
        senderId: "user1",
        text: "Good afternoon! I am interested in the house. Is the price negotiable?",
        timestamp: "2025-05-01T14:00:00",
        read: true,
      },
      {
        id: "m8",
        senderId: "seller2",
        text: "Good afternoon! The price is somewhat flexible. What did you have in mind?",
        timestamp: "2025-05-01T14:15:00",
        read: true,
      },
      {
        id: "m9",
        senderId: "user1",
        text: "I was thinking around $110,000. The house needs some work on the exterior.",
        timestamp: "2025-05-01T14:20:00",
        read: true,
      },
      {
        id: "m10",
        senderId: "seller2",
        text: "I understand your point. Let me discuss with my family and get back to you. Can we meet on Saturday to discuss further?",
        timestamp: "2025-05-01T15:00:00",
        read: true,
      },
    ],
    lastActivity: "Yesterday",
  },
  {
    id: "conv3",
    listingId: "5",
    listingTitle: "Office · 120 m² · Rudaki Ave",
    listingImage: "/images/commercial1.jpg",
    listingPrice: "$800/mo",
    participants: [
      {
        id: "user1",
        name: "You",
        avatar: "/images/avatar2.jpg",
        online: true,
      },
      {
        id: "seller1",
        name: "Farkhod Rahimov",
        avatar: "/images/avatar1.jpg",
        online: true,
      },
    ],
    messages: [
      {
        id: "m11",
        senderId: "seller1",
        text: "Hi! I saw you viewed the office space on Rudaki. Would you like to know more details?",
        timestamp: "2025-04-30T09:00:00",
        read: true,
      },
      {
        id: "m12",
        senderId: "user1",
        text: "Yes, I'm looking for office space for my team of 10 people. Does it have enough desks?",
        timestamp: "2025-04-30T09:30:00",
        read: true,
      },
      {
        id: "m13",
        senderId: "seller1",
        text: "The space can comfortably fit 12-15 people. It comes unfurnished but I can help arrange desks and chairs if needed.",
        timestamp: "2025-04-30T09:45:00",
        read: true,
      },
    ],
    lastActivity: "2 days ago",
  },
];
