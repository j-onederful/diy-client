import { useState } from 'react'

export default function CommentCreateForm({ submitHandler, initialForm }) {
    const [form, setForm] = useState(initialForm)
    return (
        <form onSubmit={e => submitHandler(e, form, setForm)}>
            <label htmlFor='content'>Your Comment:</label>
            <input 
                type='text'
                id='content'
                value={form.content}
                onChange={e => setForm({ ...form, content: e.target.value})}
            />

            <button type="submit">Submit</button>
        </form>
    )
}