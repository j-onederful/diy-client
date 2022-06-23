import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import BlogForm from '../BlogForm'

export default function Home() {
    // blogposts from the backend
    const [blogposts, setBlogposts] = useState([])
    // error message state
    const [err, setErr] = useState('')

    useEffect(() => {
        const fetchBlogposts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blogposts`)
                setBlogposts(response.data)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBlogposts()
    }, []) // get all the blogposts when the page loads

    // submit handler function
    const handleSubmit = async (e, form, setForm) => {
        e.preventDefault()
        // axios to POST a new blogpost using the form state
        console.log('the form data is:', form)
        try {
            // post to the backend
            // axios.post(url, request body/form data, options)
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/blogposts`, form)
            // update state with the new data to see it
            // option 1 -- add this new blogpost into state
            setBlogposts([...blogposts, response.data])

            //option 2 -- we can get all the bounties from the backend and set them in state
            // const bountiesResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/bounties`)
            // setBounties(bountiesResponse.data)

            // console.log(response)
            //clear the form -- ???
            //form has submitted correctly -- clear it
            setForm({
                name: '',
                title: '',
                content: '',
                comments: []
            })
            //clear error
            setErr('')
        } catch (err) {
            console.warn('submit error: ', err)
            if (err.response) {
                if (err.response.status === 400) {
                    // this error is a validation error from our backend
                    setErr(err.response.data.msg)
                }
            }
        }
    }


    console.log('my server url is:', process.env.REACT_APP_SERVER_URL)
    const blogLinks = blog.map((blog, i) => {
        return (
            <div key={`bloglink${i}`}>
                <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
            </div>
        )
    })
    return (
        <div>
            <h1>Create New Blog:</h1>
            <p>{err}</p>
            <BlogForm
                submitHandler={handleSubmit}
                initialForm={{
                    name: '',
                    title: '',
                    content: '',
                    comments: []
                }}
            />
            <h1>Current Blogs</h1>

            {blogLinks}
        </div>
    )
}