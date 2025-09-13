'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquareText, Send, Minimize2, Bot, User, X } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand what you're asking. Here's what I think...",
        "Thanks for your message! I'm processing your request.",
        "Interesting point! Let me provide you with some insights.",
        "I'm here to help! Based on what you've shared...",
        "That's a great question! Let me help you with that."
      ];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
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

  return (
    <div className="font-serif">
      {/* Floating AI Button */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
          isOpen ? 'scale-95 opacity-80' : 'scale-100 opacity-100 hover:scale-110'
        }`}
      >
        <Button
          onClick={toggleChat}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#996568] via-[#b87a7d] to-[#996568] text-[#fffcf1] shadow-xl hover:shadow-[0_8px_30px_rgba(153,101,104,0.3)] transition-all duration-300 overflow-hidden group"
          size="icon"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#b87a7d] to-[#996568] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#996568] to-[#b87a7d] animate-pulse opacity-20" />
          
          {isOpen ? (
            <X className="w-6 h-6 relative z-10 transition-transform duration-300 rotate-0" />
          ) : (
            <MessageSquareText className="w-6 h-6 relative z-10 transition-transform duration-300 rotate-0" />
          )}
          
          {/* Notification dot */}
          {!isOpen && messages.length === 1 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            </div>
          )}
        </Button>
      </div>

      {/* Chat Interface */}
      <div
        className={`fixed bottom-20 right-6 z-50 transition-all duration-500 ease-out ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="w-80 h-96 bg-[#fffcf1]/95 backdrop-blur-xl rounded-2xl shadow-xl border border-[#d3c6b6]/50 overflow-hidden flex flex-col relative">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[#996568]/10 to-transparent rounded-full -translate-x-12 -translate-y-12" />
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#b87a7d]/10 to-transparent rounded-full translate-x-10 translate-y-10" />
          
          {/* Chat Header */}
          <div className="relative bg-gradient-to-r from-[#996568] via-[#b87a7d] to-[#996568] text-[#fffcf1] p-4 shadow-md pt-13">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-8 h-8 bg-[#fffcf1]/20 backdrop-blur-sm rounded-full flex items-center justify-center ring-2 ring-[#fffcf1]/30 ">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#fffcf1]">
                    <div className="w-full h-full bg-green-400 rounded-full animate-pulse" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-sm">AI Assistant</h3>
                  <p className="text-xs text-[#fffcf1]/90 flex items-center">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
              <Button
                onClick={toggleChat}
                variant="ghost"
                size="sm"
                className="text-[#fffcf1] hover:bg-[#fffcf1]/20 rounded-full p-1 transition-all duration-200 hover:rotate-90"
              >
                <Minimize2 className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-3 relative">
            <div className="space-y-3">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={`flex items-end space-x-2 max-w-[85%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.isUser 
                        ? 'bg-gradient-to-br from-[#996568] to-[#b87a7d] text-[#fffcf1]' 
                        : 'bg-gradient-to-br from-[#d3c6b6] to-[#fffcf1] text-[#5a3e36] ring-1 ring-[#d3c6b6]/30'
                    }`}>
                      {message.isUser ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                    </div>
                    
                    {/* Message bubble */}
                    <div className={`group relative ${message.isUser ? 'ml-auto' : ''}`}>
                      <div
                        className={`px-3 py-2 rounded-xl shadow-sm relative transition-all duration-200 ${
                          message.isUser
                            ? 'bg-gradient-to-br from-[#996568] to-[#b87a7d] text-[#fffcf1] rounded-br-sm'
                            : 'bg-[#fffcf1] text-[#5a3e36] rounded-tl-sm ring-1 ring-[#d3c6b6]/30'
                        }`}
                      >
                        <p className="text-xs leading-relaxed">{message.text}</p>
                        
                        {/* Triangle pointer */}
                        <div className={`absolute bottom-0 w-0 h-0 ${
                          message.isUser 
                            ? 'right-0 border-l-[6px] border-l-transparent border-t-[6px] border-t-[#996568]'
                            : 'left-0 border-r-[6px] border-r-transparent border-t-[6px] border-t-[#fffcf1]'
                        }`} />
                      </div>
                      
                      {/* Timestamp */}
                      <p className={`text-[0.6rem] mt-0.5 opacity-60 ${
                        message.isUser ? 'text-right text-[#5a3e36]' : 'text-left text-[#5a3e36]'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start animate-in fade-in duration-300">
                  <div className="flex items-end space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#d3c6b6] to-[#fffcf1] text-[#5a3e36] rounded-full flex items-center justify-center ring-1 ring-[#d3c6b6]/30">
                      <Bot className="w-3 h-3" />
                    </div>
                    <div className="bg-[#fffcf1] text-[#5a3e36] rounded-xl rounded-tl-sm px-3 py-2 shadow-sm ring-1 ring-[#d3c6b6]/30">
                      <div className="flex space-x-1">
                        {[0, 1, 2].map(i => (
                          <div 
                            key={i}
                            className="w-1.5 h-1.5 bg-[#996568] rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-3 -pb-9 border-t border-[#d3c6b6]/50 bg-[#fffcf1]/80 backdrop-blur-sm">
            <div className="flex space-x-2 items-end">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full rounded-xl border border-[#d3c6b6]/50 focus:border-[#996568] transition-all duration-300 bg-[#fffcf1]/50 backdrop-blur-sm text-[#5a3e36] placeholder-[#5a3e36]/60 pr-10 py-2 text-xs"
                  disabled={isTyping}
                />
                {inputValue && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#5a3e36]/40 text-[0.6rem]">
                    {inputValue.length}/120
                  </div>
                )}
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                size="icon"
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#996568] to-[#b87a7d] text-[#fffcf1] hover:from-[#b87a7d] hover:to-[#996568] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="w-3 h-3" />
              </Button>
            </div>
            
            {/* Quick suggestions */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {['👋 Hello', '❓ Help', '💡 Ideas'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInputValue(suggestion.split(' ')[1])}
                  className="px-2 py-0.5 text-[0.6rem] bg-[#d3c6b6]/30 text-[#5a3e36] rounded-lg hover:bg-[#996568]/20 transition-all duration-200 hover:scale-105"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}