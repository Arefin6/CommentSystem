/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import API from "../Api/index";
// import { io } from "socket.io-client";

export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [meta, setMeta] = useState({ page: 1, limit: 10, total: 0 });
  const [sortBy, setSortBy] = useState("newest");

  //   useEffect(() => {
  //     const socket = io(process.env.REACT_APP_SOCKET_URL);
  //     socket.on("comment:created", (c) => setComments((prev) => [c, ...prev]));
  //     socket.on("comment:updated", (c) =>
  //       setComments((prev) => prev.map((x) => (x._id === c._id ? c : x)))
  //     );
  //     socket.on("comment:deleted", ({ id }) =>
  //       setComments((prev) => prev.filter((x) => x._id !== id))
  //     );
  //     socket.on("comment:liked", ({ id, likesCount, dislikesCount }) =>
  //       setComments((prev) =>
  //         prev.map((c) =>
  //           c._id === id ? { ...c, likesCount, dislikesCount } : c
  //         )
  //       )
  //     );
  //     return () => socket.disconnect();
  //   }, []);

  const fetchComments = async (page = 1, sort = sortBy) => {
    const res = await API.get("/comments", {
      params: { page, sortBy: sort },
    });
    setComments(res.data.data);
    setMeta(res.data.meta);
  };

  const addComment = async (content, parent = null) => {
    const res = await API.post("/comments/create", { content, parent });
    setComments((prev) => [res.data, ...prev]);
  };

  const like = async (id) => {
    const res = await API.post(`/comments/like/${id}`);
    setComments((prev) =>
      prev.map((c) =>
        c._id === id
          ? {
              ...c,
              likesCount: res.data.likesCount,
              dislikesCount: res.data.dislikesCount,
            }
          : c
      )
    );
  };

  const dislike = async (id) => {
    const res = await API.post(`/comments/dislike/${id}/`);
    setComments((prev) =>
      prev.map((c) =>
        c._id === id
          ? {
              ...c,
              likesCount: res.data.likesCount,
              dislikesCount: res.data.dislikesCount,
            }
          : c
      )
    );
  };

  const deleteComment = async (id) => {
    await API.delete(`/comments/delete/${id}`);
    setComments((prev) => prev.filter((c) => c._id !== id));
  };

  return (
    <CommentsContext.Provider
      value={{
        comments,
        meta,
        sortBy,
        setSortBy,
        fetchComments,
        addComment,
        like,
        dislike,
        deleteComment,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};
