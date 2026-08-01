"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { COPY } from "@/lib/copy";
import { ANALYTICS_EVENTS } from "@/lib/posthog";
import { cn } from "@/lib/utils";
import { capture } from "@/lib/analytics";

const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ||
  "https://formspree.io/f/meeywyjy";

const AGENT_OPTIONS = [
  "Claude Code",
  "Cursor",
  "Codex",
  "Copilot",
  "Devin",
  "Other",
  "None yet",
];
const CHAT_OPTIONS = ["Slack", "Discord", "Teams", "Google Chat", "Other"];

interface EmailFormProps {
  location: "hero" | "closing";
  className?: string;
}

function Chip({
  label,
  selected,
  onToggle,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={cn(
        "rounded-full px-3.5 py-1.5 font-mono text-xs font-medium tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gruv-accent",
        selected
          ? "bg-gruv-fg text-gruv-bg"
          : "bg-gruv-bg-soft text-gruv-fg-body hover:bg-gruv-bg-hover",
      )}
    >
      {label}
    </button>
  );
}

function FieldLabel({
  children,
  optional,
  htmlFor,
  as: Tag = "label",
}: {
  children: React.ReactNode;
  optional?: boolean;
  htmlFor?: string;
  as?: "label" | "legend";
}) {
  return (
    <Tag
      htmlFor={htmlFor}
      className="mb-2.5 block font-mono text-xs font-medium uppercase tracking-wider text-gruv-fg-muted"
    >
      {children}
      {optional && (
        <span className="ml-1.5 normal-case tracking-normal text-gruv-fg-dark">
          (optional)
        </span>
      )}
    </Tag>
  );
}

export function EmailForm({ location, className }: EmailFormProps) {
  const [email, setEmail] = useState("");
  const [agents, setAgents] = useState<string[]>([]);
  const [agentOther, setAgentOther] = useState("");
  const [teamChat, setTeamChat] = useState("");
  const [teamChatOther, setTeamChatOther] = useState("");
  const [visibility, setVisibility] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const hasFiredFocus = useRef(false);

  useEffect(() => {
    // Any "Get early access" CTA click brings the form back after a
    // successful submission (answers are kept so they can be edited)
    function handleDocClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest?.(
        'a[href="#closing"], a[href="#email-hero"]',
      );
      if (anchor) setStatus((prev) => (prev === "success" ? "idle" : prev));
    }
    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick);
  }, []);

  function handleFocus() {
    if (hasFiredFocus.current) return;
    hasFiredFocus.current = true;
    capture(ANALYTICS_EVENTS.EMAIL_FORM_FOCUSED, { location });
  }

  function toggleAgent(agent: string) {
    setErrorMessage("");
    setAgents((prev) =>
      prev.includes(agent) ? prev.filter((a) => a !== agent) : [...prev, agent],
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (agents.length === 0) {
      setErrorMessage(
        'Please pick at least one option under "Which agents does your team use?" — "None yet" counts.',
      );
      return;
    }
    if (agents.includes("Other") && !agentOther.trim()) {
      setErrorMessage("Please tell us which other agents your team uses.");
      return;
    }
    if (!teamChat) {
      setErrorMessage("Please pick where your team talks.");
      return;
    }
    if (teamChat === "Other" && !teamChatOther.trim()) {
      setErrorMessage("Please tell us where your team talks.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");
    try {
      const body = new FormData();
      body.append("email", email);
      const agentsValue = agents
        .map((a) => (a === "Other" ? `Other: ${agentOther.trim()}` : a))
        .join(", ");
      const teamChatValue =
        teamChat === "Other" ? `Other: ${teamChatOther.trim()}` : teamChat;
      body.append("agents_used", agentsValue);
      body.append("team_chat", teamChatValue);
      body.append("agent_visibility", visibility.trim());
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || COPY.form.error);
      }
      capture(ANALYTICS_EVENTS.EMAIL_SUBMITTED, {
        location,
        success: true,
        agents_used: agents,
        team_chat: teamChat,
      });
      setStatus("success");
    } catch (err) {
      setStatus("idle");
      const message =
        err instanceof DOMException && err.name === "TimeoutError"
          ? "The request timed out. Please try again."
          : err instanceof Error && err.message
            ? err.message
            : COPY.form.error;
      setErrorMessage(message);
      capture(ANALYTICS_EVENTS.EMAIL_SUBMITTED, { location, success: false });
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-2 rounded-full border border-gruv-green bg-gruv-green px-4 py-3 text-sm text-gruv-bg-hard",
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
        {COPY.form.success}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "w-full rounded-2xl bg-gruv-bg p-5 text-left sm:p-6",
        className,
      )}
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <FieldLabel htmlFor={`email-${location}`}>Email</FieldLabel>
          <input
            id={`email-${location}`}
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder={COPY.form.placeholder}
            value={email}
            onChange={(e) => {
              setErrorMessage("");
              setEmail(e.target.value);
            }}
            onFocus={handleFocus}
            className="input-inset w-full min-w-0 px-5 py-2.5 text-sm text-gruv-fg placeholder:text-gruv-fg-muted"
            aria-invalid={!!errorMessage}
            aria-describedby={
              errorMessage ? `email-error-${location}` : undefined
            }
          />
        </div>
        {/* Honeypot */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute h-0 w-0 opacity-0"
        />

        <fieldset>
          <FieldLabel as="legend">Which agents does your team use?</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {AGENT_OPTIONS.map((option) => (
              <Chip
                key={option}
                label={option}
                selected={agents.includes(option)}
                onToggle={() => toggleAgent(option)}
              />
            ))}
          </div>
          {agents.includes("Other") && (
            <input
              type="text"
              value={agentOther}
              onChange={(e) => {
                setErrorMessage("");
                setAgentOther(e.target.value);
              }}
              placeholder="Which other agents?"
              aria-label="Other agents"
              autoFocus
              className="input-inset mt-2.5 w-full min-w-0 px-4 py-2 text-sm text-gruv-fg placeholder:text-gruv-fg-muted"
            />
          )}
        </fieldset>

        <fieldset>
          <FieldLabel as="legend">Where does your team primarily talk?</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {CHAT_OPTIONS.map((option) => (
              <Chip
                key={option}
                label={option}
                selected={teamChat === option}
                onToggle={() => {
                  setErrorMessage("");
                  setTeamChat((prev) => (prev === option ? "" : option));
                }}
              />
            ))}
          </div>
          {teamChat === "Other" && (
            <input
              type="text"
              value={teamChatOther}
              onChange={(e) => {
                setErrorMessage("");
                setTeamChatOther(e.target.value);
              }}
              placeholder="Where does your team primarily talk?"
              aria-label="Other team chat"
              autoFocus
              className="input-inset mt-2.5 w-full min-w-0 px-4 py-2 text-sm text-gruv-fg placeholder:text-gruv-fg-muted"
            />
          )}
        </fieldset>

        <div className="sm:col-span-2">
          <FieldLabel htmlFor={`visibility-${location}`} optional>
            When an agent finishes something, how does the rest of the team find
            out?
          </FieldLabel>
          <textarea
            id={`visibility-${location}`}
            name="agent_visibility"
            rows={2}
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            placeholder="Someone pastes the result into the channel… or nobody does."
            className="input-inset w-full resize-none !rounded-xl px-4 py-3 text-sm text-gruv-fg placeholder:text-gruv-fg-muted"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-3d mt-6 w-full whitespace-nowrap px-5 py-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gruv-accent/50"
      >
        {status === "submitting" ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-gruv-bg-hard border-t-transparent" />
            Submitting…
          </span>
        ) : (
          COPY.form.button
        )}
      </button>
      {errorMessage && (
        <p
          id={`email-error-${location}`}
          className="mt-2 text-sm text-gruv-red"
          role="alert"
          aria-live="assertive"
        >
          {errorMessage}
        </p>
      )}
    </form>
  );
}
