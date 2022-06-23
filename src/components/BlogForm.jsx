import { useState } from 'react'

export default function BlogCreateForm({ submitHandler, initialForm }) {
    const [form, setForm] = useState(initialForm)
    return (
        <form onSubmit={e => submitHandler(e, form, setForm)}>
            <label htmlFor='name'>Name:</label>
            <input 
                type='text'
                id='name'
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value})}
            />

            <label htmlFor='title'>Title:</label>
            <input 
                type='text'
                id='title'
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value})}
            />
            
            <label htmlFor='content'>Blog Content:</label>
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