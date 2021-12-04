const setUser = (id) => ({
    type: 'SET_USER',
    payload: id
})
const setWorkDate = (date = false) => ({
    type: 'SET_WORK_DATE',
    payload: date
})

const setWorkEnd = (end = false) => ({
    type: 'SET_WORK_END',
    payload: end
})

const setModalPicker = (bool) => ({
    type: 'SET_MODAL_PICKER',
    payload: bool
})

const setWorkList = (resp) => ({
    type: 'SET_WORK_LIST',
    payload: resp
})

const setWorkHoursToday = (hours) => ({
    type: 'SET_WORK_HOURS_TODAY',
    payload: hours
})

const setWorkHoursTotal = (hours) => ({
    type: 'SET_WORK_HOURS_TOTAL',
    payload: hours
})

const setChartData = (obj) => ({
    type: 'SET_CHART_DATA',
    payload: obj
})

const setMonthToShow = (month) => ({
    type: 'SET_MONTH_TO_SHOW',
    payload: month
})

export { setUser, setWorkDate, setWorkEnd, setModalPicker, setWorkList, setWorkHoursToday, setWorkHoursTotal, setChartData , setMonthToShow}