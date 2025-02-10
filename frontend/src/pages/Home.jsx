import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        try {
            const res = await api.get("/api/notes/");
            if (res.status === 200) {
                console.log(res.data);
                setNotes(res.data);
            }
        } catch (err) {
            alert(err);
        }
    };

    const deleteNote = async (id) => {
        try {
            const res = await api.delete(`/api/notes/delete/${id}`);
            if (res.status === 204) {
                alert("Note deleted");
                getNotes();
            } else {
                alert("Failed to delete note");
            }
        } catch (err) {
            alert(err);
        }
    };

    const createNote = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/api/notes/", { title, content });
            if (res.status === 201) {
                alert("Note created");
                getNotes();
            } else {
                alert("Failed to create note");
            }
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div>
            <div>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor='title'>Title:</label>
                <br />
                <input
                    type='text'
                    name='title'
                    id='title'
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor='content'>Content:</label>
                <br />
                <textarea
                    name='content'
                    id='content'
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type='submit' value='Submit' />
            </form>
        </div>
    );
}

export default Home;
