import * as st from "superstruct";

export const AutomationData = st.object({
  id: st.string(),
  alias: st.optional(st.string()),
  description: st.optional(st.string()),
  trigger_variables: st.optional(
    st.nullable(st.record(st.string(), st.string()))
  ),
  mode: st.enums(["single", "restart", "queued", "parallel"]),
  tags: st.record(st.string(), st.string()),

  source_file: st.string(),
  source_file_type: st.string(),
  configuration_key: st.string(),

  trigger: st.array(st.object()),
  condition: st.array(st.object()),
  action: st.array(st.object()),
});
