import { Button, Center, Container, Group, Input, Title } from "@mantine/core";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useGlobalState } from "../utils/state";
import { getClashData } from "../lolApi/getClashData";

export interface ClashDataProps {
  setClashData: Dispatch<SetStateAction<{}[]>>;
  clashData: {}[];
}
const Home = () => {
  const [text, setText] = useState("");
  const [clashLive, setClashLive] = useState(false);
  const [data, setData] = useState<any>();
  const [forTeam, setForTeam] = useState(false);
  const router = useRouter();

  const textHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const [globalState, updateGlobalState] = useGlobalState();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text == "") {
      return;
    }
    if (forTeam) {
      router.push({
        pathname: "/summoner/[summonerName]",

        query: {
          summonerName: text,
        },
      });

      return;
    }
    if (!clashLive) {
      router.push({
        pathname: "/clashNotLive",
      });
      return;
    }
    // const x = await getClashData(text);
    // let newArr: any[] = [];
    // if (!x) return;
    // if (x.length == 5) {
    //   x.forEach((result) => {
    //     if (result.status === "fulfilled") {
    //       newArr.push(result.value);
    //     } else {
    //       console.log(result.status, result.reason);
    //     }
    //   });

    //   setData(newArr);
    // }
    // if (newArr.length == x.length) {
    //   console.log(newArr);
    //   router.push({
    //     pathname: "/clashteam",
    //   });
    // }
  };

  const demoHandler = () => {
    router.push({
      pathname: "/demo",
    });
  };

  const teamHandler = () => {
    setForTeam(!forTeam);
  };

  return (
    <>
      <Container mt={300}>
        <Group direction="column" grow>
          <Title
            align="center"
            sx={{ paddingBottom: "24px", fontSize: "56px" }}
          >
            GG.PO
          </Title>
          <Group grow sx={{ paddingRight: "24px" }}>
            <form onSubmit={submitHandler}>
              <Input
                onChange={textHandler}
                placeholder="ex. Hide on Bush"
                value={text}
                rightSection={<Button type="submit">Search</Button>}
              />
            </form>
          </Group>

          <Group
            sx={{ marginTop: "24px", justifyContent: "center", padding: "4px" }}
          >
            {forTeam ? null : <Button onClick={demoHandler}>Demo</Button>}
            <Button onClick={teamHandler}>
              {forTeam ? "Clash" : "Single"}
            </Button>
          </Group>
        </Group>
      </Container>
    </>
  );
};

export default Home;
