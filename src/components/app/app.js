import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from "react-router-dom";
import { Layout, Typography, Button, Row, Col } from 'antd'
import Login from '../login'
import Register from '../register';
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
const { Title, Text } = Typography


const App = ({ WorkService, setUser }) => {
    const [user, loading, error] = useAuthState(auth)
    const history = useHistory()

    useEffect(() => {
        if (loading) {
            return
        }
        if (user && !error) {
            history.replace('/workhours')
            WorkService.getUser()
                .then(res => setUser(res))
                .catch(err => alert(err, 'login'))
        }
    }, [user, loading])


    const onLogOut = () => {
        WorkService.logOut()
        setUser(null)
    }

    return (
        <Layout >
            <Switch>
                <Route exact path='/'>
                    <Login />
                </Route>

                <Route path='/register'>
                    <Register />
                </Route>

                <Route path='/workhours'>
                    <Header>
                        <Row>
                            <Col span={20}>
                                <Title level={1}>Pracovni fond </Title>
                            </Col>
                            <Col span={3}>
                                <Text level={5}>
                                    {user != null && user.email}
                                </Text>
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