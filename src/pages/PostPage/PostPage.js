import { useState, useEffect } from "react";
import styled from "styled-components"

import { useParams } from "react-router-dom"
import { getPost } from "../../WebAPI"

const PostContainer = styled.div`
  padding: 0 30px;
  max-width: 960px;
  margin: 8px auto;
`;

const PostHeader = styled.div`
  margin-bottom: 16px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const PostTitle = styled.div`
  font-size: 36px;
  font-weight: 700;
`;

const PostDate = styled.div`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.4);
  margin-top: 16px;
`;

const PostBody = styled.div`
  font-size: 20px;
  letter-spacing: 3px;
  line-height: 1.5;
`;


function PostPage() {
    const [post, setPost] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getPost(id).then((post) => setPost(post[0]));
    }, [id]);

    return (
        <PostContainer>
            <PostHeader>
                <PostTitle>{post && post.title}</PostTitle>
                <PostDate>
                    {post && new Date(post.createdAt).toLocaleString()}
                </PostDate>
            </PostHeader>
            <PostBody>{post && post.body}</PostBody>
        </PostContainer>
    );
}

export default PostPage;
