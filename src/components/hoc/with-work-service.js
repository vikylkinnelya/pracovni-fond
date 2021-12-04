import React from 'react'
import WorkServiceContext from '../work-service-context'

const WithWorkService = () => (Wrapped) => {
    return (props) => {
        return (
            <WorkServiceContext.Consumer>
                {
                    (WorkService) => {
                        return <Wrapped {...props} WorkService={WorkService}/>
                    }
                }
            </WorkServiceContext.Consumer>
        )
    }
}

export default WithWorkService;