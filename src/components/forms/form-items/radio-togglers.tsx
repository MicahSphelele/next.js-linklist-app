import { RadioOptionsDTO } from "@/domain/models/dto/radio-options-dto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  options: RadioOptionsDTO[];
  defaultValue: string;
  onChange?: (value: string) => void;
};

const RadioTogglers = ({
  options,
  defaultValue,
  onChange,
}: Props) => {
  const isSelected = (value: string) => {
    return value === defaultValue;
  };

  return (
    <div className="radio-togglers shadow">
      {options.map((item) => {
        return (
          <label key={item.value}>
            <input
              onChange={(e) => onChange?.((e.target as HTMLInputElement).value)}
              type="radio"
              name="bgType"
              value={item.value}
              defaultChecked={isSelected(item.value)}
            />
            <div>
              <FontAwesomeIcon icon={item.icon} />
              <span>{item.label}</span>
            </div>
          </label>
        );
      })}
    </div>
  );
};

export default RadioTogglers;
