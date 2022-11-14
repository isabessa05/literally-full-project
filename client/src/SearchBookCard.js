import './PostCard.css'
import {useContext, useState} from 'react'
import UserContext from './UserContext'

function SearchBookCard({ book, updatePosts }) {

    const {user, setUser} = useContext(UserContext) 
    const [bookInstance, setBookInstance] = useState("")

    const bookTitle = book.title
    

    function addToBookList() {
        const newBook = {
            title: book.title,
            author: book.authors,
            description: book.description
        };
        fetch('/books', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBook)}).then((res) => res.json()).then((data) => addBookToUser(data))
        }
        
       

        function addBookToUser(data) {

            const newUserBook = {
                user_id: user.id,
                book_id: data.id
            };
        fetch('/user_books', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUserBook)}).then((res) => {
                if (res.ok) {
            res.json().then((data) => console.log(data))}
            else {res.json().then((err) => console.log(err));}
        })
            updatePosts(user.books)
        }
        
        function addBook() {
            addToBookList();
        }

     
    
    




    return (
        <div className='column'>
            <div className="card">
                <h2> {book.title} </h2>
                <p> {book.authors} </p>
                <span> {book.description} </span>
                <br></br>
                <br></br>
                <button onClick={addBook}> Add to my book list </button>

            </div>
        </div>
    )
}

export default SearchBookCard;