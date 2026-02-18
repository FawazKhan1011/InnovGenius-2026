import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, X, Bot, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What documents do I need?",
  "When is the fee deadline?",
  "Help me register courses",
  "How do I get hostel allocation?",
];

function getLocalResponse(question: string): string {
  const q = question.toLowerCase();
  if (q.includes("document"))
    return "For document verification, you'll need:\n\n• 10th & 12th Marksheets\n• Transfer Certificate\n• Aadhar Card or valid ID proof\n• Passport-size photographs (4 copies)\n• Admission letter\n\nUpload all documents through the portal before **June 15, 2025**.";
  if (q.includes("fee") || q.includes("pay"))
    return "Fee payment steps:\n\n1. Go to Finance > Fee Payment\n2. Select fee components\n3. Pay via UPI, Card, or Net Banking\n\nDeadline: **June 20, 2025** ⏰";
  if (q.includes("course") || q.includes("registration") || q.includes("register"))
    return "Course registration opens **July 1, 2025**:\n\n• Core subjects auto-enrolled\n• Select 1 elective\n• Choose lab section\n• Confirm timetable\n\nTip: Popular electives fill up fast! 🏃";
  if (q.includes("hostel") || q.includes("room"))
    return "Hostel allocation details:\n\n1. Check room on portal (from **July 10**)\n2. Download allocation letter\n3. Select mess plan\n4. Submit emergency contacts\n\nMove-in: **July 15, 2025** 🏠";
  if (q.includes("timetable") || q.includes("schedule"))
    return "Your timetable will be available after course registration:\n\n• Access via Academic > My Timetable\n• Sync to Google Calendar\n• Exam schedule by **August 1** 📅";
  if (q.includes("mentor"))
    return "Your mentor details appear by **July 20**:\n\n• Schedule first meeting within week 1\n• Share your academic goals\n• Bi-weekly meetings throughout semester 👨‍🏫";
  return "I'm your Smart Onboarding Assistant! 🎓 I can help with:\n\n• Documents & uploads\n• Fee payment\n• Course registration\n• Hostel allocation\n• Timetable & LMS\n• Mentor assignment\n\nWhat would you like to know?";
}

export default function ChatAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! 👋 I'm your Smart Onboarding Assistant. Ask me anything about your college onboarding!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: text.trim() }]);
    setInput("");
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const response = getLocalResponse(text);
    setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-50 w-14 h-14 rounded-full gradient-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
        )}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-40 right-4 lg:bottom-24 lg:right-6 z-50 w-[calc(100vw-2rem)] max-w-[380px] max-h-[480px] bg-card border rounded-2xl shadow-lg flex flex-col overflow-hidden animate-fade-in">
          <div className="gradient-primary p-4 text-primary-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-sm">Onboarding Assistant</h3>
                <p className="text-[10px] opacity-80">Always here to help ✨</p>
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[300px]">
            {messages.map((msg, i) => (
              <div key={i} className={cn("flex gap-2", msg.role === "user" && "flex-row-reverse")}>
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center shrink-0",
                    msg.role === "assistant"
                      ? "gradient-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {msg.role === "assistant" ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>
                <div
                  className={cn(
                    "rounded-2xl px-3.5 py-2.5 text-sm max-w-[80%] whitespace-pre-line",
                    msg.role === "assistant"
                      ? "bg-muted text-foreground rounded-tl-md"
                      : "gradient-primary text-primary-foreground rounded-tr-md"
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full gradient-primary text-primary-foreground flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-md px-3.5 py-2.5">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>

          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-[11px] bg-primary/5 hover:bg-primary/10 text-primary px-3 py-1.5 rounded-full transition-colors font-medium"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Ask about onboarding..."
              className="flex-1 bg-muted rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <Button
              size="icon"
              onClick={() => send(input)}
              disabled={!input.trim() || isLoading}
              className="gradient-primary text-primary-foreground shrink-0 rounded-xl"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
