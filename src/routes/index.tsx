import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUp,
  Bot,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clipboard,
  Clock3,
  FileText,
  Inbox,
  LayoutDashboard,
  Mail,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  Plus,
  RotateCcw,
  Search,
  Send,
  Sparkles,
  WandSparkles,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Workspace = "email" | "planner" | "chat";
type Tone = "Formal" | "Friendly" | "Persuasive";
type Priority = "High" | "Medium" | "Low";

type PlannedTask = {
  id: number;
  title: string;
  time: string;
  priority: Priority;
  done: boolean;
};

const workspaces = [
  { id: "email" as const, label: "Email Writer", icon: Mail, description: "Craft polished messages" },
  {
    id: "planner" as const,
    label: "Task Planner",
    icon: CalendarDays,
    description: "Organise your priorities",
  },
  {
    id: "chat" as const,
    label: "AI Assistant",
    icon: MessageSquareText,
    description: "Get workplace support",
  },
];

const sampleTasks: PlannedTask[] = [
  { id: 1, title: "Prepare quarterly performance report", time: "9:00 – 10:30 AM", priority: "High", done: false },
  { id: 2, title: "Review project roadmap with product team", time: "10:45 – 11:30 AM", priority: "High", done: false },
  { id: 3, title: "Respond to client follow-up emails", time: "1:00 – 1:45 PM", priority: "Medium", done: false },
  { id: 4, title: "Update team documentation", time: "2:00 – 3:00 PM", priority: "Medium", done: false },
  { id: 5, title: "Plan tomorrow’s focus tasks", time: "4:30 – 4:45 PM", priority: "Low", done: false },
];

const initialEmail = `Subject: Follow-up on Q3 Project Proposal

Hi Sarah,

I hope you're doing well. I wanted to follow up on the Q3 project proposal we shared last week and see if you've had a chance to review it with your team.

We're excited about the opportunity to work together and believe the proposed approach will help streamline your team's workflow while meeting the key milestones we discussed.

Would you be available for a brief call this Thursday or Friday to discuss any questions and next steps?

Best regards,
Alex`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant" },
      {
        name: "description",
        content: "Create professional emails, plan priority tasks, and get workplace guidance in one focused dashboard.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "A focused workspace for professional emails, priority planning, and everyday workplace support.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [workspace, setWorkspace] = useState<Workspace>("email");
  const [mobileOpen, setMobileOpen] = useState(false);

  const current = workspaces.find((item) => item.id === workspace) ?? workspaces[0];

  function selectWorkspace(next: Workspace) {
    setWorkspace(next);
    setMobileOpen(false);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-200 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-20 items-center justify-between border-b border-sidebar-border px-6">
          <button className="flex min-w-0 items-center gap-3 text-left" onClick={() => selectWorkspace("email")}>
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Sparkles className="size-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-bold leading-tight text-sidebar-foreground">AI Workplace</span>
              <span className="block text-xs text-muted-foreground">Productivity Assistant</span>
            </span>
          </button>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X />
          </Button>
        </div>

        <nav className="flex-1 px-4 py-6" aria-label="Main navigation">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Workspace</p>
          <div className="space-y-1.5">
            {workspaces.map((item) => {
              const Icon = item.icon;
              const selected = workspace === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => selectWorkspace(item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-3 py-3 text-left transition-colors",
                    selected
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                  )}
                >
                  <span className={cn("grid size-9 shrink-0 place-items-center rounded-md", selected && "bg-primary text-primary-foreground")}>
                    <Icon className="size-[18px]" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{item.label}</span>
                    <span className="block text-xs font-normal opacity-70">{item.description}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3 rounded-md bg-muted/70 px-3 py-3">
            <span className="grid size-9 place-items-center rounded-full bg-secondary font-semibold text-secondary-foreground">AM</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold">Alex Morgan</span>
              <span className="block text-xs text-muted-foreground">Your workspace</span>
            </span>
            <MoreHorizontal className="size-4 text-muted-foreground" />
          </div>
        </div>
      </aside>

      {mobileOpen && <button className="fixed inset-0 z-40 bg-overlay lg:hidden" aria-label="Close menu overlay" onClick={() => setMobileOpen(false)} />}

      <div className="flex min-h-screen flex-col lg:pl-72">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu />
          </Button>
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-md bg-secondary text-primary lg:hidden">
              <current.icon className="size-4" />
            </span>
            <p className="truncate text-sm font-semibold">{current.label}</p>
          </div>
          <div className="hidden max-w-xs flex-1 items-center sm:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="h-9 bg-muted/60 pl-9 shadow-none" placeholder="Search workspace" aria-label="Search workspace" />
            </div>
          </div>
          <span className="hidden items-center gap-2 text-xs font-medium text-muted-foreground md:flex">
            <span className="size-2 rounded-full bg-success" /> All systems ready
          </span>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-[1180px]">
            {workspace === "email" && <EmailWorkspace />}
            {workspace === "planner" && <PlannerWorkspace />}
            {workspace === "chat" && <ChatWorkspace />}
          </div>
        </main>

        <footer className="border-t border-border bg-muted/40 px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-[1180px] items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
            <Bot className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <p><strong className="font-semibold text-foreground">Responsible AI Disclaimer:</strong> AI-generated content may contain errors or omissions. Review and verify all outputs before using them in professional communications or decisions.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-7">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
        <WandSparkles className="size-4" /> {eyebrow}
      </div>
      <h1 className="text-2xl font-bold tracking-normal sm:text-3xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">{description}</p>
    </div>
  );
}

function EmailWorkspace() {
  const [tone, setTone] = useState<Tone>("Formal");
  const [recipient, setRecipient] = useState("Sarah Chen");
  const [purpose, setPurpose] = useState("Follow up on a proposal");
  const [details, setDetails] = useState("Ask whether the team has reviewed our Q3 proposal and suggest a short call on Thursday or Friday.");
  const [output, setOutput] = useState(initialEmail);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  function generateEmail() {
    setGenerating(true);
    window.setTimeout(() => {
      const greeting = tone === "Formal" ? `Dear ${recipient || "there"},` : `Hi ${recipient || "there"},`;
      const body = tone === "Persuasive"
        ? `I’m reaching out regarding ${purpose.toLowerCase() || "our recent conversation"}. I believe moving this forward now will help us maintain momentum and deliver the strongest possible outcome.\n\n${details || "I’d appreciate the opportunity to discuss the next steps."}`
        : tone === "Friendly"
          ? `I hope your week is going well! I wanted to check in about ${purpose.toLowerCase() || "our recent conversation"}.\n\n${details || "Let me know what works best for you."}`
          : `I’m writing regarding ${purpose.toLowerCase() || "our recent conversation"}.\n\n${details || "Please let me know how you would like to proceed."}`;
      setOutput(`Subject: ${purpose || "Following up"}\n\n${greeting}\n\n${body}\n\n${tone === "Formal" ? "Kind regards" : "Best"},\nAlex`);
      setGenerating(false);
    }, 650);
  }

  async function copyEmail() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section>
      <PageIntro eyebrow="Smart Email Generator" title="Write better emails, faster" description="Turn a few notes into a clear professional email, then refine every word before you send it." />
      <div className="grid items-start gap-5 xl:grid-cols-[0.86fr_1.14fr]">
        <div className="rounded-lg border border-border bg-card p-5 shadow-card sm:p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Email details</h2>
              <p className="mt-1 text-xs text-muted-foreground">Add context for a more useful draft.</p>
            </div>
            <span className="grid size-9 place-items-center rounded-md bg-secondary text-primary"><FileText className="size-4" /></span>
          </div>
          <div className="space-y-5">
            <Field label="Recipient" hint="Who is this email for?">
              <Input value={recipient} onChange={(event) => setRecipient(event.target.value)} placeholder="e.g. Sarah Chen" />
            </Field>
            <Field label="Purpose">
              <Input value={purpose} onChange={(event) => setPurpose(event.target.value)} placeholder="What is the email about?" />
            </Field>
            <Field label="Key details">
              <Textarea value={details} onChange={(event) => setDetails(event.target.value)} className="min-h-28 resize-none" placeholder="Include dates, context, and the desired next step..." />
            </Field>
            <Field label="Tone">
              <div className="grid grid-cols-3 gap-2" role="group" aria-label="Email tone">
                {(["Formal", "Friendly", "Persuasive"] as Tone[]).map((item) => (
                  <button key={item} onClick={() => setTone(item)} className={cn("h-10 rounded-md border text-xs font-semibold transition-colors sm:text-sm", tone === item ? "border-primary bg-secondary text-primary" : "border-input bg-background text-muted-foreground hover:bg-muted")}>
                    {item}
                  </button>
                ))}
              </div>
            </Field>
            <Button className="h-11 w-full" onClick={generateEmail} disabled={generating}>
              <Sparkles className={cn(generating && "animate-spin")} /> {generating ? "Generating draft..." : "Generate email"}
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
          <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-md bg-ai-muted text-ai"><Sparkles className="size-4" /></span>
              <div><h2 className="text-sm font-semibold">Generated email</h2><p className="text-xs text-muted-foreground">AI-generated • Editable</p></div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={() => setOutput("")} aria-label="Clear email" title="Clear"><RotateCcw /></Button>
              <Button variant="outline" size="sm" onClick={copyEmail}>{copied ? <Check /> : <Clipboard />} {copied ? "Copied" : "Copy"}</Button>
            </div>
          </div>
          <div className="p-5 sm:p-6">
            <Textarea value={output} onChange={(event) => setOutput(event.target.value)} className="min-h-[430px] resize-y border-0 bg-muted/35 p-5 text-sm leading-7 shadow-none focus-visible:ring-1" aria-label="Editable generated email" />
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground"><span>Edit the draft directly above</span><span>{output.split(/\s+/).filter(Boolean).length} words</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 flex items-baseline justify-between text-sm font-medium"><span>{label}</span>{hint && <span className="text-xs font-normal text-muted-foreground">{hint}</span>}</span>{children}</label>;
}

function PlannerWorkspace() {
  const [range, setRange] = useState<"Daily" | "Weekly">("Daily");
  const [taskInput, setTaskInput] = useState("Prepare quarterly report\nReview product roadmap\nReply to client emails\nUpdate team documentation");
  const [tasks, setTasks] = useState(sampleTasks);
  const [generating, setGenerating] = useState(false);

  function generatePlan() {
    setGenerating(true);
    window.setTimeout(() => {
      const titles = taskInput.split("\n").map((item) => item.trim()).filter(Boolean);
      const times = range === "Daily" ? ["9:00 – 10:30 AM", "10:45 – 11:30 AM", "1:00 – 2:00 PM", "2:15 – 3:15 PM", "4:00 – 4:30 PM"] : ["Monday • 9:00 AM", "Tuesday • 10:30 AM", "Wednesday • 1:00 PM", "Thursday • 2:00 PM", "Friday • 10:00 AM"];
      setTasks((titles.length ? titles : sampleTasks.map((task) => task.title)).map((title, index) => ({ id: Date.now() + index, title, time: times[index % times.length], priority: index < 2 ? "High" : index < 4 ? "Medium" : "Low", done: false })));
      setGenerating(false);
    }, 650);
  }

  const completed = tasks.filter((task) => task.done).length;

  return (
    <section>
      <PageIntro eyebrow="AI Task Planner" title="Turn your workload into a clear plan" description="Add everything on your plate and get an editable schedule ordered by priority and focus." />
      <div className="grid items-start gap-5 xl:grid-cols-[0.72fr_1.28fr]">
        <div className="rounded-lg border border-border bg-card p-5 shadow-card sm:p-6">
          <h2 className="font-semibold">Plan your workload</h2><p className="mt-1 text-xs text-muted-foreground">Enter one task per line.</p>
          <div className="mt-6 space-y-5">
            <Field label="Schedule view">
              <div className="grid grid-cols-2 rounded-md bg-muted p-1">
                {(["Daily", "Weekly"] as const).map((item) => <button key={item} onClick={() => setRange(item)} className={cn("h-9 rounded text-sm font-semibold transition-all", range === item ? "bg-card text-foreground shadow-sm" : "text-muted-foreground")}>{item}</button>)}
              </div>
            </Field>
            <Field label="Tasks">
              <Textarea value={taskInput} onChange={(event) => setTaskInput(event.target.value)} className="min-h-52 resize-none leading-7" />
            </Field>
            <Button className="h-11 w-full" onClick={generatePlan} disabled={generating}><Sparkles className={cn(generating && "animate-spin")} />{generating ? "Building your plan..." : "Generate schedule"}</Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-6">
            <div><div className="flex items-center gap-2"><h2 className="font-semibold">Your {range.toLowerCase()} schedule</h2><Badge variant="secondary">AI-generated</Badge></div><p className="mt-1 text-xs text-muted-foreground">{completed} of {tasks.length} tasks completed</p></div>
            <Button variant="outline" size="sm" onClick={() => setTasks((items) => [...items, { id: Date.now(), title: "New task", time: "Choose a time", priority: "Low", done: false }])}><Plus /> Add task</Button>
          </div>
          <div className="px-5 pt-5 sm:px-6">
            <div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-success transition-all" style={{ width: `${tasks.length ? (completed / tasks.length) * 100 : 0}%` }} /></div>
          </div>
          <div className="space-y-2 p-5 sm:p-6">
            {tasks.map((task) => <TaskRow key={task.id} task={task} onChange={(next) => setTasks((items) => items.map((item) => item.id === next.id ? next : item))} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function TaskRow({ task, onChange }: { task: PlannedTask; onChange: (task: PlannedTask) => void }) {
  const priorityClass = task.priority === "High" ? "bg-priority-high text-priority-high-foreground" : task.priority === "Medium" ? "bg-priority-medium text-priority-medium-foreground" : "bg-priority-low text-priority-low-foreground";
  return (
    <div className={cn("group flex items-start gap-3 rounded-md border border-border bg-background p-3.5 transition-colors hover:border-ring/50", task.done && "bg-muted/50 opacity-70")}>
      <button onClick={() => onChange({ ...task, done: !task.done })} className={cn("mt-1 grid size-5 shrink-0 place-items-center rounded border", task.done ? "border-success bg-success text-success-foreground" : "border-input bg-card")} aria-label={task.done ? "Mark incomplete" : "Mark complete"}>{task.done && <Check className="size-3.5" />}</button>
      <div className="min-w-0 flex-1">
        <Input value={task.title} onChange={(event) => onChange({ ...task, title: event.target.value })} className={cn("h-auto border-0 p-0 font-medium shadow-none focus-visible:ring-0", task.done && "line-through")} aria-label="Task title" />
        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <Clock3 className="size-3.5 text-muted-foreground" /><Input value={task.time} onChange={(event) => onChange({ ...task, time: event.target.value })} className="h-auto w-36 border-0 p-0 text-xs text-muted-foreground shadow-none focus-visible:ring-0" aria-label="Task time" />
          <button className={cn("rounded px-2 py-0.5 text-[10px] font-bold uppercase", priorityClass)} onClick={() => onChange({ ...task, priority: task.priority === "High" ? "Medium" : task.priority === "Medium" ? "Low" : "High" })}>{task.priority}</button>
        </div>
      </div>
    </div>
  );
}

function ChatWorkspace() {
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant" as const, text: "Good morning, Alex. I’m your AI workplace assistant. I can help you prepare for meetings, refine ideas, summarise information, and work through everyday challenges. What would you like to tackle?" },
  ]);
  const suggestions = ["Help me prepare for a 1:1", "Draft a project update", "How should I prioritise today?"];

  function sendMessage(text = input) {
    const clean = text.trim();
    if (!clean || thinking) return;
    setMessages((items) => [...items, { role: "user", text: clean }]);
    setInput("");
    setThinking(true);
    window.setTimeout(() => {
      const response = clean.toLowerCase().includes("priorit")
        ? "Start by identifying the one outcome that matters most today. Block 60–90 minutes for that work first, then group quick communication tasks into one focused window. Leave lower-impact admin work for the end of the day."
        : clean.toLowerCase().includes("1:1")
          ? "For a focused 1:1, prepare three points: your most important progress update, one blocker where you need input, and one development goal. End by agreeing on clear actions, owners, and dates."
          : "Here’s a practical approach: clarify the outcome you need, list the key facts your audience needs, and finish with one specific next step. I can help turn that into a message, agenda, or action plan if you share a little more context.";
      setMessages((items) => [...items, { role: "assistant", text: response }]);
      setThinking(false);
    }, 700);
  }

  return (
    <section>
      <PageIntro eyebrow="AI Chatbot" title="Your workplace thinking partner" description="Ask a question, work through a challenge, or turn an early idea into a practical next step." />
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3"><span className="relative grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground"><Bot className="size-5" /><span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card bg-success" /></span><div><h2 className="text-sm font-semibold">Workplace Assistant</h2><p className="text-xs text-muted-foreground">AI-generated responses</p></div></div>
          <Button variant="ghost" size="icon" onClick={() => setMessages((items) => items.slice(0, 1))} aria-label="Clear conversation" title="Clear conversation"><RotateCcw /></Button>
        </div>
        <div className="h-[450px] overflow-y-auto bg-chat px-4 py-6 sm:px-8">
          <div className="mx-auto flex max-w-3xl flex-col gap-5">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={cn("flex items-start gap-3", message.role === "user" && "flex-row-reverse")}>
                <span className={cn("grid size-8 shrink-0 place-items-center rounded-md text-xs font-bold", message.role === "assistant" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground")}>{message.role === "assistant" ? <Sparkles className="size-4" /> : "AM"}</span>
                <div className={cn("max-w-[82%] rounded-lg px-4 py-3 text-sm leading-6 shadow-sm", message.role === "assistant" ? "border border-border bg-card" : "bg-primary text-primary-foreground")}>
                  {message.text}
                  {message.role === "assistant" && <div className="mt-2 text-[10px] font-semibold uppercase text-muted-foreground">AI-generated</div>}
                </div>
              </div>
            ))}
            {thinking && <div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground"><Sparkles className="size-4" /></span><div className="flex gap-1 rounded-lg border border-border bg-card px-4 py-4"><span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" /><span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:120ms]" /><span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:240ms]" /></div></div>}
          </div>
        </div>
        <div className="border-t border-border p-4 sm:p-5">
          <div className="mx-auto max-w-3xl">
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {suggestions.map((suggestion) => <button key={suggestion} onClick={() => sendMessage(suggestion)} className="shrink-0 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary">{suggestion}</button>)}
            </div>
            <form onSubmit={(event) => { event.preventDefault(); sendMessage(); }} className="flex items-end gap-2 rounded-lg border border-input bg-background p-2 shadow-sm focus-within:ring-1 focus-within:ring-ring">
              <Textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(); } }} placeholder="Ask about your work..." className="min-h-10 flex-1 resize-none border-0 py-2 shadow-none focus-visible:ring-0" aria-label="Message" />
              <Button size="icon" className="shrink-0" disabled={!input.trim() || thinking} aria-label="Send message"><ArrowUp /></Button>
            </form>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">Review important advice before acting on it.</p>
          </div>
        </div>
      </div>
    </section>
  );
}