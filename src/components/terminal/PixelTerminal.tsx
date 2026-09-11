import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send } from 'lucide-react';
import { AnalyticsService } from '../../services/analytics';
import { useTheme } from '../../context/ThemeContext';
import userData from '../../data/user_data.json';

interface CommandOutput {
  id: number;
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
}

export const PixelTerminal: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: 1,
      type: 'output',
      text: `${userData.name.toUpperCase()}_DEVTOOLS [FLUTTER 3.24 • DART 3.5.0]`,
    },
    {
      id: 2,
      type: 'success',
      text: "System verified. Type 'help' or click suggestions below for commands.",
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    AnalyticsService.trackTerminalCommand(cmd);

    const newOutputs: CommandOutput[] = [
      ...history,
      { id: Date.now(), type: 'input', text: `wasiul@workstation:~$ ${cmd}` },
    ];

    const lower = cmd.toLowerCase();

    if (lower === 'clear' || lower === 'cls') {
      setHistory([]);
      setInput('');
      return;
    }

    if (lower === 'help') {
      newOutputs.push({
        id: Date.now() + 1,
        type: 'output',
        text: `AVAILABLE COMMANDS:\n  • flutter doctor - Check Flutter & Dart SDK environment\n  • go / fastapi   - Inspect backend service architecture\n  • skills         - List core technical stack\n  • projects       - Show commercial applications (TheClue, Jurnee)\n  • hire / contact - Display direct contact information\n  • theme          - Toggle Dark / Light mode\n  • clear          - Reset terminal screen`,
      });
    } else if (lower === 'flutter doctor' || lower === 'doctor') {
      newOutputs.push({
        id: Date.now() + 1,
        type: 'success',
        text: `[✓] Flutter SDK • cross-platform mobile & web engine verified\n[✓] Dart SDK • asynchronous runtime & reactive streams active\n[✓] Go (Gin) • concurrent microservice router ready\n[✓] Python (FastAPI) • asynchronous API & RAG worker online\n[✓] Release Targets: Apple App Store & Google Play Console`,
      });
    } else if (lower === 'go' || lower === 'golang' || lower === 'fastapi') {
      newOutputs.push({
        id: Date.now() + 1,
        type: 'output',
        text: `BACKEND STACK:\n• Go (Gin Framework) - Concurrent microservices, RESTful routing, goroutines\n• Python (FastAPI) - Asynchronous endpoints, Pydantic validation, RAG AI services`,
      });
    } else if (lower === 'skills' || lower === 'stack') {
      const skillsList = userData.skills
        .map((s) => `• ${s.technology.name} [${s.levelTag}]`)
        .join('\n');
      newOutputs.push({
        id: Date.now() + 1,
        type: 'output',
        text: `TECHNICAL SPECIALIZATIONS:\n${skillsList}`,
      });
    } else if (lower === 'projects') {
      const projList = userData.projects
        .map((p, idx) => `[${idx + 1}] ${p.title} (${p.category?.toUpperCase()})`)
        .join('\n');
      newOutputs.push({
        id: Date.now() + 1,
        type: 'output',
        text: `PRODUCTION PROJECTS:\n${projList}`,
      });
    } else if (lower === 'hire' || lower === 'contact') {
      newOutputs.push({
        id: Date.now() + 1,
        type: 'success',
        text: `DIRECT DISCUSSIONS:\nEmail: ${userData.email}\nStatus: AVAILABLE_FOR_ROLES & CONTRACTS`,
      });
    } else if (lower === 'theme') {
      toggleTheme();
      newOutputs.push({
        id: Date.now() + 1,
        type: 'output',
        text: `Theme toggled. Active mode is now ${theme === 'dark' ? 'LIGHT' : 'DARK'}.`,
      });
    } else {
      newOutputs.push({
        id: Date.now() + 1,
        type: 'error',
        text: `command not found: "${cmd}". Type 'help' for valid options.`,
      });
    }

    setHistory(newOutputs);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    }
  };

  return (
    <div className="bg-pixel-surface border-2 border-pixel-border shadow-pixel-md flex flex-col">
      {/* Title Bar */}
      <div className="bg-pixel-surface-bright px-3.5 py-1.5 border-b-2 border-pixel-border flex items-center justify-between text-[10px] font-arcade select-none">
        <div className="flex items-center gap-2 text-pixel-primary">
          <Terminal size={14} />
          <span>DART DEVTOOLS CONSOLE // REPL STATION</span>
        </div>
        <span className="font-code text-[10px] text-pixel-text-muted">
          SHELL: /bin/dart
        </span>
      </div>

      {/* Terminal Output Area */}
      <div className="p-4 bg-pixel-bg border-b-2 border-pixel-border min-h-[260px] max-h-[340px] overflow-y-auto font-code text-xs flex flex-col gap-2 select-text">
        {history.map((item) => (
          <div
            key={item.id}
            className={`whitespace-pre-wrap leading-relaxed ${
              item.type === 'input'
                ? 'text-pixel-secondary font-bold'
                : item.type === 'success'
                ? 'text-pixel-primary font-bold'
                : item.type === 'error'
                ? 'text-pixel-danger'
                : 'text-pixel-text'
            }`}
          >
            {item.text}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Quick Command Suggestions */}
      <div className="px-3 py-1.5 bg-pixel-surface-dim border-b border-pixel-border flex flex-wrap items-center gap-1.5">
        <span className="font-code text-[10px] text-pixel-text-muted font-bold mr-1">
          QUICK:
        </span>
        {['flutter doctor', 'skills', 'projects', 'hire', 'theme', 'clear'].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => executeCommand(suggestion)}
            className="font-code text-[10px] px-2 py-0.5 bg-pixel-surface border border-pixel-border hover:bg-pixel-primary hover:text-pixel-primary-contrast pixel-press transition-colors"
          >
            [{suggestion}]
          </button>
        ))}
      </div>

      {/* Interactive Input Row */}
      <div className="p-3 bg-pixel-surface flex items-center gap-2 font-code text-xs">
        <span className="text-pixel-secondary font-bold shrink-0">
          wasiul@workstation:~$
        </span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'help', 'skills', 'projects'..."
          className="flex-1 bg-transparent border-none outline-none text-pixel-text placeholder:text-pixel-text-muted/50 text-xs font-code p-0"
        />
        <button
          onClick={() => executeCommand(input)}
          aria-label="Send Command"
          className="p-1 text-pixel-primary hover:text-pixel-primary-hover pixel-press"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
};

