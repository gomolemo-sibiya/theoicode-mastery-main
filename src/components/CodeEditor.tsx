import { useState, useRef, useEffect } from "react";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeEditorProps {
  initialCode: string;
  onRun?: (code: string) => void;
  output?: string;
  readOnly?: boolean;
}

export default function CodeEditor({ initialCode, onRun, output, readOnly }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const lineCount = code.split("\n").length;

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleReset = () => {
    setCode(initialCode);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-border">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-primary text-primary-foreground text-xs">
        <span className="font-mono">editor.py</span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs text-primary-foreground hover:bg-primary-foreground/10"
            onClick={handleReset}
          >
            <RotateCcw size={12} className="mr-1" />
            Reset
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => onRun?.(code)}
          >
            <Play size={12} className="mr-1" />
            Run
          </Button>
        </div>
      </div>

      {/* Editor area */}
      <div className="code-editor flex text-sm">
        {/* Line numbers */}
        <div className="select-none py-3 px-3 text-right border-r" style={{ color: "hsl(var(--code-comment))", borderColor: "hsl(var(--code-line))" }}>
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i} className="leading-6 text-xs">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code input */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          readOnly={readOnly}
          className="flex-1 p-3 bg-transparent resize-none outline-none leading-6 text-sm min-h-[180px]"
          spellCheck={false}
          style={{ tabSize: 4 }}
        />
      </div>

      {/* Output */}
      {output !== undefined && (
        <div className="border-t" style={{ borderColor: "hsl(var(--code-line))" }}>
          <div className="px-3 py-1.5 text-xs font-mono" style={{ color: "hsl(var(--code-comment))", background: "hsl(var(--code-bg))" }}>
            Output:
          </div>
          <pre className="px-3 py-2 text-sm font-mono whitespace-pre-wrap" style={{ background: "hsl(220 20% 10%)", color: "hsl(var(--code-foreground))" }}>
            {output || <span style={{ color: "hsl(var(--code-comment))" }}>No output yet. Click Run.</span>}
          </pre>
        </div>
      )}
    </div>
  );
}
