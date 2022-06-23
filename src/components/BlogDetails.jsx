import CommentDetails from 'CommentDetails'

export default function BlogDetails({ blog}) {
    return (
      <div>
          <h2>{blog.title}</h2>

          <h5>{blog.name}</h5>
          
          <p>{blog.content}</p>
          
          <CommentDetails />
         
      </div>
    )
  }
  