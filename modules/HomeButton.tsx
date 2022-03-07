import { Button } from "@mantine/core";
import { useRouter } from "next/router";

const HomeButton = () => {
  const router = useRouter();
  const buttonHandler = () => {
    router.push({
      pathname: "/",
    });
  };
  return <Button onClick={buttonHandler}>Home</Button>;
};

export default HomeButton;
