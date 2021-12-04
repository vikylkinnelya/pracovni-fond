const initialState = {
    error: null,
    loading: false,
    workList: {},
    workDate: new Date(new Date().setHours(14, 0, 0)),
    workEnd: new Date(new Date().setHours(22, 30, 0)),
    monthToShow: new Date().getMonth(),
    workDuration: 8,
    prestavkaToday: 0.5,
    workHoursTotal: 0,
    prestavkaTotal: 0,
    modalPickerOpen: false,
    user: null,
    chartData: []
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }

        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            }

        case 'SET_WORK_DATE':
            const date = new Date()
            return {
                ...state,
                workDate: action.payload || new Date(date.setHours(14, 0, 0))
            }

        case 'SET_WORK_END':
            const workEndByDefault = new Date(+state.workDate + 28800000)
            return {
                ...state,
                workEnd: action.payload || workEndByDefault
            }


        case 'SET_WORK_HOURS_TODAY':
            return {
                ...state,
                workDuration: action.payload
            }

        case 'SET_WORK_HOURS_TOTAL':
            return {
                ...state,
                workHoursTotal: action.payload
            }

        case 'SET_MODAL_PICKER':
            return {
                ...state,
                modalPickerOpen: action.payload
            }


        case 'SET_WORK_LIST':
            const dataSource = []
            action.payload.forEach(
                doc => Object.keys(doc.data()).length > 0
                    && dataSource.push(doc.data())
            )
            dataSource.sort((a, b) => a.workDate.seconds - b.workDate.seconds)
            return {
                ...state,
                workList: dataSource,
            }

        default:
            return state;

        case 'SET_CHART_DATA':
            const chartSource = []
            action.payload.forEach(
                doc => Object.keys(doc.data()).length > 0
                    && chartSource.push(
                        [new Date(doc.data().workDate.seconds * 1000), doc.data().workDuration]
                    )
            )
            return {
                ...state,
                chartData: chartSource
            }
        
            case 'SET_MONTH_TO_SHOW':
                return {
                    ...state, 
                    monthToShow: action.payload
                }
    }
}

export default reducer;