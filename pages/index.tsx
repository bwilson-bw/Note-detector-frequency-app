import type { NextPage } from "next";
import { useState } from "react";
import { freelizer } from "./freelizer/index";
import DataScreen from "./DataScreen";

import styles from "../styles/Home.module.css";

interface Data {
  frequency: number;
  note: string;
  noteFrequency: number;
  octave: number;
  deviation: number;
}

const Home: NextPage = () => {
  const [data, setData] = useState<Data>();
  const [hasStarted, setHasStarted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [stopFunc, setStopFunc] = useState<any>();

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.main}>
          <h1>Frequency / Note detector</h1>
          {isError ? (
            <div>error</div>
          ) : hasStarted ? (
            <button
              className={styles.button}
              onClick={() => {
                setHasStarted(false);
                if (stopFunc) {
                  stopFunc();
                }
              }}
            >
              Stop
            </button>
          ) : (
            <button
              className={styles.button}
              onClick={async () => {
                setHasStarted(true);
                try {
                  const { start, stop, subscribe, unsubscribe } =
                    await freelizer();
                  setStopFunc(() => stop);
                  start();
                  const callbackExample = (data: Data) => setData(data);
                  subscribe(callbackExample);
                } catch (e) {
                  setHasStarted(false);
                  setIsError(true);
                }
              }}
            >
              Start
            </button>
          )}
          <DataScreen data={data} hasStarted={hasStarted} />
        </div>
      </div>
    </div>
  );
};

export default Home;
