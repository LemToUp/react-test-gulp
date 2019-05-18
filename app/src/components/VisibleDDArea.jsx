import React from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function VisibleDDArea(props) {

    const onDragEnd = (result) => {
        console.log("VisibleDDArea onDragEnd : ");
        console.log(result);
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        const items = reorder(
            props.availableColumns,
            result.source.index,
            result.destination.index
        );
        setAvailableColumnsTemp(items);
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {props.items.map((item, index) => (
                            <Draggable
                                key={`visible_item_${index}`} draggableId={`id_${item}`} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        className={`drag-object ${snapshot.isDragging ? 'is-dragging' : ''}`}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={provided.draggableProps.style}
                                    >
                                        <span>&#9776;</span> {item}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}