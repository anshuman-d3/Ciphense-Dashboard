import React from 'react';
import {Button, Col, Icon, PageHeader, Radio, Row} from "antd";
import {Doughnut, Line} from 'react-chartjs-2';

import excel from '../../static/files/Excelsheet.xlsx';

//CSS
import './live-feed-component.css';

const tabs = [
    {key: 1, value: "attendance", name: "Attendance"},
    {key: 2, value: "emotions", name: "Emotions"},
    {key: 3, value: "listView", name: "List View"},
];

const backgroundColor = [
    '#F7C496',
    '#86DCF7',
    '#F18585',
    '#5df78c'
];

const hoverBackgroundColor = [
    '#ffcc9d',
    '#8ce4ff',
    '#ff8f8f',
    '#5fff92'
];

export default class LiveFeedComponent extends React.Component {
    state = {
        checkInData: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [],
                hoverBackgroundColor: []
            }]

        },
        timesInOffice: {
            labels: [],
            datasets: []

        },
        checkOutData: {
            labels: [],
            dataset: [{
                data: [],
                backgroundColor: [
                    '#F7C496',
                    '#86DCF7',
                    '#F18585',
                    '#5df78c'
                ],
                hoverBackgroundColor: [
                    '#ffcc9d',
                    '#8ce4ff',
                    '#ff8f8f',
                    '#5fff92'
                ]
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        },
        currentTab: "attendance",
        previousTab: "attendance"
    };

    componentDidMount() {
        const officeTimes = (Object.keys(this.props.chartData["times_in_office"]).filter(key => key !== "format" && key !== "present_time")).sort();

        this.setState(prevState => ({
            ...prevState,
            checkInData: {
                ...prevState.checkInData,
                labels: Object.keys(this.props.chartData["check_in"]).map(key => {
                    let label = key.replace("_", " ");
                    return label.charAt(0).toLocaleUpperCase() + label.slice(1)
                }),
                datasets: [{
                    data: Object.values(this.props.chartData["check_in"]),
                    backgroundColor: backgroundColor,
                    hoverBackgroundColor: hoverBackgroundColor,
                    borderWidth: 0,
                    hoverBorderWidth: 2
                }],
            },
            timesInOffice: {
                ...prevState.timesInOffice,
                labels: officeTimes.map(time => time.slice(0, 2) + ":" + time.slice(2)),
                datasets: [{
                    label: "Inside Office",
                    data: officeTimes.map(key => this.props.chartData["times_in_office"][key][0]),
                    borderColor: "#6FCF97",
                    fill: false,
                    pointRadius: 1,
                    borderWidth: 5
                }, {
                    label: "Outside Office",
                    data: officeTimes.map(key => this.props.chartData["times_in_office"][key][1]),
                    borderColor: "#F18585",
                    fill: false,
                    pointRadius: 1,
                    borderWidth: 5
                }],
            },
            checkOutData: {
                ...prevState.checkInData,
                labels: Object.keys(this.props.chartData["check_out"]).map(key => {
                    let label = key.replace("_", " ");
                    return label.charAt(0).toLocaleUpperCase() + label.slice(1)
                }),
                datasets: [{
                    data: Object.values(this.props.chartData["check_out"]),
                    backgroundColor: backgroundColor,
                    hoverBackgroundColor: hoverBackgroundColor,
                    borderWidth: 0,
                    hoverBorderWidth: 2
                }]
            }
        }))
    }

    handleTabChange = (tab) => {
        this.setState({currentTab: tab.target.value})
    };

    handleGenericOnClick = () => {
        this.setState(prevState => ({...prevState, previousTab: prevState.currentTab, currentTab: "clickedElement"}))
    };

    handleGenericBack = () => {
        this.setState(prevState => ({...prevState, previousTab: "attendance", currentTab: prevState.previousTab}))
    };

    currentTabContent = () => {
        switch (this.state.currentTab) {
            case "attendance":
                return (
                    <Row>
                        <Col sm={24} md={24} lg={24} xl={8}>
                            <Doughnut
                                data={this.state.checkInData}
                                onElementsClick={this.handleGenericOnClick}
                            />
                            <h3 className={"graph-title"}>Check-in</h3>
                        </Col>
                        <Col sm={24} md={24} lg={24} xl={8}>
                            <Line
                                data={this.state.timesInOffice}
                                options={this.state.options}
                                onElementsClick={this.handleGenericOnClick}
                            />
                            <h3 className={"graph-title"}>Right Now</h3>
                        </Col>
                        <Col sm={24} md={24} lg={24} xl={8}>
                            <Doughnut
                                data={this.state.checkOutData}
                                onElementsClick={this.handleGenericOnClick}
                            />
                            <h3 className={"graph-title"}>Check-out</h3>
                        </Col>
                    </Row>
                );
            case "emotions":
                return (
                    <div>

                    </div>
                );
            case "listView":
                return (
                    <div>

                    </div>
                );
            case "clickedElement":
                return (
                    <div style={{display: "flex", justifyContent: "flex-start", width: "100%"}}>
                        <PageHeader
                            onBack={this.handleGenericBack}
                            title={
                                <span style={{color: "#FFF"}}>A Generic Page for Everything</span>
                            }
                            backIcon={
                                <span style={{color: "#FFF"}}>
                                    <Icon type="arrow-left"/>
                                </span>
                            }
                            subTitle={
                                <span
                                    style={{color: "#FFF"}}>This page is common for everything with different data.</span>
                            }
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-start",
                                color: "#FFF",
                                background: "#000"
                            }}
                        />
                    </div>
                );
            default:
                return <div> </div>
        }
    };

    render() {
        return (
            <div style={{display: "flex", flexDirection: "column"}}>
                <div>
                    {this.state.currentTab !== "clickedElement" ?
                        <Row>
                            <Col sm={24} md={24} lg={24} xl={12}>
                                <Radio.Group
                                    className={"button-group"}
                                    size={"large"}
                                    value={this.state.currentTab}
                                    onChange={this.handleTabChange}
                                    style={{marginBottom: "20px"}}
                                >
                                    {tabs.map(tab => (
                                        <Radio.Button
                                            key={tab.key}
                                            value={tab.value}
                                            style={this.state.currentTab === tab.value ?
                                                {border: "None", borderRadius: 0, color: "#FFF", background: "#3A7AB0"}
                                                : {
                                                    border: "None",
                                                    borderRadius: 0,
                                                    color: "#FFF",
                                                    background: "#262626"
                                                }}
                                        >
                                            {tab.name}
                                        </Radio.Button>
                                    ))}
                                </Radio.Group>
                            </Col>
                            <Col sm={24} md={24} lg={24} xl={{span: 8, offset: 4}}>
                                <Button type="link" size={"large"} href={excel} download="ExcelSheet.xlsx" target="_blank">
                                    <Icon type="upload" style={{color: "#FFF", marginRight: "10px", fontSize: "20px"}}/>
                                    <span style={{color: "#FFF", fontSize: "20px"}}>Export</span>
                                </Button>
                            </Col>
                        </Row>
                        : null
                    }
                    {this.currentTabContent()}
                </div>
            </div>
        )
    }
}