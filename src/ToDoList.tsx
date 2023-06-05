import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { toDoGoneAtoms, toDoLikeAtoms, toDoWantAtoms } from "./atoms";

interface Iform {
  toDo: string;
}
const ToDoList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<Iform>();
  const [todoWant, setTodoWant] = useRecoilState(toDoWantAtoms);
  const [todoGone, setTodoGone] = useRecoilState(toDoGoneAtoms);
  const [todoLike, setTodoLike] = useRecoilState(toDoLikeAtoms);

  const onValid = (data: Iform) => {
    if (data.toDo.length === 0) {
      return setError(
        "toDo",
        { message: "🥺 required!" },
        { shouldFocus: true }
      );
    }
    if (
      todoWant.includes(data.toDo) ||
      todoLike.includes(data.toDo) ||
      todoGone.includes(data.toDo)
    ) {
      return setError(
        "toDo",
        { message: "🥺 already included" },
        { shouldFocus: true }
      );
    }
    setTodoWant((prev) => [...prev, data.toDo]);
    if (todoWant.length !== 0) {
      localStorage.setItem("wants", [...todoWant, data.toDo].join("/"));
    } else {
      localStorage.setItem("wants", data.toDo);
    }

    setValue("toDo", "");
  };
  useEffect(() => {
    if (
      localStorage !== null &&
      localStorage.getItem("wants") !== undefined &&
      localStorage.getItem("wants") !== null
    ) {
      const wants = localStorage.getItem("wants")?.split("/");
      if (wants && wants[0] !== "") setTodoWant(wants);
    }
    if (
      localStorage !== null &&
      localStorage.getItem("gones") !== undefined &&
      localStorage.getItem("gones") !== null
    ) {
      const gones = localStorage.getItem("gones")?.split("/");
      if (gones && gones[0] !== "") setTodoGone(gones);
    }
    if (
      localStorage !== null &&
      localStorage.getItem("likes") !== undefined &&
      localStorage.getItem("likes") !== null
    ) {
      const likes = localStorage.getItem("likes")?.split("/");
      if (likes && likes[0] !== "") setTodoLike(likes);
    }
  }, []);
  return (
    <main>
      <h2>내가 가고싶은 나라들</h2>
      <form onSubmit={handleSubmit(onValid)}>
        <input placeholder="이름" {...register("toDo")} />
        {errors?.toDo?.message}
        <input type="submit" value="가자!"></input>
      </form>
      {todoWant.map((el, idx) => (
        <p key={el}>
          {el}
          <button
            onClick={() => {
              setTodoWant((prev) => {
                let temp = prev.filter((want) => want !== el);

                localStorage.setItem("wants", temp.join("/"));

                return temp;
              });
              setTodoGone((prev) => {
                let temp = [...prev, el];
                localStorage.setItem("gones", temp.join("/"));
                return temp;
              });
            }}
          >
            ✅
          </button>
          <button
            onClick={() =>
              setTodoWant((prev) => {
                let temp = prev.filter((want) => want !== el);
                localStorage.setItem("wants", temp.join("/"));

                return temp;
              })
            }
          >
            🗑
          </button>
        </p>
      ))}
      <h2>내가 가본 나라들</h2>
      {todoGone.map((gone, idx) => (
        <p key={gone}>
          {gone}
          <button
            onClick={() => {
              setTodoGone((prev) => {
                let temp = prev.filter((want) => want !== gone);
                localStorage.setItem("gones", temp.join("/"));
                return temp;
              });
              setTodoLike((prev) => {
                let temp = [...prev, gone];
                localStorage.setItem("likes", temp.join("/"));
                return temp;
              });
            }}
          >
            👍
          </button>
          <button
            onClick={() => {
              setTodoGone((prev) => {
                let temp = prev.filter((want) => want !== gone);
                localStorage.setItem("gones", temp.join("/"));
                return temp;
              });
              setTodoWant((prev) => {
                let temp = [...prev, gone];
                localStorage.setItem("wants", temp.join("/"));
                return temp;
              });
            }}
          >
            ❌
          </button>
        </p>
      ))}
      <h2>내가 좋아하는 나라들</h2>
      {todoLike.map((like) => (
        <p key={like}>
          {like}
          <button
            onClick={() => {
              setTodoLike((prev) => {
                let temp = prev.filter((el) => el !== like);
                localStorage.setItem("likes", temp.join("/"));
                return temp;
              });
              setTodoGone((prev) => {
                let temp = [...prev, like];
                localStorage.setItem("gones", temp.join("/"));
                return temp;
              });
            }}
          >
            👎
          </button>
        </p>
      ))}
    </main>
  );
};

// const ToDoList = () => {
//   const { register, watch, handleSubmit, formState } = useForm();
//   const onValid = (data: any) => {
//     console.log(data);
//   };
//   console.log(watch());
//   console.log(formState.errors);

//   return (
//     <div>
//       <form onSubmit={handleSubmit(onValid)}>
//         <input
//           {...register("toDo", { required: true })}
//           placeholder="Write a to do"
//         />
//         <input
//           {...register("firstName", { required: true })}
//           placeholder="firstName"
//         />
//         <input
//           {...register("lastName", { required: true })}
//           placeholder="lastName"
//         />
//         <input
//           {...register("username", {
//             required: true,
//             minLength: { value: 10, message: "length more than 10" },
//           })}
//           placeholder="username"
//         />
//         <input
//           {...register("password", { required: true })}
//           placeholder="password"
//         />
//         <input
//           {...register("password1", { required: true })}
//           placeholder="password1"
//         />

//         <button>Add</button>
//       </form>
//     </div>
//   );
// };

export default ToDoList;
