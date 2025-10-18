"use client";
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { Maximize2, Minimize2, Lock, UnlockIcon, Star, Share, Bold, Italic, Underline, Strikethrough, Code, ListOrdered, MoveDown, MoveUp, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Select } from './Select';
import { saveAs } from 'file-saver';
import { Extension } from '../../../utils/type';

// Custom font size array
const FONT_SIZES = ['10px', '12px', '14px', '16px', '18px', '24px', '32px', '48px'];

// Custom fonts
const FONTS = [
  { label: 'Sans Serif', value: 'sans-serif' },
  { label: 'Serif', value: 'serif' },
  { label: 'Monospace', value: 'monospace' },
  { label: 'Arial', value: 'Arial' },
  { label: 'Times New Roman', value: 'Times New Roman' },
  { label: 'Courier New', value: 'Courier New' },
];

export default function QuillEditor({
  className
}:{
  className?:string
}) {
  const [fileStats,setFileStats] = useState({
    wordCount: 0,
    charCount: 0,
    linesCount: 0,
  })
  const [fileConfig,setFileConfig] = useState({
    fileName: 'untitled-document',
    fontSize: '16px',
    font: 'sans-serif',
    isFillScreen: false,
    isPrivate:true,
    isPinned:true,
    extension:Extension.DOCX
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: {
        container: '#toolbar',
        handlers: {
          'image': handleImageUpload,
          'link': showLinkDialog,
        }
      },
    },
    formats: [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote', 'code', 'code-block',
      'list', 'indent', 'script',
      'link', 'image', 'video',"table",
      'color', 'background',
      'align', 'direction',
    ],
  });

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      editorRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setFileConfig(prev => ({ ...prev, isFillScreen: true }));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setFileConfig(prev => ({ ...prev, isFillScreen: false }));
      }
    }
  }

  function handleImageUpload() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (input.files && quill) {
        const file = input.files[0];
        if (file) {
          // In a real app, you would upload the image to a server
          // For now, we'll use a placeholder
          const reader = new FileReader();
          reader.onload = (e) => {
            const range = quill.getSelection();
            quill.insertEmbed(range?.index || 0, 'image', e.target?.result, 'user');
          };
          reader.readAsDataURL(file);
        }
      }
    };
  }

  function showLinkDialog() {
    if (!quill) return;
    
    const url = prompt('Enter the URL:');
    if (url) {
      const range = quill.getSelection();
      quill.format('link', url, 'user');
    }
  }

  const handleSave = useCallback(async()=>{
    if(!quill) return
    const blob = new Blob([...quill.getText()])
    saveAs(blob,fileConfig.fileName+`.${fileConfig.extension}`)
  },[fileConfig,quill])
  function handleFileAccess (){
    setFileConfig((prev)=>{
      return {
        ...prev,
        isPrivate:!prev.isPrivate
      }
    })
  }
  function handleFilePin (){
    setFileConfig((prev)=>{
      return {
        ...prev,
        isPinned:!prev.isPinned
      }
    })
  }
  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        const text = quill.getText();
        setFileStats(prev => ({ ...prev, charCount: text.length }));
        setFileStats(prev => ({ ...prev, wordCount: text.trim() ? text.trim().split(/\s+/).length : 0 }));
        setFileStats(prev => ({ ...prev, linesCount: text.split('\n').length }));
      });

      // Add keyboard shortcuts
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
          e.preventDefault();
          handleSave();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [quill]);

  return (
    <div 
      ref={editorRef}
      className={cn(
        "flex flex-col h-screen bg-white dark:bg-gray-900 transition-all duration-300",
        fileConfig.isFillScreen ? 'fixed inset-0 z-50' : 'relative',className
      )}
    >
      {/* Top Toolbar */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              value={fileConfig.fileName}
              onChange={(e) => setFileConfig(prev => ({ ...prev, fileName: e.target.value }))}
              className="w-64 font-medium text-gray-900 dark:text-white bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              spellCheck={false}
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {fileStats.wordCount} words • {fileStats.charCount} characters • {fileStats.linesCount} lines
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={handleFileAccess} variant="outline">
              {
                fileConfig.isPrivate ?
                (
                  <Lock/>
                ):(
                  <UnlockIcon/>
                )
              }
            </Button>
            <Button variant="outline" onClick={handleFilePin}>
              <Star className={`text-yellow-300 ${fileConfig.isPinned ? 'fill-yellow-300':'fill-transparent'}`}/>
            </Button>
            <Button variant="outline">
              <Share/>
            </Button>
            <Select 
              options={
                Object.keys(Extension).map((e)=>{
                  return {
                    label:e,
                    value:e
                  }
                })
              }
              onChange={()=>handleSave}
              value={Extension.DOCX}
            />
          </div>
        </div>

        {/* Quill Toolbar */}
        <div id="toolbar" className="flex flex-wrap items-center gap-1">
          {/* Font Family */}
          <Select 
            options={FONTS.map((font) => ({ value: font.value, label: font.label }))} 
            value={fileConfig.font} 
            onChange={(e) => setFileConfig(prev => ({ ...prev, font: e }))} 
            className="ql-font border-0 bg-transparent text-sm text-gray-700 dark:text-gray-300 focus:ring-0"
          />
          {/* Font Size */}
          <Select 
            options={FONT_SIZES.map((size) => ({ value: size, label: size }))} 
            value={fileConfig.fontSize} 
            onChange={(e) => setFileConfig(prev => ({ ...prev, fontSize: e }))} 
            className="ql-size border-0 bg-transparent text-sm text-gray-700 dark:text-gray-300 focus:ring-0"
          />

          <span className="h-5 w-px bg-gray-300 dark:bg-gray-600 mx-1" />

          {/* Text Formatting */}
          <Button title="Bold (Ctrl+B)"><Bold/></Button>
          <Button title="Italic (Ctrl+I)"><Italic/></Button>
          <Button title="Underline (Ctrl+U)"><Underline/></Button>
          <Button title="Strikethrough"><Strikethrough/></Button>
          <Button title="Code"><Code/></Button>

          <span className="h-5 w-px bg-gray-300 dark:bg-gray-600 mx-1" />

          {/* Text Color & Background */}
          <select className="ql-color" title="Text Color"></select>
          <select className="ql-background" title="Background Color"></select>

          <span className="h-5 w-px bg-gray-300 dark:bg-gray-600 mx-1" />

          {/* Lists & Indentation */}
          <Button value="ordered" title="Numbered List"><ListOrdered/></Button>
          <Button value="bullet" title="Bullet List"></Button>
          <Button value="-1" title="Decrease Indent"><MoveDown/></Button>
          <Button value="+1" title="Increase Indent"><MoveUp/></Button>

          <span className="h-5 w-px bg-gray-300 dark:bg-gray-600 mx-1" />

          {/* Alignment */}
          <Select 
            options={[
              { value: 'Left', label: 'Left' },
              { value: 'Center', label: 'Center' },
              { value: 'Right', label: 'Right' },
              { value: 'Justify', label: 'Justify' },
            ]} 
            value={"Left"}
            onChange={() => {}} 
            className="ql-align border-0 bg-transparent text-sm text-gray-700 dark:text-gray-300 focus:ring-0"
          />

          <span className="h-5 w-px bg-gray-300 dark:bg-gray-600 mx-1" />

          {/* Insert */}
          <Button title="Insert Link"></Button>
          <Button title="Insert Image"></Button>
          <Button title="Insert Video"></Button>
        </div>
      </div>

      {/* Editor Area */}
      <div 
        ref={quillRef} 
        className={cn(
          "flex-1 overflow-auto p-4",
          "prose dark:prose-invert max-w-none",
          "focus:outline-none"
        )}
      />

      {/* Status Bar */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center">
        <div>
          <span>Words: {fileStats.wordCount}</span>
          <span className="mx-2">•</span>
          <span>Characters: {fileStats.charCount}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            className="hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded"
            onClick={toggleFullscreen}
            title={fileConfig.isFillScreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {fileConfig.isFillScreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}