import React from "react"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DatePicker } from "@/components/ui/date-picker"
import { AlignLeft, Calendar } from "lucide-react"

type Priority = "low" | "medium" | "high"

type KanbanCardDetailsProps = {
  title?: string
  description?: string
  priority?: Priority
}

export function KanbanCardDetails({ title = "", description = "" }: KanbanCardDetailsProps) {
  const [editTitle, setEditTitle] = React.useState(title)
  const [editDescription, setEditDescription] = React.useState(description)
  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = React.useState<Date | undefined>(undefined)

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle asChild>
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="text-base font-semibold border-transparent shadow-none focus-visible:border-input focus-visible:shadow-sm px-2"
            placeholder="Card title"
          />
        </DialogTitle>
      </DialogHeader>

      <div className="flex flex-col gap-5 mt-1">
        {/* Description */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <AlignLeft className="h-4 w-4" />
            Description
          </div>
          <Textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Add a more detailed description…"
            className="resize-none min-h-24"
          />
        </div>


        {/* Dates */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Dates
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Start date</span>
              <DatePicker date={startDate} onSelect={setStartDate} placeholder="Pick a date" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">End date</span>
              <DatePicker date={endDate} onSelect={setEndDate} placeholder="Pick a date" />
            </div>
          </div>
        </div>

        <Separator />
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm">Cancel</Button>
          <Button size="sm">Save</Button>
        </div>
      </div>
    </DialogContent>
  )
}