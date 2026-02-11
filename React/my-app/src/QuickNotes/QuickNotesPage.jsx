import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function QuickNotesPage() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [notes,setNotes] = useState([]);
  function addNote() {
    setText("");

    if(!text){
      alert("Please enter a note");
      return;
    }
    const trimmed = text.trim();
    if (!trimmed) return;
    
    const trimmedTitle = title.trim();


    const newNote = {
      title: trimmedTitle || "note without",
      id: crypto.randomUUID(),
      text: trimmed,
      createdAt: Date.now(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setText("");
    setTitle("");  
  }

  
function deleteNote(id) {
  const ok = window.confirm("is it ok to delete this note?");
  if (!ok) {
    return;
  }
  setNotes((prev) => prev.filter((n) => n.id !== id));
}

  

  return (
    <>
    <div class="card">
        <h1 className="title">QuickNotes</h1> 
        <div className = "form">
          <input className="titleInput" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
          <TextareaAutosize className="textarea"
          value={text}
          minRows={5}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note..."
        />
        <button className="button" onClick={addNote}>
          Add
        </button>
        </div>
        
        <div className="grid">
        {notes.map(note =>(
            <div className="noteCard">
              <div className = "note" key={note.id}>
                <p className="noteDate">
                    {new Date(note.createdAt).toLocaleDateString("en-GB")}
                </p>
                <p className="noteTitle">{note.title}</p>
                <p className="noteText">{note.text}</p>
                <button className="deleteButton" onClick={() => deleteNote(note.id)}>
                  x
                </button>
            </div>
            </div>
        ))}

        </div>

    </div>
    
    </>
  );
}
