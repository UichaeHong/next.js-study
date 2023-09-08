"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Update() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const router = useRouter();
  const params = useParams(); // 2. id 값 가져오기 위해 params 가져오기
  const id = params.id; // id라는 변수에 id 값 저장
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "topics/" + id) // 1. id = fetch 할 때 현재 아이디값 필요
      .then((resp) => resp.json())
      .then((result) => {
        // console.log(result);
        setBody(result.body);
        setTitle(result.title);
      });
  }, []);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // onSubmit이 실행됐을 때 기본 동작(불필요한 동작) 중단시킨다 즉, 페이지가 새로 고치지 않도록 방지함
        const title = e.target.title.value;
        const body = e.target.body.value;
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        };
        fetch(`http://localhost:9999/topics/` + id, options) // POST 요청 보냄 / 서버쪽으로 데이터를 전송해서 데이터를 추가하려고 하기 때문에 option값 필요
          .then((res) => res.json()) // 서버에서 응답을 JSON 형식으로 파싱한다
          .then((result) => {
            // 파싱된 JSON 응답을 처리하는 콜백 함수를 정의하고 여기서는 응답에서 'id' 속성을 추출하고, 이를 'lastid' 변수에 저장
            console.log(result);
            const lastid = result.id;
            router.refresh();
            router.push(`/read/${lastid}`); // 라우터를 사용하여 새로운 페이지로 이동
          });
      }}
    >
      <p>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </p>
      <p>
        <textarea
          name="body"
          placeholder="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </p>
      <p>
        <input type="submit" value="create" />
      </p>
    </form>
  );
}

// 문제점 : 메인 page.js에서 create 버튼을 클릭했을 때 목록 변화가 없음
