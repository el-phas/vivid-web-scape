
import React, { useState } from 'react';
import { ArrowLeft, Search, MoreVertical, Phone, Video, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '@/components/TopNavigation';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  isOnline: boolean;
  unreadCount: number;
  avatar?: string;
}

const MessagesPage = () => {
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');

  // Mock data
  const conversations: Conversation[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      lastMessage: "Thank you for your inquiry about the consultation.",
      timestamp: "2 min ago",
      isOnline: true,
      unreadCount: 2
    },
    {
      id: 2,
      name: "Mike Chen",
      lastMessage: "The project proposal looks great!",
      timestamp: "1 hour ago",
      isOnline: false,
      unreadCount: 0
    },
    {
      id: 3,
      name: "Prof. Lisa Rodriguez",
      lastMessage: "Let's schedule a meeting next week.",
      timestamp: "3 hours ago",
      isOnline: true,
      unreadCount: 1
    }
  ];

  const messages: Message[] = [
    {
      id: 1,
      sender: "Dr. Sarah Johnson",
      content: "Hello! I received your message about the consultation.",
      timestamp: "10:30 AM",
      isRead: true
    },
    {
      id: 2,
      sender: "You",
      content: "Yes, I'm interested in scheduling an appointment.",
      timestamp: "10:32 AM",
      isRead: true
    },
    {
      id: 3,
      sender: "Dr. Sarah Johnson",
      content: "Perfect! I have availability next Tuesday at 2 PM. Would that work for you?",
      timestamp: "10:35 AM",
      isRead: true
    },
    {
      id: 4,
      sender: "Dr. Sarah Johnson",
      content: "Thank you for your inquiry about the consultation.",
      timestamp: "10:38 AM",
      isRead: false
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage('');
    }
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  if (selectedConversation && selectedConv) {
    return (
      <div className="min-h-screen bg-gray-100 pb-16 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white p-4 flex items-center justify-between border-b">
          <div className="flex items-center">
            <button onClick={() => setSelectedConversation(null)} className="mr-3">
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-medium">{selectedConv.name.charAt(0)}</span>
              </div>
              <div>
                <h2 className="font-semibold">{selectedConv.name}</h2>
                <p className="text-xs text-gray-500">{selectedConv.isOnline ? 'Online' : 'Last seen 1h ago'}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Phone size={18} className="text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Video size={18} className="text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <MoreVertical size={18} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'You' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-900'
              }`}>
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${message.sender === 'You' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-white p-4 border-t">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <div className="bg-white p-4 flex items-center justify-between">
        <button onClick={() => navigate('/account')} className="mr-3">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold flex-1">Messages</h1>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Search size={20} className="text-gray-600" />
        </button>
      </div>

      <div className="p-4">
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Conversations List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className="p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center">
                <div className="relative mr-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">{conversation.name.charAt(0)}</span>
                  </div>
                  {conversation.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{conversation.name}</h3>
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unreadCount > 0 && (
                  <div className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {conversation.unreadCount}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {conversations.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500 mb-4">No conversations yet.</p>
            <p className="text-sm text-gray-400">
              Start networking to begin conversations with professionals and businesses.
            </p>
          </div>
        )}
      </div>

      <TopNavigation activeIcon="messages" />
    </div>
  );
};

export default MessagesPage;
