import React from 'react';
import styles from './index.module.scss';
import avatar from '@assets/images/avatar_profile.png';
import BasicModal from '@components/common/form/BasicModal';
import { TextInput, Button, Box, Group, Checkbox, Grid, Select, Avatar } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { FormattedMessage, defineMessages } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
import { IconChevronDown } from '@tabler/icons-react';

const message = defineMessages({
    update: 'Cập nhật',
    emailAddress: 'Email',
    fullName: 'Họ và tên',
    phone: 'Số điện thoại',
    address: 'Địa chỉ',
    nation: 'Quốc gia',
    province: 'Tỉnh / thành',
    updatelater: 'Bỏ qua, tôi sẽ cập nhật sau',
    changePassword: 'Đổi mật khẩu',
});
const ModalProfileForm = () => {
    const translate = useTranslate();

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });
    return (
        <Box maw={'100%'} mx="auto">
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <Group
                    mt="15"
                    justify="center"
                    classNames={{
                        root: styles.groupAvatar,
                    }}
                >
                    <Avatar src={avatar} radius="lg" size={130} />
                </Group>
                <Grid gutter={22}>
                    <Grid.Col span={6}>
                        <TextInput
                            // withAsterisk
                            mt={'24'}
                            label={translate.formatMessage(message.fullName)}
                            placeholder="Nhập họ và tên"
                            classNames={{
                                root: styles.textInputRoot,
                                label: styles.label,
                                input: styles.input,
                            }}
                            {...form.getInputProps('fullName')}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            // withAsterisk
                            mt={'24'}
                            label={translate.formatMessage(message.emailAddress)}
                            placeholder="mail@example.com"
                            classNames={{
                                root: styles.textInputRoot,
                                label: styles.label,
                                input: styles.input,
                            }}
                            {...form.getInputProps('email')}
                        />
                    </Grid.Col>
                </Grid>
                <Grid gutter={22}>
                    <Grid.Col span={6}>
                        <TextInput
                            // withAsterisk
                            mt={'24'}
                            label={translate.formatMessage(message.phone)}
                            placeholder="Nhập số điện thoại"
                            classNames={{
                                root: styles.textInputRoot,
                                label: styles.label,
                                input: styles.input,
                            }}
                            {...form.getInputProps('phone')}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            // withAsterisk
                            mt={'24'}
                            label={translate.formatMessage(message.address)}
                            placeholder="Nhập địa chỉ"
                            classNames={{
                                root: styles.textInputRoot,
                                label: styles.label,
                                input: styles.input,
                            }}
                            {...form.getInputProps('address')}
                        />
                    </Grid.Col>
                </Grid>
                <Grid gutter={22}>
                    <Grid.Col span={6}>
                        <Select
                            // withAsterisk
                            mt={'24'}
                            label={translate.formatMessage(message.nation)}
                            placeholder="Chọn"
                            classNames={{
                                root: styles.textInputRoot,
                                label: styles.label,
                                input: styles.input,
                            }}
                            {...form.getInputProps('nation')}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Select
                            // withAsterisk
                            mt={'24'}
                            label={translate.formatMessage(message.province)}
                            placeholder="Chọn"
                            classNames={{
                                root: styles.textInputRoot,
                                label: styles.label,
                                input: styles.input,
                            }}
                            {...form.getInputProps('province')}
                        />
                    </Grid.Col>
                </Grid>
                <Checkbox mt={'15'} label={translate.formatMessage(message.updatelater)} />
                <Group mt="xl" justify="center">
                    <Button
                        type="submit"
                        radius="lg"
                        classNames={{ root: styles.btnUpdate, label: styles.label }}
                        // style={{ paddingLeft: '60px', paddingRight: '60px', width: '200px', height: '50px' }}
                    >
                        {translate.formatMessage(message.update)}
                    </Button>
                    <Button
                        type="submit"
                        radius="lg"
                        classNames={{ root: styles.btnChange, label: styles.label }}
                        // style={{ paddingLeft: '60px', paddingRight: '60px', width: '200px', height: '50px' }}
                    >
                        {translate.formatMessage(message.changePassword)}
                    </Button>
                </Group>
            </form>
        </Box>
    );
};

export default ModalProfileForm;
