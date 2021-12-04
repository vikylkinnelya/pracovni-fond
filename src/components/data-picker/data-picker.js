import React, { useCallback } from 'react';
import { DatePicker, Button, Row, Col } from 'antd';
import WithWorkService from '../hoc/with-work-service';
import { setModalPicker, setWorkDate, setWorkEnd, setWorkHoursToday, setWorkHoursTotal, setWorkList } from '../../actions';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/cs'
import locale from 'antd/es/date-picker/locale/cs_CZ.js'
import './styles.css'

const { RangePicker } = DatePicker

const DataPicker = ({ WorkService, user, workDate, setWorkDate, workEnd, setWorkEnd, workDuration, setWorkHoursToday, setWorkHoursTotal, modalPickerOpen, setModalPicker }) => {

  const dateFormat = 'DD/MM/YYYY HH:mm'
  moment.locale('cs')

  const defWorkHours = useCallback((start, end) => {
    setWorkDate(start)
    setWorkEnd(end)
    const hours = WorkService.defWorkHours(start, end)
    setWorkHoursToday(hours)
  }, [setWorkHoursToday, WorkService, setWorkDate, setWorkEnd])

  const onAddWorkDay = (workDate, workEnd, workDuration) => {
    WorkService.addWorkDay(workDate, workEnd, workDuration, user)
      .then(res => setWorkHoursTotal(res))
      .catch(err => alert(err, 'adding work date'))
  }

  return (
    <Row className='date-pick-row'>
      <Col span={10}>
        <RangePicker
          size={'large'}
          defaultValue={[moment(workDate), moment(workEnd)]}
          locale={locale}
          showTime={{
            minuteStep: 15,
            showNow: false
          }}
          format={dateFormat}
          onChange={(dates) => { defWorkHours(dates[0]._d, dates[1]._d) }}
        />
      </Col>
      <Col span={4}>
        {
          !modalPickerOpen &&
          <Button type="primary" htmlType="submit"
            onClick={() => onAddWorkDay(workDate, workEnd, workDuration)}>
            Podtvrdit
          </Button>
        }
      </Col>
      <Col span={24} className='odpracovano-col'>
        Odpracovano dneska: {workDuration} h.
      </Col>
    </Row>
  )
}


const mapStateToProps = state => {
  return {
    workDate: state.workDate,
    workEnd: state.workEnd,
    workList: state.workList,
    workDuration: state.workDuration,
    modalPickerOpen: state.modalPickerOpen,
    user: state.user
  }
}

const mapDispatchToProps = {
  setWorkList,
  setModalPicker,
  setWorkDate, setWorkEnd,
  setWorkHoursToday, setWorkHoursTotal
}

export default WithWorkService()(connect(mapStateToProps, mapDispatchToProps)(DataPicker))