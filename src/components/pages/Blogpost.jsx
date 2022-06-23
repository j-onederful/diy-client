import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from 'axios'
import BlogDetails from "../BlogDetails"
import BlogForm from "../BlogForm"

export default function Blogpost() {

    //state to get the blogpost
    const [blogpost, setBlogpost] = useState({})

    const [showForm, setShowForm] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()

    // retrieve the blogpost from the server
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/blogposts/${id}`)
            .then(response => {
                console.log(response.data)
                setBlogpost(response.data)
            })
            .catch(console.warn)
    }, [id])

    const handleSubmit = (e, form, setForm) => {
        e.preventDefault()
        axios.put(`${process.env.REACT_APP_SERVER_URL}/blogposts/${id}`, form)
            .then(response => {
                console.log(response.data)
                setBlogpost(response.data) // add updated blogpost to state
                setShowForm(false) // hide form
            })
            .catch(console.warn)
    }

    const handleDelete = () => {
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/blogposts/${id}`)
            .then(response => {
                // navigate away from this page
                navigate('/')
            })
            .catch(console.warn)
    }

    return (
        <div>
            {
                showForm ?
                <BlogForm 
                    initialForm={blogpost}
                    submitHandler={handleSubmit}
                /> :
                <BlogDetails
                    blogpost={blogpost}
                />
            }

            <button
                onClick={() => setShowForm(!showForm)}
            >
                { showForm ? 'Cancel' : 'Edit'}
            </button>
            
            {
                showForm ? 
                <button
                    onClick={handleDelete}
                >
                    Delete
                </button> :
                ''
            }
        </div>
    )
}