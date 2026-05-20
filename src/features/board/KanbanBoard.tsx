// features/board/KanbanBoard.tsx
import React from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type KanbanBoardProps = {
  children?: React.ReactNode
}

export function KanbanBoard({ children }: KanbanBoardProps) {
  const columnsRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const slider = columnsRef.current
    if (!slider) return

    let mouseDown = false
    let startX = 0
    let scrollLeft = 0

    const startDragging = (e: MouseEvent) => {
      mouseDown = true
      startX = e.pageX - slider.offsetLeft
      scrollLeft = slider.scrollLeft
    }

    const stopDragging = () => {
      mouseDown = false
    }

    const move = (e: MouseEvent) => {
      e.preventDefault()
      if (!mouseDown) return
      const x = e.pageX - slider.offsetLeft
      const scroll = x - startX
      slider.scrollLeft = scrollLeft - scroll
    }

    slider.addEventListener('mousemove', move, { passive: false })
    slider.addEventListener('mousedown', startDragging)
    slider.addEventListener('mouseup', stopDragging)
    slider.addEventListener('mouseleave', stopDragging)

    return () => {
      slider.removeEventListener('mousemove', move)
      slider.removeEventListener('mousedown', startDragging)
      slider.removeEventListener('mouseup', stopDragging)
      slider.removeEventListener('mouseleave', stopDragging)
    }
  }, [])

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
