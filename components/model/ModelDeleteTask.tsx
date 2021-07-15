import React, { FC, useCallback, useEffect, useState } from 'react';
import { Button, TextContainer, Modal } from '@shopify/polaris';
import { inject, observer } from 'mobx-react';
import { Task, Todo } from 'mst';
import axiosInstance from 'helpers/axiosInstance';

type TodoProp = {
    todo: Task,
    store: Todo
}

const ModalDelete: FC<TodoProp> = ({ todo, store }) => {
    const [active, setActive] = useState(false);
    const [finishDone, setFinishDone] = useState(true)
    const handleChange = useCallback(() => setActive(!active), [active]);

    useEffect(() => {
        if (todo !== null) {
            handleChange()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [todo])

    async function handleConfirm() {
        setFinishDone(false)
        try {
            let res = await axiosInstance().delete(`tasks/${todo.id}`)
            if (res.data.success === true) {
                store.deleteTodo(todo.id)
                setFinishDone(true)
                handleChange()
            }
            else {
                setFinishDone(true)
                alert('xóa không thành công!');
            };

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div style={{ height: '500px', position: 'absolute' }}>
            <Modal
                open={active}
                onClose={handleChange}
                title="Bạn có thực sự muốn xóa!"
                primaryAction={{
                    content: 'Xác nhân',
                    onAction: handleConfirm,
                }}
                secondaryActions={[
                    {
                        content: 'Hủy',
                        onAction: handleChange,
                    },
                ]}
            >
                <Modal.Section>
                    <TextContainer>
                        <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            {todo?.title}
                        </h3>
                        <p style={{ textAlign: 'center' }}>{todo?.content}</p>
                        <div style={finishDone ? { display: 'none' } : {}} className="continuous-1"></div>
                    </TextContainer>
                </Modal.Section>
            </Modal>
        </div>
    );
}
export default inject('store')(
    observer(ModalDelete)
);