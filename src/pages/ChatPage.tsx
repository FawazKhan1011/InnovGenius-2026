import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED = [
  "What documents do I need?",
  "When is the fee deadline?",
  "Help me register courses",
  "How do I get hostel allocation?",
  "Tell me about LMS setup",
  "Who is my mentor?",
];

function getLocalResponse(question: string): string {
  const q = question.toLowerCase();
  if (q.includes("document"))
    return "📄 For document verification, you'll need:\n\n• 10th & 12th Marksheets\n• Transfer Certificate\n• Aadhar Card or valid ID proof\n• Passport-size photographs (4 copies)\n• Admission letter\n\nUpload through the student portal before **June 15, 2025**. Use the Documents page to track your upload status!";
  if (q.includes("fee") || q.includes("pay"))
    return "💳 Fee payment can be completed through the portal:\n\n1. Navigate to Finance > Fee Payment\n2. Select your fee components (Tuition, Lab, Hostel)\n3. Pay via Net Banking, UPI, or Card\n\n⏰ Deadline: **June 20, 2025**\n\nDon't forget to download your receipt!";
  if (q.includes("course") || q.includes("registration") || q.includes("register"))
    return "📚 Course registration opens **July 1, 2025**:\n\n• Core subjects are auto-enrolled\n• Select 1 elective from the list\n• Choose your preferred lab section\n• Confirm your timetable slot\n\n💡 Tip: Popular electives fill up fast — register early!\nDeadline: **July 5, 2025**";
  if (q.includes("hostel") || q.includes("room"))
    return "🏨 Hostel allocation is based on your admission category:\n\n1. Check room assignment on portal (from **July 10**)\n2. Download allocation letter\n3. Acknowledge hostel rules\n4. Select mess plan (Veg/Non-Veg)\n5. Submit emergency contacts\n\n🗓 Move-in date: **July 15, 2025**";
  if (q.includes("mentor"))
    return "👨‍🏫 Each student gets a faculty mentor:\n\n• Details available by **July 20**\n• Schedule your first meeting within week 1\n• Share your academic goals\n• Bi-weekly meetings throughout the semester\n\nYour mentor is here to guide you through your academic journey! 🎯";
  if (q.includes("lms") || q.includes("learning"))
    return "💻 Your LMS account is auto-created with your student email:\n\n1. Log in at lms.college.edu\n2. Join all course channels\n3. Download pre-reading materials\n4. Complete the Orientation Module (mandatory)\n\n📅 Deadline: **July 12, 2025**";
  return "I'm your Smart Onboarding Assistant! 🎓\n\nI can help you with:\n• 📄 Document submission\n• 💳 Fee payment\n• 📚 Course registration\n• 🗓 Timetable access\n• 💻 LMS setup\n• 🏨 Hostel allocation\n• 👨‍🏫 Mentor assignment\n• 🛡 Compliance training\n\nWhat would you like to know?";
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! 👋 I'm your Smart Onboarding Assistant. I know everything about your college onboarding process. Ask me anything — I'm here to make your journey smooth and stress-free! 🎓",
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
    await new Promise((r) => setTimeout(r, 800));
    setMessages((prev) => [...prev, { role: "assistant", content: getLocalResponse(text) }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] lg:h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-xl">AI Assistant</h1>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Powered by Smart Onboarding AI
          </p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2 pb-4">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}>
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                msg.role === "assistant"
                  ? "gradient-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {msg.role === "assistant" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>
            <div
              className={cn(
                "rounded-2xl px-4 py-3 text-sm max-w-[85%] whitespace-pre-line shadow-sm",
                msg.role === "assistant"
                  ? "bg-card border text-foreground rounded-tl-md"
                  : "gradient-primary text-primary-foreground rounded-tr-md"
              )}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full gradient-primary text-primary-foreground flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-card border rounded-2xl rounded-tl-md px-4 py-3">
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 py-3">
          {SUGGESTED.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="text-xs bg-primary/5 hover:bg-primary/10 text-primary px-3.5 py-2 rounded-full transition-colors font-medium border border-primary/10"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2 pt-3 border-t">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(input)}
          placeholder="Ask me anything about your onboarding..."
          className="flex-1 bg-muted rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <Button
          size="icon"
          onClick={() => send(input)}
          disabled={!input.trim() || isLoading}
          className="gradient-primary text-primary-foreground rounded-xl h-11 w-11"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
