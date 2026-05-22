import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus } from "lucide-react"
import { useDroppable } from "@dnd-kit/react"
import { Input } from "@/components/ui/input"

type KanbanColumnProps = {
  id: string
  title: string
  children?: React.ReactNode
  onAddCard?: () => void
}

export function KanbanColumn({ id, title, children, onAddCard }: KanbanColumnProps) {
  const cardCount = React.Children.count(children)
  const { ref, isDropTarget } = useDroppable({ id })
  const [columnTitle, setColumnTitle] = useState(title);


  return (
    <div
      ref={ref}
      className={`flex w-72 overflow-y-scroll shrink-0 flex-col gap-3 rounded-xl p-3 ring-1 transition-colors ${isDropTarget ? "bg-primary/10 ring-primary" : "bg-muted/50 ring-foreground/10"}`}
    >
      {/* Column header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Input
            value={columnTitle}
            onChange={(e) => setColumnTitle(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }}
            className="text-sm font-semibold border-0 focus-visible:ring-1"
          />
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {cardCount}
          </span>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onAddCard}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Cards */}
      <ScrollArea className="max-h-[calc(100vh-12rem)]">
        <div className="flex flex-col gap-2 pr-1">
          {cardCount > 0 ? children : (
            <div className="flex min-h-30 items-center justify-center">
              <p className="text-xs text-muted-foreground">No cards yet</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
