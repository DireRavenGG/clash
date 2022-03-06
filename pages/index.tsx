import { Button, Input } from "@mantine/core";
import PlayerStats from "modules/MatchList/MatchCard/PlayerStats";
import type { NextPage } from "next";
import { useState } from "react";

import { getSummonerId } from "veigar/api";

const Home: NextPage = () => {
  const [text, setText] = useState("");

  const textHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const submitHandler = async () => {
    const x = await getSummonerId(text);
    let newArr: any[] = [];
    x.forEach((result) => {
      if (result.status === "fulfilled") {
        newArr.push(result.value);
      } else {
        console.log(result.status, result.reason);
      }
    });

    console.log(newArr);
  };
  return (
    <>
      <Input onChange={textHandler} value={text} />
      <Button onClick={submitHandler}>Submit</Button>
    </>
  );
};

export default Home;
