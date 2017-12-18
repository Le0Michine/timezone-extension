import * as React from "react";
import { Link } from "react-router-dom";
import { connect, ActionCreator } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "material-ui/Button";
import Card from "material-ui/Card";
import Divider from "material-ui/Divider";
import Typography from "material-ui/Typography";

import { TimeLine, Clock } from "../../app.common/components";
import AddNewTimeline from "./AddNewTimeline";
import { TimeLineControls } from "./TimeLineControls";
import { DisplaySettings } from "./DisplaySettings";
import { NavTab } from "./NavTab";
import { DisplaySettingsInfo, TimeZoneInfo, createTimeZoneInfo, getOffset, getHoursWithOffset } from "../../app.common/models";
import { IAppState, IAppStoreDispatcher } from "../../app.common/store";
import { removeTimeLine, startEdit, swapTimeLines } from "../../app.common/actions";
import * as style from "./OptionsLayout.scss";
import { getManifest } from "../../app.common/util/manifest";

interface OptionsLayoutDispatchProps {
  swapTimeLines: ActionCreator<any>;
  deleteTimeLine: ActionCreator<any>;
  selectTimeLine: ActionCreator<any>;
}

interface OptionsLayoutStateProps {
  timeLines: TimeZoneInfo[];
  selectedTimeLine: TimeZoneInfo;
  displaySettings: DisplaySettingsInfo;
  scrollPosition: number;
}

interface OptionsLayoutState {
  mouseOverTimeLineIndex: number;
  manifestData: chrome.runtime.Manifest;  
}

type OptionsLayoutProps = OptionsLayoutStateProps & OptionsLayoutDispatchProps;

class OptionsLayout extends React.Component<OptionsLayoutProps, OptionsLayoutState> {

  constructor(props) {
    super(props);
    this.state = {
      mouseOverTimeLineIndex: -1,
      manifestData: getManifest(),
    };
  }

  render() {
    const { mouseOverTimeLineIndex, manifestData } = this.state;
    const {
      timeLines,
      swapTimeLines,
      selectTimeLine,
      deleteTimeLine,
      selectedTimeLine,
      displaySettings,
      scrollPosition,
    } = this.props;

    const onMouseEnter = (i) => this.setState({ mouseOverTimeLineIndex: i });
    const onMouseLeave = () => this.setState({ mouseOverTimeLineIndex: -1 });
    const sectionSpacing = "mt-5";

    return (
      <Card className="m-3">
        <div className="p-3">
          <div className={style.header}>
            <span className={style.clock}><Clock /></span>
          </div>
          <Divider />
          <Typography type="display2" className="mt-2">Display settings</Typography>
          <div>
            <DisplaySettings />
          </div>
          <Typography type="display2" className={sectionSpacing}>Selected timelines</Typography>
          <div id="timeLinesContainer">
            {timeLines.map((tl, index) =>
              <div key={tl.timeLineid} className={style.timeLineContainer} onMouseEnter={() => onMouseEnter(index)} onMouseLeave={() => onMouseLeave()}>
                <TimeLine timeLine={tl} scrollPosition={scrollPosition} offset={getOffset(tl)} hours={getHoursWithOffset(getOffset(tl))} displaySettings={displaySettings} />
                <div className={style.timLineControlsContainer}>
                  <TimeLineControls
                    onEdit={() => selectTimeLine(tl)}
                    onDelete={() => deleteTimeLine(tl)}
                    onUp={() => swapTimeLines(timeLines, index, index - 1)}
                    onDown={() => swapTimeLines(timeLines, index, index + 1)}
                    upDisabled={!index}
                    downDisabled={index === timeLines.length - 1}
                    show={index === mouseOverTimeLineIndex}
                  />
                </div>
              </div>
            )}
          </div>
          <Typography type="display2" className={sectionSpacing}>Add a new timeline</Typography>
          <AddNewTimeline />
          <div className="my-2">
            <Button
              raised
              color="primary"
              onClick={() => {
                localStorage.clear();
                location.reload();
              }}
            >Reset to default</Button>
          </div>
          <div className="align-items-center d-flex">
            <Typography type="body2" className="ml-auto">v{manifestData.version}</Typography>
          </div>
        </div>
      </Card>
    );
  }
}

export default connect<OptionsLayoutStateProps, OptionsLayoutDispatchProps, OptionsLayoutProps>(
  (state: IAppState) => ({
    timeLines: state.timeLines,
    selectedTimeLine: state.editTimeLineForm,
    displaySettings: state.displaySettings,
    scrollPosition: state.scrollPosition.position,
  } as OptionsLayoutStateProps),
  {
    swapTimeLines: swapTimeLines as ActionCreator<any>,
    deleteTimeLine: removeTimeLine as ActionCreator<any>,
    selectTimeLine: startEdit as ActionCreator<any>
  }
)(OptionsLayout);
