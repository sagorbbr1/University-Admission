// src/pages/RoutineDnD.jsx
import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-gray-700 px-4 py-2 rounded mb-2 cursor-move hover:bg-gray-600"
    >
      {id}
    </li>
  );
};

const RoutineDnD = () => {
  const [tasks, setTasks] = useState([
    "৮:০০ - গণিত",
    "১০:০০ - রসায়ন",
    "১২:০০ - জীববিজ্ঞান",
    "৩:০০ - পদার্থবিজ্ঞান",
  ]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = tasks.indexOf(active.id);
      const newIndex = tasks.indexOf(over.id);
      setTasks((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white px-6 py-10">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">📋 আজকের রুটিন</h1>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            <ul>
              {tasks.map((task) => (
                <SortableItem key={task} id={task} />
              ))}
            </ul>
          </SortableContext>
        </DndContext>

        <div className="text-center mt-10">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
            ➕ নতুন টাস্ক
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoutineDnD;
