import { style } from "@vanilla-extract/css";
import { vars } from "../../types/App.css";

export const listsConainer = style({
  height: 'max-content',
  display: 'flex',
  flexWrap: 'wrap',
  rowGap: vars.spacing.listSpacing,
  margin: vars.spacing.listSpacing
})
