import { createContext, useContext, useState } from "react"

export type CardData = {
  id: string
  title: string
  description?: string
  priority?: "low" | "medium" | "high"
}

export type ColumnData = {
  id: string
  title: string
  cards: CardData[]
}

type KanbanContextValue = {
  columns: ColumnData[]
  addColumn: () => void
  addCard: (columnId: string) => void
}

const KanbanContext = createContext<KanbanContextValue | null>(null)

const dummyData: ColumnData[] = [
  {
    id: "1",
    title: "To Do",
    cards: [
      { id: "1", title: "Task 1", description: "This is the first task" },
      { id: "2", title: "Task 2", description: "This is the second task" },
    ],
  },
  {
    id: "2",
    title: "In Progress",
    cards: [
      { id: "3", title: "Task 3", description: "This is the third task" },
    ],
  },
  {
    id: "3",
    title: "Done",
    cards: [
      { id: "4", title: "Task 4", description: "This is the fourth task" },
    ],
  },
]

export function KanbanProvider({ children }: { children: React.ReactNode }) {
  const [columns, setColumns] = useState<ColumnData[]>(dummyData)

  const addColumn = () => {
    setColumns((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: `Column ${prev.length + 1}`,
        cards: [],
      },
    ])
  }

  const addCard = (columnId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, cards: [...col.cards, { id: crypto.randomUUID(), title: "New Card", description: "" }] }
          : col
      )
    )
  }

  return (
    <KanbanContext.Provider value={{ columns, addColumn, addCard }}>
      {children}
    </KanbanContext.Provider>
  )
}

export function useKanban() {
  const context = useContext(KanbanContext)
  if (!context) throw new Error("useKanban must be used within a KanbanProvider")
  return context
}
