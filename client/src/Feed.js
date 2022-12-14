import { useContext, useEffect, useState } from 'react'
import UserContext from './UserContext'
import PostCard from './PostCard'
import './PostCard.css'
import './MainCss.css'



function Feed({ handlePosts }) {
    const { user, setUser } = useContext(UserContext)
    const [error, setError] = useState([])
    const [posts, setPosts] = useState([])
    const [quote, setQuote] = useState ("")
    const [page, setPage] = useState("")
    const [book, setBook] = useState("")

    useEffect(() => {
        fetch("/me").then((response) => {
          if (response.ok) {
            response.json().then((user) => setUser(user));
          }
        });
      }, []);

    //show all errors
    const allErrors = <h1 key={error}>{error.error}</h1>

    const userBooks = user.books

    // display posts in a card
    const displayPosts = posts.map((post) => {
        return <PostCard key={post.id} post={post} />
    })

    //Create a new post 

    //1.Handling the value inputs

    const handleChangeQuote = (event) =>{
        setQuote(event.target.value);
    }
    
    const handleChangePage =(event) =>{
      setPage(event.target.value)
    }
    
    const handleChangeBook = (event) =>{
      setBook(event.target.value)
    }

    //Relating those elements into one variable

    const newPost = {
        page: page,
        book_title: book,
        quote: quote,
    }

    console.log(newPost)

    function handleSubmit(e){
        e.preventDefault();
        const newPost = {
            page: page,
            book_title: book,
            quote: quote,
        }
        fetch('/posts', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newPost)}).then(res => res.json()).then(newPostData => setPosts([...posts, newPostData]));
            console.log(posts)
          }
    //



    useEffect(() => {
        fetch(`/posts/${user.id}`)
            .then((r) => {
                if (r.ok) {
                    r.json().then((postsData) => setPosts(postsData))
                    setError([])
                }
                else {
                    r.json().then((err) => setError(err));
                }
            })
    }, []);




    return (
        <div style={{ backgroundColor: '#d6dfcc', backgroundSize:"cover", height:'450vh',width:'100vw'}}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div style={{display: 'flex',  justifyContent:'center'}}>
            <form onSubmit= {(e) => handleSubmit(e)}>
            <h1 style={{fontSize: 50}}> Welcome to your feed </h1>
            <input type="textarea" id="password" value={quote} onChange={handleChangeQuote} placeholder='What is happening?' />
            <input type="textarea" id="password" value={page} onChange={handleChangePage} placeholder='Page N' />
            <select className="form-control" onChange= {handleChangeBook} >
                <option>Select Book</option>
                {user? userBooks.map(item => (<option value={item.name} key={item.id} >{item.title}</option>)) : null}
            </select>
            <button className='button-33'> Post! </button>
            </form>
            </div>
            <br></br>
            <br></br>
            {user ? displayPosts : null}
            {error ? allErrors : null}
        </div>

    )
}

export default Feed;