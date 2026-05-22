// features/board/KanbanBoard.tsx
import { useState } from "react"
import { KanbanColumn } from "../column/KanbanColumn"
import { KanbanCard } from "../card/KanbanCard"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useDragScroll } from "@/hooks/useDragScroll"

const dummyData = [
  {
    id: '1',
    title: 'To Do',
    cards: [
      { id: '1', title: 'Task 1', description: 'This is the first task' },
      { id: '2', title: 'Task 2', description: 'This is the second task' },
      { id: '1', title: 'Task 1', description: 'This is the first task' },
      { id: '2', title: 'Task 2', description: 'This is the second task' },
      { id: '1', title: 'Task 1', description: 'This is the first task' },
      { id: '2', title: 'Task 2', description: 'This is the second task' },
      { id: '1', title: 'Task 1', description: 'This is the first task' },
      { id: '2', title: 'Task 2', description: 'This is the second task' },
    ],
  },
  {
    id: '2',
    title: 'In Progress',
    cards: [
      { id: '3', title: 'Task 3', description: 'This is the third task' },
    ],
  },
  {
    id: '3',
    title: 'Done',
    cards: [
      { id: '4', title: 'Task 4', description: 'This is the fourth task' },
    ],
  },
]



export function KanbanBoard() {
  const columnsRef = useDragScroll<HTMLDivElement>()
  const [columns, setColumns] = useState(dummyData)

  const onButtonClick = () => {
    const newColumn = {
      id: (columns.length + 1).toString(),
      title: `Column ${columns.length + 1}`,
      cards: [],
    }
    setColumns([...columns, newColumn])
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
        className="[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none flex flex-1 items-start gap-4 overflow-x-auto p-6 scroll-smooth will-change-transform"
      >
        {columns.map((column) => (
          <KanbanColumn key={column.id} id={column.id} title={column.title}>
            {column.cards.map((card) => (
              <KanbanCard key={card.id} id={card.id} title={card.title} description={card.description} />
            ))}
          </KanbanColumn>
        ))}

        {/* Add column button */}
        <Button
          variant="outline"
          className="flex w-72 shrink-0 items-center justify-center gap-2 rounded-xl border-dashed py-8 text-muted-foreground hover:text-foreground"
          onClick={onButtonClick}
        >
          <Plus className="h-4 w-4" />
          Add column
        </Button>
      </div>
    </div>
  )
}
