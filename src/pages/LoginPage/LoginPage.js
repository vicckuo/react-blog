import { useState, useContext } from "react"
import styled from "styled-components"
import { login, getMe } from '../../WebAPI'
import { setAuthToken } from "../../utils"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts"


const ErrorMessage = styled.div`
    color: red;
`

function LoginPage() {
    const { setUser } = useContext(AuthContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        setErrorMessage(null)
        login(username, password).then(data => {
            if (data.ok === 0) {
                return setErrorMessage(data.message)
            }
            setAuthToken(data.token)

            getMe().then(res => {
                if (data.ok !== 1) {
                    setAuthToken(null)
                    return setErrorMessage(res.message)
                }
                setUser(res.data)
                navigate("/")
            })

        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                username: <input value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                password <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button>登入</button>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </form>
    );
}

export default LoginPage;
