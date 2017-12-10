export interface DisplaySettingsInfo {
  showDST: DSTSetting;
  showUTCOffset: boolean;
  showTimeZoneId: boolean;
  showControlPanel: boolean;
  useDarkTheme: boolean;
  use24HoursTime: boolean;
  selectionStep: number;
}

export type DSTSetting = "hide" | "DST" | "Summer/Winter";