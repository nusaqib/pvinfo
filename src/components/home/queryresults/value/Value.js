import React, { useState, useEffect } from "react";
import useWebSocket from 'react-use-websocket';
import api from '../../../../api';
import colors from '../../../../colors';
import PropTypes from "prop-types";

const propTypes = {
    pvName: PropTypes.string,
    pvRecordType: PropTypes.string,
    pvStatus: PropTypes.string,
    id: PropTypes.number,
    isChecked: PropTypes.bool,
}

function Value(props) {
    const [pvValue, setPVValue] = useState("");
    const [pvSeverity, setPVSeverity] = useState("");
    const [pvUnit, setPVUnit] = useState("");

    // https://github.com/robtaussig/react-use-websocket/issues/40#issuecomment-616676102
    // pattern for sharing web socket among components
    const { lastJsonMessage } = useWebSocket(api.PVWS_URL, {
        share: true,
        filter: message => JSON.parse(message.data).pv === props.pvName,
    });

    // parse web socket message. filter on useWebSocket above means we only parse messages for this PV
    useEffect(() => {
        if (lastJsonMessage === null) {
            return;
        }
        const jsonMessage = lastJsonMessage;
        if (jsonMessage.type === "update") {
            const severity = jsonMessage.severity;
            const units = jsonMessage.units;
            const text = jsonMessage.text;
            const value = jsonMessage.value;
            const pv = jsonMessage.pv;
            if (pv === undefined) {
                console.log("Websocket message without an PV name");
                return;
            }
            if (severity !== undefined) {
                setPVSeverity(severity);
            }
            if (units !== undefined) {
                setPVUnit(units);
            }
            if (text !== undefined) {
                setPVValue(text);
            }
            else if (value !== undefined) {
                if ((Number(value) >= 0.01 && Number(value) < 1000000000) || (Number(value) <= -0.01 && Number(value) > -1000000000) || Number(value) === 0) {
                    setPVValue(Number(value.toFixed(2)));
                }
                else {
                    setPVValue(Number(value).toExponential(2));
                }
            }
        }
        else {
            console.log("Unexpected message type: ", jsonMessage);
        }
    }, [lastJsonMessage]);

    // check if the checkbox in MUI is checked, if not ignore updating state and UI
    if (!props.isChecked) {
        return (
            <div></div>
        );
    }
    // otherwise check severity for color, check if units are present, and display value
    else {
        let textColor = "black";
        if (pvSeverity !== undefined) {
            if (pvSeverity === "INVALID") {
                return (
                    <div style={{ color: colors.SEV_COLORS["INVALID"] }}>{pvValue} ({pvSeverity})</div>
                );
            }
            else if (pvSeverity === "UNDEFINED") {
                return (
                    <div style={{ color: colors.SEV_COLORS["UNDEFINED"] }}>{pvSeverity}</div>
                );
            }
            else if (pvSeverity === "NONE") {
                textColor = colors.SEV_COLORS["OK"];
            }
            else if (pvSeverity === "MINOR") {
                textColor = colors.SEV_COLORS["MINOR"];
            }
            else if (pvSeverity === "MAJOR") {
                textColor = colors.SEV_COLORS["MAJOR"];
            }
        }
        if (pvUnit !== undefined) {
            return (
                <div style={{ color: textColor }}>{`${pvValue} ${pvUnit}`}</div>
            );
        }
        else if (pvValue !== undefined) {
            return (
                <div style={{ color: textColor }}>{pvValue}</div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }
}

Value.propTypes = propTypes;
export default Value;
