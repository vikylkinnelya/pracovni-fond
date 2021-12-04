import React from 'react';
import { Modal, Row } from 'antd'
import DataPicker from '../data-picker/data-picker';
import WorkTable from '../work-table';
import WithWorkService from '../hoc/with-work-service';
import { setModalPicker } from '../../actions'
import { connect } from 'react-redux';
import 'moment/locale/cs'
import './styles.css'

const WorkDaysList = ({ WorkService, user, workDuration, modalPickerOpen, setModalPicker, workDate, workEnd}) => {

    return (
        <>
            <Row className='work-list-row'>
                <WorkTable />
            </Row>

            {modalPickerOpen &&
                <Modal
                    visible={modalPickerOpen}
                    onOk={() => WorkService.addWorkDay(workDate, workEnd, workDuration, user)}
                    onCancel={() => setModalPicker(false)}
                >
                    <DataPicker
                        modal={true}
                    />
                </Modal>
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        workDate: state.workDate,
        workEnd: state.workEnd,
        workDuration: state.workDuration,
        modalPickerOpen: state.modalPickerOpen,
        user: state.user,
    }
}

const mapDispatchToProps = {
    setModalPicker,
}

export default WithWorkService()(connect(mapStateToProps, mapDispatchToProps)(WorkDaysList));