import { PropsWithChildren, useState } from "react";
import { AutomationTime, AutomationTimeObject } from "types/automations/common";
import { milisecondsToObject } from "utils/time";
import InputWrapper from "./InputWrapper";
import { useInputTimeStyles } from "./styles";
import { convertStringToAutomationTimeObject } from 'utils/time';

export interface Props {
  textBoxFor?: string;
  label: string;
  value?: AutomationTime;
  onChange: (v?: AutomationTimeObject) => void;
  onEnter?: () => void;
}
export default function InputTime({
  label,
  textBoxFor,
  value = {},
  onChange,
  onEnter = () => { },
  children,
}: PropsWithChildren<Props>) {
  let cleanValue = '';
  if (value) {
    if (typeof value === 'string') {
      value = convertStringToAutomationTimeObject(value);
    }
    const {
      hours = 0,
      minutes = 0,
      seconds = 0,
      milliseconds = 0,
    } = value;
    cleanValue = [hours, minutes, seconds].map(x => String(x).padStart(2, '0')).join(':') + `.${String(milliseconds).padStart(3, '0')}`;
  }
  const { classes } = useInputTimeStyles({});
  const [isFocused, setIsFocused] = useState(false)
  return <InputWrapper className={classes.wrapper} label={label} labelSize={(value === '') && !isFocused ? 'normal' : 'small'}>
    <input
      className={classes.input}
      type="time"
      step={0.001}
      value={cleanValue}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          onEnter();
        }
      }}
      onChange={e => {
        e.preventDefault();
        onChange(milisecondsToObject(e.target.valueAsNumber))
      }}
      onBlur={e => {
        setIsFocused(false)
      }}
    />
    <button onClick={() => onChange()} className={classes.cancel}>X</button>
    {children}
  </InputWrapper>
}
