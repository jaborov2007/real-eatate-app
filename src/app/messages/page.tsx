"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { conversations, currentUserId } from "@/data/conversations";

export default function MessagesPage() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Messages</h1>
        <p className="text-sm text-gray-500 mt-1">
          {conversations.length} conversations
        </p>
      </div>

      {conversations.length === 0 ? (
        <div className="text-center py-16 px-4">
          <div className="w-20 h-20 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center mx-auto mb-4">
            <MessageCircle size={32} className="text-[var(--color-primary)]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No messages yet
          </h3>
          <p className="text-sm text-gray-500 max-w-xs mx-auto">
            Start a conversation by contacting a seller from any listing page.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-[var(--color-border)]">
          {conversations.map((conv) => {
            const other = conv.participants.find(
              (p) => p.id !== currentUserId
            );
            const lastMsg = conv.messages[conv.messages.length - 1];
            const isMyLastMsg = lastMsg?.senderId === currentUserId;
            const unreadCount = conv.messages.filter(
              (m) => m.senderId !== currentUserId && !m.read
            ).length;

            return (
              <Link
                key={conv.id}
                href={`/chat/${conv.listingId}`}
                className="flex items-start gap-3 px-5 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <Image
                    src={other?.avatar ?? "/images/avatar1.jpg"}
                    alt={other?.name ?? "User"}
                    width={52}
                    height={52}
                    className="rounded-full object-cover"
                  />
                  {other?.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-sm text-[var(--color-text)] truncate">
                      {other?.name ?? "User"}
                    </p>
                    <span className="text-xs text-gray-400 shrink-0">
                      {conv.lastActivity}
                    </span>
                  </div>

                  {/* Listing preview */}
                  <div className="flex items-center gap-2 mt-1">
                    <Image
                      src={conv.listingImage}
                      alt=""
                      width={32}
                      height={24}
                      className="rounded object-cover shrink-0"
                    />
                    <span className="text-xs text-[var(--color-primary)] font-medium truncate">
                      {conv.listingPrice} · {conv.listingTitle}
                    </span>
                  </div>

                  {/* Last message */}
                  <p className="text-sm text-gray-500 mt-1 truncate">
                    {isMyLastMsg && (
                      <span className="text-gray-400">You: </span>
                    )}
                    {lastMsg?.text ?? "No messages"}
                  </p>
                </div>

                {/* Unread badge */}
                {unreadCount > 0 && (
                  <div className="shrink-0 mt-1 w-5 h-5 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">
                      {unreadCount}
                    </span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
