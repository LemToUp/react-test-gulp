import React from 'react';
import {Droppable, Draggable} from "react-beautiful-dnd";
import {FaBars, FaLock} from 'react-icons/fa';

export default function VisibleDDArea(props) {
    const draggableId = props.draggableId || 'visible';

    const toggleFixedState = (e) => {
        e ? e.stopPropagation() : null;
        const target = e.target;
        if (target && target.dataset && target.dataset.index) {
            if (props.onGetFixedIndex) {
                const index = parseInt(target.dataset.index);
                if (index > props.fixedIndex) {
                    props.onGetFixedIndex(index);
                } else {
                    props.onGetFixedIndex((index - 1));
                }
            }


        }
    };

    const calculateFixedState = (index, fixedIndex = -1) => {
        return (index <= fixedIndex);
    };

    return (
        <Droppable
            droppableId={draggableId}
            type="all"
        >
            {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {props.visibleItemsIds.map((item, index) => {
                        const isFixed = calculateFixedState(index, props.fixedIndex);
                        const foundedColumn = (props.allItems || []).filter(column => column.id === item);
                        const columnName = foundedColumn[0] ? foundedColumn[0].name : null;
                        return (
                            <Draggable
                                key={`visible_item_${item}`}
                                draggableId={`id_${item}`}
                                index={index}
                                isDragDisabled={isFixed}
                            >
                                {(provided, snapshot) => {
                                    const isDragging = snapshot.isDragging ? 'is-dragging' : '';
                                    const isFixedClass = isFixed ? 'is-fixed' : '';
                                    return (
                                        <div
                                            className={`drag-object ${isDragging} ${isFixedClass}`}
                                            data-index={index}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={provided.draggableProps.style}
                                            onDoubleClick={toggleFixedState}
                                        >
                                            <span>{isFixed ? <FaLock/> : <FaBars/>}</span> {columnName}
                                        </div>
                                    );
                                }}
                            </Draggable>
                        );
                    })}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}