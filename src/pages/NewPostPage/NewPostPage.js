import { useState } from "react"
import styled from "styled-components"
import { addNewPost } from '../../WebAPI'
import { useNavigate } from "react-router-dom"

const ErrorMessage = styled.div`
    color: red;
`

function NewPostPage() {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [errorMessage, setErrorMessage] = useState()
    const navigate = useNavigate()

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleBodyChange = (e) => {
        setBody(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        addNewPost(title, body).then(data => {
            if (data.ok === 0) {
                return setErrorMessage(data.message)
            }
            navigate("/")
        }).catch(err => {
            setErrorMessage(err.message)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <div>
                標題：<input value={title} onChange={handleTitleChange} />
            </div>
            <br />
            <div>
                內容：<textarea value={body} rows={14} onChange={handleBodyChange} />
            </div>
            <button>發佈</button>
        </form>
    );
}

export default NewPostPage;
