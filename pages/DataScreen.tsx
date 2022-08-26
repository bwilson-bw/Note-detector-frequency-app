import styles from "../styles/Home.module.css";

type DataScreenProps = {
  data: any;
  hasStarted: boolean;
};

export default function DataScreen({ data, hasStarted }: DataScreenProps) {
  return (
    <div className={styles.dataContainer}>
      <div className={styles.info}>
        <div className={styles.center}>
          <div className={styles.giantText}>
            {hasStarted ? data?.note : "#"}
            {hasStarted ? data?.octave : ""}
          </div>
          <div className={styles.smallText}>Note</div>
        </div>
        <div className={styles.center}>
          <div className={styles.giantText}>
            {hasStarted ? Math.round(data?.noteFrequency) : "-"}
          </div>
          <div className={styles.smallText}>{`Frequency(Hz)`}</div>
        </div>
      </div>
    </div>
  );
}
