import { A, Title } from "solid-start";
import { HttpStatusCode } from "solid-start/server";

export default function NotFound() {
  return (
    <main>
      <Title>Not Found</Title>
      <HttpStatusCode code={404} />
      <h1>Oops...Not found</h1>
      <A href="/">Go To Home</A>
    </main>
  );
}
