import React from "react";
import { useTranslation } from "react-i18next";

const AlarmSNUse = props => {
  console.log("This is use props:");
  console.log(props);
  var stack = props.stackStatus;
  console.log(stack);
  const { t } = useTranslation("alarm_v1-"+stack);
  return (
    <div>
      <h2>{t("guides.tab-use-sn")}</h2>
      <p>{t("guides.use.sn-intro")}</p>
      <p>{t("guides.use.calibrate")}</p>
      <p>{t("guides.use.alarm")}</p>
      <p>{t("guides.use.restart")}</p>
      <p>{t("guides.use.interval-sn")}</p>
      <p>{t("guides.use.offline")}</p>
      <p>{t("guides.use.power")}</p>
      <p>{t("guides.use.placement")}</p>
    </div>
  );
};
export default AlarmSNUse;

          