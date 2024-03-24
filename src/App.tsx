import { useEffect, useState } from 'react'
import { collection, addDoc, query, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from './firebase';
import UploadImage from './components/imageUpload';
const App = () => {
  const [task, setTask] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<string>('');
  const [todos, setTodos] = useState<object[]>([]);
  const addTodo = async () => {
    if (!task) {
      alert("Please provide me a todo");
      return
    }
    setLoader(true)
    if (updateId === '') {
      const collectionRef = collection(db, "todo")
      await addDoc(collectionRef, { todo: task });
    } else {
      const documentRef = doc(db, "todo", updateId);
      await updateDoc(documentRef, { todo: task });
    }
    setTask('');
    setUpdateId('')
    setLoader(false)
  }

  const getTodos = async () => {
    const collectionRef = collection(db, "todo")
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allTodos: any[] = []
      querySnapshot.forEach((doc) => {
        const obj = { todo: doc?.data()?.todo, id: doc?.id }
        allTodos.push(obj)
      });
      setTodos(allTodos)
    });
    return unsubscribe

  }

  const deleteTodo = async (id: string) => {
    const collectionRef = doc(db, "todo", id)
    await deleteDoc(collectionRef);
    alert("Deleted Successfully");
  }

  useEffect(() => {
    getTodos()
  }, [])
  return (
    <div>
      {/* <input type="text" placeholder='Enter a task' value={task} onChange={(e) => {
        setTask(e?.target?.value)
      }} />
      <button onClick={addTodo}>
        {loader ? "Loading..." : updateId === '' ? "Add Todo" : "Update Todo"}
      </button>
      {
        todos?.map(({ todo, id }: any) => {
          return (
            <div key={id}>
              <span>{todo}</span>
              <button onClick={() => {
                deleteTodo(id)
              }}>Delete</button>
              <button onClick={() => {
                setTask(todo);
                setUpdateId(id)
              }}>Edit</button>
            </div>
          )
        })
      } */}
      <UploadImage />
    </div>
  )
}
export default App