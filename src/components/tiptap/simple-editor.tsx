import * as React from "react"
import { EditorContent, EditorContext, ReactNodeViewRenderer, useEditor, type Editor } from "@tiptap/react"

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit"
import { Image } from "@tiptap/extension-image"
import { BlogImageView } from "@/components/tiptap/blog-image-view"
import { TaskItem } from "@tiptap/extension-task-item"
import { TaskList } from "@tiptap/extension-task-list"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Highlight } from "@tiptap/extension-highlight"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { Underline } from "@tiptap/extension-underline"
import Placeholder from "@tiptap/extension-placeholder"

// --- Custom Extensions ---
import { Link } from "@/components/tiptap/tiptap-extension/link-extension"
import { Selection } from "@/components/tiptap/tiptap-extension/selection-extension"
import { TrailingNode } from "@/components/tiptap/tiptap-extension/trailing-node-extension"

// --- UI Primitives ---
import { Button } from "@/components/tiptap/tiptap-ui-primitive/button"
import { Spacer } from "@/components/tiptap/tiptap-ui-primitive/spacer"
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap/tiptap-ui-primitive/toolbar"

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap/tiptap-node/image-upload-node/image-upload-node-extension"
import "@/components/tiptap/tiptap-node/code-block-node/code-block-node.scss"
import "@/components/tiptap/tiptap-node/list-node/list-node.scss"
import "@/components/tiptap/tiptap-node/image-node/image-node.scss"
import "@/components/tiptap/tiptap-node/paragraph-node/paragraph-node.scss"

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/tiptap/tiptap-ui/heading-dropdown-menu"
import { ImageUploadButton } from "@/components/tiptap/tiptap-ui/image-upload-button"
import { ListDropdownMenu } from "@/components/tiptap/tiptap-ui/list-dropdown-menu"
import { NodeButton } from "@/components/tiptap/tiptap-ui/node-button"
import {
  HighlightPopover,
  HighlightContent,
  HighlighterButton,
} from "@/components/tiptap/tiptap-ui/highlight-popover"
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/components/tiptap/tiptap-ui/link-popover"
import { MarkButton } from "@/components/tiptap/tiptap-ui/mark-button"
import { TextAlignButton } from "@/components/tiptap/tiptap-ui/text-align-button"
import { UndoRedoButton } from "@/components/tiptap/tiptap-ui/undo-redo-button"

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap/tiptap-icons/arrow-left-icon"
import { HighlighterIcon } from "@/components/tiptap/tiptap-icons/highlighter-icon"
import { LinkIcon } from "@/components/tiptap/tiptap-icons/link-icon"

// --- Hooks ---
import { useMobile } from "@/hooks/use-mobile"
import { useWindowSize } from "@/hooks/use-window-size"
import { useCursorVisibility } from "@/hooks/use-cursor-visibility"

// --- Components ---
import { ThemeToggle } from "@/components/tiptap//tiptap-templates/simple/theme-toggle"

// --- Lib ---
import { convertFileToBase64, handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils"


import "./simple-editor.scss";


import content from "@/components/tiptap/data/content.json"

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
}: {
  onHighlighterClick: () => void
  onLinkClick: () => void
  isMobile: boolean
}) => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
        <ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} />
        <NodeButton type="codeBlock" />
        <NodeButton type="blockquote" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <HighlightPopover />
        ) : (
          <HighlighterButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup>

      <Spacer />

      {isMobile && <ToolbarSeparator />}

      
    </>
  )
}

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link"
  onBack: () => void
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? <HighlightContent /> : <LinkContent />}
  </>
)

type ContextMenuState = {
  x: number
  y: number
  imagePos: number | null
}

function imageFromContextEvent(editor: Editor, event: React.MouseEvent) {
  const target = event.target
  if (!(target instanceof Element)) return null
  const wrapper = target.closest(".blog-image")
  if (!wrapper) return null

  try {
    const pos = editor.view.posAtDOM(wrapper, 0)
    const direct = editor.state.doc.nodeAt(pos)
    if (direct?.type.name === "image") return { pos, node: direct }

    const $pos = editor.state.doc.resolve(Math.min(pos, editor.state.doc.content.size))
    const after = $pos.nodeAfter
    if (after?.type.name === "image") return { pos: $pos.pos, node: after }
    const before = $pos.nodeBefore
    if (before?.type.name === "image") {
      return { pos: $pos.pos - before.nodeSize, node: before }
    }
  } catch {
    return null
  }

  return null
}

type SimpleEditorProps = {
  content: string;
  onChange: (value: string) => void;
  header?: React.ReactNode;
};

export function SimpleEditor({ content, onChange, header }: SimpleEditorProps) {
  const isMobile = useMobile()
  const windowSize = useWindowSize()
  const [mobileView, setMobileView] = React.useState<
    "main" | "highlighter" | "link"
  >("main")
  const toolbarRef = React.useRef<HTMLDivElement>(null)
  const [contextMenu, setContextMenu] = React.useState<ContextMenuState | null>(null)

  function closeContextMenu() {
    setContextMenu(null)
  }

  function openContextMenu(event: React.MouseEvent) {
    if (!editor) return
    event.preventDefault()

    const image = imageFromContextEvent(editor, event)
    if (!image) {
      const coords = editor.view.posAtCoords({
        left: event.clientX,
        top: event.clientY,
      })
      if (coords) {
        const { from, to } = editor.state.selection
        if (coords.pos < from || coords.pos > to) {
          editor.commands.setTextSelection(coords.pos)
        }
      }
    }

    const menuWidth = 160
    const menuHeight = 132
    setContextMenu({
      x: Math.min(event.clientX, window.innerWidth - menuWidth - 8),
      y: Math.min(event.clientY, window.innerHeight - menuHeight - 8),
      imagePos: image?.pos ?? null,
    })
  }

  async function copyFromEditor() {
    if (!editor) return
    const imagePos = contextMenu?.imagePos
    closeContextMenu()

    if (imagePos != null) {
      const node = editor.state.doc.nodeAt(imagePos)
      const src = node?.attrs?.src
      if (typeof src === "string" && src) {
        try {
          const response = await fetch(src)
          const blob = await response.blob()
          await navigator.clipboard.write([
            new ClipboardItem({ [blob.type || "image/png"]: blob }),
          ])
          return
        } catch {
          await navigator.clipboard.writeText(src)
          return
        }
      }
    }

    const { from, to, empty } = editor.state.selection
    const text = empty
      ? ""
      : editor.state.doc.textBetween(from, to, "\n")
    if (text) await navigator.clipboard.writeText(text)
  }

  async function pasteIntoEditor() {
    if (!editor) return
    const imagePos = contextMenu?.imagePos
    closeContextMenu()
    if (imagePos != null) {
      editor.commands.setTextSelection(imagePos + 1)
    } else {
      editor.commands.focus()
    }

    try {
      const items = await navigator.clipboard.read()
      for (const item of items) {
        const imageType = item.types.find((type) => type.startsWith("image/"))
        if (!imageType) continue
        const blob = await item.getType(imageType)
        const file = new File([blob], "image", { type: imageType })
        const src = await convertFileToBase64(file)
        editor.chain().focus().insertContent({ type: "image", attrs: { src } }).run()
        return
      }
    } catch {
      // Fall back to plain text when image clipboard access is blocked.
    }

    try {
      const text = await navigator.clipboard.readText()
      if (text) editor.chain().focus().insertContent(text).run()
    } catch (error) {
      console.error("Paste failed:", error)
    }
  }

  function deleteFromEditor() {
    if (!editor) return
    const imagePos = contextMenu?.imagePos
    closeContextMenu()

    if (imagePos != null) {
      const node = editor.state.doc.nodeAt(imagePos)
      if (node) {
        editor
          .chain()
          .focus()
          .deleteRange({ from: imagePos, to: imagePos + node.nodeSize })
          .run()
        return
      }
    }

    editor.chain().focus().deleteSelection().run()
  }

  React.useEffect(() => {
    if (!contextMenu) return
    const close = () => setContextMenu(null)
    const onPointer = (event: MouseEvent) => {
      const target = event.target
      if (target instanceof Element && target.closest(".editor-context-menu")) return
      setContextMenu(null)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setContextMenu(null)
    }
    window.addEventListener("scroll", close, true)
    window.addEventListener("resize", close)
    window.addEventListener("mousedown", onPointer)
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("scroll", close, true)
      window.removeEventListener("resize", close)
      window.removeEventListener("mousedown", onPointer)
      window.removeEventListener("keydown", onKey)
    }
  }, [contextMenu])

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Zone de rédaction",
      },
    },
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image.extend({
        addNodeView() {
          return ReactNodeViewRenderer(BlogImageView);
        },
      }),
      Typography,
      Superscript,
      Subscript,

      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
      TrailingNode,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({
        placeholder: "Cliquez ici et écrivez votre article…",
      }),
    ],
    content: content,
  })

  React.useEffect(() => {
    if (!editor) return;
    editor.on("update", () => {
      onChange(editor.getHTML());
    });
  }, [editor, onChange]);

  const bodyRect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  })

  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main")
    }
  }, [isMobile, mobileView])

  return (
  <EditorContext.Provider value={{ editor }}>
    <div className="admin-simple-editor">
      <div className="blog-scroll">
        <div className="blog-column">
          {header}
          <div className="article-write">
            <p className="article-write-label">Article</p>
            <div
              className="article-write-box"
              onClick={() => editor?.chain().focus().run()}
              onContextMenu={openContextMenu}
            >
              <Toolbar
                ref={toolbarRef}
                style={
                  isMobile
                    ? {
                        bottom: `calc(100% - ${windowSize.height - bodyRect.y}px)`,
                      }
                    : {}
                }
              >
                {mobileView === "main" ? (
                  <MainToolbarContent
                    onHighlighterClick={() => setMobileView("highlighter")}
                    onLinkClick={() => setMobileView("link")}
                    isMobile={isMobile}
                  />
                ) : (
                  <MobileToolbarContent
                    type={mobileView === "highlighter" ? "highlighter" : "link"}
                    onBack={() => setMobileView("main")}
                  />
                )}
              </Toolbar>
              <EditorContent
                editor={editor}
                role="textbox"
                aria-label="Texte de l’article"
                className="simple-editor-content"
              />
              {contextMenu && (
                <div
                  className="editor-context-menu"
                  style={{ top: contextMenu.y, left: contextMenu.x }}
                  onMouseDown={(event) => event.preventDefault()}
                  onContextMenu={(event) => event.preventDefault()}
                >
                  <button type="button" onClick={copyFromEditor}>
                    Copier
                  </button>
                  <button type="button" onClick={pasteIntoEditor}>
                    Coller
                  </button>
                  <button type="button" onClick={deleteFromEditor}>
                    Supprimer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </EditorContext.Provider>
)

}
