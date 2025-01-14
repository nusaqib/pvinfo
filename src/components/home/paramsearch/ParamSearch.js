import React, { Fragment } from 'react';
import { Grid, TextField, MenuItem, Tooltip } from '@mui/material';
import SearchActions from '../searchactions/SearchActions';
import Autocomplete from '@mui/material/Autocomplete';
import PropTypes from "prop-types";

const propTypes = {
    pvName: PropTypes.string,
    handlePVNameChange: PropTypes.func,
    hostName: PropTypes.string,
    handleHostNameChange: PropTypes.func,
    iocName: PropTypes.string,
    handleIOCNameChange: PropTypes.func,
    pvStatus: PropTypes.string,
    handlePVStatusChange: PropTypes.func,
    aliasOf: PropTypes.string,
    handleAliasOfChange: PropTypes.func,
    recordType: PropTypes.string,
    handleRecordTypeChange: PropTypes.func,
    recordTypeAutocompleteKey: PropTypes.number,
    recordDesc: PropTypes.string,
    handleRecordDescChange: PropTypes.func,
    extraPropAName: PropTypes.string,
    extraPropBName: PropTypes.string,
    extraPropAValue: PropTypes.string,
    handleExtraPropAChange: PropTypes.func,
    extraPropBValue: PropTypes.string,
    handleExtraPropBChange: PropTypes.func,
    handleClear: PropTypes.func,
    setIsLoading: PropTypes.func
}

const pvStatusOptions = [
    {
        value: '*',
        label: 'Any'
    },
    {
        value: 'Active',
        label: 'Active'
    },
    {
        value: 'Inactive',
        label: 'Inactive'
    }
]

const pvRecordTypes = ['aai', 'aao', 'ai', 'ao', 'aSub', 'bi', 'bo', 'calcout', 'calc', 'compress', 'dfanout', 'event',
    'fanout', 'histogram', 'int64in', 'int64out', 'longin', 'longout', 'lsi', 'lso', 'mbbi', 'mbbiDirect', 'mbbo', 'mbboDirect',
    'permissive', 'printf', 'sel', 'seq', 'state', 'stringin', 'stringout', 'subArray', 'sub', 'waveform']

function ParamSearch(props) {
    const recordDescSearchRender = () => {
        if (process.env.REACT_APP_CF_RECORD_DESC === "true") {
            return (
                <Tooltip arrow title={<div>* for any # character wildcard<br />? for single character wildcard<br />! at beginning for not equal<br />= at beginning for exactly equal</div>}>
                    <TextField
                        sx={{ display: "flex", flexGrow: 1, minWidth: { xs: '100%', md: '50%', lg: '16%' } }}
                        id="recordDsec"
                        label="Description"
                        autoComplete="off"
                        name="recordDesc"
                        value={props.recordDesc}
                        placeholder="Description"
                        type="search"
                        variant="outlined"
                        onChange={props.handleRecordDescChange}
                    />
                </Tooltip>
            )
        }
    }
    const recordTypeSearchRender = () => {
        if (process.env.REACT_APP_CF_RECORD_TYPE === "true") {
            return (
                // <Box sx={{ display: "flex" }}>
                <Tooltip arrow title={<div>* for any # character wildcard<br />? for single character wildcard<br />! at beginning for not equal<br />= at beginning for exactly equal</div>}>
                    <Autocomplete
                        sx={{ display: "flex", flexGrow: 1, minWidth: { xs: '50%', md: '25%', lg: '8%' } }}
                        freeSolo
                        disableClearable
                        options={pvRecordTypes}
                        key={props.recordTypeAutocompleteKey}
                        value={props.recordType}
                        renderInput={(params) =>
                            <TextField
                                id="recordType"
                                {...params}
                                label="Record Type"
                                name="recordType"
                                placeholder="Record Type"
                                type="search"
                                variant="outlined"
                                onChange={props.handleRecordTypeChange}
                            />
                        }
                    />
                </Tooltip>
                // </Box>
            )
        }
    }
    const aliasOfSearchRender = () => {
        if (process.env.REACT_APP_CF_ALIAS === "true") {
            return (
                <Tooltip arrow title={<div>* for any # character wildcard<br />? for single character wildcard<br />! at beginning for not equal<br />= at beginning for exactly equal</div>}>
                    <TextField
                        sx={{ display: "flex", flexGrow: 1, minWidth: { xs: '50%', md: '25%', lg: '8%' } }}
                        id="alias"
                        label="Alias Of"
                        autoComplete="off"
                        name="alias"
                        value={props.aliasOf}
                        placeholder="Alias Of"
                        type="search"
                        variant="outlined"
                        onChange={props.handleAliasOfChange}
                    />
                </Tooltip>
            )
        }
    }
    const extraPropARender = () => {
        if (props.extraPropAName !== null) {
            if (process.env.REACT_APP_EXTRA_PROP_DROPDOWN_LABELS !== "") {
                return (
                    // <Box sx={{ display: "flex" }}>
                    <Tooltip arrow title={<div>* for any # character wildcard<br />? for single character wildcard<br />! at beginning for not equal<br />= at beginning for exactly equal</div>}>
                        <Autocomplete
                            sx={{ display: "flex", flexGrow: 1, minWidth: { xs: '50%', md: '25%', lg: '8%' } }}
                            freeSolo
                            disableClearable
                            options={process.env.REACT_APP_EXTRA_PROP_DROPDOWN_LABELS.split(",")}
                            key={props.recordTypeAutocompleteKey}
                            value={props.extraPropAValue}
                            renderInput={(params) =>
                                <TextField
                                    id="extraPropA"
                                    {...params}
                                    label={process.env.REACT_APP_EXTRA_PROP_LABEL}
                                    name="extraPropA"
                                    placeholder={process.env.REACT_APP_EXTRA_PROP_LABEL}
                                    type="search"
                                    variant="outlined"
                                    onChange={props.handleExtraPropAChange}
                                />
                            }
                        />
                    </Tooltip>
                    // </Box>
                )
            }
            else {
                return (
                    <Tooltip arrow title={<div>* for any # character wildcard<br />? for single character wildcard<br />! at beginning for not equal<br />= at beginning for exactly equal</div>}>
                        <TextField
                            sx={{ display: "flex", flexGrow: 1, minWidth: { xs: '50%', md: '25%', lg: '8%' } }}
                            id="extraPropA"
                            label={process.env.REACT_APP_EXTRA_PROP_LABEL}
                            autoComplete="off"
                            name="extraPropA"
                            value={props.extraPropAValue}
                            placeholder={process.env.REACT_APP_EXTRA_PROP_LABEL}
                            type="search"
                            variant="outlined"
                            onChange={props.handleExtraPropAChange}
                        />
                    </Tooltip>
                )
            }
        }
    }
    const extraPropBRender = () => {
        if (props.extraPropBName !== null) {
            if (process.env.REACT_APP_SECOND_EXTRA_PROP_DROPDOWN_LABELS !== "") {
                return (
                    // <Box sx={{ display: "flex" }}>
                    <Tooltip arrow title={<div>* for any # character wildcard<br />? for single character wildcard<br />! at beginning for not equal<br />= at beginning for exactly equal</div>}>
                        <Autocomplete
                            sx={{ display: "flex", flexGrow: 1, minWidth: { xs: '50%', md: '25%', lg: '8%' } }}
                            freeSolo
                            disableClearable
                            options={process.env.REACT_APP_SECOND_EXTRA_PROP_DROPDOWN_LABELS.split(",")}
                            key={props.recordTypeAutocompleteKey}
                            value={props.extraPropBValue}
                            renderInput={(params) =>
                                <TextField
                                    id="extraPropB"
                                    {...params}
                                    label={process.env.REACT_APP_SECOND_EXTRA_PROP_LABEL}
                                    name="extraPropB"
                                    placeholder={process.env.REACT_APP_SECOND_EXTRA_PROP_LABEL}
                                    type="search"
                                    variant="outlined"
                                    onChange={props.handleExtraPropBChange}
                                />
                            }
                        />
                    </Tooltip>
                    // </Box>
                )
            }
            else {
                return (
                    <Tooltip arrow title={<div>* for any # character wildcard<br />? for single character wildcard<br />! at beginning for not equal<br />= at beginning for exactly equal</div>}>
                        <TextField
                            sx={{ display: "flex", flexGrow: 1, minWidth: { xs: '50%', md: '25%', lg: '8%' } }}
                            id="extraPropB"
                            label={process.env.REACT_APP_SECOND_EXTRA_PROP_LABEL}
                            autoComplete="off"
                            name="extraPropB"
                            value={props.extraPropBValue}
                            placeholder={process.env.REACT_APP_SECOND_EXTRA_PROP_LABEL}
                            type="search"
                            variant="outlined"
                            onChange={props.handleExtraPropBChange}
                        />
                    </Tooltip>
                )
            }
        }
    }

    return (
        <Fragment>
            <Grid item container xs={12} sx={{ display: 'flex', flexWrap: { xs: 'wrap', lg: 'nowrap' } }}>
                {/* <Box className="main-query-box" sx={{ flex: 1 }}> */}
                <Tooltip arrow title={<div>* for any # character wildcard<br />? for single character wildcard<br />= at beginning for exactly equal</div>}>
                    <TextField
                        sx={{ display: "flex", flexGrow: 1, minWidth: { xs: '100%', md: '50%', lg: '16%' }, textOverflow: 'ellipsis' }}
                        id="pvName"
                        label="PV Name"
                        name="pvName"
                        autoComplete="off"
                        value={props.pvName}
                        placeholder="PV Name"
                        type="search"
                        variant="outlined"
                        onChange={props.handlePVNameChange}
                    />
                </Tooltip>
                {recordDescSearchRender()}
                <Tooltip arrow title={<div>* for any # character wildcard<br />? for single character wildcard<br />! at beginning for not equal<br />= at beginning for exactly equal</div>}>
                    <TextField
                        sx={{ display: "flex", flexGrow: 1, minWidth: { xs: '50%', md: '25%', lg: '8%' } }}
                        id="hostName"
                        label="Host Name"
                        autoComplete="off"
                        name="hostName"
                        value={props.hostName}
                        placeholder="Host Name"
                        type="search"
                        variant="outlined"
                        onChange={props.handleHostNameChange}
                    />
                </Tooltip>
                <Tooltip arrow title={<div>* for any # character wildcard<br />? for single character wildcard<br />! at beginning for not equal<br />= at beginning for exactly equal</div>}>
                    <TextField
                        sx={{ display: "flex", flexGrow: 1, minWidth: { xs: '50%', md: '25%', lg: '8%' } }}
                        id="iocName"
                        label="IOC Name"
                        autoComplete="off"
                        name="iocName"
                        value={props.iocName}
                        placeholder="IOC Name"
                        type="search"
                        variant="outlined"
                        onChange={props.handleIOCNameChange}
                    />
                </Tooltip>
                {/* <Box sx={{ display: "flex", flexGrow: 1, minWidth: 100 }}> */}
                <TextField
                    sx={{ display: "flex", flexGrow: 1, minWidth: { xs: '50%', md: '25%', lg: '8%' } }}
                    id="pvStatus"
                    name="pvStatus"
                    select
                    value={props.pvStatus}
                    onChange={props.handlePVStatusChange}
                    label="Status"
                    variant="outlined"
                >
                    {pvStatusOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value} >
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                {/* </Box> */}
                {recordTypeSearchRender()}
                {/* <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1, flexWrap: { xs: 'wrap', md: 'nowrap' } }}> */}
                {extraPropARender()}
                {extraPropBRender()}
                {aliasOfSearchRender()}
                <SearchActions handleClear={props.handleClear} minWidth={{ xs: '50%', md: '25%', lg: '8%' }} />
                {/* </Box> */}
            </Grid>
        </Fragment>
    );
}

ParamSearch.propTypes = propTypes
export default ParamSearch;
