import styled from "styled-components"
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import Header from "../Header"
import { HomePage, LoginPage, PostPage, NewPostPage } from "../../pages"
import { AuthContext, LoadingContext } from "../../contexts"
import { getMe } from "../../WebAPI"
import { getAuthToken } from "../../utils"


const Root = styled.div`
  padding-top: 64px;
`

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGetMe, setLoadingGetMe] = useState(true);
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (getAuthToken()) {
      getMe().then(response => {
        if (response.ok) {
          setUser(response.data)
          setLoadingGetMe(false)
        }
      })
    } else {
      setLoadingGetMe(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <LoadingContext.Provider value={{ isLoading, setIsLoading, isLoadingGetMe }}>
          <Router>
            <Header />
            <Routes>
              <Route exact path="/" element={<HomePage />} >
              </Route>
              <Route path="/login" element={<LoginPage />} >
              </Route>
              <Route path="/posts/:id" element={<PostPage />} >
              </Route>
              <Route path="/new-post" element={<NewPostPage />} >
              </Route>
            </Routes>
          </Router>
        </LoadingContext.Provider>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
