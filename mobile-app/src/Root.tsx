import { useHelloWorldQuery } from "@common/graphql";
import { Alert, Button, Spinner } from "flowbite-react";
import { FC } from "react";

export const Root: FC = () => {
  const { data, loading, error, refetch } = useHelloWorldQuery();

  return (
    <div className={"flex h-full flex-col items-center justify-center"}>
      <h1 className={"mb-4 text-5xl"}>Fiesta</h1>
      <div className={"flex flex-col items-center justify-center"}>
        {loading ? <Spinner /> : null}
        {error ? (
          <>
            <Alert color={"failure"}>{error.message}</Alert>
            <Button onClick={() => refetch()}>Reload</Button>
          </>
        ) : null}
        {data ? (
          <>
            <div>{data.helloWorld}</div>
            <Button>Let&apos;s party!</Button>
          </>
        ) : null}
      </div>
    </div>
  );
};
