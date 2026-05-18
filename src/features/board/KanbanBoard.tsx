// features/board/KanbanBoard.tsx
import React from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type KanbanBoardProps = {
  children?: React.ReactNode
}

export function KanbanBoard({ children }: KanbanBoardProps) {
  const columnsRef = React.useRef<HTMLDivElement>(null)

  function handleHorizontalScroll(e: React.WheelEvent<HTMLDivElement>) {
    if (e.deltaY === 0) return
    e.preventDefault()
    columnsRef.current!.scrollLeft += e.deltaY / 1.5
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Board header */}
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h1 className="text-xl font-bold">Board</h1>
      </div>

      {/* Columns area */}
      <div
        ref={columnsRef}
        onWheel={handleHorizontalScroll}
        className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none flex flex-1 items-start gap-4 overflow-x-auto p-6"
      >
        {children}

        {/* Add column button */}
        <Button
          variant="outline"
          className="flex w-72 shrink-0 items-center justify-center gap-2 rounded-xl border-dashed py-8 text-muted-foreground hover:text-foreground"
        >
          <Plus className="h-4 w-4" />
          Add column
        </Button>
      </div>
    </div>
  )
}
