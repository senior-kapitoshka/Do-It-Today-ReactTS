import type { translations } from "../../types/translations";
import './styles.css'

interface PanelProps {
  incompleted: number;
  currentState: "all" | "active" | "completed";
  onChangeState: (state: "all" | "active" | "completed") => void;
  removeAll: () => void;
  t: typeof translations["ru"]; 
}

const Panel = ({ incompleted, currentState, onChangeState, removeAll, t }: PanelProps) => {
  const states: Array<"all" | "active" | "completed"> = ["all", "active", "completed"];
  const word = t.getTaskWord(incompleted);

  return (
    <div className="panel">
      <div className="panelRow">
        <p className="remaining">{t.remaining(incompleted, word)}</p>

        <div className="states">
          {states.map(state => (
            <button
              key={state}
              onClick={() => onChangeState(state)}
              className={`filterBtns ${currentState === state ? 'active' : ''}`}
            >
              {t[state]}
            </button>
          ))}
        </div>

        <button className="clearBtn" onClick={removeAll}>
          {t.clear}
        </button>
  </div>
</div>

  

  );
};

export default Panel;
