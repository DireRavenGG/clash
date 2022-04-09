import { Button, Container, Group, Input } from "@mantine/core";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useGlobalState } from "utils/state";
import { getSummonerId } from "veigar/api";

export interface ClashDataProps {
  setClashData: Dispatch<SetStateAction<{}[]>>;
  clashData: {}[];
}
const Home = () => {
  const [text, setText] = useState("");
  const [clashLive, setClashLive] = useState(false);
  const [data, setData] = useState<any>();
  const [cheese, setCheese] = useState<any>();
  const router = useRouter();

  const textHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const [globalState, updateGlobalState] = useGlobalState();

  // useEffect(() => {
  //   updateGlobalState("data", data);
  // }, []);

  const submitHandler = async () => {
    if (!clashLive) {
      router.push({
        pathname: "/clashNotLive",
      });
      return;
    }
    const x = await getSummonerId(text);
    let newArr: any[] = [];
    if (x.length == 5) {
      x.forEach((result) => {
        if (result.status === "fulfilled") {
          newArr.push(result.value);
        } else {
          console.log(result.status, result.reason);
        }
      });

      setData(newArr);
    }
    if (newArr.length == x.length) {
      console.log(newArr);
      router.push({
        pathname: "/clashteam",
      });
    }
  };

  const demoHandler = () => {
    router.push({
      pathname: "/demo",
    });
  };

  return (
    <>
      <Container mt={300}>
        <Group direction="column" grow>
          <Group grow>
            <Input
              onChange={textHandler}
              placeholder="ex. Hide on Bush"
              value={text}
              rightSection={<Button onClick={submitHandler}>Search</Button>}
            />
          </Group>

          <Group sx={{ marginTop: "20px", justifyContent: "center" }}>
            <Button onClick={demoHandler}>Demo</Button>
          </Group>
        </Group>
      </Container>
    </>
  );
};

export default Home;
