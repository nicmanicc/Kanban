// features/card/KanbanCard.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { MoreHorizontal, Trash2, ArrowRight } from "lucide-react"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { KanbanCardDetails } from "./KanbanCardDetails"

type KanbanCardProps = {
  id: string
  title: string
  description?: string
  priority?: "low" | "medium" | "high"
}

const priorityColours = {
  low: "secondary",
  medium: "outline",
  high: "destructive",
} as const

export function KanbanCard({ id, title, description, priority }: KanbanCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-grab shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-3 space-y-2">

            {/* Header row */}
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium leading-snug">{title}</p>

              {/* Actions popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-1" align="end">
                  <Button variant="ghost" className="w-full justify-start text-sm gap-2">
                    <ArrowRight className="h-4 w-4" />
                    Move
                  </Button>
                  <Separator className="my-1" />
                  <Button variant="ghost" className="w-full justify-start text-sm gap-2 text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </PopoverContent>
              </Popover>
            </div>

            {/* Description */}
            {description && (
              <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
            )}

            {/* Footer row */}
            {priority && (
              <div className="flex items-center justify-between pt-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant={priorityColours[priority]} className="text-xs capitalize">
                        {priority}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{priority} priority</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}

          </CardContent>
        </Card>
      </DialogTrigger>
      <KanbanCardDetails title={title} description={description} priority={priority} />

    </Dialog >
  )
}