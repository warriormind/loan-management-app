import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import {
  MessageCircle,
  Send,
  Bot,
  User,
  X,
  Minimize2,
  Maximize2,
  Phone,
  Mail,
  Clock
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const initialMessages: Message[] = [
  {
    id: '1',
    type: 'bot',
    content: 'Hello! I\'m your loan assistant. How can I help you today?',
    timestamp: new Date(),
    suggestions: [
      'Check my loan status',
      'Make a payment',
      'Apply for a new loan',
      'Contact support'
    ]
  }
];

const quickResponses = {
  'loan status': 'I can help you check your loan status. Please provide your loan ID or let me know which loan you\'re referring to.',
  'payment': 'I can assist you with making payments. You can pay via mobile money, bank transfer, or card. What payment method would you prefer?',
  'apply': 'Great! I can guide you through the loan application process. What type of loan are you interested in?',
  'support': 'I\'m here to help! You can contact our support team at support@loanpro.com or call us at +260-211-123456.',
  'overdue': 'If you have overdue payments, please contact our collections team immediately at collections@loanpro.com or call +260-211-123457.',
  'restructure': 'Loan restructuring may be available for eligible clients. Please provide your loan details and I\'ll guide you through the process.',
  'documents': 'You can upload documents through your dashboard or contact support for assistance with document submission.',
  'interest': 'Interest rates vary by loan product and your credit score. I can provide general information, but for personalized rates, please apply for a loan.',
  'repayment': 'Repayment schedules are customized based on your loan terms. You can view your schedule in the dashboard or I can help you calculate payments.'
};

export function ClientChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(content);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateBotResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    let response = '';
    let suggestions: string[] = [];

    // Check for keywords and generate appropriate responses
    if (input.includes('status') || input.includes('loan')) {
      response = quickResponses['loan status'];
      suggestions = ['View my loans', 'Check payment history', 'Update loan details'];
    } else if (input.includes('pay') || input.includes('payment')) {
      response = quickResponses['payment'];
      suggestions = ['Mobile money payment', 'Bank transfer', 'Card payment'];
    } else if (input.includes('apply') || input.includes('new loan')) {
      response = quickResponses['apply'];
      suggestions = ['Personal loan', 'Business loan', 'Emergency loan'];
    } else if (input.includes('support') || input.includes('help') || input.includes('contact')) {
      response = quickResponses['support'];
      suggestions = ['Call support', 'Email support', 'Live chat'];
    } else if (input.includes('overdue') || input.includes('late')) {
      response = quickResponses['overdue'];
      suggestions = ['Call collections', 'Settle payment', 'Request extension'];
    } else if (input.includes('restructure') || input.includes('modify')) {
      response = quickResponses['restructure'];
      suggestions = ['Check eligibility', 'Submit request', 'Speak to officer'];
    } else if (input.includes('document') || input.includes('upload')) {
      response = quickResponses['documents'];
      suggestions = ['Upload via dashboard', 'Required documents', 'Document status'];
    } else if (input.includes('interest') || input.includes('rate')) {
      response = quickResponses['interest'];
      suggestions = ['Current rates', 'Apply to check rate', 'Rate calculator'];
    } else if (input.includes('repay') || input.includes('schedule')) {
      response = quickResponses['repayment'];
      suggestions = ['View schedule', 'Calculate payment', 'Change frequency'];
    } else {
      response = 'I\'m here to help with your loan-related questions. You can ask me about loan status, payments, applications, or contact support. How can I assist you today?';
      suggestions = ['Check loan status', 'Make a payment', 'Apply for loan', 'Contact support'];
    }

    return {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: response,
      timestamp: new Date(),
      suggestions
    };
  };

  const handleQuickReply = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-[#00AEEF] hover:bg-[#0099CC] shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        <div className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-bold">1</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-96 ${isMinimized ? 'h-14' : 'h-[600px]'} shadow-2xl border-2 border-[#00AEEF]/20`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-[#00AEEF] text-white rounded-t-lg">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="w-5 h-5" />
            Loan Assistant
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-80 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-[#00AEEF] text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          {message.type === 'user' ? (
                            <User className="w-4 h-4" />
                          ) : (
                            <Bot className="w-4 h-4" />
                          )}
                          <span className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-sm">{message.content}</p>
                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuickReply(suggestion)}
                                className="text-xs h-6 px-2 bg-white/20 border-white/30 text-white hover:bg-white/30"
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                        <div className="flex items-center gap-2">
                          <Bot className="w-4 h-4" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>

            <div className="p-4 border-t bg-gray-50">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-[#00AEEF] hover:bg-[#0099CC]"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  <span>+260-211-123456</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  <span>support@loanpro.com</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}