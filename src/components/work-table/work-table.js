import React, { useEffect, useState } from 'react';
import { Button, Table, Popconfirm, DatePicker, Col, Menu, Dropdown, Typography } from 'antd'
import WithWorkService from '../hoc/with-work-service';
import { setWorkDate, setWorkEnd, setWorkList, setWorkHoursTotal } from '../../actions'
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/cs';
import locale from 'antd/es/date-picker/locale/cs_CZ.js'
const { RangePicker } = DatePicker


const WorkTable = ({ workList, workHoursTotal, user, WorkService, setWorkDate, setWorkEnd, setWorkList, setWorkHoursTotal, monthToShow }) => {

    const dateFormat = 'DD/MM/YYYY HH:mm'
    moment.locale('cs')

    const dateYear = new Date().getFullYear()

    const [loadingList, setLoadingList] = useState(false)
    const [editingKey, setEditingKey] = useState('')
    const isEditing = (record) => record.id === editingKey

    const onEditWorkDay = (record) => {
        setEditingKey(record.id)
    }

    const onDeleteWorkDay = (record) => {
        const date = new Date(record.workDate.seconds * 1000)
        const hours = record.workDuration
        WorkService.deleteWorkDay(date, hours, user)
            .then(res => setWorkHoursTotal(res))
            .catch(err => alert(err, 'deleting work date'))
    }

    const cancel = () => {
        setEditingKey('');
    };

    const onSaveChanges = async (record) => {
        console.log(record)
        setEditingKey('');
    }

    const columns = [
        {
            title: 'Datum',
            dataIndex: 'workDate',
            align: 'center',
            width: '50%',
            render: (text, record) =>
                <RangePicker
                    disabled={!isEditing(record)}
                    bordered={isEditing(record)}
                    allowClear={false}
                    separator={null}
                    suffixIcon={null}
                    defaultValue={[moment(record.workDate.seconds * 1000), moment(record.workEnd.seconds * 1000)]}
                    locale={locale}
                    showTime={{
                        minuteStep: 15,
                        showNow: false
                    }}
                    format={dateFormat}
                    onCalendarChange={dates => { setWorkDate(dates[0]._d); setWorkEnd(dates[1]._d) }}
                    className='date-range-picker'
                />,
            editable: true
        },
        {
            title: 'Delka hodin',
            dataIndex: 'workDuration',
            key: 'delka',
            width: '10%',
            align: 'center',
            editable: false
        },
        {
            title: 'action',
            dataIndex: 'action',
            width: '25%',
            align: 'center',
            render: (_, record) => {
                const editable = isEditing(record)
                return editable ?
                    (<>
                        <Button onClick={() => onSaveChanges(record)}>
                            Save
                        </Button>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <Button>
                                Cancel
                            </Button>
                        </Popconfirm>
                    </>)
                    :
                    (<>
                        <Button
                            onClick={() => onEditWorkDay(record)}
                        >
                            Zmenit
                        </Button>
                        <Popconfirm title="Sure to delete?" onConfirm={() => onDeleteWorkDay(record)}>
                            <Button>
                                Smazat
                            </Button>
                        </Popconfirm>
                    </>)
            }
        }
    ]


    useEffect(() => {
        setLoadingList(true)
        user && WorkService.getWorkDaysList(dateYear, monthToShow, user)
            .then(res => setWorkList(res))
            .then(res => setLoadingList(false))
            .catch(err => alert(err, 'getting list'))

    }, [setWorkList, user, workHoursTotal, WorkService, monthToShow, dateYear])

    

    return (
        <>
            {workList != null && workList.length > 0 &&
                <>
                    <Col span={24}>
                        <Table
                            pagination={false}
                            dataSource={workList}
                            columns={columns}
                            rowKey={record => record.workDate}
                            loading={loadingList}
                        />
                    </Col>
                </>
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        workDate: state.workDate,
        workEnd: state.workEnd,
        workList: state.workList,
        workDuration: state.workDuration,
        workHoursTotal: state.workHoursTotal,
        user: state.user,
        monthToShow: state.monthToShow
    }
}

const mapDispatchToProps = {
    setWorkList,
    setWorkDate, setWorkEnd,
    setWorkHoursTotal,
}


export default WithWorkService()(connect(mapStateToProps, mapDispatchToProps)(WorkTable))