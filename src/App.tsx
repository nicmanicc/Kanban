import './App.css'
import { useState } from 'react'
import { KanbanBoard } from './features/board/KanbanBoard'
import { KanbanColumn } from './features/column/KanbanColumn'
import { KanbanCard } from './features/card/KanbanCard'
import { Draggable } from './components/util/Draggable'

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

export default function App() {
  const [columns, setColumns] = useState(dummyData)

  return (
    <>
      <KanbanBoard>
        {columns.map((column) => (
          <KanbanColumn key={column.id} id={column.id} title={column.title}>
            {column.cards.map((card) => (
              <KanbanCard key={card.id} id={card.id} title={card.title} description={card.description} />
            ))}
          </KanbanColumn>
        ))}
      </KanbanBoard>
    </>
  )
}
