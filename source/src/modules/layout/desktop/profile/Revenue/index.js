import Healing from '@components/common/elements/Healing';
import React from 'react';
import styles from './index.module.scss';
import { Badge, Group, Paper, Text, Table, Avatar, Box, Image, Divider, Button } from '@mantine/core';
import Iconarow from '@assets/icons/increasearow.svg';
import { FormattedMessage } from 'react-intl';
import Typo from '@components/common/elements/Typo';
import Downarrow from '@assets/icons/dowarow.svg';
const data = [
    {
        name: 'Athena Weissnat',
        course: 'Học Figma thiết kế chuyên nghiệp ',
        state: 1,
    },
    {
        name: 'Deangelo Runolfsson',
        course: 'Học Figma thiết kế chuyên nghiệp ',
        state: 1,
    },
    {
        name: 'Danny Carter',
        course: 'Học Figma thiết kế chuyên nghiệp ',
        state: 1,
    },
    {
        name: 'Trace Tremblay PhD',
        course: 'Học Figma thiết kế chuyên nghiệp ',
        state: 1,
    },
];

const Revenue = () => {
    const rows = data?.map((row) => (
        <Table.Tr key={row.name}>
            <Table.Td w={260}>
                <Group gap="sm">
                    <Avatar size={40} radius={30} />
                    <Text size="sm" fw={500}>
                        {row.name}
                    </Text>
                </Group>
            </Table.Td>
            <Table.Td style={{ textAlign: 'center' }}>{row.course}</Table.Td>
            <Table.Td>
                {row.state == 1 ? (
                    <Badge variant="outline" color="#69BB3D">
                        <FormattedMessage defaultMessage={'Đã đăng ký'} />
                    </Badge>
                ) : (
                    <div></div>
                )}
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <div style={{ paddingTop: '30px' }}>
            <Healing size="small" type="semi">
                <FormattedMessage defaultMessage={'Tổng quan'} />
            </Healing>
            <Box mb={30}>
                <Group gap={50} mt={33}>
                    <Paper shadow="lg" p="lg" withBorder w={342} h={104}>
                        <Text size="var(--small-font-size)">
                            <FormattedMessage defaultMessage={'Tổng số học viên'} />
                        </Text>
                        <Group justify="space-between" align="center" mt={20}>
                            <Text size="var(--primary-font-size)">
                                <FormattedMessage defaultMessage={'1,540'} />
                            </Text>
                            <Badge variant="outline" color="#69BB3D">
                                <Group gap="5px">
                                    <Image src={Iconarow} />
                                    <FormattedMessage defaultMessage={'3,54%'} />
                                </Group>
                            </Badge>
                        </Group>
                    </Paper>
                    <Paper shadow="lg" p="lg" withBorder w={342} h={104}>
                        <Text size="var(--small-font-size)">
                            <FormattedMessage defaultMessage={'Học viên đã đăng ký'} />
                        </Text>
                        <Group justify="space-between" align="center" mt={20}>
                            <Text size="var(--primary-font-size)">
                                <FormattedMessage defaultMessage={'1,540'} />
                            </Text>
                            <Badge variant="outline" color="#69BB3D">
                                <Group gap="5px">
                                    <Image src={Iconarow} />
                                    <FormattedMessage defaultMessage={'3,54%'} />
                                </Group>
                            </Badge>
                        </Group>
                    </Paper>
                </Group>
            </Box>
            <Group gap={450}>
                <Healing size="small" type="semi">
                    <FormattedMessage defaultMessage={'Doanh thu'} />
                </Healing>
                <Button variant="light">
                    <Group gap="xs">
                        <FormattedMessage defaultMessage={'Tháng này'} />
                        <Image src={Downarrow} />
                    </Group>
                </Button>
            </Group>

            <Box mb={30}>
                <Group gap="xl" mt={20}>
                    <Paper w={342} h={104}>
                        <Text size="var(--small-font-size)">
                            <FormattedMessage defaultMessage={'Tổng thu (VND)'} />
                        </Text>
                        <Group align="center" mt={20} gap="sm">
                            <Text size="var(--primary-font-size)">
                                <FormattedMessage defaultMessage={'12,450,000đ'} />
                            </Text>
                            <Badge variant="white" color="#69BB3D" size="var(--small-font-size)">
                                <Group gap="5px">
                                    <Image src={Iconarow} />
                                    <FormattedMessage defaultMessage={'3,54%'} />
                                </Group>
                            </Badge>
                            <Text size="var(--small-font-size)">
                                <FormattedMessage defaultMessage={'Tháng này'} />
                            </Text>
                        </Group>
                    </Paper>
                    <Divider orientation="vertical" h="50px" size="sm" />
                    <Paper w={342} h={104}>
                        <Text size="var(--small-font-size)">
                            <FormattedMessage defaultMessage={'Chia hoa hồng (%)'} />
                        </Text>
                        <Group align="center" mt={20} gap="sm">
                            <Text size="var(--primary-font-size)">
                                <FormattedMessage defaultMessage={'2,250,000đ'} />
                            </Text>
                            <Badge variant="white" color="#69BB3D" size="var(--small-font-size)">
                                <Group gap="5px">
                                    <Image src={Iconarow} />
                                    <FormattedMessage defaultMessage={'1,25%'} />
                                </Group>
                            </Badge>
                            <Text size="var(--small-font-size)">
                                <FormattedMessage defaultMessage={'Tháng này'} />
                            </Text>
                        </Group>
                    </Paper>
                </Group>
            </Box>
            <Healing size="small" type="semi">
                <FormattedMessage defaultMessage={'Học viên'} />
            </Healing>
            <Box>
                <Table miw={950} verticalSpacing={30}>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th w={260}>
                                <FormattedMessage defaultMessage={'Họ và tên'} />
                            </Table.Th>
                            <Table.Th style={{ textAlign: 'center' }}>
                                <FormattedMessage defaultMessage={'Khóa học'} />
                            </Table.Th>
                            <Table.Th>
                                <FormattedMessage defaultMessage={'Trạng thái'} />
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Box>
        </div>
    );
};

export default Revenue;
