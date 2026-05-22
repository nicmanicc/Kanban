// features/board/KanbanBoard.tsx
import { KanbanColumn } from "../column/KanbanColumn"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useDragScroll } from "@/hooks/useDragScroll"
import { KanbanProvider, useKanban } from "@/context/KanbanContext"

function KanbanBoardInner() {
  const columnsRef = useDragScroll<HTMLDivElement>()
  const { columns, addColumn } = useKanban()

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Board header */}
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h1 className="text-xl font-bold">Board</h1>
      </div>

      {/* Columns area */}
      <div
        ref={columnsRef}
        className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none flex flex-1 items-start gap-4 overflow-x-auto p-6 scroll-smooth will-change-transform"
      >
        {columns.map((column) => (
          <KanbanColumn key={column.id} id={column.id} title={column.title} cards={column.cards} />
        ))}

        {/* Add column button */}
        <Button
          variant="outline"
          className="flex w-72 shrink-0 items-center justify-center gap-2 rounded-xl border-dashed py-8 text-muted-foreground hover:text-foreground"
          onClick={addColumn}
        >
          <Plus className="h-4 w-4" />
          Add column
        </Button>
      </div>
    </div>
  )
}

export function KanbanBoard() {
  return (
    <KanbanProvider>
      <KanbanBoardInner />
    </KanbanProvider>
  )
}
