import { AutomationCondition, ConditionType, conditionTypes } from "./condition";
import { AutomationScript, ScriptType, scriptTypes } from "./script";
import { AutomationTrigger, TriggerType, triggerTypes } from "./triggers";

export interface Automation {
    id: string;
    alias: string;
    description: string;
    trigger_variables: Record<string, string>;
    mode: "single" | "restart" | "queued" | "parallel";
    trigger: AutomationTrigger[];
    condition: AutomationCondition[];
    action: AutomationAction[];
}

export type AutomationNodeTypes = Pick<Automation, 'trigger' | 'condition' | 'action'>;
export type AutomationNodeType = keyof AutomationNodeTypes;
export type AutomationAction = AutomationScript | AutomationCondition;
export type AutomationNode<T extends AutomationNodeType> = 
    AutomationNodeTypes[T][number];

export type NodeSubType<T=any> =
    T extends 'action' ? ScriptType :
    T extends 'condition' ? ConditionType :
    T extends 'trigger' ? TriggerType :
    never;

export const typeList = {
    'action': scriptTypes,
    'condition': conditionTypes,
    'trigger': triggerTypes,
} as const;