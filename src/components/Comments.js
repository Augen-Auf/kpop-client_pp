import React, {useContext, useEffect, useState, Fragment} from 'react';
import CommentInput from "./CommentInput";
import {getNewsComments} from "../http/CommentAPI";
import {observer} from "mobx-react-lite";
import { useAuth } from "../contexts/FirebaseAuthContext";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

const Comments = observer(({newsId}) => {

    const { userStore } = useAuth();

    const [comments, setComments] = useState([]);

    const updateCommentsList = (newComment) => {
        console.log(newComment)
        console.log(comments)
        setComments([newComment, ...comments])
    }

    useEffect(() => {
        console.log(newsId)
        getNewsComments(newsId).then(r => {
            console.log(r)
            setComments(r)
        })
    },[])

    return (
        <div className="space-y-3">
            <p className="text-xl font-semibold">{ comments.length } Комментариев</p>

            { userStore.user.uid && <CommentInput newsId={newsId} parentId={null} authorId={ userStore.user.uid } updateCommentsList={updateCommentsList}/> }

            { comments &&
                <div className="space-y-4">
                    {
                        comments.filter(item => item.parent_id === null).map(item =>
                            <div className="p-4 bg-yellow">
                                <Fragment>
                                    <SingleComment comment={item} newsId={newsId} authorId={ userStore.user.uid } updateCommentsList={updateCommentsList} />
                                    <ReplyComment comments={comments} newsId={newsId} parentId={item.id} authorId={userStore.user.id} updateCommentsList={updateCommentsList} />
                                </Fragment>
                            </div>
                        )
                    }
                </div>
            }
        </div>
    );
})

export default Comments;
