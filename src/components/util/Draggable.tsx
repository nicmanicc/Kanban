import { useDraggable } from '@dnd-kit/react';

type DraggableProps = {
  id: string;
  children: React.ReactNode;
};

export function Draggable({ id, children }: DraggableProps) {
  const { ref } = useDraggable({
    id,
  });

  return (
    <div ref={ref}>
      {children}
    </div>
  );
}