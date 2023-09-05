"use client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export function Control() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  return (
    <ul>
      <li>
        <Link href="/create">create</Link>
      </li>
      {id ? (
        <>
          <li>
            <Link href={"/update/" + id}>update</Link>
          </li>
          <li>
            <input
              type="button"
              value="delete"
              onClick={() => {
                const options = { method: "DELETE" };
                fetch("http://localhost:9999/topics/" + id, options)
                  .then((resp) => resp.json())
                  .then((result) => {
                    // console.log(result);
                    router.push("/");
                  });
              }}
            />
          </li>
        </>
      ) : null}
    </ul>
  );
}
