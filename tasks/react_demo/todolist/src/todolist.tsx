import React, { useState } from "react";
import { Button } from "react-bootstrap";

type Todo = {
  id: number;
  text: string;
  isChecked: boolean;
};

const TodoList: React.FC = () => {
  const title = '오늘 할 일'
  //구조분해할당
  let [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: '공부히기', isChecked: false },
    { id: 2, text: '잠자기', isChecked: false },
    { id: 3, text: '밥먹기', isChecked: false },
  ]);

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)

  const [newTodo, setNewTodo] = useState<string>('');

  const handleCheckedChange = (itemId: number) => {
    setTodos((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, isChecked: !item.isChecked } : item
      )
    )
  }

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, isChecked: false }]);
      setNewTodo('');
    }
  }

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  const handleTodoClick = (todo: Todo) => {
    setShowDetail(true);
    setSelectedTodo(todo);
  }

  const handleCloseDetail = () => {
    setShowDetail(false);
  }

  return (
    <div>
      <h1>{title}</h1>
      <p />
      <div className="container">
        <div>
          <input type='text' placeholder="오늘 할 일" onChange={(e) => { setNewTodo(e.target.value) }} />
          <Button variant='primary' onClick={addTodo}>추가</Button>
          <p />
        </div>
        <div className="board">
          <ul>
            {todos.map((e) => (
              <li key={e.id}>
                <input type='checkbox' onChange={() => {
                  handleCheckedChange(e.id)
                }} />
                <span onClick={() => handleTodoClick(e)}>
                  {
                    e.isChecked ? <del>{e.text}</del> : e.text
                  }
                </span>
                <button className="delbtn" onClick={() => { removeTodo(e.id) }}>삭제</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TodoList
