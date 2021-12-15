import React, { useEffect } from 'react';
import { Typography, Dropdown, Menu, Button, Row } from 'antd';
import WorkChart from '../work-chart';
import WithWorkService from '../hoc/with-work-service';
import { setWorkHoursTotal, setMonthToShow } from '../../actions';
import { connect } from 'react-redux';
import './styles.css'

const { Title } = Typography

const WorkInfo = ({ WorkService, user, monthToShow, workHoursTotal, setWorkHoursTotal, workList, setMonthToShow }) => {

  const dateYear = new Date().getFullYear()

  useEffect(() => {
    user && WorkService.getTotalHours(dateYear, monthToShow, user)
      .then(res => setWorkHoursTotal(res))
      .catch(err => alert(err))
  }, [user, WorkService, monthToShow, dateYear, setWorkHoursTotal, workHoursTotal, workList])

  const monthsMenu = <Menu onClick={({ key }) => setMonthToShow(key)}>
    <Menu.Item key='0'>leden</Menu.Item>
    <Menu.Item key='1'>únor</Menu.Item>
    <Menu.Item key='2'>březen</Menu.Item>
    <Menu.Item key='3'>duben</Menu.Item>
    <Menu.Item key='4'>květen</Menu.Item>
    <Menu.Item key='5'>červenec</Menu.Item>
    <Menu.Item key='6'>červen</Menu.Item>
    <Menu.Item key='7'>srpen</Menu.Item>
    <Menu.Item key='8'>září</Menu.Item>
    <Menu.Item key='9'>říjen</Menu.Item>
    <Menu.Item key='10'>listopad</Menu.Item>
    <Menu.Item key='11'>prosinec</Menu.Item>
  </Menu>

  const monthsList = ['leden', 'únor', 'březen', 'duben', 'květen', 'červenec', 'červen', 'srpen', 'září', 'říjen', 'listopad', 'prosinec']

  return (
    <>

      <WorkChart />

      <Row>
        <Title level={2} className="title-odpracovano">
          Odpracovano v
          <Dropdown overlay={monthsMenu} arrow>
            <Button className='btn-month'>
              {monthsList[monthToShow]}
            </Button>
          </Dropdown>

          : &nbsp;
          {workHoursTotal} hodin
        </Title>
      </Row>
      <Title level={3} className='title-mzda'>
        Hruba mzda: &nbsp;
        {workHoursTotal * 106} kc
      </Title>

    </>
  )
}

const mapStateToProps = state => {
  return {
    workDuration: state.workDuration,
    workHoursTotal: state.workHoursTotal,
    workList: state.workList,
    user: state.user,
    monthToShow: state.monthToShow
  }
}

const mapDispatchToProps = {
  setWorkHoursTotal, setMonthToShow
}

export default WithWorkService()(connect(mapStateToProps, mapDispatchToProps)(WorkInfo))