"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send, Phone, MoreVertical } from "lucide-react";
import {
  conversations,
  currentUserId,
} from "@/data/conversations";
import { listings } from "@/data/listings";
import type { Message } from "@/data/conversations";
import { useLang } from "@/context/LangContext";

export default function ChatPage() {
  const params = useParams();
  const listingId = params.id as string;
  const { t } = useLang();

  const conv = conversations.find((c) => c.listingId === listingId);
  const listing = listings.find((l) => l.id === listingId);

  const [messages, setMessages] = useState<Message[]>(conv?.messages ?? []);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const otherParticipant = conv?.participants.find(
    (p) => p.id !== currentUserId
  ) ?? {
    id: "seller",
    name: listing?.seller.name ?? "Seller",
    avatar: listing?.seller.avatar ?? "/images/avatar1.jpg",
    online: listing?.seller.online ?? false,
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: `new-${Date.now()}`,
      senderId: currentUserId,
      text: input.trim(),
      timestamp: new Date().toISOString(),
      read: false,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    setTimeout(() => {
      const reply: Message = {
        id: `reply-${Date.now()}`,
        senderId: otherParticipant.id,
        text: getAutoReply(input.trim()),
        timestamp: new Date().toISOString(),
        read: false,
      };
      setMessages((prev) => [...prev, reply]);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-[var(--color-bg)]">
      {/* Chat Header */}
      <div className="bg-white border-b border-[var(--color-border)] shrink-0">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center gap-3">
          <Link
            href={listing ? `/listings/${listing.id}` : "/messages"}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>

          <div className="relative shrink-0">
            <Image
              src={otherParticipant.avatar}
              alt={otherParticipant.name}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            {otherParticipant.online && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-[var(--color-text)] truncate">
              {otherParticipant.name}
            </p>
            <p className="text-xs text-gray-500">
              {otherParticipant.online ? t("online") : t("lastSeen")}
            </p>
          </div>

          <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
            <Phone size={18} className="text-gray-600" />
          </button>
          <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
            <MoreVertical size={18} className="text-gray-600" />
          </button>
        </div>

        {listing && (
          <Link
            href={`/listings/${listing.id}`}
            className="block border-t border-[var(--color-border)]"
          >
            <div className="max-w-3xl mx-auto px-4 py-2 flex items-center gap-3">
              <Image
                src={listing.images[0]}
                alt=""
                width={48}
                height={36}
                className="rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 truncate">{listing.facts}</p>
                <p className="text-sm font-semibold text-[var(--color-primary)]">
                  {listing.price}
                </p>
              </div>
            </div>
          </Link>
        )}
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-3xl mx-auto px-4 py-4 space-y-3">
          {messages.map((msg) => {
            const isMe = msg.senderId === currentUserId;
            return (
              <div
                key={msg.id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 ${
                    isMe
                      ? "bg-[var(--color-primary)] text-white rounded-br-md"
                      : "bg-white border border-[var(--color-border)] text-[var(--color-text)] rounded-bl-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p
                    className={`text-[10px] mt-1 ${
                      isMe ? "text-blue-200" : "text-gray-400"
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="bg-white border-t border-[var(--color-border)] shrink-0 pb-safe">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-end gap-2">
            <div className="flex-1 bg-gray-50 border border-[var(--color-border)] rounded-2xl px-4 py-2.5 focus-within:border-[var(--color-primary)] focus-within:ring-2 focus-within:ring-[var(--color-primary)]/10 transition-all">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder={`${t("writeMessage")}...`}
                rows={1}
                className="w-full bg-transparent text-sm text-[var(--color-text)] placeholder-gray-400 outline-none resize-none"
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                input.trim()
                  ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] shadow-lg shadow-blue-500/20"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatTime(ts: string): string {
  const d = new Date(ts);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function getAutoReply(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  if (lower.includes("price") || lower.includes("cost") || lower.includes("money") || lower.includes("цена") || lower.includes("нарх"))
    return "Цена окончательная, но мы можем обсудить условия. Хотите назначить просмотр?";
  if (lower.includes("available") || lower.includes("free") || lower.includes("свободн") || lower.includes("озод"))
    return "Да, объект сейчас свободен! Когда вы хотели бы посмотреть?";
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("салом") || lower.includes("привет"))
    return "Здравствуйте! Спасибо за интерес. Чем могу помочь?";
  if (lower.includes("when") || lower.includes("time") || lower.includes("когда") || lower.includes("вақт"))
    return "Я доступен большинство дней с 10:00 до 18:00. Какое время вам подходит?";
  if (lower.includes("address") || lower.includes("where") || lower.includes("адрес") || lower.includes("суроға"))
    return "Я отправлю вам точный адрес, когда подтвердим время просмотра. Район очень удобный для транспорта.";
  return "Спасибо за ваше сообщение. Я скоро отвечу с подробностями!";
}
