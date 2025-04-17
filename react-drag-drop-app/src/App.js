import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const people = [
  { id: "alice", name: "Alice Kim" },
  { id: "bob", name: "Bob Jung" },
  { id: "charlie", name: "Charlie Choi" },
];

function App() {
  const [person, setPerson] = useState(people);
  const handleEnd = (result) => {
    console.log(result)
    if (!result.destination) return;
    const items = Array.from(person);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPerson(items)
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Final Space Characters</h1>
        <DragDropContext onDragEnd={handleEnd}>
          <Droppable droppableId='characters' isDropDisabled={false} isCombineEnabled={true} ignoreContainerClipping={true}>
            {(provided) => (
              <div className='characters' {...provided.droppableProps} ref={provided.innerRef} style={{
                padding: 8,
                background: '#f0f0f0',
                minHeight: 200,
                width: 300,
              }}>
                {
                  person.map(({ id, name }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{
                            userSelect: 'none',
                            padding: 16,
                            margin: '0 0 8px 0',
                            background: snapshot.isDragging ? '#d1e7dd' : '#ffffff',
                            border: '1px solid lightgray',
                            borderRadius: 4,
                            ...provided.draggableProps.style,
                          }}>
                            {name}
                          </div>
                        )}
                      </Draggable>
                    )
                  })
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;
