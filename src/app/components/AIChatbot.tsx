'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquareText, Send, Minimize2, Bot, User, Loader2 } from 'lucide-react';
import axios from 'axios';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setMessages([
      {
        id: '1',
        text: "Hi there! I'm your AI assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date().toISOString(),
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await axios.post('/api/chat', {
        message: inputValue.trim()
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.data.response,
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message to AI:', error);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. Please try again later.",
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const suggestions = ['👋 Hello', '❓ Help', '💡 Ideas'];

  if (!isMounted) {
    return null;
  }

  return (
    <div className="font-serif">
      {/* Floating AI Button */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <Button
          onClick={toggleChat}
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#996568] to-[#b87a7d] text-[#fffcf1] shadow-xl hover:shadow-[0_8px_30px_rgba(153,101,104,0.3)] transition-all duration-300 overflow-hidden group"
          size="icon"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#b87a7d] to-[#996568] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#996568] to-[#b87a7d] animate-pulse-slow opacity-20" />
          <MessageSquareText className="w-7 h-7 relative z-10 transition-transform duration-300 group-hover:rotate-[20deg]" />
          
          {messages.length === 1 && (
            <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center -mt-1 -mr-1 animate-ping-once">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          )}
        </Button>
      </div>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 opacity-100 scale-100 translate-y-0 transition-all duration-500 ease-in-out">
          <div className="w-80 h-[480px] bg-[#fffcf1]/95 backdrop-blur-xl rounded-2xl shadow-xl border border-[#d3c6b6]/50 overflow-hidden flex flex-col relative">
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[#996568]/10 to-transparent rounded-full -translate-x-12 -translate-y-12" />
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#b87a7d]/10 to-transparent rounded-full translate-x-10 translate-y-10" />
            
            {/* Chat Header */}
            <div className="relative bg-gradient-to-r from-[#996568] to-[#b87a7d] text-[#fffcf1] p-4 pt-13 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-[#fffcf1]/20 backdrop-blur-sm rounded-full flex items-center justify-center ring-2 ring-[#fffcf1]/30">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#fffcf1] animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">AI Assistant</h3>
                    <div className="text-xs text-[#fffcf1]/90 flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1" />
                      Online
                    </div>
                  </div>
                </div>
                <Button
                  onClick={toggleChat}
                  variant="ghost"
                  size="sm"
                  className="text-[#fffcf1] hover:bg-[#fffcf1]/20 rounded-full p-2 transition-transform duration-200 hover:rotate-90"
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4 relative">
              <div className="space-y-4">
                {messages.map((message) => ( // ✅ index parameter remove kar diya
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-end space-x-2 max-w-[85%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                        message.isUser 
                          ? 'bg-gradient-to-br from-[#996568] to-[#b87a7d] text-[#fffcf1]' 
                          : 'bg-white text-[#5a3e36] ring-1 ring-[#d3c6b6]/30'
                      }`}>
                        {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      
                      {/* Message bubble */}
                      <div className={`group relative ${message.isUser ? 'ml-auto' : ''}`}>
                        <div
                          className={`px-4 py-2 rounded-2xl relative shadow-md transition-all duration-200 ${
                            message.isUser
                              ? 'bg-gradient-to-br from-[#996568] to-[#b87a7d] text-[#fffcf1] rounded-br-md'
                              : 'bg-[#fffcf1] text-[#5a3e36] rounded-tl-md ring-1 ring-[#d3c6b6]/30'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.text}</p>
                          
                          {/* Triangle pointer */}
                          <div className={`absolute bottom-0 w-0 h-0 ${
                            message.isUser 
                              ? 'right-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-[#996568]'
                              : 'left-0 border-r-[8px] border-r-transparent border-t-[8px] border-t-[#fffcf1]'
                          }`} />
                        </div>
                        
                        {/* Timestamp */}
                        <div className={`text-[0.6rem] mt-1 opacity-70 ${
                          message.isUser ? 'text-right text-[#5a3e36]' : 'text-left text-[#5a3e36]'
                        }`}>
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-end space-x-2">
                      <div className="w-8 h-8 bg-white text-[#5a3e36] rounded-full flex items-center justify-center ring-1 ring-[#d3c6b6]/30">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-[#fffcf1] text-[#5a3e36] rounded-2xl rounded-tl-md px-4 py-2 shadow-md ring-1 ring-[#d3c6b6]/30">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-[#996568] rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                          <div className="w-2 h-2 bg-[#996568] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-[#996568] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t border-[#d3c6b6]/50 bg-[#fffcf1]/80 backdrop-blur-sm">
              <div className="flex space-x-2 items-end">
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="w-full rounded-full border border-[#d3c6b6]/50 focus:border-[#996568] transition-all duration-300 bg-[#fffcf1]/50 text-[#5a3e36] placeholder-[#5a3e36]/60 pr-10 py-2 text-sm"
                    disabled={isTyping}
                  />
                  {inputValue && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#5a3e36]/40">
                      {inputValue.length}/120
                    </div>
                  )}
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  size="icon"
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#996568] to-[#b87a7d] text-[#fffcf1] hover:from-[#b87a7d] hover:to-[#996568] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </div>
              
              {/* Quick suggestions */}
              <div className="flex flex-wrap gap-2 mt-3">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInputValue(suggestion)}
                    className="px-3 py-1 text-xs bg-[#d3c6b6]/30 text-[#5a3e36] rounded-full hover:bg-[#996568]/20 transition-all duration-200 hover:scale-105"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}