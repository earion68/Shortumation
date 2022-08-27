import "./index.css";
import "./index.mobile.css";
import { FC } from "react";

import Switch from "@mui/material/Switch";
import Alert from "@mui/material/Alert";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SelectIcon from "@mui/icons-material/HighlightAltSharp";
import RunIcon from "@mui/icons-material/RunCircleOutlined";

import { InputTextView } from "components/Inputs/InputTextView";
import { ButtonIcon } from "components/Icons/ButtonIcons";
import { AutomationManagerAuto } from "../types";
import { Tags } from "./Tags";
import { TagDB } from "../TagDB";
import { Chip, Tooltip } from "@mui/material";

export type MetadataBoxProps = AutomationManagerAuto & {
  onDelete: () => void;
  onSelect: () => void;
  onRun: () => void;
  onStateUpdate: (s: "on" | "off") => void;
  onTitleUpdate: (t: string) => void;
  onDescriptionUpdate: (t: string) => void;
  tagsDB: TagDB;
  isSelected: boolean;
};
export const MetadataBox: FC<MetadataBoxProps> = (props) => {
  const isValidState = ["on", "off"].includes(props.state);
  return (
    <div
      className={[
        "automation-manager--metadatabox",
        props.isSelected ? "selected" : "",
        props.isNew ? "new" : "",
      ].join(" ")}
    >
      <div
        className="metadatabox--switch"
        title={!isValidState ? "Invalid state" : `Automation is ${props.state}`}
      >
        <Switch
          checked={props.state !== "off"}
          onChange={() =>
            props.onStateUpdate(props.state === "on" ? "off" : "on")
          }
          disabled={!isValidState}
          color={!isValidState ? "error" : "info"}
        />
        {!isValidState && props.state}
      </div>
      <div className="metadatabox--title">
        <span className="metadatabox--title--source">
          <Tooltip
            title={`This automation is located in the file ${props.source_file}. It's currently '${props.state}', it's entity id is '${props.entityId}' and it's automation id is '${props.id}'`}
          >
            <Chip
              label={`@${props.source_file} (${props.source_file_type}) - ${
                props.entityId ?? "n/a"
              }`}
              className="text-ellipsis"
            />
          </Tooltip>
        </span>
        <Tooltip title={`ID=${props.id}, EntityID=${props.entityId}`}>
          <InputTextView
            className="title"
            placeholder="Title"
            value={props.title}
            onChange={props.onTitleUpdate}
            disabled={props.isNew}
          />
        </Tooltip>
        <InputTextView
          className="description"
          placeholder="Description"
          value={props.description}
          onChange={props.onDescriptionUpdate}
          disabled={props.isNew}
        />
        {!props.isNew && <Tags automationId={props.id} tagsDB={props.tagsDB} />}
        {props.issue ? (
          <Alert severity="warning" className="issue">
            {props.issue}
          </Alert>
        ) : (
          <></>
        )}
      </div>
      <div className="buttons">
        <ButtonIcon
          className="select"
          icon={<SelectIcon />}
          onClick={props.onSelect}
          title="Select automation"
        />
        <ButtonIcon
          className="run"
          icon={<RunIcon />}
          onClick={props.onRun}
          title="Trigger automation"
        />
        <ButtonIcon
          className="delete"
          icon={<DeleteForeverIcon />}
          onClick={props.onDelete}
          title="Delete automation"
        />
      </div>
    </div>
  );
};
