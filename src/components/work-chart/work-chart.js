import React, { useEffect } from 'react';
import { Spin, Row, Col } from 'antd'
import Chart from "react-google-charts";
import WithWorkService from '../hoc/with-work-service';
import { setChartData } from '../../actions'
import { connect } from 'react-redux';

const WorkChart = ({ WorkService, user, chartData, setChartData, workList }) => {

    useEffect(() => {
        user && WorkService.getChartData(user)
            .then(res => setChartData(res))
            .catch(err => alert(err))
    }, [user, WorkService, workList, setChartData])

    return (

        <Col sm={24} lg={22}>
            <Chart
                chartType="Calendar"
                loader={
                    <Row className="spin-row">
                        <Spin
                            tip="Loading..."
                            size="large"
                            className='calendar-spinner' />
                    </Row>
                }
                data={[
                    [{ type: 'date', id: 'Date' },
                    { type: 'number', id: 'workDuration' }]
                    ,
                    ...chartData
                ]}
            />
        </Col>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user,
        chartData: state.chartData,
        workList: state.workList
    }
}

const mapDispatchToProps = {
    setChartData
}

export default WithWorkService()(connect(mapStateToProps, mapDispatchToProps)(WorkChart));
