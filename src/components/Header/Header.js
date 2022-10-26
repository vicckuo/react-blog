import { useContext } from "react"
import styled from "styled-components"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthContext, LoadingContext } from "../../contexts"
import { setAuthToken } from "../../utils"



const HeaderContainer = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0px 32px;
  background-color: white;
`

const Brand = styled.div`
  font-size: 32px;
  font-weight: bold;
`

const NavbarList = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
`
const Nav = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  width: 100px;
  cursor: pointer;
  color: black;
  text-decoration: none;

  ${(props) =>
    props.$active &&
    `
    background: rgba(0, 0, 0, 0.1);
  `}
`
const LeftContainer = styled.div`
  display: flex;
  align-items: center;

  ${NavbarList} {
    margin-left: 64px;
  }
`

const LoadingGetMe = styled.div`
  height: 58px;
  width: 164px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
`;

function Header() {
  const location = useLocation()
  const { isLoadingGetMe } = useContext(LoadingContext);
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    setAuthToken('')
    setUser(null)
    if (location.pathname !== "/") {
      navigate("/")
    }
  }

  return (
    <HeaderContainer>
      <LeftContainer>
        <Brand>Vic's blog</Brand>
        <NavbarList>
          <Nav to="/" $active={location.pathname === '/'}>首頁</Nav>
          {isLoadingGetMe ? (<LoadingGetMe>資料讀取中...</LoadingGetMe>
          ) : (
            <>
              {user && <Nav to="/new-post" $active={location.pathname === '/new-post'}>發佈文章</Nav>}
            </>
          )}
        </NavbarList>
      </LeftContainer>
      <NavbarList>
        {isLoadingGetMe ? (
          <LoadingGetMe>資料讀取中...</LoadingGetMe>
        ) : (
          <>
            {!user && <Nav to="/login" $active={location.pathname === '/login'}>登入</Nav>}
            {user && <Nav onClick={handleLogout}>登出</Nav>}
          </>)}
      </NavbarList>
    </HeaderContainer>
  );
}

export default Header;
