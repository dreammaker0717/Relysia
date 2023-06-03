import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "firebase/functions";
import "firebase/database";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  activityBox2: {
    borderRadius: 15,
    width: "100%",
    minHeight:'fit-content',
    padding: "5px",
  },
}));

function Activity(props) {
  const classes = useStyles();
  const [activityList, setactivityList] = useState({});

  useEffect(() => {
    if (props.selectedActivityState === 2) {
      setactivityList(sortActivitiesByDate(props.activities));
    } else {
      filterActivities();
    }
  }, [props.activities, props.selectedActivityState]);

  const filterActivities = () => {
    let modifiArr = [];
    if (props.selectedActivityState === 0) {
      modifiArr = props.activities.filter((x) => {
        if (x.balance_change > 0) {
          return x;
        }
      });
    } else if (props.selectedActivityState === 1) {
      modifiArr = props.activities.filter((x) => {
        if (x.balance_change < 0) {
          return x;
        }
      });
    } else if (props.selectedActivityState === -1) {
      modifiArr = [];
    }
    setactivityList(sortActivitiesByDate(modifiArr));
  };

  const sortActivitiesByDate = (aciviArray) => {
    let localObj = {};
    aciviArray.map((ele) => {
      if (!localObj[moment(ele.time).format("MMM D")]) {
        localObj[moment(ele.time).format("MMM D")] = [];
      }
      localObj[moment(ele.time).format("MMM D")].push(ele);
    });
    return localObj;
  };

  const showDollarBal = (val) => {
    val = Number(val);
    if (Number(val) < 1) {
      return (
        <span className={val < 0 ? "neg-price" : "pov-price"}>
          {Number(val) * 100 > 0 ? "+" : ""}
          {(Number(val) * 100).toFixed(2)}
          <span> ¢</span>
        </span>
      );
    } else {
      return (
        <span className={val < 0 ? "neg-price" : "pov-price"}>
          {Number(val).toFixed(2)} <span> $</span>
        </span>
      );
    }
  };

  return (
    <div className={classes.activityBox2}>
      <div className="services-content" style={{ backgroundColor: "#ffffff" }}>
        <div>
          {activityList &&
            Object.keys(activityList).map((date, index0) => {
              return (
                <div key={date + index0}>
                  <p className="date-view-activity">{date}</p>
                  <div className="row activities-box-con">
                    {activityList[date] &&
                      activityList[date].map((item, index) => {
                        return (
                          <div
                            className="box activity-box"
                            key={item.block_id + "_ele" + index}
                            onClick={() => {
                              window.open(
                                `https://whatsonchain.com/tx/${item.hash}`,
                                "_ blank"
                              );
                            }}
                          >
                            <div>
                              <p className="activity-box-dollarbal">
                                {showDollarBal(
                                  (item.balance_change * props.bsvRate) /
                                    100000000
                                )}
                              </p>
                              <p className="activity-box-bsvbal">
                                {item.balance_change
                                  ? (
                                      (item.balance_change > 0
                                        ? item.balance_change
                                        : item.balance_change * -1) / 100000000
                                    ).toFixed(8)
                                  : 0}{" "}
                                BSV
                              </p>
                              <p className="activity-box-tx">#tx</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Activity;
