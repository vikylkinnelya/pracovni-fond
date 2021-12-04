import React, { useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import { Layout, Typography, Button, Row, Col } from 'antd'
import Login from '../login'
import DataPicker from '../data-picker';
import WorkInfo from '../work-info';
import WorkDaysList from '../work-days-list'
import WithWorkService from '../hoc/with-work-service';
import { setUser } from '../../actions';
import { connect } from 'react-redux';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import './app.css';
import 'antd/dist/antd.css';
const { Header, Content, Footer } = Layout;
const { Title } = Typography


const App = ({ WorkService, setUser }) => {

    const onLogOut = () => {
        WorkService.logOut()
    }
    const [user] = useAuthState(auth)

    useEffect(() => {
        if (user) {
            WorkService.getUser()
                .then(res => setUser(res))
                .catch(err => alert(err, 'login'))
        }
    }, [user])

    return (
        <Layout >
            <Switch>
                <Route exact path='/'>
                    <Login />
                </Route>

                <Route path='/workhours'>

                    <Header>
                        <Row>
                            <Col span={23}>
                                <Title level={1}>Pracovni fond </Title>
                            </Col>
                            <Col span={1}>
                                <Button onClick={() => onLogOut()}>
                                    log out
                                </Button>
                            </Col>
                        </Row>
                    </Header>

                    <Content className='app-content'>

                        <DataPicker />
                        <WorkInfo />
                        <WorkDaysList />

                    </Content>


                    <Footer>

                    </Footer>
                </Route>

            </Switch>
        </Layout>
    )
}

const mapDispatchToProps = {
    setUser
}


export default WithWorkService()(connect(null, mapDispatchToProps)(App))