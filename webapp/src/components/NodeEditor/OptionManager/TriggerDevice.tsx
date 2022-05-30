import { OptionManager } from './OptionManager';
import { AutomationTriggerDevice } from 'types/automations/triggers';
import InputText from 'components/Inputs/InputText';
import { InputEntity } from 'components/Inputs/InputEntities';
import InputTextBubble from 'components/Inputs/InputTextBubble';
import { InputDevice } from 'components/Inputs/InputDevice';


export const TriggerDevice: OptionManager<AutomationTriggerDevice> = {
  defaultState: () => ({
    "platform": 'device',
  }),
  isReady: () => true,
  renderOptionList: (state, setState, { getDomainList }) => {
    return <>
      <InputTextBubble label="Domain" options={getDomainList()} value={state.domain} onChange={domain => setState({
        ...state,
        domain: domain ? domain[0] : "",
      })} />
      <InputText label="Type" value={state.type ?? ""} onChange={type => setState({
        ...state,
        type
      })} />
      <InputText label="Subtype" value={state.subtype ?? ""} onChange={subtype => setState({
        ...state,
        subtype
      })} />
      <InputDevice value={state.device_id ?? ""} onChange={device_id => setState({
        ...state,
        device_id: device_id ?? "",
      })} />
      <InputEntity restrictToDomain={state.domain ? [state.domain] : undefined} value={state.entity_id ?? ""} multiple onChange={entity_id => setState({
        ...state,
        entity_id
      })} />
    </>
  }
}
