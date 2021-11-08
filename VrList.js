import React, { Component, useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Form, Table, Tag, Space } from 'antd';

import axios from 'axios';
import { Modal } from 'react-responsive-modal';
import {

    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Input,
    Row,
} from 'reactstrap';
function VrList(props) {
    const [data, setData] = useState([]);
    var valuetu =props.location.state.vr_data;
    const [isvr, setisvr] = useState(false);

    useEffect(() => {
        await setData(value.vr);
    }, []);
    const handle_see_vr = async (value) => {
        props.history.push({



            pathname: '/VrPlayer/',

            state: {
               path: value,
            }


        });
    }
    return (
        <>
          <Row>

<Card>
    <CardHeader>
    <strong> VR  List</strong>
                    </CardHeader>
                    <CardBody>
                        <div style={{
                            paddingTop: "80px",
                            float: 'left',

                        }}>
                            </div>
                            <Table styles={{ border: '1px solid rgba(0, 0, 0, 0.05)' }} dataSource={data}>


<ColumnGroup>

    <Column title="vr name" dataIndex="name" key="name"></Column >
    <Column title="vr description" dataIndex="description" key="description"></Column>
    <Column title="Action" key="action"
        render={(text, record) => (
            <Space size="middle">
                <Button outline color="primary" onClick={() => { handle_see_vr(text) }} >See VR</Button>

            </Space>
        )} />
</ColumnGroup>









</Table>

                            </CardBody>

                    </Card>
                    </Row>
        </>
    )
}
export default VrList;