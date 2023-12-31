/* eslint-disable @next/next/no-img-element */
import {
  WalletConnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import Head from "next/head";
import { useMemo, useState } from "react";
import { levelUpCreature, updateCreatureStats } from "~/actions/state";
import { LevelStatDisplay } from "~/components/LevelStatDisplay";
import { StatDisplay } from "~/components/StatDisplay";
import { TraitsDisplay } from "~/components/TraitsDisplay";
import { TIME_CONST } from "~/models/time";
import { type Creature } from "~/models/types";

export default function Home() {
  //const [temperature, setTemperature] = useState<string>("50");

  const [creature, setCreature] = useState<Creature>({
    traits: {
      antlers: 0,
      hair: 0,
      ears: 0,
      wings: 0,
    },
    foodStats: {
      target: Date.now(),
      range: 10000,
      over: 0,
      neutral: 0,
      under: 0,
    },
    levelStats: {
      level: 1,
      minFood: 6,
      evolveTs: Date.now() + TIME_CONST,
    },
  });

  const { antlers, hair, ears, wings } = creature.traits;

  const critterUrl = useMemo(() => {
    const url = `https://shdw-drive.genesysgo.net/H5Ljn9KqE9kNBMcR2dNPwxUyvmLTevv389wFmALGDTei/A${antlers}_B${hair}_C${ears}_D${wings}.png`;
    return url;
  }, [antlers, ears, hair, wings]);

  const handleFeed = () => {
    setCreature((currentState) => {
      const newFoodStats = updateCreatureStats(currentState.foodStats);
      const fedCreature = {
        ...currentState,
        foodStats: newFoodStats,
      };
      const leveledCreature = levelUpCreature(fedCreature);
      return leveledCreature;
    });
  };

  /*
  const handlePlay = () => {
    return;
  };
  */

  return (
    <>
      <Head>
        <title>Evolvemon</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
          <div className="flex w-full flex-row justify-between px-10 pt-10">
            <WalletConnectButton />
            <WalletMultiButton />
          </div>
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <div className="flex w-full justify-around xs:flex-col sm:flex-row">
              <img
                className="xs:w-full sm:w-9/12"
                src={critterUrl}
                alt="character go here"
              />
              <StatDisplay stats={creature.foodStats} />
              <LevelStatDisplay levelStats={creature.levelStats} />
              <TraitsDisplay traits={creature.traits} />
            </div>
            <div className="flex w-full flex-row justify-around px-10">
              <button
                className="inline-flex items-center rounded bg-gray-300 p-1 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400"
                onClick={() => handleFeed()}
              >
                FEED
              </button>
              {/*<button
                className="inline-flex items-center rounded bg-gray-300 p-1 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400"
                onClick={() => handlePlay()}
              >
                PLAY
              </button>
              <input
                type="range"
                onChange={(e) => {
                  const temp = e.target.value;
                  temp && setTemperature(temp);
                }}
              ></input>
              <span className="inline-flex items-center rounded bg-gray-300 p-1 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400">
                {`temperature: ${temperature}`}
              </span>*/}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
