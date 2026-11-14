"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

// Table Extensions
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";

import { 
  Bold, Italic, Heading1, Heading2, List, ListOrdered, 
  Link as LinkIcon, Unlink, Highlighter, Undo, Redo, Quote, ImageIcon,
  Table as TableIcon, Trash2, Columns, Rows
} from "lucide-react";
import { useEffect } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  stripParagraphs?: boolean;
}

export default function RichTextEditor({ content, onChange, placeholder, stripParagraphs = false }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: null,
          target: null,
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-xl max-h-[400px] w-full object-cover my-4 border border-slate-200 shadow-sm",
        },
      }),
      // Configure Table Extensions
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "w-full border-collapse border border-slate-300 my-6 shadow-sm rounded-lg overflow-hidden",
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: "border border-slate-300 bg-slate-100 px-4 py-2 font-bold text-left",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "border border-slate-300 px-4 py-2",
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || "Start typing your content here, or paste formatted text...",
      }),
    ],
    content: content || "",
    editorProps: {
      attributes: {
        // Added prose-td and prose-th adjustments to make Tailwind typography play nice with TipTap tables
        class: "prose prose-slate max-w-none p-8 min-h-[350px] outline-none text-slate-800 text-base leading-relaxed focus:outline-none prose-table:table-auto prose-th:p-0 prose-td:p-0",
      },
    },
    onUpdate: ({ editor }) => {
      let html = editor.getHTML();
      
      if (stripParagraphs) {
        html = html.replace(/^<p>/, "").replace(/<\/p>$/, "");
      }
      
      onChange(html);
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
      <div className="flex flex-wrap items-center gap-1.5 p-3 bg-slate-50/90 border-b border-slate-200 text-slate-600 sticky top-0 z-10 backdrop-blur-sm">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer ${editor.isActive("bold") ? "bg-indigo-100 text-indigo-700 font-bold" : ""}`} title="Bold"><Bold className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer ${editor.isActive("italic") ? "bg-indigo-100 text-indigo-700 font-bold" : ""}`} title="Italic"><Italic className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHighlight({ color: "#fef08a" }).run()} className={`p-2 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer ${editor.isActive("highlight") ? "bg-yellow-200 text-yellow-900" : ""}`} title="Highlight"><Highlighter className="w-4 h-4" /></button>
        
        <span className="w-px h-6 bg-slate-300 mx-1" />
        
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`p-2 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer ${editor.isActive("heading", { level: 1 }) ? "bg-indigo-100 text-indigo-700 font-bold" : ""}`} title="Heading 1"><Heading1 className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-2 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer ${editor.isActive("heading", { level: 2 }) ? "bg-indigo-100 text-indigo-700 font-bold" : ""}`} title="Heading 2"><Heading2 className="w-4 h-4" /></button>
        
        <span className="w-px h-6 bg-slate-300 mx-1" />
        
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer ${editor.isActive("bulletList") ? "bg-indigo-100 text-indigo-700" : ""}`} title="Bullet List"><List className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer ${editor.isActive("orderedList") ? "bg-indigo-100 text-indigo-700" : ""}`} title="Numbered List"><ListOrdered className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-2 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer ${editor.isActive("blockquote") ? "bg-indigo-100 text-indigo-700" : ""}`} title="Blockquote"><Quote className="w-4 h-4" /></button>
        
        <span className="w-px h-6 bg-slate-300 mx-1" />
        
        <button type="button" onClick={setLink} className={`p-2 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer ${editor.isActive("link") ? "bg-indigo-100 text-indigo-700" : ""}`} title="Add Link"><LinkIcon className="w-4 h-4" /></button>
        {editor.isActive("link") && <button type="button" onClick={() => editor.chain().focus().unsetLink().run()} className="p-2 rounded-xl hover:bg-slate-200 text-red-500 cursor-pointer" title="Remove Link"><Unlink className="w-4 h-4" /></button>}
        <button type="button" onClick={addImage} className="p-2 rounded-xl hover:bg-slate-200 transition-colors text-slate-600 cursor-pointer" title="Insert Image"><ImageIcon className="w-4 h-4" /></button>

        <span className="w-px h-6 bg-slate-300 mx-1" />

        {/* --- TABLE CONTROLS --- */}
        <button type="button" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className={`p-2 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer ${editor.isActive("table") ? "bg-indigo-100 text-indigo-700" : ""}`} title="Insert Table"><TableIcon className="w-4 h-4" /></button>
        {editor.isActive("table") && (
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
            <button type="button" onClick={() => editor.chain().focus().addColumnAfter().run()} className="p-1.5 rounded-lg hover:bg-slate-300 transition-colors cursor-pointer" title="Add Column After"><Columns className="w-4 h-4 text-emerald-600" /></button>
            <button type="button" onClick={() => editor.chain().focus().addRowAfter().run()} className="p-1.5 rounded-lg hover:bg-slate-300 transition-colors cursor-pointer" title="Add Row After"><Rows className="w-4 h-4 text-emerald-600" /></button>
            <button type="button" onClick={() => editor.chain().focus().deleteColumn().run()} className="p-1.5 rounded-lg hover:bg-slate-300 transition-colors cursor-pointer" title="Delete Column"><Columns className="w-4 h-4 text-red-500" /></button>
            <button type="button" onClick={() => editor.chain().focus().deleteRow().run()} className="p-1.5 rounded-lg hover:bg-slate-300 transition-colors cursor-pointer" title="Delete Row"><Rows className="w-4 h-4 text-red-500" /></button>
            <button type="button" onClick={() => editor.chain().focus().deleteTable().run()} className="p-1.5 rounded-lg hover:bg-red-200 transition-colors cursor-pointer" title="Delete Entire Table"><Trash2 className="w-4 h-4 text-red-600" /></button>
          </div>
        )}
        
        <span className="w-px h-6 bg-slate-300 mx-1" />
        
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className="p-2 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer" title="Undo"><Undo className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className="p-2 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer" title="Redo"><Redo className="w-4 h-4" /></button>
      </div>

      <div className="bg-slate-50/30">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}