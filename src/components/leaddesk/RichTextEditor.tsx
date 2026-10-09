"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { 
  Bold, Italic, Heading1, Heading2, List, ListOrdered, 
  Link as LinkIcon, Unlink, Highlighter, Undo, Redo, Quote, Image as ImageIcon 
} from "lucide-react";
import { useEffect } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Highlight.configure({ multicolor: true }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-xl max-h-[400px] w-full object-cover my-4 border border-slate-200 shadow-sm",
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || "Start typing your content here, or paste formatted text...",
      }),
    ],
    content: content || "",
    editorProps: {
      attributes: {
        class: "prose prose-slate max-w-none p-8 min-h-[350px] outline-none text-slate-800 text-base leading-relaxed focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "");
    }
  }, [content, editor]);

  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter link URL (e.g. /services/phd-thesis or https://...):", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-indigo-600 transition-all">
      {/* Wix-style Sticky Top Formatting Bar */}
      <div className="flex flex-wrap items-center gap-1.5 p-3 bg-slate-50/90 border-b border-slate-200 text-slate-600 sticky top-0 z-10 backdrop-blur-sm">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded-xl hover:bg-slate-200 transition-colors ${editor.isActive("bold") ? "bg-indigo-100 text-indigo-700 font-bold" : ""}`} title="Bold"><Bold className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded-xl hover:bg-slate-200 transition-colors ${editor.isActive("italic") ? "bg-indigo-100 text-indigo-700 font-bold" : ""}`} title="Italic"><Italic className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHighlight({ color: "#fef08a" }).run()} className={`p-2 rounded-xl hover:bg-slate-200 transition-colors ${editor.isActive("highlight") ? "bg-yellow-200 text-yellow-900" : ""}`} title="Highlight"><Highlighter className="w-4 h-4" /></button>
        
        <span className="w-px h-6 bg-slate-300 mx-1" />
        
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`p-2 rounded-xl hover:bg-slate-200 transition-colors ${editor.isActive("heading", { level: 1 }) ? "bg-indigo-100 text-indigo-700 font-bold" : ""}`} title="Heading 1"><Heading1 className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-2 rounded-xl hover:bg-slate-200 transition-colors ${editor.isActive("heading", { level: 2 }) ? "bg-indigo-100 text-indigo-700 font-bold" : ""}`} title="Heading 2"><Heading2 className="w-4 h-4" /></button>
        
        <span className="w-px h-6 bg-slate-300 mx-1" />
        
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded-xl hover:bg-slate-200 transition-colors ${editor.isActive("bulletList") ? "bg-indigo-100 text-indigo-700" : ""}`} title="Bullet List"><List className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 rounded-xl hover:bg-slate-200 transition-colors ${editor.isActive("orderedList") ? "bg-indigo-100 text-indigo-700" : ""}`} title="Numbered List"><ListOrdered className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-2 rounded-xl hover:bg-slate-200 transition-colors ${editor.isActive("blockquote") ? "bg-indigo-100 text-indigo-700" : ""}`} title="Blockquote"><Quote className="w-4 h-4" /></button>
        
        <span className="w-px h-6 bg-slate-300 mx-1" />
        
        <button type="button" onClick={setLink} className={`p-2 rounded-xl hover:bg-slate-200 transition-colors ${editor.isActive("link") ? "bg-indigo-100 text-indigo-700" : ""}`} title="Add Link"><LinkIcon className="w-4 h-4" /></button>
        {editor.isActive("link") && <button type="button" onClick={() => editor.chain().focus().unsetLink().run()} className="p-2 rounded-xl hover:bg-slate-200 text-red-500" title="Remove Link"><Unlink className="w-4 h-4" /></button>}
        <button type="button" onClick={addImage} className="p-2 rounded-xl hover:bg-slate-200 transition-colors text-slate-600" title="Insert Image"><ImageIcon className="w-4 h-4" /></button>

        <span className="w-px h-6 bg-slate-300 mx-1" />
        
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className="p-2 rounded-xl hover:bg-slate-200 transition-colors" title="Undo"><Undo className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className="p-2 rounded-xl hover:bg-slate-200 transition-colors" title="Redo"><Redo className="w-4 h-4" /></button>
      </div>

      {/* Editor Canvas Area */}
      <div className="bg-slate-50/30">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}