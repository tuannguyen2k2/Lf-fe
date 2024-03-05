import React from 'react';
import { Table, ScrollArea, Text, Avatar, Group, Badge, Tabs, Box } from '@mantine/core';
import Healing from '@components/common/elements/Healing';
import { useState } from 'react';
import styles from './index.module.scss';
import cx from 'clsx';
import { defineMessages, useIntl, FormattedMessage } from 'react-intl';
import useTranslate from '@hooks/useTranslate';
const message = defineMessages({
    buyList: 'Danh sách bán hàng',
});

const data = [
    {
        name: 'Athena Weissnat',
        email: 'email@example',
        course: 'Học Figma thiết kế chuyên nghiệp ',
        state: 1,
        createDay: '2023-12-14',
        price: '12312',
    },
    {
        name: 'Deangelo Runolfsson',
        email: 'email@example',
        course: 'Học Figma thiết kế chuyên nghiệp ',
        state: 2,
        createDay: '2023-12-14',
        price: '12312',
    },
    {
        name: 'Danny Carter',
        email: 'email@example',
        course: 'Học Figma thiết kế chuyên nghiệp ',
        state: 1,
        createDay: '2023-12-14',
        price: '12312',
    },
];

const HistorySeller = () => {
    const [ scrolled, setScrolled ] = useState(false);
    const translate = useTranslate();
    const rows = data?.map((row) => (
        <Table.Tr key={row.name}>
            <Table.Td>
                <Group gap="sm">
                    <Avatar size={40} radius={30} />
                    <Box>
                        <Text size="15px" fw={600} mb={12}>
                            {row.name}
                        </Text>
                        <Text size="12px" fw={500} c={'var(--text-color'}>
                            {row.email}
                        </Text>
                    </Box>
                </Group>
            </Table.Td>
            <Table.Td>
                {row.state == 1 ? (
                    <Badge variant="outline" color="green" p={10}>
                        <FormattedMessage defaultMessage="Đã mua" />
                    </Badge>
                ) : row.state == 2 ? (
                    <Badge variant="outline" color="red" p={10}>
                        <FormattedMessage defaultMessage="Đã hủy" />
                    </Badge>
                ) : (
                    <div></div>
                )}
            </Table.Td>
            <Table.Td>{row.course}</Table.Td>
            <Table.Td>{row?.createDay}</Table.Td>
            <Table.Td>{row?.price}</Table.Td>
        </Table.Tr>
    ));

    return (
        <div style={{ width: '910px', paddingTop: '30px' }}>
            <Tabs
                defaultValue="all"
                classNames={{
                    root: styles.tabsCategory,
                    list: styles.listCategory,
                    tabLabel: styles.tabLabelCategory,
                }}
            >
                <Tabs.List justify="space-between">
                    <Tabs.Tab value="all">
                        <FormattedMessage defaultMessage="Xem tất cả" />
                    </Tabs.Tab>
                    <Tabs.Tab value="sell">
                        <FormattedMessage defaultMessage="Khóa học đã bán" />
                    </Tabs.Tab>
                    <Tabs.Tab value="cancel">
                        <FormattedMessage defaultMessage="Khóa học đã mua" />
                    </Tabs.Tab>
                </Tabs.List>
                <Table miw={910} verticalSpacing={30}>
                    <Table.Thead className={cx(styles.header, { [styles.scrolled]: scrolled })}>
                        <Table.Tr>
                            <Table.Th>
                                <FormattedMessage defaultMessage="Học và tên" />
                            </Table.Th>
                            <Table.Th>
                                <FormattedMessage defaultMessage="Trạng thái" />
                            </Table.Th>
                            <Table.Th>
                                <FormattedMessage defaultMessage="Khóa học" />
                            </Table.Th>
                            <Table.Th>
                                <FormattedMessage defaultMessage="Ngày giao dịch" />
                            </Table.Th>
                            <Table.Th>
                                <FormattedMessage defaultMessage="Giá tiền" />
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Tabs>
        </div>
    );
};

export default HistorySeller;
